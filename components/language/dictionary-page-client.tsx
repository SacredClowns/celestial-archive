"use client";

import { useEffect, useState } from "react";
import { DictionaryView } from "@/components/language/dictionary-view";
import type {
  DictionaryCorpusStatistics,
  DictionaryEntry,
  LanguageChamberContent
} from "@/lib/language/language-types";

export function DictionaryPageClient({
  entries,
  corpusStats,
  totalWords,
  totalTokens,
  initialQuery,
  copy
}: {
  entries: DictionaryEntry[];
  corpusStats: DictionaryCorpusStatistics;
  totalWords: number;
  totalTokens: number;
  initialQuery: string;
  copy: Pick<
    LanguageChamberContent,
    | "dictionarySearchPlaceholder"
    | "dictionaryFilters"
    | "dictionaryEntryLabels"
    | "dictionaryEmptySearch"
    | "numberSystemNote"
    | "wordNotFound"
    | "pronunciationUnavailable"
  >;
}) {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const sync = () => setHash(window.location.hash.replace(/^#/, ""));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <DictionaryView
      entries={entries}
      corpusStats={corpusStats}
      totalWords={totalWords}
      totalTokens={totalTokens}
      initialQuery={initialQuery}
      initialHash={hash}
      copy={copy}
    />
  );
}
