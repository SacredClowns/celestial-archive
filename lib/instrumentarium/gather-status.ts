import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { seekerLessonRegistry } from "@/lib/content-registry";
import { studentLessonRegistry } from "@/lib/student/student-lesson-registry";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { adminAccessConfigured } from "@/lib/instrumentarium/admin-access";

const CELESTIAL_TABLES = [
  "celestial_profiles",
  "celestial_journal_entries",
  "celestial_user_progress",
  "celestial_bookmarks",
  "celestial_discoveries"
] as const;

function countFilesRecursive(dir: string, ext: string): number {
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) n += countFilesRecursive(full, ext);
    else if (name.endsWith(ext)) n += 1;
  }
  return n;
}

async function tableReachable(table: string): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  const res = await fetch(`${url}/rest/v1/${table}?select=*&limit=0`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
      "Accept-Profile": "enochia",
      "Content-Profile": "enochia"
    },
    cache: "no-store"
  });
  return res.status === 200;
}

export type InstrumentariumStatus = {
  generatedAt: string;
  environment: string;
  nodeVersion: string;
  packageVersion: string;
  supabase: {
    configured: boolean;
    projectHost: string | null;
    tables: Array<{ name: string; reachable: boolean }>;
  };
  admin: { allowlistConfigured: boolean };
  content: {
    seekerLessons: number;
    studentLessons: number;
    curriculumMarkdown: number;
    archiveMarkdown: number;
    searchIndexEntries: number | null;
  };
  rites: Array<{ id: string; command: string; note: string }>;
  constellation: Array<{ label: string; href: string; kind: "internal" | "external" }>;
};

export async function gatherInstrumentariumStatus(): Promise<InstrumentariumStatus> {
  const root = process.cwd();
  let packageVersion = "0.0.0";
  try {
    const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8")) as {
      version?: string;
    };
    packageVersion = pkg.version ?? packageVersion;
  } catch {
    /* keep default */
  }

  const searchIndexPath = path.join(root, "content", "search-index.json");
  let searchIndexEntries: number | null = null;
  if (existsSync(searchIndexPath)) {
    try {
      const parsed = JSON.parse(readFileSync(searchIndexPath, "utf8")) as unknown[];
      searchIndexEntries = Array.isArray(parsed) ? parsed.length : null;
    } catch {
      searchIndexEntries = null;
    }
  }

  const supabaseConfigured = isSupabaseConfigured();
  const tables = supabaseConfigured
    ? await Promise.all(
        CELESTIAL_TABLES.map(async (name) => ({
          name,
          reachable: await tableReachable(name)
        }))
      )
    : CELESTIAL_TABLES.map((name) => ({ name, reachable: false }));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let projectHost: string | null = null;
  if (supabaseUrl) {
    try {
      projectHost = new URL(supabaseUrl).hostname;
    } catch {
      projectHost = null;
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? "development",
    nodeVersion: process.version,
    packageVersion,
    supabase: {
      configured: supabaseConfigured,
      projectHost,
      tables
    },
    admin: { allowlistConfigured: adminAccessConfigured() },
    content: {
      seekerLessons: seekerLessonRegistry.length,
      studentLessons: studentLessonRegistry.length,
      curriculumMarkdown: countFilesRecursive(path.join(root, "content", "curriculum"), ".md"),
      archiveMarkdown: countFilesRecursive(path.join(root, "content", "archive"), ".md"),
      searchIndexEntries
    },
    rites: [
      { id: "build", command: "npm run build", note: "Rebuild search index and static routes" },
      { id: "test", command: "npm test", note: "Vitest suite" },
      { id: "verify", command: "npm run verify:supabase", note: "Celestial table presence" },
      { id: "lint", command: "npm run lint", note: "ESLint" },
      { id: "search", command: "npm run build:search", note: "Regenerate search-index.json only" }
    ],
    constellation: [
      { label: "Archive threshold", href: "/", kind: "internal" },
      { label: "Supabase dashboard", href: "https://supabase.com/dashboard", kind: "external" },
      { label: "Auth callback", href: "/auth/callback", kind: "internal" },
      { label: "Path settings", href: "/path/settings", kind: "internal" },
      { label: "Observatory", href: "/observatory", kind: "internal" }
    ]
  };
}
