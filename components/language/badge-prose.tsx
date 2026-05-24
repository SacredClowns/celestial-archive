const BADGE_GLYPHS = ["◆", "◇", "○", "△", "◎", "~", "?", "⚠"] as const;

/** Renders prose that may contain inline epistemic badge glyphs. */
export function BadgeProse({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(new RegExp(`(${BADGE_GLYPHS.map((g) => `\\${g}`).join("|")})`));

  return (
    <p className={className}>
      {parts.map((part, i) =>
        BADGE_GLYPHS.includes(part as (typeof BADGE_GLYPHS)[number]) ? (
          <span key={`${i}-${part}`} className="mx-0.5 text-gold" aria-hidden>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}
