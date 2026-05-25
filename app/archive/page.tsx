import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { ARCHIVE_FIGURES } from "@/lib/archive/archive-registry";
import { publishedGlossaryEntries } from "@/lib/glossary";

const pillars = [
  {
    href: "/path",
    title: "Initiation Path",
    description: "Seeker and Student lessons — discernment, history, and practice."
  },
  {
    href: "/language",
    title: "Language Chamber",
    description: "Alphabet, 631-word dictionary, 19 Calls, pronunciation traditions."
  },
  {
    href: "/watchtowers",
    title: "Watchtower Map",
    description: "The Great Table — four elemental quarters and the Tablet of Union."
  },
  {
    href: "/aethyrs",
    title: "Aethyr Explorer",
    description: "30 concentric heavens, 91 governors, Call 19 variants."
  },
  {
    href: "/timeline",
    title: "Timeline",
    description: "Dee and Kelley from 1527 to the modern reception."
  },
  {
    href: "/observatory",
    title: "Observatory",
    description: "Loagaeth structural viewer and manuscript comparison."
  },
  {
    href: "/glossary",
    title: "Glossary",
    description: "Core terms with lens-separated definitions."
  },
  {
    href: "/archive/sources",
    title: "Sources",
    description: "Manuscripts, early printed editions, and modern scholarship."
  },
  {
    href: "/archive/ritual-furniture",
    title: "Ritual Furniture",
    description: "Sigillum Dei, Holy Table, ring, and lamen — manuscript-framed stubs."
  },
  {
    href: "/journal",
    title: "Journal",
    description: "Your private reflections — stored locally."
  },
  {
    href: "/discovery",
    title: "Discovery log",
    description: "Patterns and connections you noticed — stored locally."
  },
  {
    href: "/relationships",
    title: "Relationship Web",
    description: "How the transmission flows from Dee to modern practice."
  }
];

const highlights = [
  { href: "/path/seeker/the-lost-language", title: "The Lost Language", subtitle: "Lesson 1.1" },
  { href: "/language/calls?call=19", title: "The Key of the Thirty Ayres", subtitle: "Call 19" },
  { href: "/aethyrs/LIL", title: "LIL — The First Aethyr", subtitle: "Innermost heaven" }
];

export const metadata = {
  title: "Archive · Celestial Archive",
  description: "The main library of the Celestial Archive — language, cosmology, curriculum, and tools."
};

export default function ArchivePage() {
  const glossaryCount = publishedGlossaryEntries().length;

  return (
    <section className="mx-auto max-w-[980px] space-y-16">
      <header className="space-y-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.36em] text-gold-dim">Main library</p>
        <h1 className="font-display text-5xl tracking-[0.1em] text-gold">The Celestial Archive</h1>
        <p className="mx-auto max-w-[640px] leading-[1.9] text-gold-pale">
          A living research archive of the Enochian system — its history, language, cosmology, and continuing
          mysteries.
        </p>
      </header>

      <CandlelightCard className="rounded-sm border border-gold-dim/25 bg-ink/20 p-6 text-center">
        <p className="font-display text-sm text-gold-dim">
          19 Angelic Calls (1,195 words) · 631 dictionary entries · 30 Aethyrs · 91 governors · 59 timeline
          events · 11 lessons · {glossaryCount} glossary terms
        </p>
      </CandlelightCard>

      <section className="space-y-4">
        <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Figures & sessions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHIVE_FIGURES.map((f) => (
            <Link key={f.slug} href={`/archive/figures/${f.slug}`}>
              <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/15 p-4 hover:border-gold/30">
                <p className="font-display text-gold">{f.title}</p>
                <p className="text-xs text-gold-dim">Archive profile →</p>
              </CandlelightCard>
            </Link>
          ))}
          <Link href="/archive/sessions">
            <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/15 p-4 hover:border-gold/30">
              <p className="font-display text-gold">Angelic Sessions</p>
              <p className="text-xs text-gold-dim">Overview & five records →</p>
            </CandlelightCard>
          </Link>
          <Link href="/archive/hierarchy">
            <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/15 p-4 hover:border-gold/30">
              <p className="font-display text-gold">Angelic Hierarchy</p>
              <p className="text-xs text-gold-dim">Entity types overview →</p>
            </CandlelightCard>
          </Link>
          <Link href="/archive/heptarchy">
            <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/15 p-4 hover:border-gold/30">
              <p className="font-display text-gold">Heptarchia Mystica</p>
              <p className="text-xs text-gold-dim">14 king & prince profiles →</p>
            </CandlelightCard>
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p) => (
          <Link key={p.href} href={p.href} className="group block h-full">
            <CandlelightCard className="flex h-full min-h-[160px] flex-col justify-end rounded-sm border border-gold-dim/20 bg-ink/20 p-5 transition-[border-color,box-shadow] group-hover:border-gold/40 group-hover:shadow-gold">
              <h2 className="font-display text-xl text-gold group-hover:text-gold-light">{p.title}</h2>
              <p className="mt-2 text-sm text-gold-dim">{p.description}</p>
            </CandlelightCard>
          </Link>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Highlighted passages</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((h) => (
            <Link key={h.href} href={h.href}>
              <CandlelightCard className="rounded-sm border border-gold-dim/20 bg-ink/15 p-4 hover:border-gold/30">
                <p className="font-display text-gold">{h.title}</p>
                <p className="text-xs text-gold-dim">{h.subtitle}</p>
              </CandlelightCard>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
