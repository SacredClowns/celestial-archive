"use client";

import { useParams, useRouter } from "next/navigation";
import { JournalEntryEditor } from "@/components/journal/journal-entry-editor";
import { useJournal } from "@/lib/journal/journal-context";

export default function JournalEntryPage() {
  const { id } = useParams<{ id: string }>();
  const { getEntry, updateEntry, deleteEntry } = useJournal();
  const router = useRouter();
  const entry = getEntry(id);

  if (!entry) {
    return (
      <p className="text-gold-dim">
        Entry not found.{" "}
        <button type="button" className="text-gold underline" onClick={() => router.push("/journal")}>
          Return to journal
        </button>
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-[720px] space-y-8">
      <JournalEntryEditor
        initial={entry}
        onSave={(data) => {
          updateEntry(id, data);
          router.push("/journal");
        }}
        onCancel={() => router.push("/journal")}
      />
      <button
        type="button"
        onClick={() => {
          deleteEntry(id);
          router.push("/journal");
        }}
        className="text-sm text-amber hover:underline"
      >
        Delete this entry
      </button>
    </section>
  );
}
