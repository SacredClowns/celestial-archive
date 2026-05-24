import Link from "next/link";
import { CandlelightCard } from "@/components/motion/candlelight-card";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { badgeKindToEpistemicTone } from "@/lib/language/language-badges";
import type { EnochianLetter, PronunciationTradition } from "@/lib/language/language-types";

const TRADITION_LABELS: Record<PronunciationTradition, { title: string; tone: "historical" | "later" | "occult" }> = {
  dee: { title: "Dee's Original", tone: "historical" },
  goldenDawn: { title: "Golden Dawn", tone: "later" },
  modern: { title: "Modern Practice", tone: "occult" }
};

function PronunciationCard({
  tradition,
  entry
}: {
  tradition: PronunciationTradition;
  entry: EnochianLetter["phonology"][PronunciationTradition];
}) {
  const meta = TRADITION_LABELS[tradition];
  return (
    <CandlelightCard className="flex flex-1 flex-col gap-3 rounded-sm border border-gold-dim/20 bg-ink/20 p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-sm uppercase tracking-[0.14em] text-gold">{meta.title}</h3>
        <EpistemicBadge tone={badgeKindToEpistemicTone(entry.badge)} compact />
      </div>
      <p className="text-sm leading-relaxed text-gold-dim">{entry.description}</p>
      <p className="font-mono text-lg text-gold-pale">{entry.ipa}</p>
      {entry.englishApprox ? (
        <p className="text-xs text-gold-dim">≈ {entry.englishApprox}</p>
      ) : null}
    </CandlelightCard>
  );
}

export function LetterDetail({
  letter,
  prev,
  next
}: {
  letter: EnochianLetter;
  prev: EnochianLetter | null;
  next: EnochianLetter | null;
}) {
  return (
    <article className="space-y-10">
      <div>
        <Link
          href="/language/alphabet"
          className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim transition-colors hover:text-gold"
        >
          ← Back to alphabet
        </Link>
      </div>

      <div className="text-center">
        <p className="font-mono text-[80px] leading-none text-gold sm:text-[80px]" aria-label={letter.name}>
          {letter.englishEquivalent}
        </p>
        <h1 className="mt-4 font-display text-2xl text-gold-pale">{letter.name}</h1>
        <p className="mt-2 text-sm text-gold-dim">Maps to: English letter {letter.englishEquivalent}</p>
        <p className="mt-3 text-xs text-gold-dim/80">Script reads right to left · glyph font pending</p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Pronunciation</h2>
        <div className="flex flex-col gap-4 lg:flex-row">
          <PronunciationCard tradition="dee" entry={letter.phonology.dee} />
          <PronunciationCard tradition="goldenDawn" entry={letter.phonology.goldenDawn} />
          <PronunciationCard tradition="modern" entry={letter.phonology.modern} />
        </div>
      </section>

      <CandlelightCard className="space-y-3 rounded-sm border border-gold-dim/20 bg-ink/20 p-5">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Historical Reception</h2>
          <EpistemicBadge tone={badgeKindToEpistemicTone(letter.historicalNote.badge)} compact />
        </div>
        <p className="leading-[1.9] text-gold-pale">{letter.historicalNote.text}</p>
        <p className="text-xs text-gold-dim">Source: {letter.historicalNote.source}</p>
      </CandlelightCard>

      {letter.scholarlyNotes.length > 0 ? (
        <section className="space-y-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">
            What Scholars Have Observed
          </h2>
          {letter.scholarlyNotes.map((note) => (
            <CandlelightCard
              key={`${note.scholar}-${note.observation.slice(0, 24)}`}
              className="space-y-2 rounded-sm border border-gold-dim/20 bg-ink/20 p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-sm text-gold">{note.scholar}</p>
                <EpistemicBadge tone={badgeKindToEpistemicTone(note.badge)} compact />
              </div>
              <p className="leading-[1.9] text-gold-pale">{note.observation}</p>
            </CandlelightCard>
          ))}
        </section>
      ) : null}

      {letter.exampleWords.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Words Using This Letter</h2>
          <div className="flex flex-wrap gap-2">
            {letter.exampleWords.map((word) => (
              <Link
                key={word}
                href={`/language/dictionary?q=${encodeURIComponent(word)}`}
                className="rounded-full border border-gold-dim/20 bg-ink/30 px-3 py-1 text-sm text-gold-pale transition-colors hover:border-gold/40 hover:text-gold"
              >
                {word}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <nav className="flex items-center justify-between border-t border-gold-dim/30 pt-8">
        {prev ? (
          <Link
            href={`/language/alphabet/${prev.name.toLowerCase()}`}
            className="font-display text-sm text-gold-dim transition-colors hover:text-gold"
          >
            ← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/language/alphabet/${next.name.toLowerCase()}`}
            className="font-display text-sm text-gold-dim transition-colors hover:text-gold"
          >
            {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
