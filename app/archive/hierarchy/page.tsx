import Link from "next/link";
import { ReturnToGround } from "@/components/discernment/return-to-ground";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { RecordDiscoveryButton } from "@/components/discovery/record-discovery-button";
import { HIERARCHY_GROUND } from "@/lib/content/return-to-ground-copy";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { CandlelightCard } from "@/components/motion/candlelight-card";

const ENTITY_TYPES = [
  {
    name: "Heptarchic Kings & Princes",
    description: "The earliest hierarchy (1582): planetary governors of forty-nine regions.",
    badge: "historical" as const,
    href: "/archive/sessions/heptarchic-revelation"
  },
  {
    name: "Seniors",
    description: "Six-letter names on the Great Cross of each Watchtower tablet — twenty-four across the four quarters.",
    badge: "historical" as const,
    href: "/watchtowers"
  },
  {
    name: "Kings (Angelic Kings of the Quarters)",
    description: "Tablet kings derived from specific grid positions; distinct from Heptarchic kings.",
    badge: "historical" as const,
    href: "/watchtowers"
  },
  {
    name: "Kerubic / Lesser Angels",
    description: "Names extracted from sub-quadrant rules; large populations per tablet.",
    badge: "historical" as const,
    href: "/watchtowers"
  },
  {
    name: "Angels of Medicine, Stones, Transformation",
    description: "Sixteen good angels per category with cacodemon counterparts — operational lists in Dee's hierarchy.",
    badge: "historical" as const,
    href: "/watchtowers/air"
  },
  {
    name: "Governors (91)",
    description: "Three per Aethyr; names tied to Watchtower derivation and regional assignments.",
    badge: "historical" as const,
    href: "/aethyrs"
  },
  {
    name: "Angelic Kings of the Earth (12)",
    description: "Twelve kings in the Aethyr governor tables — not identical to tablet Kings.",
    badge: "historical" as const,
    href: "/aethyrs"
  }
];

export const metadata = {
  title: "Angelic Hierarchy · Archive",
  description: "Entity types in the Enochian system — how they relate and where to read them in the Archive."
};

export default function AngelicHierarchyPage() {
  return (
    <section className="page-enter mx-auto max-w-[820px] space-y-10">
      <header className="space-y-4 border-b border-gold-dim/35 pb-8">
        <Link
          href="/archive"
          className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim hover:text-gold"
        >
          ← The Archive
        </Link>
        <h1 className="font-display text-4xl tracking-[0.06em] text-gold">Angelic Hierarchy</h1>
        <p className="leading-[1.9] text-gold-pale">
          The Enochian system names hundreds of entities through derivation rules applied to letter grids. This
          overview maps entity types — not to endorse invocation, but to orient reading.
        </p>
        <EpistemicBadge tone="historical" compact />
      </header>

      <ul className="space-y-4">
        {ENTITY_TYPES.map((e) => (
          <li key={e.name}>
            <Link href={e.href}>
              <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/15 p-5 hover:border-gold/35">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg text-gold">{e.name}</h2>
                  <EpistemicBadge tone={e.badge} compact />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gold-pale">{e.description}</p>
              </CandlelightCard>
            </Link>
          </li>
        ))}
      </ul>

      <ReturnToGround title="Taxonomy is not testimony">{HIERARCHY_GROUND}</ReturnToGround>

      <div className="flex flex-wrap items-center gap-4 border-t border-gold-dim/20 pt-6">
        <RecordDiscoveryButton
          kind="connection"
          title="Angelic hierarchy overview"
          note="Mapped entity types to archive routes."
          href="/archive/hierarchy"
        />
      </div>

      <QuestionsThisRaises
        questions={[
          "Why does the system produce 'so many' names from one table — and is that a feature or a bug?",
          "How do you tell a Heptarchic King from a Watchtower King without collapsing them?",
          "What changes in your reading when cacodemons are listed alongside good angels?"
        ]}
      />
    </section>
  );
}
