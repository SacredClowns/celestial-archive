import Link from "next/link";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { dictionaryHref, hasDictionaryEntry } from "@/lib/language/dictionary-links";
import { GlossaryEntry, getGlossaryEntryByTerm, slugifyTerm } from "@/lib/glossary";

// ============================================================================
// GLOSSARY ENTRY VIEW
// ----------------------------------------------------------------------------
// A single-column reading layout with clearly separated lenses. The goal is a
// page that reads like a careful encyclopedia entry — not a product detail.
// ============================================================================

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-sm uppercase tracking-[0.24em] text-gold-dim">{title}</h2>
      <div className="leading-[1.95] text-gold-pale">{children}</div>
    </section>
  );
}

// A related term links internally if an entry exists; otherwise renders as a
// marked but non-clickable reference (preserving the archive's promise that
// every link in the web is live).
function RelatedTermLink({ term }: { term: string }) {
  const target = getGlossaryEntryByTerm(term);
  if (target) {
    return (
      <Link
        href={`/glossary/${target.slug}`}
        className="border-b border-gold-dim text-gold-light transition-colors duration-slow ease-gravity hover:border-gold/80 hover:text-gold"
      >
        {term}
      </Link>
    );
  }
  return (
    <span
      className="border-b border-dashed border-gold-dim/50 text-gold-pale/80"
      title="Not yet in the open glossary."
    >
      {term}
    </span>
  );
}

export function GlossaryEntryView({ entry }: { entry: GlossaryEntry }) {
  const hasRelated =
    entry.relatedTerms.length > 0 || (entry.relatedTermsExternal?.length ?? 0) > 0;

  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-5 border-b border-gold-dim/35 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <EpistemicBadge tone={entry.primaryBadge} compact />
          <span className="font-display text-xs uppercase tracking-[0.22em] text-gold-dim">
            {entry.category}
          </span>
          <span className="font-display text-xs uppercase tracking-[0.22em] text-gold-dim">
            · {entry.level}
          </span>
        </div>
        <h1 className="font-display text-5xl tracking-[0.06em] text-gold">{entry.term}</h1>
        <p className="max-w-[68ch] italic leading-[1.9] text-gold-light">{entry.oneLine}</p>
        {entry.term === "Enochian" ? (
          <Link
            href="/language/dictionary"
            className="inline-block font-display text-xs uppercase tracking-[0.16em] text-gold hover:text-gold-light"
          >
            Open the 631-word dictionary →
          </Link>
        ) : hasDictionaryEntry(entry.term) ? (
          <Link
            href={dictionaryHref(entry.term) ?? "/language/dictionary"}
            className="inline-block font-display text-xs uppercase tracking-[0.16em] text-gold-dim hover:text-gold"
          >
            See attested form in dictionary →
          </Link>
        ) : null}
      </header>

      {/* Definition */}
      <Section title="Definition">
        <p>{entry.definition}</p>
      </Section>

      {/* Historical Lens */}
      {entry.historicalLens && (
        <Section title="Historical Lens">
          <p>{entry.historicalLens}</p>
        </Section>
      )}

      {/* Occult Lens */}
      {entry.occultLens && (
        <Section title="Occult Lens">
          <p>{entry.occultLens}</p>
        </Section>
      )}

      {/* Psychological Lens */}
      {entry.psychologicalLens && (
        <Section title="Psychological Lens">
          <p>{entry.psychologicalLens}</p>
        </Section>
      )}

      {/* Common Misunderstandings */}
      {entry.commonMisunderstandings.length > 0 && (
        <Section title="Common Misunderstandings">
          <ul className="list-disc space-y-3 pl-6">
            {entry.commonMisunderstandings.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Multiple Interpretations */}
      {entry.multipleInterpretations && (
        <Section title="Multiple Interpretations">
          <p className="italic">{entry.multipleInterpretations}</p>
        </Section>
      )}

      {/* Related Terms */}
      {hasRelated && (
        <Section title="Related Terms">
          <div className="space-y-4">
            {entry.relatedTerms.length > 0 && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gold-dim">
                  In the glossary
                </p>
                <p className="flex flex-wrap gap-x-3 gap-y-2">
                  {entry.relatedTerms.map((term, idx) => (
                    <span key={term}>
                      <RelatedTermLink term={term} />
                      {idx < entry.relatedTerms.length - 1 && (
                        <span className="ml-3 text-gold-dim/60" aria-hidden>
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            )}
            {entry.relatedTermsExternal && entry.relatedTermsExternal.length > 0 && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gold-dim">
                  Referenced but not yet open
                </p>
                <p className="flex flex-wrap gap-x-3 gap-y-2">
                  {entry.relatedTermsExternal.map((term, idx) => (
                    <span key={term}>
                      <RelatedTermLink term={term} />
                      {idx < (entry.relatedTermsExternal?.length ?? 0) - 1 && (
                        <span className="ml-3 text-gold-dim/60" aria-hidden>
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Source Notes */}
      <Section title="Source Notes">
        <p className="text-sm leading-[1.9] text-gold-pale/85">{entry.sourceNotes}</p>
      </Section>

      {/* Appears In */}
      {entry.appearsIn.length > 0 && (
        <Section title="Appears In">
          <ul className="space-y-3">
            {entry.appearsIn.map((item) => (
              <li key={item.href} className="border-l border-gold-dim/40 pl-4">
                <Link
                  href={item.href}
                  className="font-display text-gold-light transition-colors duration-slow ease-gravity hover:text-gold"
                >
                  {item.label}
                </Link>
                {item.note && (
                  <p className="text-sm italic leading-[1.85] text-gold-pale/80">{item.note}</p>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Archive Placeholder (forthcoming destinations) */}
      {entry.archivePlaceholder && entry.archivePlaceholder.length > 0 && (
        <Section title="In the Forthcoming Archive">
          <ul className="space-y-2 text-sm italic text-gold-dim">
            {entry.archivePlaceholder.map((line, idx) => (
              <li key={idx} className="border border-dashed border-gold-dim/35 px-3 py-2">
                {line}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Footer tags — kept small and marginalia-like */}
      {entry.appTags.length > 0 && (
        <footer className="border-t border-gold-dim/35 pt-6">
          <p className="flex flex-wrap gap-x-3 gap-y-1 font-display text-xs uppercase tracking-[0.2em] text-gold-dim">
            {entry.appTags.map((tag) => (
              <span key={tag} className="border border-gold-dim/40 px-2 py-0.5">
                {tag}
              </span>
            ))}
          </p>
        </footer>
      )}
    </article>
  );
}
