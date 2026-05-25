"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TabletCell } from "@/components/watchtowers/tablet-cell";
import {
  getGridHighlightMap,
  HIGHLIGHT_LEGEND,
  type CellHighlight
} from "@/lib/watchtowers/grid-highlights";
import {
  KERUBIC_ROW_END,
  KERUBIC_ROW_START,
  KING_ROW,
  SERVIENT_ROW_END,
  SERVIENT_ROW_START,
  SPIRIT_GOD_ROW,
  SUB_QUADRANT_COLS,
  SUB_QUADRANT_LABELS
} from "@/lib/watchtowers/tablet-layout";
import type { WatchtowerQuadrant } from "@/lib/watchtowers/watchtower-types";

function CellRow({
  grid,
  highlightMap,
  rowIndex,
  colStart,
  colEnd,
  active,
  onCell
}: {
  grid: string[][];
  highlightMap: ReturnType<typeof getGridHighlightMap>;
  rowIndex: number;
  colStart: number;
  colEnd: number;
  active: { r: number; c: number } | null;
  onCell: (r: number, c: number) => void;
}) {
  const row = grid[rowIndex] ?? [];
  return (
    <div className="flex gap-0.5">
      {row.slice(colStart, colEnd + 1).map((letter, i) => {
        const c = colStart + i;
        return (
          <TabletCell
            key={`${rowIndex}-${c}`}
            letter={letter}
            highlight={highlightMap[rowIndex]?.[c]}
            selected={active?.r === rowIndex && active?.c === c}
            onClick={() => onCell(rowIndex, c)}
          />
        );
      })}
    </div>
  );
}

function SubQuadrantPanel({
  label,
  subLabel,
  grid,
  highlightMap,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  active,
  onCell,
  className = ""
}: {
  label: string;
  subLabel?: string;
  grid: string[][];
  highlightMap: ReturnType<typeof getGridHighlightMap>;
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
  active: { r: number; c: number } | null;
  onCell: (r: number, c: number) => void;
  className?: string;
}) {
  const rows: number[] = [];
  for (let r = rowStart; r <= rowEnd; r++) rows.push(r);

  return (
    <div
      className={`rounded-sm border border-gold-dim/40 bg-ink/10 p-1.5 ${className}`}
      title={`Sub-quadrant ${label}`}
    >
      <p className="mb-1 font-display text-[8px] uppercase tracking-[0.14em] text-gold-dim/80">
        {label}
        {subLabel ? <span className="text-gold-dim/50"> · {subLabel}</span> : null}
      </p>
      <div className="flex flex-col gap-0.5">
        {rows.map((ri) => (
          <CellRow
            key={ri}
            grid={grid}
            highlightMap={highlightMap}
            rowIndex={ri}
            colStart={colStart}
            colEnd={colEnd}
            active={active}
            onCell={onCell}
          />
        ))}
      </div>
    </div>
  );
}

function CellDetailPopover({
  active,
  grid,
  activeCell,
  onClose
}: {
  active: { r: number; c: number };
  grid: string[][];
  activeCell: CellHighlight | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  const legendEntry = activeCell?.kind
    ? HIGHLIGHT_LEGEND.find((e) => e.kind === activeCell.kind)
    : null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Cell detail"
      className="relative z-10 rounded-sm border border-gold/40 bg-deep/95 px-4 py-3 shadow-lg"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-2 top-2 font-display text-[10px] uppercase text-gold-dim hover:text-gold"
        aria-label="Close"
      >
        ×
      </button>
      <p className="font-mono text-gold">
        Row {active.r + 1}, column {active.c + 1}:{" "}
        <span className="text-gold-light">{grid[active.r]?.[active.c]}</span>
      </p>
      {activeCell?.labels.length ? (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gold-pale">
          {activeCell.labels.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm italic text-gold-dim/80">
          Servient / fill letter — no named hierarchy match at this position.
        </p>
      )}
      {legendEntry ? (
        <p className="mt-2 text-xs text-gold-dim">
          <span className="font-display uppercase tracking-wider">{legendEntry.label}</span>
          {" — "}
          {legendEntry.description}
        </p>
      ) : null}
    </div>
  );
}

export function TabletGrid({
  quadrant,
  grid,
  tablet
}: {
  quadrant: WatchtowerQuadrant;
  grid: string[][];
  tablet: { seniors: string[]; angelicKing: string; divineName: string };
}) {
  const highlightMap = useMemo(
    () => getGridHighlightMap(quadrant, grid, tablet),
    [quadrant, grid, tablet]
  );
  const [active, setActive] = useState<{ r: number; c: number } | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const selectCell = (r: number, c: number) => {
    setActive({ r, c });
    setPopoverOpen(true);
  };

  const activeCell: CellHighlight | null =
    active && highlightMap[active.r]?.[active.c] ? highlightMap[active.r][active.c] : null;

  const rows = grid.length;
  const hasKingRow = rows > KING_ROW;

  return (
    <div className="space-y-3">
      <p className="font-display text-[10px] uppercase tracking-[0.16em] text-gold-dim">
        Kerubic sub-quadrants (rows 1–4) · Servient blocks below · Spirit row 7 spans all columns · click a cell
        for detail
      </p>

      <div className="flex flex-wrap gap-2">
        {SUB_QUADRANT_COLS.map(([c0, c1], i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <SubQuadrantPanel
              label={SUB_QUADRANT_LABELS[i]}
              subLabel="Kerubic"
              grid={grid}
              highlightMap={highlightMap}
              rowStart={KERUBIC_ROW_START}
              rowEnd={KERUBIC_ROW_END}
              colStart={c0}
              colEnd={c1}
              active={active}
              onCell={selectCell}
            />
            {SERVIENT_ROW_START < SPIRIT_GOD_ROW ? (
              <SubQuadrantPanel
                label={SUB_QUADRANT_LABELS[i]}
                subLabel="Servient"
                grid={grid}
                highlightMap={highlightMap}
                rowStart={SERVIENT_ROW_START}
                rowEnd={SPIRIT_GOD_ROW - 1}
                colStart={c0}
                colEnd={c1}
                active={active}
                onCell={selectCell}
                className="border-gold-dim/25"
              />
            ) : null}
            {SPIRIT_GOD_ROW + 1 <= SERVIENT_ROW_END ? (
              <SubQuadrantPanel
                label={SUB_QUADRANT_LABELS[i]}
                subLabel="Servient"
                grid={grid}
                highlightMap={highlightMap}
                rowStart={SPIRIT_GOD_ROW + 1}
                rowEnd={SERVIENT_ROW_END}
                colStart={c0}
                colEnd={c1}
                active={active}
                onCell={selectCell}
                className="border-gold-dim/25"
              />
            ) : null}
          </div>
        ))}
      </div>

      {rows > SPIRIT_GOD_ROW ? (
        <div className="rounded-sm border border-gold/35 bg-gold/5 p-2">
          <p className="mb-1 font-display text-[8px] uppercase tracking-wider text-gold-dim">
            Spirit god-name row (row {SPIRIT_GOD_ROW + 1})
          </p>
          <CellRow
            grid={grid}
            highlightMap={highlightMap}
            rowIndex={SPIRIT_GOD_ROW}
            colStart={0}
            colEnd={(grid[0]?.length ?? 12) - 1}
            active={active}
            onCell={selectCell}
          />
        </div>
      ) : null}

      {hasKingRow ? (
        <div className="rounded-sm border border-emerald-900/40 bg-emerald-950/20 p-2">
          <p className="mb-1 font-display text-[8px] uppercase tracking-wider text-gold-dim">
            King row (row {KING_ROW + 1})
          </p>
          <CellRow
            grid={grid}
            highlightMap={highlightMap}
            rowIndex={KING_ROW}
            colStart={0}
            colEnd={(grid[KING_ROW]?.length ?? 12) - 1}
            active={active}
            onCell={selectCell}
          />
        </div>
      ) : null}

      {popoverOpen && active ? (
        <CellDetailPopover
          active={active}
          grid={grid}
          activeCell={activeCell}
          onClose={() => setPopoverOpen(false)}
        />
      ) : (
        <p className="text-xs italic text-gold-dim/70">Click any cell to open its reading roles and matched names.</p>
      )}
    </div>
  );
}
