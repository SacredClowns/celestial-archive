"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { searchIndex } from "@/lib/search/search-index";
import { badgeToTone } from "@/lib/search/badge-tone";
import type { SearchIndexEntry, SearchResultType } from "@/lib/search/search-types";

const TYPE_LABELS: Record<SearchResultType, string> = {
  dictionary: "Dictionary",
  glossary: "Glossary",
  lesson: "Lessons",
  call: "Calls",
  aethyr: "Aethyrs",
  watchtower: "Watchtowers",
  alphabet: "Alphabet",
  timeline: "Timeline"
};

function SearchResultRow({
  item,
  type,
  onClose
}: {
  item: SearchIndexEntry;
  type: SearchResultType;
  onClose: () => void;
}) {
  const tone = badgeToTone(item.badge);

  return (
    <li>
      <Link
        href={item.url}
        onClick={onClose}
        className="flex items-start gap-3 rounded-sm border border-gold-dim/20 bg-ink/30 px-4 py-3 transition-colors hover:border-gold/40 hover:bg-ink/50"
      >
        <div className="min-w-0 flex-1">
          <p className="font-display text-gold">{item.title}</p>
          <p className="text-sm text-gold-dim">{item.subtitle}</p>
        </div>
        {tone ? <EpistemicBadge tone={tone} compact /> : null}
      </Link>
    </li>
  );
}

export function SearchOverlay({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query), 200);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setExpandedTypes(new Set());
    }
  }, [open]);

  const { grouped, totals } = open ? searchIndex(debounced, 5, expandedTypes) : { grouped: {}, totals: {} };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search the Archive"
    >
      <div className="mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-6 py-8">
        <div className="flex items-center gap-4">
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the Archive..."
            className="flex-1 border-b-2 border-gold/50 bg-transparent py-4 font-display text-2xl text-gold-pale placeholder:text-gold-dim/40 focus:border-gold focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="font-display text-sm uppercase tracking-wider text-gold-dim hover:text-gold"
          >
            Esc
          </button>
        </div>

        {!debounced.trim() ? (
          <p className="mt-12 text-center text-gold-dim">Type to search dictionary, glossary, lessons, and more.</p>
        ) : Object.keys(grouped).length === 0 ? (
          <p className="mt-12 text-center text-gold-dim">No passages match your query.</p>
        ) : (
          <div className="mt-10 space-y-8">
            {(Object.keys(grouped) as SearchResultType[]).map((type) => {
              const total = totals[type] ?? grouped[type].length;
              const showingAll = expandedTypes.has(type);
              const hasMore = total > grouped[type].length;

              return (
                <section key={type}>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim">
                      {TYPE_LABELS[type]}
                      <span className="ml-2 text-gold-dim/60">({total})</span>
                    </h2>
                    {hasMore && !showingAll ? (
                      <button
                        type="button"
                        onClick={() => setExpandedTypes((s) => new Set(s).add(type))}
                        className="font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold"
                      >
                        Show all {total}
                      </button>
                    ) : null}
                    {showingAll && total > 5 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedTypes((s) => {
                            const next = new Set(s);
                            next.delete(type);
                            return next;
                          })
                        }
                        className="font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold"
                      >
                        Show fewer
                      </button>
                    ) : null}
                  </div>
                  <ul className="space-y-2">
                    {grouped[type].map((item: SearchIndexEntry) => (
                      <SearchResultRow
                        key={`${type}-${item.url}-${item.title}`}
                        item={item}
                        type={type}
                        onClose={onClose}
                      />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function useSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpen]);
}
