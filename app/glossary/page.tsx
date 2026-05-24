import { GlossaryIndex } from "@/components/glossary/glossary-index";
import { publishedAlphabeticalEntries, publishedGlossaryEntries } from "@/lib/glossary";

export const metadata = {
  title: "Glossary · ENOCHIAN: THE CELESTIAL ARCHIVE",
  description:
    "The quiet archive of terms. Each entry is a doorway into a lens — historical, occult, psychological — kept visibly separate so the reader can hold ambiguity without collapsing it."
};

export default function GlossaryPage() {
  const entries = publishedAlphabeticalEntries();
  const totalPublished = publishedGlossaryEntries().length;

  return (
    <section className="mx-auto w-full max-w-[980px] space-y-12">
      <header className="space-y-4 border-b border-gold-dim/35 pb-10">
        <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-dim">
          The Celestial Archive · Glossary
        </p>
        <h1 className="font-display text-4xl tracking-[0.08em] text-gold">Glossary</h1>
        <p className="max-w-[620px] leading-[1.9] text-gold-pale">
          A slow, alphabetical reading room. Every term separates description from interpretation
          and carries its source notes. Follow the related terms between entries — the Archive
          begins here.
        </p>
      </header>

      <GlossaryIndex entries={entries} />

      <footer className="border-t border-gold-dim/35 pt-8 text-sm text-gold-dim">
        <p className="leading-[1.9]">
          {totalPublished} terms are open. Further entries arrive as the Archive expands from the core
          terms document and lesson cross-links.
        </p>
      </footer>
    </section>
  );
}
