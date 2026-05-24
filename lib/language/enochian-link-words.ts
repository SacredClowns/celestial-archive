import { getAllDictionaryEntries } from "@/lib/language/language-data";

let cached: Set<string> | null = null;

/** Uppercase Enochian tokens that exist in the 631-word dictionary. */
export function getEnochianLinkWordSet(): Set<string> {
  if (cached) return cached;
  cached = new Set(
    getAllDictionaryEntries().map((e) => e.enochian.toUpperCase()).filter((w) => w.length >= 3)
  );
  return cached;
}

export function isEnochianDictionaryWord(token: string): boolean {
  return getEnochianLinkWordSet().has(token.toUpperCase());
}
