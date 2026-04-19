import Link from "next/link";
import { SEEKER_PATH, studentStagePreview } from "@/lib/content-registry";
import { STUDENT_PATH } from "@/lib/lessons/student-path";

export default function SeekerThresholdPage() {
  return (
    <div className="mx-auto max-w-[720px] space-y-10 pb-24">
      <header className="space-y-3 border-b border-gold-dim/40 pb-8">
        <p className="font-display text-xs uppercase tracking-[0.16em] text-gold-dim">
          <Link href={SEEKER_PATH} className="hover:text-gold-light transition-colors duration-slow ease-gravity">
            Seeker path
          </Link>
          {" — "}Threshold
        </p>
        <h1 className="font-display text-3xl tracking-[0.06em] text-gold">You have reached the threshold of Student.</h1>
      </header>

      <section className="inscribed-frame bg-deep/55 px-6 py-8 leading-[1.9] text-gold-pale">
        <p>
          The five Seeker folios were one sustained inquiry: how to read a record that will not simplify. If you have walked them
          in order, you already possess the practices — source discipline, single-witness care, and the Strange Feeling — as
          habits, not slogans.
        </p>
        <p className="mt-5">
          Nothing here is a certificate. Rank is readiness, not reward. You may stop with Seeker and still hold something whole:
          a way of standing before contested material without being captured by it.
        </p>
        <p className="mt-5 text-gold-light">
          What you carry forward is attention — trained, slowed, honest — ready for a deeper room when you choose to enter it.
        </p>
      </section>

      <section className="inscribed-frame border border-dashed border-gold-dim/45 bg-ink/30 px-6 py-6">
        <h2 className="font-display text-lg uppercase tracking-[0.1em] text-gold-dim">Student</h2>
        <p className="mt-3 leading-[1.85] text-gold-pale">
          Stage 2 — <span className="text-gold-light">{studentStagePreview.rankLabel}</span> — continues on the path in
          controlled preview: structural comparison, Heptarchia brackets, and later arrangements held in view together.
        </p>
        <p className="mt-4 text-sm text-gold-dim">{studentStagePreview.note}</p>
        <p className="mt-5">
          <Link
            href={STUDENT_PATH}
            className="inline-flex border border-gold-dim/55 bg-ink/35 px-4 py-2 font-display text-xs uppercase tracking-[0.16em] text-gold-light transition-colors duration-slow ease-gravity hover:border-gold/60 hover:text-gold"
          >
            Open Student path
          </Link>
        </p>
      </section>

      <p className="font-display text-sm tracking-[0.08em] text-gold-light">
        <Link href={SEEKER_PATH} className="border-b border-gold-dim/60 transition-colors duration-slow ease-gravity hover:text-gold">
          Return to the Seeker path
        </Link>
      </p>
    </div>
  );
}
