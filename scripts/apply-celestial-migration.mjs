/**
 * Verifies celestial_* tables; prints SQL Editor link if migration is still needed.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const projectRef = "liwrohglgvbzgfzbxwgu";

function loadEnvLocal() {
  const path = resolve(root, ".env.local");
  if (!existsSync(path)) return {};
  const text = readFileSync(path, "utf8");
  const env = {};
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return env;
}

const env = { ...process.env, ...loadEnvLocal() };
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const sqlPath = resolve(root, "supabase/migrations/001_celestial_archive.sql");

async function tableExists(table) {
  const res = await fetch(`${url}/rest/v1/${table}?select=*&limit=0`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: "application/json"
    }
  });
  return res.status === 200;
}

async function main() {
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_* in .env.local");
    process.exit(1);
  }

  console.log(`Checking ${projectRef} (Old Gods / Roma shared)…`);

  const tables = [
    "celestial_profiles",
    "celestial_journal_entries",
    "celestial_user_progress",
    "celestial_bookmarks"
  ];

  const results = await Promise.all(tables.map(async (t) => [t, await tableExists(t)]));
  const missing = results.filter(([, ok]) => !ok).map(([t]) => t);

  if (missing.length === 0) {
    console.log("All celestial_* tables are present.");
    return;
  }

  console.log("Missing tables:", missing.join(", "));
  console.log("\nRun migration once in SQL Editor:");
  console.log(`https://supabase.com/dashboard/project/${projectRef}/sql/new`);
  console.log(`\nPaste: ${sqlPath}`);
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
