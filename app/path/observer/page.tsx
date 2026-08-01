import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { SEEKER_PATH } from "@/lib/content-registry";
import { STUDENT_PATH } from "@/lib/lessons/student-path";

const OBSERVER_LESSONS = [
  {
    n: "3.1",
    title: "The Ink on the Page",
    theme: "Session diaries in their original texture — editorial layers named"
  },
  {
    n: "3.2",
    title: "What the Scryer Saw",
    theme: "Sessions as negotiation, not passive reception"
  },
  {
    n: "3.3",
    title: "The Architecture Observed",
    theme: "Watchtowers in motion across living traditions"
  },
  {
    n: "3.4",
    title: "Thirty Rooms, Thirty Readings",
    theme: "Aethyrs as map of interpretations, not a single journey"
  },
  {
    n: "3.5",
    title: "The Parallel Problem",
    theme: "Comparative Discernment — Kabbalah, Gnosticism, Hermeticism"
  },
  {
    n: "3.6",
    title: "The Sincerity Problem Revisited",
    theme: "Single-Witness at Observer depth"
  },
  {
    n: "3.7",
    title: "The Living System",
    theme: "Enochian as practiced today — multiple communities"
  },
  {
    n: "3.8",
    title: "The Observer's Map",
    theme: "Integration without choosing a winner"
  }
];

export const metadata = {
  title: "Observer — Stage 3 Preview",
  description: "Stage 3 opens the cartographic encounter. Blueprint and eight lessons in preparation."
};

export default function ObserverPreviewPage() {
  return (
    <section className="page-enter mx-auto max-w-[720px] space-y-10">
      <header className="space-y-4 border-b border-gold-dim/35 pb-8">
        <p className="font-display text-xs uppercase tracking-[0.28em] text-gold-dim">Initiation Path · Stage 3</p>
        <h1 className="font-display text-4xl tracking-[0.06em] text-gold">Observer</h1>
        <p className="leading-[1.9] text-gold-pale italic">
          Cartographic encounter — read primary sources, map interpretive traditions, and hold competing readings
          as a field rather than a problem to solve.
        </p>
      </header>

      <CandlelightCard className="rounded-sm border border-amber/30 bg-amber/5 p-6">
        <p className="font-display text-xs uppercase tracking-[0.16em] text-amber">Lessons in preparation</p>
        <p className="mt-3 leading-[1.9] text-gold-pale">
          Content packets for lessons 3.1–3.4 are drafted. Lesson prose and Source Packs follow the pipeline. You can
          explore spatial tools now — always with badges and source discipline.
        </p>
      </CandlelightCard>

      <section className="space-y-3">
        <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Planned lessons</h2>
        <ul className="space-y-2">
          {OBSERVER_LESSONS.map((l) => (
            <li
              key={l.n}
              className="rounded-sm border border-gold-dim/20 bg-ink/15 px-4 py-3"
            >
              <p className="font-display text-gold">
                {l.n} — {l.title}
              </p>
              <p className="text-sm text-gold-dim">{l.theme}</p>
            </li>
          ))}
        </ul>
      </section>

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
        <Link href="/archive/sessions" className="rounded-sm border border-gold-dim/25 p-4 hover:border-gold/40">
          <p className="font-display text-gold">Angelic Sessions</p>
          <p className="text-xs text-gold-dim">Archive session records</p>
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
          "What changes when you move from structure (Student) to primary texture (Observer)?",
          "Can you read a manuscript page without needing it to confirm what you already believe?",
          "Which of the eight lesson themes above would change your map of the field most?"
        ]}
      />
    </section>
  );
}
