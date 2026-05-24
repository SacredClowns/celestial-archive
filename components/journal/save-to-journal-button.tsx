"use client";

import Link from "next/link";
import { useState } from "react";
import { useJournal } from "@/lib/journal/journal-context";
import type { JournalEntryType } from "@/lib/journal/journal-types";

export function SaveToJournalButton({
  lessonSlug,
  title = "Reflection",
  type = "reflection",
  body = ""
}: {
  lessonSlug?: string;
  title?: string;
  type?: JournalEntryType;
  body?: string;
}) {
  const { addEntry } = useJournal();
  const [savedId, setSavedId] = useState<string | null>(null);

  if (savedId) {
    return (
      <Link
        href={`/journal/${savedId}`}
        className="mt-3 inline-block text-xs uppercase tracking-wider text-gold hover:text-amber"
      >
        View in journal →
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        const entry = addEntry({
          type,
          title,
          body,
          tags: lessonSlug ? ["lesson"] : [],
          linkedLesson: lessonSlug
        });
        setSavedId(entry.id);
      }}
      className="mt-3 rounded-sm border border-gold-dim/40 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.12em] text-gold-dim transition-colors hover:border-gold/50 hover:text-gold"
    >
      Save to journal
    </button>
  );
}
