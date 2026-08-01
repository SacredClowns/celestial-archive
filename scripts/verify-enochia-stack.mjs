/**
 * Verifies Enochia stack: Supabase tables (enochia + public schemas) + env keys.
 * Run: npm run verify:enochia
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const projectRef = "liwrohglgvbzgfzbxwgu";
const ENOCHIA_SCHEMA = "enochia";

function loadEnvLocal() {
  const path = resolve(root, ".env.local");
  if (!existsSync(path)) return {};
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return env;
}

const env = { ...process.env, ...loadEnvLocal() };

/** 200 = reachable; 401 = exists but RLS blocks anon (expected for CRM). */
async function tableExists(table, schema = "public") {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/json"
  };
  if (schema !== "public") {
    headers["Accept-Profile"] = schema;
    headers["Content-Profile"] = schema;
  }
  const res = await fetch(`${url}/rest/v1/${table}?select=*&limit=0`, {
    headers
  });
  return res.status === 200 || (schema === "public" && res.status === 401);
}

const ENOCHIA_TABLES = [
  "celestial_profiles",
  "celestial_journal_entries",
  "celestial_user_progress",
  "celestial_bookmarks",
  "celestial_discoveries"
];

const PUBLIC_TABLES = [
  "celestial_crm_contacts",
  "celestial_newsletter_subscribers",
  "celestial_course_enrollments",
  "celestial_marketing_events",
  "celestial_agent_jobs",
  "celestial_content_pieces",
  "celestial_hermes_memories"
];

const ENV_CHECKS = [
  ["NEXT_PUBLIC_SUPABASE_URL", true],
  ["NEXT_PUBLIC_SUPABASE_ANON_KEY", true],
  ["SUPABASE_SERVICE_ROLE_KEY", false],
  ["CELESTIAL_ADMIN_EMAILS", false],
  ["OPENROUTER_API_KEY", false],
  ["NEXT_PUBLIC_SITE_URL", false]
];

async function main() {
  console.log(`\nEnochia stack verify — ${projectRef}\n`);

  let fail = false;

  for (const [key, required] of ENV_CHECKS) {
    const ok = Boolean(env[key]?.trim());
    const tag = required ? "required" : "recommended";
    console.log(`  ${ok ? "✓" : "✗"} ${key} (${tag})`);
    if (required && !ok) fail = true;
  }

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    process.exit(1);
  }

  console.log(`\nSeeker tables (schema: ${ENOCHIA_SCHEMA}):`);
  for (const t of ENOCHIA_TABLES) {
    const ok = await tableExists(t, ENOCHIA_SCHEMA);
    console.log(`  ${ok ? "✓" : "✗"} ${t}`);
    if (!ok) fail = true;
  }

  console.log("\nAdmin / CRM tables (schema: public):");
  for (const t of PUBLIC_TABLES) {
    const ok = await tableExists(t, "public");
    console.log(`  ${ok ? "✓" : "✗"} ${t}`);
    if (!ok) fail = true;
  }

  if (fail) {
    console.log("\nFix: fill .env.local (see docs/ENOCHIA_SETUP.md)");
    console.log(`https://supabase.com/dashboard/project/${projectRef}/settings/api\n`);
    process.exit(1);
  }

  const missingSecrets = !env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (missingSecrets) {
    console.log(
      "\nTables OK. Add SUPABASE_SERVICE_ROLE_KEY + CELESTIAL_ADMIN_EMAILS for /admin and CRM.\n"
    );
    return;
  }

  console.log("\nAll checks passed. Run: npm run dev → /grimoire and /admin\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
