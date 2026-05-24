import Link from "next/link";
import type { JournalEntry } from "@/lib/journal/journal-types";
import { JOURNAL_TYPE_LABELS } from "@/lib/journal/journal-context";

export function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  const preview = entry.body.split("\n").slice(0, 2).join(" ").slice(0, 120);
  const date = new Date(entry.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <Link
      href={`/journal/${entry.id}`}
      className="block rounded-sm border border-gold-dim/20 bg-ink/20 p-4 transition-colors hover:border-gold/40 hover:bg-ink/30"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-[10px] uppercase tracking-wider text-gold-dim">
          {JOURNAL_TYPE_LABELS[entry.type]}
        </span>
        <span className="text-[10px] text-gold-dim/60">{date}</span>
      </div>
      <h3 className="mt-2 font-display text-lg text-gold">{entry.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gold-dim">{preview}</p>
      {entry.tags.length > 0 ? (
        <p className="mt-2 text-[10px] text-gold-dim/50">{entry.tags.join(" · ")}</p>
      ) : null}
    </Link>
  );
}
