import alphabetRaw from "@/content/phase-4-data/enochian-alphabet-data.json";
import callsRaw from "@/content/phase-4-data/enochian-calls-data.json";
import callsTextRaw from "@/content/phase-4-data/calls-text-data.json";
import dictionaryRaw from "@/content/phase-4-data/enochian-dictionary-full.json";
import { normalizeEnochianToken } from "@/lib/language/call-text-utils";
import type {
  AngelicCall,
  CallCorpusStatistics,
  CallTextData,
  CallsData,
  CallsTextDataFile,
  DictionaryCorpusStatistics,
  DictionaryEntry,
  EnochianAlphabetData,
  EnochianLetter,
  FullDictionaryFile
} from "@/lib/language/language-types";

const alphabet = alphabetRaw as EnochianAlphabetData;
const callsData = callsRaw as CallsData;
const callsTextData = callsTextRaw as CallsTextDataFile;
const dictionaryFile = dictionaryRaw as FullDictionaryFile;

function slugifyLetterName(name: string): string {
  return name.toLowerCase();
}

function normalizePronunciation(
  p: DictionaryEntry["pronunciation"]
): DictionaryEntry["pronunciation"] {
  return {
    dee: p.dee ?? undefined,
    goldenDawn: p.goldenDawn ?? undefined,
    modern: p.modern ?? undefined
  };
}

export function getAlphabetData(): EnochianAlphabetData {
  return alphabet;
}

export function getLetterByName(name: string): EnochianLetter {
  const slug = name.toLowerCase();
  const letter = alphabet.letters.find((item) => slugifyLetterName(item.name) === slug);
  if (!letter) {
    throw new Error(`Unknown Enochian letter: ${name}`);
  }
  return letter;
}

export function getLetterByPosition(pos: number): EnochianLetter {
  const letter = alphabet.letters.find((item) => item.position === pos);
  if (!letter) {
    throw new Error(`Unknown Enochian letter position: ${pos}`);
  }
  return letter;
}

export function getAllLetters(): EnochianLetter[] {
  return alphabet.letters;
}

export function getAllDictionaryEntries(): DictionaryEntry[] {
  return dictionaryFile.entries.map((entry) => ({
    ...entry,
    pronunciation: normalizePronunciation(entry.pronunciation)
  }));
}

export function getDictionaryMeta(): Pick<
  FullDictionaryFile,
  "source" | "manuscriptSource" | "badge" | "note" | "totalUniqueWords" | "totalWordTokens"
> {
  return {
    source: dictionaryFile.source,
    manuscriptSource: dictionaryFile.manuscriptSource,
    badge: dictionaryFile.badge,
    note: dictionaryFile.note,
    totalUniqueWords: dictionaryFile.totalUniqueWords,
    totalWordTokens: dictionaryFile.totalWordTokens
  };
}

export function getCorpusStatistics(): DictionaryCorpusStatistics {
  return dictionaryFile.corpusStatistics;
}

export function getDictionaryEntry(id: string): DictionaryEntry | undefined {
  return getAllDictionaryEntries().find((entry) => entry.id === id.toLowerCase());
}

export function searchDictionary(query: string): DictionaryEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return getAllDictionaryEntries();

  return getAllDictionaryEntries().filter((entry) => {
    const meaningMatch = entry.meanings.some((m) => m.english.toLowerCase().includes(q));
    const wordMatch =
      entry.enochian.toLowerCase().includes(q) || entry.transliteration.toLowerCase().includes(q);
    return meaningMatch || wordMatch;
  });
}

export function getCallsData(): CallsData {
  return callsData;
}

export function getAllCalls(): AngelicCall[] {
  return callsData.calls;
}

export function getCallByNumber(n: number): AngelicCall {
  const call = callsData.calls.find((item) => item.number === n);
  if (!call) {
    throw new Error(`Unknown Call number: ${n}`);
  }
  return call;
}

export function listLetterSlugs(): string[] {
  return alphabet.letters.map((letter) => slugifyLetterName(letter.name));
}

export function getAdjacentLetters(name: string): {
  letter: EnochianLetter;
  prev: EnochianLetter | null;
  next: EnochianLetter | null;
} {
  const letter = getLetterByName(name);
  const index = alphabet.letters.findIndex((item) => item.position === letter.position);
  return {
    letter,
    prev: index > 0 ? alphabet.letters[index - 1] : null,
    next: index < alphabet.letters.length - 1 ? alphabet.letters[index + 1] : null
  };
}

export function getCallTextData(callNumber: number): CallTextData | undefined {
  return callsTextData.calls.find((c) => c.number === callNumber);
}

export function getAllCallTextData(): CallTextData[] {
  return callsTextData.calls;
}

export function getCallsTextSourceMeta(): Pick<
  CallsTextDataFile,
  "source" | "manuscriptSource" | "badge" | "note"
> {
  return {
    source: callsTextData.source,
    manuscriptSource: callsTextData.manuscriptSource,
    badge: callsTextData.badge,
    note: callsTextData.note
  };
}

export function getCallCorpusStatistics(): CallCorpusStatistics {
  const calls = getAllCallTextData();
  const freq = new Map<string, number>();
  const wordsPerCall = calls.map((c) => {
    for (const w of c.words) {
      const key = w.enochian.toUpperCase();
      freq.set(key, (freq.get(key) ?? 0) + 1);
    }
    return { number: c.number, title: c.title, count: c.words.length };
  });

  const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  const totalWords = wordsPerCall.reduce((sum, c) => sum + c.count, 0);
  const longest = wordsPerCall.reduce((a, b) => (b.count > a.count ? b : a), wordsPerCall[0]);
  const shortest = wordsPerCall.reduce((a, b) => (b.count < a.count ? b : a), wordsPerCall[0]);

  return {
    totalUniqueWords: freq.size,
    averageWordsPerCall: calls.length ? Math.round(totalWords / calls.length) : 0,
    longest,
    shortest,
    topWords: sorted.slice(0, 8).map(([word, count]) => ({ word, count })),
    wordsPerCall
  };
}

export function getDictionaryEntryForCallWord(enochian: string): DictionaryEntry | undefined {
  const id = normalizeEnochianToken(enochian);
  return getDictionaryEntry(id);
}
