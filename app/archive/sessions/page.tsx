import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { ARCHIVE_SESSIONS } from "@/lib/archive/archive-registry";
import { SESSION_QUESTIONS } from "@/lib/archive/session-questions";

export const metadata = {
  title: "Angelic Sessions · Archive",
  description: "Overview of the angelic scrying sessions that produced the Enochian system."
};

export default function ArchiveSessionsIndexPage() {
  return (
    <section className="page-enter mx-auto max-w-[980px] space-y-10">
      <header className="space-y-4 border-b border-gold-dim/35 pb-8">
        <Link
          href="/archive"
          className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim hover:text-gold"
        >
          ← The Archive
        </Link>
        <h1 className="font-display text-4xl tracking-[0.06em] text-gold">Angelic Sessions</h1>
        <p className="max-w-[640px] leading-[1.9] text-gold-pale">
          The actions through which Dee and Kelley received the alphabet, Calls, tablets, and
          hierarchies — recorded in the spiritual diaries and later printed sources.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {ARCHIVE_SESSIONS.filter((s) => s.slug !== "overview").map((s) => (
          <Link key={s.slug} href={`/archive/sessions/${s.slug}`}>
            <CandlelightCard className="h-full rounded-sm border border-gold-dim/25 bg-ink/20 p-5 hover:border-gold/40">
              <h2 className="font-display text-xl text-gold">{s.title}</h2>
              <p className="mt-2 text-sm text-gold-dim">Read session record →</p>
            </CandlelightCard>
          </Link>
        ))}
      </div>

      <Link href="/archive/sessions/overview" className="inline-block font-display text-sm text-gold hover:text-gold-light">
        Read the sessions overview →
      </Link>

      <QuestionsThisRaises questions={SESSION_QUESTIONS.overview} />
    </section>
  );
}
