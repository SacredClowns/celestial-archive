import Link from "next/link";
import { notFound } from "next/navigation";
import { GlossaryEntryView } from "@/components/glossary/glossary-entry-view";
import { getGlossaryEntry, glossaryEntries } from "@/lib/glossary";

// Static params at build time — no backend, no CMS.
export function generateStaticParams() {
  return glossaryEntries.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = getGlossaryEntry(params.slug);
  if (!entry) {
    return { title: "Glossary · ENOCHIAN: THE CELESTIAL ARCHIVE" };
  }
  return {
    title: `${entry.term} · Glossary · ENOCHIAN`,
    description: entry.oneLine
  };
}

export default function GlossaryEntryPage({ params }: { params: { slug: string } }) {
  const entry = getGlossaryEntry(params.slug);
  if (!entry) notFound();

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-10">
      <nav className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-gold-dim">
        <Link
          href="/glossary"
          className="transition-colors duration-slow ease-gravity hover:text-gold-light"
        >
          ← Glossary
        </Link>
        <span aria-hidden>·</span>
        <span>{entry.category}</span>
      </nav>

      <GlossaryEntryView entry={entry} />
    </section>
  );
}
