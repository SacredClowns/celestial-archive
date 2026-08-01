import { BadgeProse } from "@/components/language/badge-prose";
import type { LanguageChamberContent } from "@/lib/language/language-types";

export function AlphabetLegend({
  alphabetLegend,
  writingDirectionNote,
  fontNote,
  mobileGridWarning
}: Pick<
  LanguageChamberContent,
  "alphabetLegend" | "writingDirectionNote" | "fontNote" | "mobileGridWarning"
>) {
  return (
    <div className="space-y-8">
      <ul className="grid gap-3 sm:grid-cols-3">
        {alphabetLegend.map((item) => (
          <li
            key={item.label}
            className="rounded-sm border border-gold-dim/20 bg-ink/15 px-4 py-3 text-sm"
          >
            <span className="font-display text-xs uppercase tracking-[0.14em] text-gold">
              {item.label}
            </span>
            <p className="mt-2 leading-relaxed text-gold-dim">{item.description}</p>
          </li>
        ))}
      </ul>
      <div className="space-y-4 rounded-sm border border-gold-dim/20 bg-ink/15 p-5">
        <BadgeProse text={writingDirectionNote} className="leading-[1.9] text-gold-pale" />
        <BadgeProse text={fontNote} className="text-sm leading-[1.9] text-gold-dim" />
      </div>
      <p className="text-xs text-gold-dim/80 md:hidden">{mobileGridWarning}</p>
    </div>
  );
}
