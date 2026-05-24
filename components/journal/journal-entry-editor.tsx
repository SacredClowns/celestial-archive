"use client";

import { useState } from "react";
import type { JournalEntry, JournalEntryType } from "@/lib/journal/journal-types";
import { JOURNAL_TYPE_LABELS } from "@/lib/journal/journal-context";

const TYPES: JournalEntryType[] = [
  "reflection",
  "observation",
  "freeform",
  "practice",
  "question",
  "discovery"
];

export function JournalEntryEditor({
  initial,
  onSave,
  onCancel
}: {
  initial?: Partial<JournalEntry>;
  onSave: (data: {
    type: JournalEntryType;
    title: string;
    body: string;
    tags: string[];
    linkedLesson?: string;
    linkedAethyr?: string;
    linkedCall?: number;
  }) => void;
  onCancel?: () => void;
}) {
  const [type, setType] = useState<JournalEntryType>(initial?.type ?? "freeform");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          type,
          title: title.trim() || "Untitled",
          body,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          linkedLesson: initial?.linkedLesson,
          linkedAethyr: initial?.linkedAethyr,
          linkedCall: initial?.linkedCall
        });
      }}
    >
      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wider ${
              type === t
                ? "border-gold bg-gold/15 text-gold"
                : "border-gold-dim/25 text-gold-dim"
            }`}
          >
            {JOURNAL_TYPE_LABELS[t]}
          </button>
        ))}
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border-b border-gold-dim/30 bg-transparent py-2 font-display text-xl text-gold focus:border-gold focus:outline-none"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
        placeholder="Your observations..."
        className="w-full rounded-sm border border-gold-dim/25 bg-ink/20 p-4 text-gold-pale focus:border-gold/40 focus:outline-none"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="w-full rounded-sm border border-gold-dim/20 bg-ink/15 px-3 py-2 text-sm text-gold-dim"
      />
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-sm border border-gold bg-gold/15 px-5 py-2 font-display text-xs uppercase tracking-wider text-gold"
        >
          Save
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-sm border border-gold-dim/25 px-5 py-2 font-display text-xs uppercase text-gold-dim"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
