import type { CallWordEntry } from "@/lib/language/language-types";

/** Shared closing formula in Calls 11–18 (James edition). */
export const CLOSING_FORMULA_WORDS = [
  "ZACAR",
  "CA",
  "OD",
  "ZAMRAN",
  "ODO",
  "CICLE",
  "QAA",
  "ZORGE",
  "LAP",
  "ZIRDO",
  "NOCO",
  "MAD",
  "HOATH",
  "IAIDA"
] as const;

const AETHYR_VARIABLE_POS = "30.4";

export function applyAethyrSubstitution(
  words: CallWordEntry[],
  callNumber: number,
  aethyrName: string
): CallWordEntry[] {
  if (callNumber !== 19) return words;
  return words.map((w) =>
    w.pos === AETHYR_VARIABLE_POS ? { ...w, enochian: aethyrName.toUpperCase() } : w
  );
}

export function buildEnochianDisplayText(words: CallWordEntry[]): string {
  return words.map((w) => w.enochian).join(" ");
}

export function getClosingFormulaStartIndex(words: CallWordEntry[]): number {
  const upper = words.map((w) => w.enochian.toUpperCase());
  const formula = CLOSING_FORMULA_WORDS as readonly string[];
  for (let i = upper.length - formula.length; i >= 0; i--) {
    if (formula.every((token, j) => upper[i + j] === token)) {
      return i;
    }
  }
  return -1;
}

export function isInSharedClosingFormula(
  callNumber: number,
  wordIndex: number,
  words: CallWordEntry[]
): boolean {
  if (callNumber < 11 || callNumber > 18) return false;
  const start = getClosingFormulaStartIndex(words);
  return start >= 0 && wordIndex >= start;
}

export function normalizeEnochianToken(token: string): string {
  return token.toLowerCase().replace(/[^a-z]/g, "");
}
