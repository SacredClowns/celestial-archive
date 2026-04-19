import { EpistemicTone } from "@/lib/lesson-types";

const badgeMap: Record<EpistemicTone, { symbol: string; label: string; color: string; source: string }> = {
  historical: {
    symbol: "◆",
    label: "Historical Evidence",
    color: "#c9a84c",
    source: "Primary records and manuscript witnesses"
  },
  consensus: {
    symbol: "◇",
    label: "Strong Scholarly Consensus",
    color: "#a8b0b8",
    source: "Sustained agreement across peer scholarship"
  },
  occult: {
    symbol: "○",
    label: "Traditional Occult Claim",
    color: "#b87340",
    source: "Tradition-specific interpretive framework"
  },
  later: {
    symbol: "△",
    label: "Later Interpretation",
    color: "#8a7a60",
    source: "Post-Dee adaptation or commentary"
  },
  speculative: {
    symbol: "~",
    label: "Speculative",
    color: "#605848",
    source: "Open conjecture with limited verification"
  },
  parallel: {
    symbol: "◎",
    label: "Parallel",
    color: "#9a8a6a",
    source: "Structural resemblance — no asserted causal descent"
  },
  disputed: {
    symbol: "?",
    label: "Disputed",
    color: "#a06820",
    source: "Attested but contested; evidence remains unresolved"
  },
  caution: {
    symbol: "⚠",
    label: "Caution",
    color: "#7a3510",
    source: "Material requiring care in reading or interpretation"
  }
};

export function EpistemicBadge({ tone, compact = false }: { tone: EpistemicTone; compact?: boolean }) {
  const item = badgeMap[tone];

  return (
    <span className="group relative inline-flex align-baseline">
      <span
        className={`inline-flex items-center gap-1 border border-gold-dim/55 bg-ink/50 ${compact ? "px-2 py-[1px] text-[12px]" : "px-2.5 py-[2px] text-[13px]"}`}
        style={{ color: item.color }}
      >
        <span aria-hidden>{item.symbol}</span>
        <span className="font-display tracking-[0.03em]">{item.label}</span>
      </span>
      <span className="pointer-events-none absolute left-0 top-[110%] z-20 max-w-64 border border-gold-dim/65 bg-deep px-2 py-1 text-xs leading-[1.5] text-gold-pale opacity-0 transition-opacity duration-slow ease-gravity group-hover:opacity-100">
        {item.source}
      </span>
    </span>
  );
}
