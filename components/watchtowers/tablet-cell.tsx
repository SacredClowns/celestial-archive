import type { CellHighlight, CellHighlightKind } from "@/lib/watchtowers/grid-highlights";

const KIND_STYLES: Record<NonNullable<CellHighlightKind>, string> = {
  "name-run": "bg-amber/25 text-gold ring-1 ring-amber/60",
  "spirit-god": "bg-gold/25 text-gold ring-1 ring-gold/55",
  "senior-cross": "bg-sky-950/50 text-gold-pale ring-1 ring-sky-700/50",
  "senior-band": "bg-sky-900/30 text-gold-pale ring-1 ring-sky-800/40",
  "kerubic-god": "bg-gold-dim/20 text-gold-pale ring-1 ring-gold-dim/45",
  "king-row": "bg-emerald-950/40 text-gold-pale ring-1 ring-emerald-800/35"
};

export function TabletCell({
  letter,
  highlight,
  selected,
  onClick,
  onPointerEnter,
  onPointerLeave
}: {
  letter: string;
  highlight?: CellHighlight;
  selected?: boolean;
  onClick?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}) {
  const Tag = onClick ? "button" : "span";
  const kind = highlight?.kind;
  const tone = kind
    ? KIND_STYLES[kind]
    : "bg-ink/40 text-gold-pale hover:bg-gold/10";
  const title = highlight?.labels.length ? highlight.labels.join(" · ") : undefined;

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      title={title}
      aria-label={title ? `${letter}: ${title}` : letter}
      className={`flex h-7 w-7 items-center justify-center font-mono text-[11px] transition-colors sm:h-8 sm:w-8 sm:text-xs ${
        selected ? "ring-2 ring-gold/80" : ""
      } ${tone}`}
    >
      {letter}
    </Tag>
  );
}
