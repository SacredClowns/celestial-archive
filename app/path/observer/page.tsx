import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { SEEKER_PATH } from "@/lib/content-registry";
import { STUDENT_PATH } from "@/lib/lessons/student-path";

export const metadata = {
  title: "Observer — Stage 3 Preview",
  description: "Stage 3 opens the cartographic encounter. The threshold is visible; the room is not yet open."
};

export default function ObserverPreviewPage() {
  return (
    <section className="page-enter mx-auto max-w-[720px] space-y-10">
      <header className="space-y-4 border-b border-gold-dim/35 pb-8">
        <p className="font-display text-xs uppercase tracking-[0.28em] text-gold-dim">Initiation Path · Stage 3</p>
        <h1 className="font-display text-4xl tracking-[0.06em] text-gold">Observer</h1>
        <p className="leading-[1.9] text-gold-pale italic">
          You have crossed the Student threshold. The next rank is cartographic — mapping the Watchtowers and Great
          Table as structures to be read, not symbols to be consumed.
        </p>
      </header>

      <CandlelightCard className="rounded-sm border border-amber/30 bg-amber/5 p-6">
        <p className="font-display text-xs uppercase tracking-[0.16em] text-amber">Room not yet open</p>
        <p className="mt-3 leading-[1.9] text-gold-pale">
          Observer lessons are in preparation. You can explore the spatial system now through the Watchtower Map,
          Aethyr Explorer, and Observatory — always with badges, always with source discipline.
        </p>
      </CandlelightCard>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/watchtowers" className="rounded-sm border border-gold-dim/25 p-4 hover:border-gold/40">
          <p className="font-display text-gold">Watchtower Map</p>
          <p className="text-xs text-gold-dim">Great Table · four quarters</p>
        </Link>
        <Link href="/aethyrs" className="rounded-sm border border-gold-dim/25 p-4 hover:border-gold/40">
          <p className="font-display text-gold">Aethyr Explorer</p>
          <p className="text-xs text-gold-dim">30 Aethyrs · Call 19</p>
        </Link>
        <Link href="/observatory" className="rounded-sm border border-gold-dim/25 p-4 hover:border-gold/40">
          <p className="font-display text-gold">Observatory</p>
          <p className="text-xs text-gold-dim">Loagaeth · comparison</p>
        </Link>
        <Link href={STUDENT_PATH} className="rounded-sm border border-gold-dim/25 p-4 hover:border-gold/40">
          <p className="font-display text-gold">Return to Student</p>
          <p className="text-xs text-gold-dim">Stage 2 curriculum</p>
        </Link>
      </div>

      <p className="text-sm text-gold-dim">
        Prerequisites: complete the Student stage folios, or continue as Seeker at{" "}
        <Link href={SEEKER_PATH} className="text-gold hover:underline">
          Stage 1
        </Link>
        .
      </p>

      <QuestionsThisRaises
        questions={[
          "What changes when you move from narrative (Seeker) and structure (Student) to map (Observer)?",
          "Can a grid be 'understood' without believing it is literally true?",
          "What would you need to see in Stage 3 lessons that the tools alone cannot provide?"
        ]}
      />
    </section>
  );
}
