/**
 * Inline editorial state: content awaits verification or naming.
 * Not a badge; not epistemic tone — a production marker only.
 */

const TOOLTIP_BY_VARIANT: Record<string, string> = {
  "peterson-name": "Peterson (2003) verification required",
  "peterson-planetary": "Peterson (2003) — planetary and diurnal pairings to be checked",
  "table-layout": "Table layout under editorial verification",
  "name-generic": "Name pending editorial confirmation"
};

export function VerificationPendingChip({ variant = "peterson-name" }: { variant?: string }) {
  const detail = TOOLTIP_BY_VARIANT[variant] ?? TOOLTIP_BY_VARIANT["peterson-name"];
  return (
    <span className="group relative mx-0.5 inline-flex align-baseline">
      <span
        className="border border-gold-dim/50 bg-ink/60 px-1.5 py-px font-display text-[10px] uppercase tracking-[0.14em] text-gold-dim"
        tabIndex={0}
      >
        Verification pending
      </span>
      <span className="pointer-events-none absolute left-0 top-[110%] z-20 max-w-xs border border-gold-dim/65 bg-deep px-2 py-1 text-xs leading-snug text-gold-pale opacity-0 transition-opacity duration-slow ease-gravity group-hover:opacity-100 group-focus-visible:opacity-100">
        {detail}
      </span>
    </span>
  );
}
