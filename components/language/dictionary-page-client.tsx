"use client";

import { useEffect, useState } from "react";
import { DictionaryView } from "@/components/language/dictionary-view";
import type { DictionaryCorpusStatistics, DictionaryEntry } from "@/lib/language/language-types";

export function DictionaryPageClient({
  entries,
  corpusStats,
  totalWords,
  totalTokens,
  initialQuery
}: {
  entries: DictionaryEntry[];
  corpusStats: DictionaryCorpusStatistics;
  totalWords: number;
  totalTokens: number;
  initialQuery: string;
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
    />
  );
}
