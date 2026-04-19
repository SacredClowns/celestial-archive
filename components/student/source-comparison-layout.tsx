import type { ReactNode } from "react";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";

export type SourceComparisonLayoutProps = {
  historicalTitle?: ReactNode;
  laterTitle?: ReactNode;
  historicalPanel: ReactNode;
  laterPanel: ReactNode;
  caption?: ReactNode;
  className?: string;
};

/**
 * Side-by-side (stacked on narrow viewports) panels for primary vs later structural layers.
 * Visual weight is balanced; badges mark epistemic layer only.
 */
export function SourceComparisonLayout({
  historicalTitle,
  laterTitle,
  historicalPanel,
  laterPanel,
  caption,
  className = ""
}: SourceComparisonLayoutProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid gap-4 md:grid-cols-2 md:gap-0 md:divide-x md:divide-gold-dim/35">
        <section
          className="flex min-h-[12rem] flex-col border border-gold-dim/20 bg-deep/60 md:border-r-0 md:pr-4"
          aria-labelledby="source-comp-historical-heading"
        >
          <header
            id="source-comp-historical-heading"
            className="flex flex-wrap items-center gap-2 border-b border-gold-dim/20 bg-ink/30 px-3 py-2"
          >
            <EpistemicBadge tone="historical" compact />
            {historicalTitle ? (
              <h3 className="font-display text-sm tracking-[0.08em] text-gold-light">{historicalTitle}</h3>
            ) : (
              <h3 className="font-display text-sm tracking-[0.08em] text-gold-light">Primary layer</h3>
            )}
          </header>
          <div className="flex-1 p-3 text-sm leading-relaxed text-gold-pale">{historicalPanel}</div>
        </section>
        <section
          className="flex min-h-[12rem] flex-col border border-gold-dim/20 bg-parchment/30 md:border-l-0 md:pl-4"
          aria-labelledby="source-comp-later-heading"
        >
          <header
            id="source-comp-later-heading"
            className="flex flex-wrap items-center gap-2 border-b border-gold-dim/20 bg-ink/20 px-3 py-2"
          >
            <EpistemicBadge tone="later" compact />
            {laterTitle ? (
              <h3 className="font-display text-sm tracking-[0.08em] text-gold-light">{laterTitle}</h3>
            ) : (
              <h3 className="font-display text-sm tracking-[0.08em] text-gold-light">Later layer</h3>
            )}
          </header>
          <div className="flex-1 p-3 text-sm leading-relaxed text-gold-pale">{laterPanel}</div>
        </section>
      </div>
      {caption ? <p className="text-xs leading-relaxed text-gold-dim">{caption}</p> : null}
    </div>
  );
}
