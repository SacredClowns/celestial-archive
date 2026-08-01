import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { SEEKER_PATH } from "@/lib/content-registry";
import { STUDENT_PATH } from "@/lib/lessons/student-path";
import { OBSERVER_PATH, observerLessonRegistry } from "@/lib/observer-registry";

export const metadata = {
  title: "Observer — Stage 3 · Celestial Archive",
  description:
    "Stage 3 opens the cartographic encounter: read the primary sources directly, name the layers between manuscript and reader, and hold competing readings as a field."
};

export default function ObserverPage() {
  const open = observerLessonRegistry.filter((l) => l.status === "open");
  const planned = observerLessonRegistry.filter((l) => l.status !== "open");

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

      {open.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Open folios</h2>
          {open.map((lesson) => (
            <Link
              key={lesson.id}
              href={`${OBSERVER_PATH}/${lesson.slug}`}
              className="group block rounded-sm border border-gold/35 bg-deep/40 px-5 py-4 transition-all duration-slow ease-gravity hover:-translate-y-0.5 hover:border-gold/70 hover:bg-deep/60"
            >
              <p className="font-display text-[10px] uppercase tracking-[0.18em] text-gold-dim">
                {lesson.lessonNumber}
              </p>
              <p className="mt-1 font-display text-lg text-gold transition-colors group-hover:text-gold-pale">
                {lesson.title}
              </p>
              {lesson.subtitle ? <p className="text-sm text-gold-light/70">{lesson.subtitle}</p> : null}
              <p className="mt-2 text-sm text-gold-dim">{lesson.theme}</p>
              <p className="mt-3 font-display text-[10px] uppercase tracking-[0.2em] text-gold-light/80">
                Open folio ▸
              </p>
            </Link>
          ))}
        </section>
      ) : null}

      <CandlelightCard className="rounded-sm border border-amber/30 bg-amber/5 p-6">
        <p className="font-display text-xs uppercase tracking-[0.16em] text-amber">On the stage's honesty</p>
        <p className="mt-3 leading-[1.9] text-gold-pale">
          Observer folios enter in controlled preview: the prose is written and readable, while its Source Pack —
          the folio-level citation and badge audit — is still open. Each folio says so on its own first page. The
          spatial tools below are complete and can be walked at any time.
        </p>
      </CandlelightCard>

      <section className="space-y-3">
        <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Still in the scriptorium</h2>
        <ul className="space-y-2">
          {planned.map((l) => (
            <li key={l.id} className="sealed-frame px-4 py-3">
              <p className="font-display text-gold-dim">
                {l.lessonNumber} — {l.title}
              </p>
              <p className="text-sm text-gold-dim/70">{l.theme}</p>
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
          "How many hands stand between the session and the sentence in front of you?"
        ]}
      />
    </section>
  );
}
