import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

type LoagaethContent = {
  introPrimary: string;
  introSecondary: string;
  sourceNote: string;
};

export const loadLoagaethContent = cache((): LoagaethContent => {
  const abs = path.join(process.cwd(), "content", "phase-3-data", "loagaeth-viewer-content.md");
  const raw = readFileSync(abs, "utf8");

  const introPrimary =
    raw.match(/Landing Page — Primary Introduction[\s\S]*?\n\n([^\n].*)\n\n/)?.[1]?.trim() ??
    "";
  const introSecondary =
    raw
      .match(/Landing Page — Primary Introduction[\s\S]*?\n\n[^\n].*\n\n([^\n].*)\n\n/)?.[1]
      ?.trim() ?? "";
  const sourceNote = raw.match(/### Footer Text[\s\S]*?\n\n([^\n].*)\n/)?.[1]?.trim() ?? "";

  return { introPrimary, introSecondary, sourceNote };
});
