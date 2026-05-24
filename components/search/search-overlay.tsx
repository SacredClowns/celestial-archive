"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { searchIndex } from "@/lib/search/search-index";
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

export function SearchOverlay({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

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

  const grouped = open ? searchIndex(debounced, 5) : {};

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
            {(Object.keys(grouped) as SearchResultType[]).map((type) => (
              <section key={type}>
                <h2 className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-gold-dim">
                  {TYPE_LABELS[type]}
                </h2>
                <ul className="space-y-2">
                  {grouped[type].map((item: SearchIndexEntry) => (
                    <li key={`${type}-${item.url}-${item.title}`}>
                      <Link
                        href={item.url}
                        onClick={onClose}
                        className="block rounded-sm border border-gold-dim/20 bg-ink/30 px-4 py-3 transition-colors hover:border-gold/40 hover:bg-ink/50"
                      >
                        <p className="font-display text-gold">{item.title}</p>
                        <p className="text-sm text-gold-dim">{item.subtitle}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
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
