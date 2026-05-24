import { getDictionaryEntry } from "@/lib/language/language-data";

export function dictionaryHref(word: string): string | null {
  const entry = getDictionaryEntry(word);
  if (!entry) return null;
  return `/language/dictionary#${entry.id}`;
}

export function hasDictionaryEntry(word: string): boolean {
  return Boolean(getDictionaryEntry(word));
}
