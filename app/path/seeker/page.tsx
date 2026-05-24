import Link from "next/link";
import { SeekerSequenceSection } from "@/components/path/seeker-sequence-section";
import { SEEKER_PATH, seekerLessonRegistry, studentStagePreview } from "@/lib/content-registry";
import { STUDENT_PATH } from "@/lib/lessons/student-path";

export default function SeekerPathPage() {
  return (
    <div className="mx-auto max-w-[720px] space-y-16 pb-24">
      <header className="space-y-5 border-b border-gold-dim/30 pb-12">
        <p className="font-display text-[9px] uppercase tracking-[0.2em] text-gold-dim">
          <Link href="/archive" className="transition-colors duration-slow ease-gravity hover:text-gold-light">
            Archive
          </Link>
          <span className="text-gold-dim/40"> · </span>
          <span className="text-gold-light/80">Initiation Path</span>
        </p>
        <h1 className="font-display text-4xl tracking-[0.06em] text-gold sm:text-5xl">Seeker</h1>
        <p className="max-w-xl leading-[1.9] text-gold-pale">
          Stage 1: Seeker — you begin at the threshold. Five folios, one witness-problem, three discernment practices, and no
          obligation to rush. The path is read in order — not because the Archive rewards sequence, but because each room assumes
          the last.
        </p>
        <p className="text-[13px] italic text-gold-dim/80">
          No measure of completion is shown here. What matters is whether you can carry the practices forward.
        </p>
      </header>

      <SeekerSequenceSection rows={seekerLessonRegistry} />

      <section className="sealed-frame bg-ink/25 px-6 py-7">
        <p className="font-display text-[9px] uppercase tracking-[0.18em] text-gold-dim/70">Beyond Seeker</p>
        <h2 className="mt-3 font-display text-lg tracking-[0.06em] text-gold-light">Student — Stage 2</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-[1.85] text-gold-pale">
          <span className="text-gold-light">{studentStagePreview.rankLabel}</span> is open on the path as a
          controlled preview: comparison rooms beside the same manuscripts, not a prize tier.
        </p>
        <p className="mt-2 text-[13px] text-gold-dim/80">{studentStagePreview.note}</p>
        <p className="mt-5">
          <Link
            href={STUDENT_PATH}
            className="inline-flex border border-gold-dim/40 bg-deep/40 px-5 py-2.5 font-display text-[10px] uppercase tracking-[0.14em] text-gold-light transition-colors duration-slow ease-gravity hover:border-gold/50 hover:text-gold"
          >
            Open Student path
          </Link>
        </p>
      </section>
    </div>
  );
}
