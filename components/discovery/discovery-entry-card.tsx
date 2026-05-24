"use client";

import Link from "next/link";
import { DISCOVERY_KIND_LABELS } from "@/lib/discovery/discovery-context";
import type { DiscoveryEntry } from "@/lib/discovery/discovery-types";

export function DiscoveryEntryCard({
  entry,
  onRemove
}: {
  entry: DiscoveryEntry;
  onRemove?: (id: string) => void;
}) {
  const date = new Date(entry.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <article className="rounded-sm border border-gold-dim/20 bg-ink/20 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <span className="font-display text-[10px] uppercase tracking-wider text-gold-dim">
          {DISCOVERY_KIND_LABELS[entry.kind]}
        </span>
        <span className="text-[10px] text-gold-dim/60">{date}</span>
      </div>
      <h3 className="mt-2 font-display text-lg text-gold">{entry.title}</h3>
      {entry.note ? (
        <p className="mt-2 text-sm leading-relaxed text-gold-pale">{entry.note}</p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-3">
        {entry.href ? (
          <Link
            href={entry.href}
            className="font-display text-[10px] uppercase tracking-wider text-gold hover:text-gold-light"
          >
            Return to page →
          </Link>
        ) : null}
        {onRemove ? (
          <button
            type="button"
            onClick={() => onRemove(entry.id)}
            className="font-display text-[10px] uppercase tracking-wider text-gold-dim/60 hover:text-gold-dim"
          >
            Remove
          </button>
        ) : null}
      </div>
    </article>
  );
}
