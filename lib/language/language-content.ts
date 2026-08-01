import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import type {
  DictionaryEntryLabels,
  DictionaryFilterOption,
  DigraphRow,
  LanguageChamberContent,
  LegendItem,
  PronunciationTradition,
  PronunciationTraditionLabel
} from "@/lib/language/language-types";

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanSection(text: string): string {
  return text.replace(/\n+---\s*$/g, "").trim();
}

function sectionIn(raw: string, parent: string, heading: string): string {
  const pattern = new RegExp(
    `## ${escapeRe(parent)}[\\s\\S]*?### ${escapeRe(heading)}\\s*\\n+([\\s\\S]*?)(?=\\n### |\\n## |$)`
  );
  return cleanSection(raw.match(pattern)?.[1]?.trim() ?? "");
}

function sectionBody(raw: string, heading: string): string {
  const pattern = new RegExp(
    `### ${escapeRe(heading)}\\s*\\n+([\\s\\S]*?)(?=\\n### |\\n## |$)`
  );
  return cleanSection(raw.match(pattern)?.[1]?.trim() ?? "");
}

function parseBulletLegend(block: string): LegendItem[] {
  return block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- **"))
    .map((line) => {
      const m = line.match(/^- \*\*(.+?)\*\* — (.+)$/);
      if (!m) return null;
      return { label: m[1], description: m[2] };
    })
    .filter((x): x is LegendItem => x !== null);
}

function parseFilterBullets(block: string): DictionaryFilterOption[] {
  const ids = ["all", "calls", "pronoun", "verb", "noun", "number", "angel"];
  return block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- **"))
    .map((line, i) => {
      const m = line.match(/^- \*\*(.+?)\*\* — (.+)$/);
      if (!m) return null;
      return { id: ids[i] ?? `filter-${i}`, label: m[1], description: m[2] };
    })
    .filter((x): x is DictionaryFilterOption => x !== null);
}

function parseLabelTable(block: string): Record<string, string> {
  const rows = block
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|") && !l.includes("---"));
  const out: Record<string, string> = {};
  for (const row of rows.slice(1)) {
    const cells = row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells.length >= 2) {
      const key = cells[0].toLowerCase().replace(/\s+/g, "_");
      out[key] = cells[cells.length - 1];
    }
  }
  return out;
}

function parseTraditionTable(block: string): Record<PronunciationTradition, string> {
  const rows = block
    .split("\n")
    .filter((l) => l.startsWith("|") && !l.includes("---") && !l.toLowerCase().includes("tradition"));
  const map: Partial<Record<PronunciationTradition, string>> = {};
  for (const row of rows) {
    const cells = row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells.length < 2) continue;
    const tradition = cells[0].toLowerCase();
    const label = cells[1];
    if (tradition.includes("dee")) map.dee = label;
    else if (tradition.includes("golden")) map.goldenDawn = label;
    else if (tradition.includes("modern")) map.modern = label;
  }
  return {
    dee: map.dee ?? "Dee's Original",
    goldenDawn: map.goldenDawn ?? "Golden Dawn",
    modern: map.modern ?? "Modern Practice"
  };
}

function parsePronunciationToggle(block: string): PronunciationTraditionLabel[] {
  const keys: PronunciationTradition[] = ["dee", "goldenDawn", "modern"];
  const lines = block.split("\n").filter((l) => l.trim().startsWith("- **"));
  return lines.map((line, i) => {
    const m = line.match(/^- \*\*(.+?)\*\* — (.+)$/);
    return {
      key: keys[i] ?? "dee",
      label: m?.[1] ?? "Dee's Original",
      description: m?.[2] ?? ""
    };
  });
}

function parseDigraphTable(block: string): DigraphRow[] {
  const rows = block
    .split("\n")
    .filter((l) => l.startsWith("|") && !l.includes("---") && !l.toLowerCase().includes("digraph"));
  return rows.map((row) => {
    const cells = row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    return {
      digraph: cells[0] ?? "",
      sound: cells[1] ?? "",
      englishExample: cells[2] ?? "",
      source: cells[3] ?? ""
    };
  });
}

function dictionaryEntryLabelsFromTable(block: string): DictionaryEntryLabels {
  const table = parseLabelTable(block);
  return {
    enochian: table.enochian_word ?? "Enochian",
    transliteration: table.transliteration ?? "Latin Letters",
    pronunciation: table.pronunciation ?? "Pronunciation",
    meaning: table.english_meaning ?? "Meaning",
    partOfSpeech: table.part_of_speech ?? "Type",
    source: table.source_location ?? "Source",
    frequency: table.frequency ?? "Occurrences",
    related: table.related_words ?? "Related",
    notes: table.scholarly_notes ?? "Notes"
  };
}

function callSectionLabelsFromTable(block: string): LanguageChamberContent["callSectionLabels"] {
  const table = parseLabelTable(block);
  return {
    enochianText: table.enochian_text ?? "Enochian Text",
    englishTranslation: table.english_translation ?? "Dee's English Translation",
    pronunciationGuide: table.pronunciation_guide ?? "Pronunciation Guide",
    wordBreakdown: table.word_breakdown ?? "Word-by-Word",
    historicalNotes: table.historical_notes ?? "Historical Notes",
    scholarship: table.scholarly_observations ?? "Scholarship",
    association: table.association ?? "Tablet/Aethyr Association"
  };
}

export const loadLanguageChamberContent = cache((): LanguageChamberContent => {
  const abs = path.join(process.cwd(), "content", "phase-4-data", "language-chamber-content.md");
  const raw = readFileSync(abs, "utf8");

  const landingPrimary = sectionBody(raw, "Landing Page — Primary Introduction");
  const landingIntro = landingPrimary
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const alphabetSection = sectionIn(raw, "II. ALPHABET EXPLORER", "Legend");
  const dictionaryFiltersBlock = sectionIn(raw, "IV. DICTIONARY", "Filter Labels");
  const dictionaryLabelsBlock = sectionIn(raw, "IV. DICTIONARY", "Dictionary Entry Labels");
  const callLabelsBlock = sectionIn(raw, "V. THE 19 CALLS", "Call Detail — Section Labels");
  const digraphBlock = sectionIn(raw, "III. PRONUNCIATION GUIDE", "Phonetic Reference — Digraph Table");
  const traditionTableBlock = sectionIn(raw, "II. ALPHABET EXPLORER", "Pronunciation Tradition Labels");
  const letterTableBlock = sectionIn(raw, "II. ALPHABET EXPLORER", "Letter Detail — Section Labels");
  const pronunciationToggleBlock = sectionIn(raw, "V. THE 19 CALLS", "Pronunciation Toggle");

  const traditionLabels = parseTraditionTable(traditionTableBlock);
  const letterTable = parseLabelTable(letterTableBlock);

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
    digraphs: parseDigraphTable(digraphBlock),
    alphabetLegend: parseBulletLegend(alphabetSection),
    traditionLabels,
    letterLabels: {
      glyph: letterTable.glyph ?? "The Letter",
      name: letterTable.name ?? "Letter Name",
      mapsTo: letterTable.english_equivalent ?? "Maps To",
      pronunciation: letterTable.sound_values ?? "Pronunciation",
      writingDirection: letterTable.writing_direction ?? "Writing Direction (right to left)",
      historicalReception: letterTable.historical_note ?? "Historical Reception",
      scholarlyObservation: letterTable.scholarly_note ?? "What Scholars Have Observed",
      exampleWords: letterTable.example_words ?? "Words Using This Letter"
    },
    writingDirectionNote: sectionIn(raw, "II. ALPHABET EXPLORER", "Writing Direction Note"),
    fontNote: sectionIn(raw, "II. ALPHABET EXPLORER", "Font Note"),
    dictionarySearchPlaceholder: sectionIn(raw, "IV. DICTIONARY", "Search Placeholder"),
    dictionaryFilters: parseFilterBullets(dictionaryFiltersBlock),
    dictionaryEntryLabels: dictionaryEntryLabelsFromTable(dictionaryLabelsBlock),
    dictionaryEmptySearch: sectionIn(raw, "IV. DICTIONARY", "Empty Search State"),
    numberSystemNote: sectionIn(raw, "IV. DICTIONARY", "Number System Note"),
    callSectionLabels: callSectionLabelsFromTable(callLabelsBlock),
    pronunciationTraditions: (() => {
      const parsed = parsePronunciationToggle(pronunciationToggleBlock);
      if (parsed.length >= 3) return parsed;
      return [
        { key: "dee", label: "Dee's Original", description: "Reconstructed from Dee's marginal notes ◆" },
        { key: "goldenDawn", label: "Golden Dawn", description: "Syllabic method developed by Westcott and the GD △" },
        { key: "modern", label: "Modern", description: "Phonetic reading as written, per DuQuette ○" }
      ] as const;
    })(),
    call19SpecialNote: sectionIn(raw, "V. THE 19 CALLS", "The 19th Call — Special Note"),
    ...(() => {
      const block = sectionIn(raw, "V. THE 19 CALLS", "The 19th Call — Aethyr Selector Label");
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      const foot = lines.find((l) => l.startsWith("*(")) ?? "";
      return {
        call19AethyrPrompt: lines.find((l) => l.startsWith("Select")) ?? "Select Aethyr:",
        call19AethyrFootnote: foot.replace(/^\*\(/, "").replace(/\)\*$/, "")
      };
    })(),
    callsAssociationNote: sectionIn(raw, "V. THE 19 CALLS", "Calls 1–18 — Association Note"),
    pronounsHeader: sectionIn(raw, "VI. SPECIAL VOCABULARY SECTIONS", "Personal Pronouns Header"),
    verbConjugationHeader: sectionIn(raw, "VI. SPECIAL VOCABULARY SECTIONS", "Verb Conjugation Header"),
    biblicalEchoesHeader: sectionIn(raw, "VI. SPECIAL VOCABULARY SECTIONS", "Biblical Echoes Header"),
    wordNotFound: sectionIn(raw, "VII. EMPTY AND EDGE STATES", "Word Not Found"),
    pronunciationUnavailable: sectionIn(raw, "VII. EMPTY AND EDGE STATES", "Pronunciation Unavailable"),
    callTextLoading: sectionIn(raw, "VII. EMPTY AND EDGE STATES", "Call Text Loading"),
    noScholarlyNotes: sectionIn(raw, "VII. EMPTY AND EDGE STATES", "No Scholarly Notes"),
    mobileGridWarning: sectionIn(raw, "VII. EMPTY AND EDGE STATES", "Mobile Grid Warning"),
    chamberPanels: [
      {
        href: "/language/alphabet",
        title: "The Alphabet",
        subtitle: "21 letters. One lost script."
      },
      {
        href: "/language/dictionary",
        title: "The Dictionary",
        subtitle: "~250 words. One attested corpus."
      },
      {
        href: "/language/calls",
        title: "The Calls",
        subtitle: "19 keys. One unsolved question."
      },
      {
        href: "/language/pronunciation",
        title: "The Pronunciation Guide",
        subtitle: "Three traditions. One uncertain voice."
      }
    ]
  };
});

/** Shorthand for client bundles — pass a Pick<> from the full content object. */
export type LanguageChamberCopy = LanguageChamberContent;
