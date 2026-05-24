"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DiscoveryEntryCard } from "@/components/discovery/discovery-entry-card";
import {
  DISCOVERY_KIND_LABELS,
  useDiscovery
} from "@/lib/discovery/discovery-context";
import type { DiscoveryKind } from "@/lib/discovery/discovery-types";

export function DiscoveryIndex() {
  const { entries, removeDiscovery, addDiscovery } = useDiscovery();
  const [kindFilter, setKindFilter] = useState<DiscoveryKind | "all">("all");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const filtered = useMemo(() => {
    let list = [...entries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (kindFilter !== "all") list = list.filter((e) => e.kind === kindFilter);
    return list;
  }, [entries, kindFilter]);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    addDiscovery({ kind: "insight", title: t, note: note.trim() });
    setTitle("");
    setNote("");
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleAdd} className="space-y-3 rounded-sm border border-gold-dim/25 bg-ink/15 p-5">
        <p className="font-display text-xs uppercase tracking-[0.16em] text-gold-dim">Quick record</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What did you notice?"
          className="w-full rounded-sm border border-gold-dim/25 bg-deep/50 px-3 py-2 text-gold-pale"
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note"
          rows={2}
          className="w-full rounded-sm border border-gold-dim/25 bg-deep/50 px-3 py-2 text-sm text-gold-pale"
        />
        <button
          type="submit"
          className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-2 font-display text-xs uppercase tracking-wider text-gold"
        >
          Add to log
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setKindFilter("all")}
          className={`rounded-sm border px-3 py-1 text-xs uppercase ${
            kindFilter === "all" ? "border-gold text-gold" : "border-gold-dim/20 text-gold-dim"
          }`}
        >
          All
        </button>
        {(Object.keys(DISCOVERY_KIND_LABELS) as DiscoveryKind[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKindFilter(k)}
            className={`rounded-sm border px-3 py-1 text-xs uppercase ${
              kindFilter === k ? "border-gold text-gold" : "border-gold-dim/20 text-gold-dim"
            }`}
          >
            {DISCOVERY_KIND_LABELS[k]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="leading-[1.9] text-gold-dim">
          Nothing recorded yet. When something in the Archive catches your attention — a pattern, a contradiction, a
          term you had not seen before — use <strong className="font-normal text-gold-pale">Record discovery</strong> on
          watchtower and hierarchy pages, or add a note here.
        </p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((entry) => (
            <li key={entry.id}>
              <DiscoveryEntryCard entry={entry} onRemove={removeDiscovery} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
