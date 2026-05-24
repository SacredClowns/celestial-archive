/**
 * Generates content/glossary-core-import.json from docs/CORE_TERMS.md
 * Run: node scripts/import-core-terms.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const md = readFileSync(path.join(root, "docs", "CORE_TERMS.md"), "utf8");

function slugify(term) {
  return term
    .toLowerCase()
    .replace(/\s*\(also:.*\)\s*/gi, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseField(block, label) {
  const re = new RegExp(`\\*\\*${label}\\*\\*:\\s*([\\s\\S]*?)(?=\\n\\*\\*|\\n---|$)`, "i");
  const m = block.match(re);
  return m ? m[1].trim() : undefined;
}

function levelFromText(raw) {
  const t = (raw ?? "").toLowerCase();
  if (t.includes("advanced")) return "Advanced";
  if (t.includes("intermediate")) return "Intermediate";
  return "Beginner";
}

function badgeFromCategory(cat) {
  const c = (cat ?? "").toLowerCase();
  if (c.includes("history") || c.includes("manuscript") || c.includes("figures")) return "historical";
  if (c.includes("occult") || c.includes("ritual") || c.includes("golden-dawn")) return "occult";
  if (c.includes("psychology")) return "consensus";
  if (c.includes("crowley")) return "later";
  return "consensus";
}

function parseCondensed(headline, bodyLine) {
  if (/^\(See entry/i.test(bodyLine.trim())) return null;
  const levelMatch = bodyLine.match(/—\s*(Beginner|Intermediate|Advanced(?:–Advanced)?)/i);
  const level = levelMatch ? levelFromText(levelMatch[1]) : "Beginner";
  const def = bodyLine
    .replace(/\[[^\]]+\]/g, "")
    .replace(/—\s*(Beginner|Intermediate|Advanced.*?)\s*$/i, "")
    .trim();
  if (!def || def.length < 12) return null;
  const tags = [...bodyLine.matchAll(/\[([^\]]+)\]/g)].map((m) => m[1]);
  const category = tags[0] ?? "Reference";
  return {
    slug: slugify(headline),
    term: headline.replace(/\s*\(also:.*\)\s*/gi, "").trim(),
    oneLine: def.length > 160 ? `${def.slice(0, 157)}…` : def,
    definition: def,
    category,
    level,
    primaryBadge: badgeFromCategory(category),
    historicalLens: undefined,
    occultLens: undefined,
    psychologicalLens: undefined,
    commonMisunderstandings: [],
    multipleInterpretations: undefined,
    relatedTerms: [],
    relatedTermsExternal: [],
    sourceNotes: "Imported from docs/CORE_TERMS.md (condensed entry).",
    appearsIn: [],
    appTags: ["core-terms-import", ...tags.slice(0, 3)]
  };
}

const entries = [];
const seen = new Set();

function pushEntry(entry) {
  if (!entry || seen.has(entry.slug)) return;
  seen.add(entry.slug);
  entries.push(entry);
}

const blocks = md.split(/\n---\n/);

for (const block of blocks) {
  const fullHead = block.match(/^### (\d+)\.\s+(.+)$/m);
  if (!fullHead) continue;

  const termRaw = fullHead[2].trim();
  const definition = parseField(block, "Definition");

  if (definition) {
    const category = parseField(block, "Category") ?? "Reference";
    const relatedRaw = parseField(block, "Related Terms");
    pushEntry({
      slug: slugify(termRaw),
      term: termRaw.replace(/\s*\(also:.*\)\s*/gi, "").trim(),
      oneLine: definition.length > 160 ? `${definition.slice(0, 157)}…` : definition,
      definition,
      category,
      level: levelFromText(parseField(block, "Level")),
      primaryBadge: badgeFromCategory(category),
      historicalLens: parseField(block, "Historical"),
      occultLens: parseField(block, "Occult"),
      psychologicalLens: parseField(block, "Psychological"),
      commonMisunderstandings: [],
      multipleInterpretations: parseField(block, "Multiple Interpretations"),
      relatedTerms: relatedRaw
        ? relatedRaw.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      relatedTermsExternal: [],
      sourceNotes: "Imported from docs/CORE_TERMS.md.",
      appearsIn: [],
      appTags: ["core-terms-import"]
    });
    continue;
  }

  const heads = [...block.matchAll(/^### \d+\.\s+(.+)$/gm)];
  for (let i = 0; i < heads.length; i++) {
    const termName = heads[i][1].trim();
    const start = heads[i].index ?? 0;
    const end = heads[i + 1]?.index ?? block.length;
    const section = block.slice(start, end);
    const bodyLine = section
      .split("\n")
      .slice(1)
      .find((l) => l.trim() && !l.startsWith("#"));
    if (!bodyLine) continue;
    pushEntry(parseCondensed(termName, bodyLine));
  }
}

const outPath = path.join(root, "content", "glossary-core-import.json");
writeFileSync(outPath, JSON.stringify(entries, null, 2), "utf8");
console.log(`Wrote ${entries.length} entries to ${outPath}`);
