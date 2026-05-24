"use client";

import { useRouter } from "next/navigation";
import { JournalEntryEditor } from "@/components/journal/journal-entry-editor";
import { useJournal } from "@/lib/journal/journal-context";

export default function NewJournalPage() {
  const { addEntry } = useJournal();
  const router = useRouter();

  return (
    <section className="mx-auto max-w-[720px] space-y-8">
      <h1 className="font-display text-3xl text-gold">New entry</h1>
      <JournalEntryEditor
        onSave={(data) => {
          const entry = addEntry(data);
          router.push(`/journal/${entry.id}`);
        }}
        onCancel={() => router.push("/journal")}
      />
    </section>
  );
}
