import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { LanguageChamberContent } from "@/lib/language/language-types";

function sectionIn(raw: string, parent: string, heading: string): string {
  const parentPattern = parent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const headingPattern = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `## ${parentPattern}[\\s\\S]*?### ${headingPattern}\\s*\\n+([\\s\\S]*?)(?=\\n### |\\n## |$)`
  );
  return raw.match(pattern)?.[1]?.trim() ?? "";
}

function sectionBody(raw: string, heading: string): string {
  const pattern = new RegExp(`### ${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n+([\\s\\S]*?)(?=\\n### |\\n## |$)`);
  return raw.match(pattern)?.[1]?.trim() ?? "";
}

export const loadLanguageChamberContent = cache((): LanguageChamberContent => {
  const abs = path.join(process.cwd(), "content", "phase-4-data", "language-chamber-content.md");
  const raw = readFileSync(abs, "utf8");

  const landingPrimary = sectionBody(raw, "Landing Page — Primary Introduction");
  const landingIntro = landingPrimary
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    landingIntro,
    landingSubtitle: sectionBody(raw, "Landing Page — Subtitle"),
    landingSummary: sectionBody(raw, "Landing Page — Structural Summary Line"),
    alphabetHeader: sectionIn(raw, "II. ALPHABET EXPLORER", "Section Header"),
    dictionaryHeader: sectionIn(raw, "IV. DICTIONARY", "Section Header"),
    callsHeader: sectionIn(raw, "V. THE 19 CALLS", "Section Header"),
    pronunciationHeader: sectionIn(raw, "III. PRONUNCIATION GUIDE", "Section Header"),
    sourceNote: sectionBody(raw, "Footer Text"),
    traditionDee: sectionBody(raw, "Tradition 1: Dee's Original (Reconstructed)"),
    traditionGd: sectionBody(raw, "Tradition 2: Golden Dawn Syllabic"),
    traditionModern: sectionBody(raw, "Tradition 3: Modern Phonetic (DuQuette)"),
    pronunciationComparisonNote: sectionBody(raw, "Comparison Note"),
    digraphs: [
      { digraph: "ch", sound: "[k] or [tʃ]", englishExample: '"k" or "ch" in "church"', source: "Dee's marginal notes ◆" },
      { digraph: "ph", sound: "[f]", englishExample: '"f" in "phone"', source: "English orthography ◆" },
      { digraph: "sh", sound: "[ʃ]", englishExample: '"sh" in "ship"', source: "English orthography ◆" },
      { digraph: "th", sound: "[θ]", englishExample: '"th" in "thin"', source: "English orthography ◆" }
    ]
  };
});
