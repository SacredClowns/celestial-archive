"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GlossaryEntry } from "@/lib/glossary";

// ============================================================================
// GLOSSARY INDEX
// ----------------------------------------------------------------------------
// Reads like an index page in an old reference volume:
//   * Alphabetical, with a quiet letter-rule at the top
//   * A single inscribed input field — not a search-engine chrome
//   * Each entry preview is a full row with breathing room
//   * No filter chips, no faceted controls, no result counts
// ============================================================================

function groupByLetter(entries: GlossaryEntry[]) {
  const groups = new Map<string, GlossaryEntry[]>();
  for (const entry of entries) {
    const letter = entry.term[0]?.toUpperCase() ?? "·";
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(entry);
  }
  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
}

export function GlossaryIndex({ entries }: { entries: GlossaryEntry[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((entry) => {
      const haystack = [
        entry.term,
        entry.oneLine,
        entry.category,
        ...entry.relatedTerms,
        ...(entry.relatedTermsExternal ?? [])
      ]
        .join(" · ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [entries, query]);

  const grouped = useMemo(() => groupByLetter(filtered), [filtered]);
  const activeLetters = useMemo(() => new Set(grouped.map(([letter]) => letter)), [grouped]);

  // Letter rule: A–Z so the reader sees the full alphabet, with inactive letters dimmed.
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="space-y-10">
      {/* Quiet search field — presented as a marginalia line, not a search box */}
      <div className="space-y-3">
        <label className="block">
          <span className="block font-display text-xs uppercase tracking-[0.24em] text-gold-dim">
            Find a term
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Begin typing…"
            className="mt-2 w-full border-b border-gold-dim/55 bg-transparent px-1 py-2 font-display text-lg tracking-[0.04em] text-gold-pale placeholder:text-gold-dim/70 focus:border-gold/70 focus:outline-none"
            aria-label="Search glossary terms"
          />
        </label>

        {/* Alphabet ledger */}
        <nav aria-label="Glossary letters" className="flex flex-wrap gap-x-4 gap-y-1 pt-2">
          {alphabet.map((letter) => {
            const active = activeLetters.has(letter);
            return (
              <a
                key={letter}
                href={active ? `#letter-${letter}` : undefined}
                className={`font-display text-sm tracking-[0.18em] transition-colors duration-slow ease-gravity ${
                  active ? "text-gold-light hover:text-gold" : "text-gold-dim/40"
                }`}
                aria-disabled={!active}
              >
                {letter}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Empty state */}
      {grouped.length === 0 && (
        <p className="border-l border-gold-dim/40 py-2 pl-4 italic text-gold-dim">
          No entry yet matches that reading. Try a shorter fragment, or a related term.
        </p>
      )}

      {/* Letter sections */}
      <div className="space-y-16">
        {grouped.map(([letter, letterEntries]) => (
          <section key={letter} id={`letter-${letter}`} className="space-y-6">
            <div className="flex items-baseline gap-6">
              <h2 className="font-display text-2xl tracking-[0.24em] text-gold">{letter}</h2>
              <span className="h-px flex-1 bg-gold-dim/35" aria-hidden />
            </div>

            <ul className="space-y-5">
              {letterEntries.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/glossary/${entry.slug}`}
                    className="group block border border-transparent px-4 py-5 transition-colors duration-slow ease-gravity hover:border-gold-dim/55 hover:bg-deep/40"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-display text-2xl tracking-[0.04em] text-gold-light group-hover:text-gold">
                        {entry.term}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.22em] text-gold-dim">
                        {entry.level}
                      </p>
                    </div>
                    <p className="mt-3 max-w-[68ch] leading-[1.85] text-gold-pale/90">
                      {entry.oneLine}
                    </p>
                    <p className="mt-3 font-display text-xs uppercase tracking-[0.2em] text-gold-dim">
                      {entry.relatedTerms.length + (entry.relatedTermsExternal?.length ?? 0)}{" "}
                      related {entry.relatedTerms.length + (entry.relatedTermsExternal?.length ?? 0) === 1 ? "term" : "terms"}
                      <span className="mx-2 text-gold-dim/60">·</span>
                      {entry.category}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
