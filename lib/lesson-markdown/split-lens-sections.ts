import type { EpistemicTone } from "@/lib/lesson-types";

export type LensSection = {
  id: string;
  title: string;
  tone: EpistemicTone;
  markdown: string;
};

function toneFromLine(line: string): EpistemicTone {
  if (line.includes("◆") || /historical/i.test(line)) return "historical";
  if (line.includes("◇") || /psychological/i.test(line)) return "consensus";
  if (line.includes("○") || /occult/i.test(line)) return "occult";
  if (line.includes("△") || /later/i.test(line)) return "later";
  if (line.includes("◎") || /symbolic/i.test(line)) return "parallel";
  if (line.includes("~") || /speculative/i.test(line)) return "speculative";
  if (line.includes("⚠")) return "caution";
  if (line.includes("?")) return "disputed";
  return "historical";
}

export function splitLensSections(markdown: string): {
  before: string;
  lenses: LensSection[];
  after: string;
} {
  const marker = markdown.search(/^#\s+LENS\s+SECTIONS\s*$/im);
  if (marker < 0) {
    return { before: markdown, lenses: [], after: "" };
  }

  const before = markdown.slice(0, marker).trim();
  const tail = markdown.slice(marker);
  const nextMajor = tail.search(/\n#\s+(?!#)/);
  const lensRegion = nextMajor > 0 ? tail.slice(0, nextMajor) : tail;
  const after = nextMajor > 0 ? tail.slice(nextMajor).trim() : "";

  const chunks = lensRegion.split(/\n(?=## )/);
  const lenses: LensSection[] = [];

  chunks.forEach((chunk, i) => {
    const trimmed = chunk.trim();
    if (!trimmed || /^#\s+LENS/i.test(trimmed)) return;
    if (!/lens/i.test(trimmed.split("\n")[0] ?? "")) return;
    const lines = trimmed.split("\n");
    const heading = lines[0] ?? "";
    const title = heading.replace(/^##\s*/, "").trim();
    const body = lines.slice(1).join("\n").trim();
    lenses.push({
      id: `lens-${lenses.length}`,
      title,
      tone: toneFromLine(heading),
      markdown: body
    });
  });

  return { before, lenses, after };
}
