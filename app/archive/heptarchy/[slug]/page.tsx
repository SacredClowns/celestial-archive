import Link from "next/link";
import { notFound } from "next/navigation";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { BookmarkButton } from "@/components/layout/bookmark-button";
import { HEPTARCHY_ENTITIES, getHeptarchyEntity } from "@/lib/archive/heptarchy-entities";

export function generateStaticParams() {
  return HEPTARCHY_ENTITIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entity = getHeptarchyEntity(slug);
  return {
    title: entity ? `${entity.name} · Heptarchy` : "Heptarchy · Archive",
    description: entity?.summary ?? "Heptarchic entity profile."
  };
}

export default async function HeptarchyEntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entity = getHeptarchyEntity(slug);
  if (!entity) notFound();

  const tone = entity.badge === "historical" ? "historical" : "disputed";

  return (
    <section className="page-enter mx-auto max-w-reading space-y-8">
      <Link
        href="/archive/heptarchy"
        className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim hover:text-gold"
      >
        ← Heptarchia Mystica
      </Link>

      <header className="space-y-3">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim">
          Heptarchic {entity.role}
        </p>
        <h1 className="font-display text-4xl text-gold">{entity.name}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <EpistemicBadge tone={tone} />
          {entity.day ? (
            <span className="text-sm text-gold-dim">Day: {entity.day}</span>
          ) : null}
          {entity.pairedWith ? (
            <span className="text-sm text-gold-dim">Paired with King {entity.pairedWith}</span>
          ) : null}
        </div>
        <BookmarkButton title={entity.name} href={`/archive/heptarchy/${slug}`} />
      </header>

      <p className="leading-relaxed text-gold-pale">{entity.summary}</p>

      <aside className="rounded-sm border border-gold-dim/25 bg-ink/20 p-5">
        <h2 className="font-display text-xs uppercase tracking-[0.16em] text-gold-dim">Manuscript note</h2>
        <p className="mt-3 text-sm leading-relaxed text-gold-pale">{entity.manuscriptNote}</p>
      </aside>

      <p className="text-sm text-gold-dim">
        Related:{" "}
        <Link href="/archive/sessions/heptarchic-revelation" className="text-gold hover:text-gold-light">
          Session — The Heptarchic Revelation
        </Link>
        {" · "}
        <Link href="/archive/ritual-furniture" className="text-gold hover:text-gold-light">
          Ritual furniture
        </Link>
      </p>
    </section>
  );
}
