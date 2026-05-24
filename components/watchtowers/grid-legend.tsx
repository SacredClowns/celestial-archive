import { HIGHLIGHT_LEGEND, type CellHighlightKind } from "@/lib/watchtowers/grid-highlights";

const SWATCH: Record<NonNullable<CellHighlightKind>, string> = {
  "name-run": "ring-amber/60 bg-amber/25",
  "spirit-god": "ring-gold/55 bg-gold/25",
  "senior-cross": "ring-sky-700/50 bg-sky-950/50",
  "senior-band": "ring-sky-800/40 bg-sky-900/30",
  "kerubic-god": "ring-gold-dim/45 bg-gold-dim/20",
  "king-row": "ring-emerald-800/35 bg-emerald-950/40"
};

export function GridLegend() {
  return (
    <div className="rounded-sm border border-gold-dim/20 bg-ink/15 p-4">
      <p className="font-display text-[10px] uppercase tracking-[0.16em] text-gold-dim">Reading guide</p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {HIGHLIGHT_LEGEND.map((item) => (
          <li key={item.kind} className="flex gap-2 text-xs leading-relaxed text-gold-dim">
            <span
              className={`mt-0.5 inline-block h-4 w-4 shrink-0 rounded-sm ring-1 ${SWATCH[item.kind]}`}
              aria-hidden
            />
            <span>
              <span className="font-display text-gold-pale">{item.label}</span>
              <span className="mt-0.5 block">{item.description}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[10px] italic text-gold-dim/80">
        Hover or focus a cell for its role. Matched names override structural bands when both apply.
      </p>
    </div>
  );
}
