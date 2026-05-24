import Link from "next/link";
import { notFound } from "next/navigation";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { getRitualFurnitureBySlug, RITUAL_FURNITURE_ITEMS } from "@/lib/archive/ritual-furniture";

export function generateStaticParams() {
  return RITUAL_FURNITURE_ITEMS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getRitualFurnitureBySlug(slug);
  if (!item) return { title: "Ritual Furniture" };
  return { title: `${item.title} · Ritual Furniture`, description: item.summary };
}

export default async function RitualFurnitureDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getRitualFurnitureBySlug(slug);
  if (!item) notFound();

  return (
    <article className="page-enter mx-auto max-w-[720px] space-y-10">
      <header className="space-y-4 border-b border-gold-dim/35 pb-8">
        <Link
          href="/archive/ritual-furniture"
          className="font-display text-xs uppercase tracking-wider text-gold-dim hover:text-gold"
        >
          ← Ritual furniture
        </Link>
        <EpistemicBadge tone={item.badge} compact />
        <h1 className="font-display text-4xl text-gold">{item.title}</h1>
        <p className="text-gold-dim">{item.subtitle}</p>
      </header>

      <section className="space-y-4 leading-[1.9] text-gold-pale">
        <p>{item.summary}</p>
        <p className="border-l-2 border-gold-dim/40 pl-4 text-sm italic text-gold-dim">
          {item.manuscriptNote}
        </p>
        <p className="text-sm text-gold-dim">
          Full illustrated entry in preparation. Compare with Session pages and the Heptarchic lesson
          for how furniture fits the transmitted system.
        </p>
      </section>

      <QuestionsThisRaises questions={item.questions} />
    </article>
  );
}
