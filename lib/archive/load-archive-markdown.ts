import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import {
  getArchiveFigure,
  getArchiveSession,
  type ArchiveFigureRecord,
  type ArchiveSessionRecord
} from "@/lib/archive/archive-registry";

export type ArchiveMarkdownFrontmatter = {
  title?: string;
  slug?: string;
  type?: string;
  subject?: string;
  born?: string;
  died?: string;
  badges_used?: string[];
  primary_sources?: string[];
  key_scholarly_sources?: string[];
};

export type LoadedArchiveMarkdown = {
  frontmatter: ArchiveMarkdownFrontmatter;
  body: string;
  record: ArchiveFigureRecord | ArchiveSessionRecord;
  kind: "figure" | "session";
};

function readArchiveFile(subdir: "profiles" | "angelic-sessions", fileName: string): string {
  const abs = path.join(process.cwd(), "content", "archive", subdir, fileName);
  return readFileSync(abs, "utf8");
}

/** Archive YAML uses badge glyphs that break strict YAML parsers — extract key fields manually. */
function parseArchiveFile(raw: string): { frontmatter: ArchiveMarkdownFrontmatter; body: string } {
  if (!raw.startsWith("---")) {
    return { frontmatter: {}, body: raw.trim() };
  }
  const end = raw.indexOf("\n---\n", 3);
  if (end === -1) {
    return { frontmatter: {}, body: raw.trim() };
  }
  const fmBlock = raw.slice(3, end);
  const body = raw.slice(end + 5).trim();

  const line = (key: string): string | undefined => {
    const m = fmBlock.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, "m"));
    return m?.[1]?.trim();
  };

  const list = (key: string): string[] => {
    const re = new RegExp(`^${key}:\\s*\\n((?:  - .+\\n)+)`, "m");
    const m = fmBlock.match(re);
    if (!m) return [];
    return [...m[1].matchAll(/^\s+-\s+"(.+)"\s*$/gm)].map((x) => x[1]);
  };

  return {
    frontmatter: {
      title: line("title"),
      slug: line("slug"),
      type: line("type"),
      subject: line("subject"),
      born: line("born"),
      died: line("died"),
      primary_sources: list("primary_sources"),
      key_scholarly_sources: list("key_scholarly_sources")
    },
    body
  };
}

export const loadArchiveFigureMarkdown = cache((slug: string): LoadedArchiveMarkdown => {
  const record = getArchiveFigure(slug);
  if (!record) throw new Error(`Unknown archive figure: ${slug}`);
  const raw = readArchiveFile("profiles", record.fileName);
  const { frontmatter, body } = parseArchiveFile(raw);
  return { frontmatter, body, record, kind: "figure" };
});

export const loadArchiveSessionMarkdown = cache((slug: string): LoadedArchiveMarkdown => {
  const record = getArchiveSession(slug);
  if (!record) throw new Error(`Unknown archive session: ${slug}`);
  const raw = readArchiveFile("angelic-sessions", record.fileName);
  const { frontmatter, body } = parseArchiveFile(raw);
  return { frontmatter, body, record, kind: "session" };
});
