import Link from "next/link";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";

const PRIMARY_MANUSCRIPTS = [
  "Sloane MS 3188 — Mysteriorum Libri Quinti (spiritual diaries, Heptarchic material)",
  "Sloane MS 3189 — Liber Loagaeth",
  "Sloane MS 3191 — Great Table and Watchtower tablets",
  "Cotton Appendix XLVI — Great Table witness",
  "Ashmole MS 487 — Dee's private diary"
];

const EARLY_PRINTED = [
  "Méric Casaubon (1659), A True and Faithful Relation",
  "Elias Ashmole — transcriptions and compilations (17th c.)"
];

const MODERN_CRITICAL = [
  "Donald C. Laycock (1978/2001), The Complete Enochian Dictionary",
  "Joseph H. Peterson (2003), John Dee's Five Books of Mystery",
  "Geoffrey James (1984/1998), The Enochian Magick of Dr. John Dee",
  "Deborah Harkness (1999), John Dee's Conversations with Angels",
  "Glyn Parry (2011), The Arch-Conjuror of England",
  "Benjamin Woolley (2001), The Queen's Conjurer"
];

export const metadata = {
  title: "Sources & Bibliography · Archive",
  description: "Primary manuscripts, early printed editions, and modern scholarly sources for the Enochian corpus."
};

export default function ArchiveSourcesPage() {
  return (
    <section className="page-enter mx-auto max-w-[720px] space-y-12">
      <header className="space-y-4 border-b border-gold-dim/35 pb-8">
        <Link
          href="/archive"
          className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim hover:text-gold"
        >
          ← The Archive
        </Link>
        <h1 className="font-display text-4xl tracking-[0.06em] text-gold">Sources & Bibliography</h1>
        <p className="leading-[1.9] text-gold-pale">
          Every factual claim in the Archive should trace to one of these traditions. Badges mark
          which tradition supports a given statement — not which conclusion you should draw.
        </p>
        <EpistemicBadge tone="historical" compact />
      </header>

      <SourceSection title="Primary manuscripts" items={PRIMARY_MANUSCRIPTS} />
      <SourceSection title="Early printed" items={EARLY_PRINTED} />
      <SourceSection title="Modern critical & scholarly" items={MODERN_CRITICAL} />

      <p className="border-t border-gold-dim/25 pt-8 text-sm italic text-gold-dim">
        Practitioner editions (Golden Dawn, Regardie, Crowley) are cited in lessons with △ or ○
        badges where they reorganize or extend Dee&apos;s material.
      </p>
    </section>
  );
}

function SourceSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-sm uppercase tracking-[0.22em] text-gold-dim">{title}</h2>
      <ul className="list-disc space-y-2 pl-6 text-gold-pale">
        {items.map((item) => (
          <li key={item} className="leading-[1.85]">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
