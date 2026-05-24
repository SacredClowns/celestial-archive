"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { JournalEntryCard } from "@/components/journal/journal-entry-card";
import { useJournal } from "@/lib/journal/journal-context";
import type { JournalEntryType } from "@/lib/journal/journal-types";
import { JOURNAL_TYPE_LABELS } from "@/lib/journal/journal-context";

export function JournalIndex() {
  const { entries } = useJournal();
  const [typeFilter, setTypeFilter] = useState<JournalEntryType | "all">("all");
  const [tagFilter, setTagFilter] = useState("");

  const tags = useMemo(() => {
    const s = new Set<string>();
    entries.forEach((e) => e.tags.forEach((t) => s.add(t)));
    return [...s].sort();
  }, [entries]);

  const filtered = useMemo(() => {
    let list = [...entries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (typeFilter !== "all") list = list.filter((e) => e.type === typeFilter);
    if (tagFilter) list = list.filter((e) => e.tags.includes(tagFilter));
    return list;
  }, [entries, typeFilter, tagFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTypeFilter("all")}
            className={`rounded-sm border px-3 py-1 text-xs uppercase ${
              typeFilter === "all" ? "border-gold text-gold" : "border-gold-dim/20 text-gold-dim"
            }`}
          >
            All
          </button>
          {(Object.keys(JOURNAL_TYPE_LABELS) as JournalEntryType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`rounded-sm border px-3 py-1 text-xs uppercase ${
                typeFilter === t ? "border-gold text-gold" : "border-gold-dim/20 text-gold-dim"
              }`}
            >
              {JOURNAL_TYPE_LABELS[t]}
            </button>
          ))}
        </div>
        <Link
          href="/journal/new"
          className="rounded-sm border border-gold bg-gold/15 px-4 py-2 font-display text-xs uppercase tracking-wider text-gold"
        >
          New entry
        </Link>
      </div>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTagFilter(tagFilter === t ? "" : t)}
              className={`rounded-full border px-2 py-0.5 text-[10px] ${
                tagFilter === t ? "border-gold text-gold" : "border-gold-dim/20 text-gold-dim"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="py-16 text-center leading-[1.9] text-gold-dim">
          Your journal is empty. As you explore the Archive, you&apos;ll find reflection prompts throughout the
          lessons. Your observations begin here.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {filtered.map((e) => (
            <li key={e.id}>
              <JournalEntryCard entry={e} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
