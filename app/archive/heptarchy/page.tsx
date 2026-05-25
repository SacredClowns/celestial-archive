import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { HEPTARCHY_KINGS, HEPTARCHY_PRINCES } from "@/lib/archive/heptarchy-entities";

export const metadata = {
  title: "Heptarchy · Archive",
  description: "Seven kings and seven princes of the Heptarchia Mystica — profile stubs."
};

function EntityList({
  title,
  entities
}: {
  title: string;
  entities: typeof HEPTARCHY_KINGS;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">{title}</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {entities.map((e) => (
          <li key={e.slug}>
            <Link href={`/archive/heptarchy/${e.slug}`}>
              <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/15 p-4 hover:border-gold/35">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-gold">{e.name}</p>
                    <p className="text-xs capitalize text-gold-dim">{e.role}</p>
                  </div>
                  <EpistemicBadge tone={e.badge === "historical" ? "historical" : "disputed"} compact />
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-gold-dim">{e.summary}</p>
              </CandlelightCard>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function HeptarchyIndexPage() {
  return (
    <section className="mx-auto max-w-[900px] space-y-10">
      <header className="space-y-4">
        <Link
          href="/archive"
          className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim hover:text-gold"
        >
          ← The Archive
        </Link>
        <h1 className="font-display text-4xl text-gold">Heptarchia Mystica</h1>
        <p className="max-w-reading leading-relaxed text-gold-pale">
          Seven kings, seven princes, and forty-nine ministers — the first formally complete sub-system in the
          Dee–Kelley diaries (1582). These profiles are stubs: names and roles from the manuscript tradition, with
          assignments marked provisional where the record is still being verified.
        </p>
        <p className="text-sm text-gold-dim">
          Full structural treatment:{" "}
          <Link href="/path/student/the-seven-kings" className="text-gold hover:text-gold-light">
            Student Lesson 2.1 — The Seven Kings
          </Link>
        </p>
      </header>

      <EntityList title="Seven Kings" entities={HEPTARCHY_KINGS} />
      <EntityList title="Seven Princes" entities={HEPTARCHY_PRINCES} />
    </section>
  );
}
