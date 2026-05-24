import { JournalIndex } from "@/components/journal/journal-index";

export const metadata = {
  title: "Journal · Celestial Archive",
  description: "Personal reflections and observations from your study of the Archive."
};

export default function JournalPage() {
  return (
    <section className="mx-auto max-w-[720px] space-y-8">
      <header className="space-y-3 border-b border-gold-dim/30 pb-8">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-dim">Personal</p>
        <h1 className="font-display text-4xl text-gold">Journal</h1>
        <p className="text-gold-dim">Stored locally in your browser. Nothing is sent to a server.</p>
      </header>
      <JournalIndex />
    </section>
  );
}
