"use client";

import { EpistemicBadge } from "@/components/discernment/epistemic-badge";

export type VersionToggleValue = "historical" | "later" | "comparison";

export type VersionToggleProps = {
  value: VersionToggleValue;
  onChange: (next: VersionToggleValue) => void;
  historicalLabel?: string;
  laterLabel?: string;
  comparisonLabel?: string;
  /** When true, the later option is annotated with the Later Interpretation badge (△). */
  markLaterInterpretation?: boolean;
  className?: string;
  /** Accessible name for the tablist */
  "aria-label"?: string;
};

/**
 * Horizontal version switch for Dee vs later traditions.
 * No default “truth” styling — both segments share weight; later may carry △.
 */
export function VersionToggle({
  value,
  onChange,
  historicalLabel = "Historical Witness",
  laterLabel = "Reconstructed Tradition",
  comparisonLabel = "Comparison",
  markLaterInterpretation = true,
  className = "",
  "aria-label": ariaLabel
}: VersionToggleProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div
        role="tablist"
        aria-label={ariaLabel ?? "Version comparison"}
        className="inline-flex flex-wrap items-center gap-0 border border-gold-dim/25 bg-ink/20 p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={value === "historical"}
          id="version-toggle-historical"
          className={`min-h-[44px] min-w-[44px] px-4 py-2 font-display text-xs uppercase tracking-[0.12em] transition-opacity duration-slow ease-gravity ${value === "historical"
            ? "bg-parchment text-gold-light"
            : "bg-transparent text-gold-dim hover:text-gold-pale"
            }`}
          onClick={() => onChange("historical")}
        >
          {historicalLabel}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={value === "later"}
          id="version-toggle-later"
          className={`flex min-h-[44px] min-w-[44px] flex-wrap items-center justify-center gap-2 px-4 py-2 font-display text-xs uppercase tracking-[0.12em] transition-opacity duration-slow ease-gravity ${value === "later" ? "bg-parchment/40 text-gold-light" : "bg-transparent text-gold-dim hover:text-gold-pale"
            }`}
          onClick={() => onChange("later")}
        >
          <span>{laterLabel}</span>
          {markLaterInterpretation ? <EpistemicBadge tone="later" compact /> : null}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={value === "comparison"}
          id="version-toggle-comparison"
          className={`flex min-h-[44px] min-w-[44px] flex-wrap items-center justify-center gap-2 px-4 py-2 font-display text-xs uppercase tracking-[0.12em] transition-opacity duration-slow ease-gravity ${value === "comparison" ? "bg-parchment/40 text-gold-light" : "bg-transparent text-gold-dim hover:text-gold-pale"
            }`}
          onClick={() => onChange("comparison")}
        >
          <span>{comparisonLabel}</span>
        </button>
      </div>
      <div className="text-xs italic text-gold-dim max-w-2xl leading-relaxed">
        {value === "historical" && "Historical Witness shows the material as it appears in the Dee manuscripts."}
        {value === "later" && "Reconstructed Tradition shows later arrangements and interpretations."}
        {value === "comparison" && "Comparison allows both to be viewed together without implying that either is final."}
      </div>
    </div>
  );
}
