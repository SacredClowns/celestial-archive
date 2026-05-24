"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { JournalEntryEditor } from "@/components/journal/journal-entry-editor";
import { useJournal } from "@/lib/journal/journal-context";

function linksFromPath(pathname: string): {
  linkedLesson?: string;
  linkedAethyr?: string;
  linkedCall?: number;
} {
  const lesson = pathname.match(/^\/path\/(?:seeker|student)\/([^/]+)/);
  if (lesson) return { linkedLesson: lesson[1] };
  const aethyr = pathname.match(/^\/aethyrs\/([A-Z]+)/i);
  if (aethyr) return { linkedAethyr: aethyr[1].toUpperCase() };
  const calls = pathname.startsWith("/language/calls");
  if (calls) return { linkedCall: 1 };
  return {};
}

export function JournalFab() {
  const [open, setOpen] = useState(false);
  const { addEntry } = useJournal();
  const pathname = usePathname();
  const links = linksFromPath(pathname);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-deep/95 text-xl text-gold shadow-gold transition-transform hover:scale-105"
        aria-label="Quick journal entry"
        title="Journal"
      >
        ✎
      </button>

      {open ? (
        <div className="fixed inset-0 z-[95] flex justify-end">
          <button
            type="button"
            className="flex-1 bg-ink/70"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <div className="h-full w-full max-w-md overflow-y-auto border-l border-gold-dim/30 bg-deep p-6 shadow-2xl">
            <h2 className="mb-4 font-display text-lg text-gold">Quick entry</h2>
            <JournalEntryEditor
              initial={links}
              onSave={(data) => {
                addEntry({ ...data, ...links });
                setOpen(false);
              }}
              onCancel={() => setOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
