import Link from "next/link";
import { PathProgressDashboard } from "@/components/path/path-progress-dashboard";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { SEEKER_PATH } from "@/lib/content-registry";
import { STUDENT_PATH } from "@/lib/lessons/student-path";

export const metadata = {
  title: "Initiation Path · Celestial Archive",
  description: "Seeker and Student ranks — your progress through the curriculum."
};

export default function PathIndexPage() {
  return (
    <section className="page-enter mx-auto max-w-[980px] space-y-12">
      <header className="space-y-4 border-b border-gold-dim/35 pb-8">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-dim">Initiation Path</p>
        <h1 className="font-display text-4xl tracking-[0.08em] text-gold">Your path through the Archive</h1>
        <p className="max-w-[620px] leading-[1.9] text-gold-pale">
          Ranks describe readiness, not rewards. Complete lessons at your own pace — progress is stored on this device.
        </p>
      </header>

      <PathProgressDashboard />

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href={SEEKER_PATH}>
          <CandlelightCard className="h-full rounded-sm border border-gold-dim/25 bg-ink/20 p-6 hover:border-gold/40">
            <h2 className="font-display text-2xl text-gold">Stage 1 — Seeker</h2>
            <p className="mt-2 text-sm text-gold-dim">Five lessons · narrative encounter with Dee and Kelley</p>
          </CandlelightCard>
        </Link>
        <Link href={STUDENT_PATH}>
          <CandlelightCard className="h-full rounded-sm border border-gold-dim/25 bg-ink/20 p-6 hover:border-gold/40">
            <h2 className="font-display text-2xl text-gold">Stage 2 — Student</h2>
            <p className="mt-2 text-sm text-gold-dim">Six lessons · structure, tables, and reception</p>
          </CandlelightCard>
        </Link>
      </div>

      <Link href="/path/observer">
        <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/15 p-5 hover:border-gold/35">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Observer — preview</h2>
          <p className="mt-2 text-sm leading-relaxed text-gold-pale">
            Stage 3 opens the cartographic encounter. The room is visible; lessons are in preparation. Explore the
            maps now →
          </p>
        </CandlelightCard>
      </Link>
    </section>
  );
}
