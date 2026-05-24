"use client";

import type { LeafSide, LoagaethCell, OverlayMode } from "@/lib/observatory/loagaeth-types";
import { overlayEnabled } from "./loagaeth-overlays";

function cellClass(cell: LoagaethCell | null, overlays: OverlayMode): string {
  const classes = ["flex h-[10px] w-[10px] items-center justify-center text-[8px] sm:h-[14px] sm:w-[14px] sm:text-[10px]"];
  if (!cell) return classes.join(" ");
  if (overlays.frequency) classes.push("bg-gold/15");
  if (overlays.symmetry) classes.push("ring-1 ring-gold-dim/20");
  if (overlays.repetition) classes.push("bg-amber/20");
  return classes.join(" ");
}

export function LoagaethGrid({
  leafNumber,
  sideKey,
  side,
  overlays
}: {
  leafNumber: number;
  sideKey: "recto" | "verso";
  side: LeafSide;
  overlays: OverlayMode;
}) {
  if (leafNumber === 1 && sideKey === "recto") {
    return (
      <section className="inscribed-frame space-y-3 bg-ink/35 px-5 py-5 text-gold-pale">
        <p className="text-sm leading-relaxed">
          This leaf was recorded differently from all others. Each cell of the 49×49 grid was meant to contain a
          complete Enochian word, but the practical impossibility of writing words in tiny grid cells led Dee to record
          the content as 49 paragraphs of continuous text — one paragraph per row.
        </p>
        <div className="space-y-2">
          {Array.from({ length: 49 }, (_, idx) => (
            <p key={idx} className="text-[13px] leading-relaxed text-gold-pale/85">
              {idx + 1}. ·····
            </p>
          ))}
        </div>
      </section>
    );
  }

  if (leafNumber === 1 && sideKey === "verso") {
    return (
      <section className="inscribed-frame space-y-3 bg-ink/35 px-5 py-5">
        <p className="text-sm leading-relaxed text-gold-pale">
          The back of Leaf 1 transitions between two formats: the first 40 rows contain Enochian words per cell, while
          the last 9 rows contain single letters — matching the format used for all subsequent leaves.
        </p>
        <div className="space-y-1">
          {Array.from({ length: 40 }, (_, idx) => (
            <p key={`line-${idx}`} className="text-[13px] leading-relaxed text-gold-pale/80">
              Row {idx + 1}: ·····
            </p>
          ))}
        </div>
        <div className="pt-2">
          <PendingGrid rows={9} cols={49} />
        </div>
      </section>
    );
  }

  if (side.contentType === "text") {
    return (
      <section className="inscribed-frame bg-ink/35 px-6 py-10 text-center">
        {side.description.split(". ").filter(Boolean).slice(0, 5).map((line, idx) => (
          <p key={idx} className="font-display text-lg tracking-[0.05em] text-gold-light">
            {line.trim()}
          </p>
        ))}
      </section>
    );
  }

  if (!overlayEnabled(side.cells)) {
    return <PendingGrid rows={side.gridRows ?? 49} cols={side.gridColumns ?? 49} />;
  }

  const cells = side.cells;
  return (
    <div className="overflow-auto">
      <div className="inline-block min-w-full bg-gold-dim/15 p-[1px]">
        <div className="grid" style={{ gridTemplateColumns: `20px repeat(${cells[0]?.length ?? 49}, minmax(0, 1fr))` }}>
          <div className="text-[8px] text-gold-dim/40" />
          {Array.from({ length: cells[0]?.length ?? 49 }, (_, col) => (
            <div key={`h-${col}`} className="text-center text-[8px] text-gold-dim/40">{col + 1}</div>
          ))}
          {cells.map((row, rowIdx) => (
            <Row key={rowIdx} row={row} rowIdx={rowIdx} overlays={overlays} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ row, rowIdx, overlays }: { row: LoagaethCell[]; rowIdx: number; overlays: OverlayMode }) {
  return (
    <>
      <div className="text-center text-[8px] text-gold-dim/40">{rowIdx + 1}</div>
      {row.map((cell) => (
        <div
          key={`${cell.row}:${cell.col}`}
          role="gridcell"
          aria-label={`Row ${cell.row + 1}, Column ${cell.col + 1}: ${cell.character}`}
          className={cellClass(cell, overlays)}
          title={cell.note ?? undefined}
        >
          <span className="font-display text-gold-pale">{cell.character || "·"}</span>
        </div>
      ))}
    </>
  );
}

function PendingGrid({ rows, cols }: { rows: number; cols: number }) {
  return (
    <div className="overflow-auto">
      <div className="inline-grid gap-[1px] bg-gold-dim/10 p-[1px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: rows * cols }, (_, idx) => (
          <div
            key={idx}
            className="flex h-[10px] w-[10px] items-center justify-center bg-deep text-[8px] text-gold-dim/20 sm:h-[14px] sm:w-[14px] sm:text-[10px]"
            role="gridcell"
            aria-label={`Pending cell ${idx + 1}`}
          >
            ·
          </div>
        ))}
      </div>
    </div>
  );
}
