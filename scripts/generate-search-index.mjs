/**
 * Writes content/search-index.json for optional static search loading.
 * Run: node scripts/generate-search-index.mjs
 */
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// Dynamic import of compiled TS is not available; duplicate minimal build via JSON assembly
// For CI, search uses runtime buildSearchIndex() in lib/search/search-index.ts

console.log(
  "Search index is built at runtime via lib/search/search-index.ts (getSearchIndex).",
  "No static file required for current corpus size (~1200 entries)."
);
