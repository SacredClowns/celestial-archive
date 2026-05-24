import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { buildSearchIndex } from "../lib/search/build-search-index-data";

const out = resolve(process.cwd(), "content/search-index.json");
const items = buildSearchIndex();
writeFileSync(out, JSON.stringify(items));
console.log(`Wrote ${items.length} search entries → content/search-index.json`);
