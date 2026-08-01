"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { badgeKindToEpistemicTone } from "@/lib/language/language-badges";
import { BadgeProse } from "@/components/language/badge-prose";
import type {
  DictionaryCorpusStatistics,
  DictionaryEntry,
  LanguageChamberContent
} from "@/lib/language/language-types";

const PAGE_SIZE = 50;

type SortKey = "alpha" | "frequency" | "calls";

type FreqBand = "all" | "1x" | "2-3x" | "4-10x" | "11+x";

const POS_OPTIONS = [
  "all",
  "noun",
  "verb",
  "adjective",
  "conjunction",
  "preposition",
  "pronoun",
  "adverb",
  "number",
  "particle",
  "unclassified"
] as const;

function freqBand(freq: number): FreqBand {
  if (freq <= 1) return "1x";
  if (freq <= 3) return "2-3x";
  if (freq <= 10) return "4-10x";
  return "11+x";
}

function CorpusStatsPanel({ stats, totalWords, totalTokens }: {
  stats: DictionaryCorpusStatistics;
  totalWords: number;
  totalTokens: number;
}) {
  const maxTop = Math.max(...stats.topWords.map((w) => w.count), 1);
  return (
    <CandlelightCard className="space-y-4 rounded-sm border border-gold-dim/25 bg-ink/20 p-5">
      <h2 className="font-display text-sm uppercase tracking-[0.16em] text-gold-dim">Corpus statistics</h2>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-xs text-gold-dim">Unique words</dt>
          <dd className="font-display text-2xl text-gold">{totalWords}</dd>
        </div>
        <div>
          <dt className="text-xs text-gold-dim">Total tokens</dt>
          <dd className="font-display text-2xl text-gold">{totalTokens}</dd>
        </div>
        <div>
          <dt className="text-xs text-gold-dim">Hapax legomena</dt>
          <dd className="font-display text-2xl text-gold">{stats.hapaxLegomena}</dd>
        </div>
        <div>
          <dt className="text-xs text-gold-dim">Frequency bands</dt>
          <dd className="text-xs text-gold-pale">
            {Object.entries(stats.frequencyBands)
              .map(([k, v]) => `${k}: ${v}`)
              .join(" · ")}
          </dd>
        </div>
      </dl>
      <div>
        <p className="mb-2 text-xs uppercase tracking-wider text-gold-dim">Most frequent</p>
        <div className="flex flex-wrap items-end gap-2">
          {stats.topWords.slice(0, 10).map((w) => (
            <div key={w.word} className="flex flex-col items-center gap-1">
              <div
                className="w-8 rounded-t-sm bg-gold/50"
                style={{ height: `${Math.max(8, (w.count / maxTop) * 48)}px` }}
                title={`${w.count} occurrences`}
              />
              <span className="font-mono text-[9px] text-gold-dim">{w.word}</span>
            </div>
          ))}
        </div>
      </div>
    </CandlelightCard>
  );
}

type DictionaryCopy = Pick<
  LanguageChamberContent,
  | "dictionarySearchPlaceholder"
  | "dictionaryFilters"
  | "dictionaryEntryLabels"
  | "dictionaryEmptySearch"
  | "numberSystemNote"
  | "wordNotFound"
  | "pronunciationUnavailable"
>;

export function DictionaryView({
  entries,
  corpusStats,
  totalWords,
  totalTokens,
  initialQuery = "",
  initialHash = "",
  copy
}: {
  entries: DictionaryEntry[];
  corpusStats: DictionaryCorpusStatistics;
  totalWords: number;
  totalTokens: number;
  initialQuery?: string;
  initialHash?: string;
  copy: DictionaryCopy;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [debounced, setDebounced] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [pos, setPos] = useState<string>("all");
  const [freq, setFreq] = useState<FreqBand>("all");
  const [callFilter, setCallFilter] = useState<number | "all">("all");
  const [sort, setSort] = useState<SortKey>("alpha");
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(initialHash || null);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query), 300);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (initialHash) setExpandedId(initialHash);
  }, [initialHash]);

  useEffect(() => {
    setPage(0);
  }, [debounced, category, pos, freq, callFilter, sort]);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    let list = entries;
    if (q) {
      list = list.filter((e) => {
        const meaningMatch = e.meanings.some((m) => m.english.toLowerCase().includes(q));
        const wordMatch =
          e.enochian.toLowerCase().includes(q) ||
          e.transliteration.toLowerCase().includes(q) ||
          (e.morphologicalNotes?.toLowerCase().includes(q) ?? false);
        return meaningMatch || wordMatch;
      });
    }
    if (category === "calls") {
      list = list.filter((e) => (e.callAppearances?.length ?? 0) > 0);
    } else if (category === "angel") {
      list = list.filter((e) => {
        const p = (e.partOfSpeech ?? "").toLowerCase();
        const src = e.sourceLocation.toLowerCase();
        return p.includes("name") || src.includes("tablet") || src.includes("angel");
      });
    } else if (category !== "all") {
      list = list.filter((e) => {
        const p = (e.partOfSpeech ?? "unclassified").toLowerCase();
        return p.includes(category);
      });
    }
    if (pos !== "all") {
      list = list.filter((e) => {
        const p = (e.partOfSpeech ?? "unclassified").toLowerCase();
        return pos === "unclassified" ? !p || p === "unclassified" : p.includes(pos);
      });
    }
    if (freq !== "all") {
      list = list.filter((e) => freqBand(e.frequency) === freq);
    }
    if (callFilter !== "all") {
      list = list.filter((e) => e.callAppearances?.includes(callFilter));
    }
    if (sort === "alpha") {
      list = [...list].sort((a, b) => a.enochian.localeCompare(b.enochian));
    } else if (sort === "frequency") {
      list = [...list].sort((a, b) => b.frequency - a.frequency);
    }
    return list;
  }, [entries, debounced, category, pos, freq, callFilter, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="space-y-8">
      <CorpusStatsPanel stats={corpusStats} totalWords={totalWords} totalTokens={totalTokens} />

      <div className="flex flex-wrap gap-2">
        {copy.dictionaryFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            title={f.description}
            onClick={() => setCategory(f.id)}
            className={`rounded-sm border px-3 py-1.5 font-display text-xs uppercase tracking-[0.1em] ${
              category === f.id
                ? "border-gold bg-gold/15 text-gold"
                : "border-gold-dim/20 bg-ink/20 text-gold-dim hover:border-gold-dim/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
        <label className="relative block flex-1 min-w-[200px]">
          <span className="sr-only">Search dictionary</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.dictionarySearchPlaceholder}
            className="w-full rounded-sm border border-gold-dim/30 bg-ink/20 py-3 pl-10 pr-4 text-gold-pale placeholder:text-gold-dim/40 focus:border-gold/50 focus:outline-none"
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gold-dim" aria-hidden>
            ⌕
          </span>
        </label>
        <select
          value={pos}
          onChange={(e) => setPos(e.target.value)}
          className="rounded-sm border border-gold-dim/30 bg-ink/20 px-3 py-2 text-sm text-gold-pale"
          aria-label="Filter by part of speech"
        >
          {POS_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p === "all" ? "All types" : p}
            </option>
          ))}
        </select>
        <select
          value={freq}
          onChange={(e) => setFreq(e.target.value as FreqBand)}
          className="rounded-sm border border-gold-dim/30 bg-ink/20 px-3 py-2 text-sm text-gold-pale"
          aria-label="Filter by frequency"
        >
          <option value="all">All frequencies</option>
          <option value="1x">1× (hapax)</option>
          <option value="2-3x">2–3×</option>
          <option value="4-10x">4–10×</option>
          <option value="11+x">11+×</option>
        </select>
        <select
          value={callFilter === "all" ? "all" : String(callFilter)}
          onChange={(e) =>
            setCallFilter(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="rounded-sm border border-gold-dim/30 bg-ink/20 px-3 py-2 text-sm text-gold-pale"
          aria-label="Filter by Call"
        >
          <option value="all">All Calls</option>
          {Array.from({ length: 19 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              Call {n}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-sm border border-gold-dim/30 bg-ink/20 px-3 py-2 text-sm text-gold-pale"
          aria-label="Sort order"
        >
          <option value="alpha">A–Z</option>
          <option value="frequency">Frequency</option>
        </select>
      </div>

      <p className="text-sm text-gold-dim">
        Showing {filtered.length} of {entries.length} entries
        {pageCount > 1 ? ` · page ${page + 1} of ${pageCount}` : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center leading-[1.9] text-gold-dim">{copy.dictionaryEmptySearch}</p>
      ) : (
        <ul className="space-y-2">
          {pageItems.map((entry) => {
            const expanded = expandedId === entry.id;
            const primary = entry.meanings[0];
            return (
              <li
                key={entry.id}
                id={entry.id}
                className="scroll-mt-24 rounded-sm border border-gold-dim/20 bg-ink/15"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : entry.id)}
                  className="flex w-full flex-wrap items-start gap-3 p-4 text-left transition-colors hover:bg-ink/25"
                >
                  <span className="font-enochian font-mono text-2xl text-gold">{entry.enochian}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-gold-pale">{primary?.english}</p>
                    <p className="mt-1 font-mono text-xs italic text-gold-dim">
                      {entry.pronunciation.dee ?? "—"}
                    </p>
                  </div>
                  {entry.partOfSpeech ? (
                    <span className="rounded-full border border-gold-dim/25 px-2 py-0.5 text-[10px] uppercase text-gold-dim">
                      {entry.partOfSpeech}
                    </span>
                  ) : null}
                  <span className="text-xs text-gold-dim" title={copy.dictionaryEntryLabels.frequency}>
                    ×{entry.frequency}
                  </span>
                  <EpistemicBadge
                    tone={badgeKindToEpistemicTone(primary?.badge ?? "historical")}
                    compact
                  />
                </button>
                {expanded ? (
                  <div className="border-t border-gold-dim/15 px-4 pb-4 pt-2">
                    <ul className="space-y-2 text-sm text-gold-pale">
                      {entry.meanings.map((m) => (
                        <li key={`${m.english}-${m.source}`}>
                          {m.english}{" "}
                          <span className="text-gold-dim/70">({m.source})</span>
                        </li>
                      ))}
                    </ul>
                    {entry.morphologicalNotes ? (
                      <p className="mt-3 text-sm text-gold-dim">{entry.morphologicalNotes}</p>
                    ) : null}
                    {entry.callAppearances && entry.callAppearances.length > 0 ? (
                      <p className="mt-3 text-xs text-gold-dim">
                        {copy.dictionaryEntryLabels.source}: Calls{" "}
                        {entry.callAppearances.map((n) => (
                          <Link
                            key={n}
                            href={`/language/calls?call=${n}`}
                            className="mr-1 text-gold hover:underline"
                          >
                            {n}
                          </Link>
                        ))}
                      </p>
                    ) : null}
                    {entry.relatedWords.length > 0 ? (
                      <p className="mt-2 text-xs text-gold-dim">
                        {copy.dictionaryEntryLabels.related}:{" "}
                        {entry.relatedWords.map((w) => (
                          <Link
                            key={w}
                            href={`/language/dictionary#${w.toLowerCase()}`}
                            className="mr-1 text-gold hover:underline"
                          >
                            {w}
                          </Link>
                        ))}
                      </p>
                    ) : null}
                    <p className="mt-2 text-[10px] text-gold-dim/60">{entry.sourceLocation}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/15 p-5">
        <BadgeProse text={copy.numberSystemNote} className="text-sm leading-[1.9] text-gold-dim" />
      </CandlelightCard>

      {pageCount > 1 ? (
        <nav className="flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-sm border border-gold-dim/30 px-4 py-2 font-display text-xs uppercase text-gold-dim disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gold-dim">
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-sm border border-gold-dim/30 px-4 py-2 font-display text-xs uppercase text-gold-dim disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      ) : null}
    </div>
  );
}
