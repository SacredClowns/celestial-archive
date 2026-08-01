"use client";

import { useMemo, useState } from "react";
import {
  getGreatTableFullGrid,
  getGreatTableVersion
} from "@/lib/watchtowers/watchtower-data";
import type { GreatTableVersionId } from "@/lib/watchtowers/watchtower-types";

type CellInfo = {
  row: number;
  col: number;
  letter: string;
  uncertainty?: string;
  note?: string | null;
  quarterLabel?: string;
};

const QUARTER_TINTS = [
  "rgba(190,224,255,0.06)", // NW
  "rgba(255,150,120,0.06)", // NE
  "rgba(150,255,190,0.06)", // SW
  "rgba(230,180,255,0.06)" // SE
];

/**
 * The full Great Table — every letter of the 27×25 master grid, hover any
 * cell for its witness details, toggle recensions, and light up where the
 * chosen recension disagrees with Dee's Sloane MS 3191.
 */
export function FullGreatTable({ version }: { version: GreatTableVersionId }) {
  const [hover, setHover] = useState<CellInfo | null>(null);
  const [showDiff, setShowDiff] = useState(false);

  const { grid, quarters } = useMemo(() => getGreatTableFullGrid(version), [version]);
  const cells = useMemo(
    () =>
      getGreatTableVersion(version).stateData.cells as Array<
        Array<{ letter: string; uncertaintyLevel?: string; manuscriptNote?: string | null }>
      >,
    [version]
  );
  const sloane = useMemo(() => getGreatTableFullGrid("sloane-3191").grid, []);

  const quarterAt = (r: number, c: number) => {
    const idx = quarters.findIndex(
      (q) =>
        r >= q.rowRange[0] && r <= q.rowRange[1] && c >= q.colRange[0] && c <= q.colRange[1]
    );
    return idx;
  };

  const diffCount = useMemo(() => {
    if (version === "sloane-3191") return 0;
    let n = 0;
    grid.forEach((row, r) =>
      row.forEach((l, c) => {
        if (sloane[r]?.[c] !== undefined && l !== sloane[r][c]) n++;
      })
    );
    return n;
  }, [grid, sloane, version]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-[9px] uppercase tracking-[0.24em] text-gold-dim">
          The full grid · {grid.length} × {grid[0]?.length ?? 0}
        </p>
        {version !== "sloane-3191" ? (
          <button
            type="button"
            onClick={() => setShowDiff((s) => !s)}
            aria-pressed={showDiff}
            className={`border px-3 py-1.5 font-display text-[9px] uppercase tracking-[0.18em] transition-colors ${
              showDiff
                ? "border-amber/70 bg-amber/15 text-gold-pale"
                : "border-gold-dim/40 text-gold-dim hover:border-gold/50 hover:text-gold-light"
            }`}
          >
            {showDiff ? `Hiding nothing — ${diffCount} cells differ from Sloane` : "Reveal differences vs Sloane 3191"}
          </button>
        ) : (
          <p className="font-display text-[9px] uppercase tracking-[0.18em] text-gold-dim/70">
            Dee&apos;s witness — the baseline
          </p>
        )}
      </div>

      <div className="inscribed-frame overflow-x-auto bg-ink/40 p-3">
        <div
          className="mx-auto grid w-max select-none gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${grid[0]?.length ?? 25}, minmax(0, 1fr))` }}
          onPointerLeave={() => setHover(null)}
          role="table"
          aria-label="Great Table letter grid"
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const q = quarterAt(r, c);
              const isCross = q === -1;
              const differs = showDiff && version !== "sloane-3191" && sloane[r]?.[c] !== letter;
              const isHover = hover?.row === r && hover?.col === c;
              return (
                <span
                  key={`${r}-${c}`}
                  onPointerEnter={() => {
                    const cell = cells[r]?.[c];
                    setHover({
                      row: r,
                      col: c,
                      letter,
                      uncertainty: cell?.uncertaintyLevel,
                      note: cell?.manuscriptNote,
                      quarterLabel: isCross ? "The Black Cross / Tablet of Union band" : quarters[q]?.label
                    });
                  }}
                  className={`flex h-[22px] w-[22px] items-center justify-center font-mono text-[11px] transition-colors duration-150 ${
                    differs
                      ? "bg-amber/30 text-gold-pale"
                      : isCross
                        ? "bg-ink/80 text-gold-dim"
                        : "text-gold-pale/90"
                  } ${isHover ? "outline outline-1 outline-gold shadow-gold bg-gold/20 text-white" : ""}`}
                  style={!differs && !isCross ? { backgroundColor: QUARTER_TINTS[q % 4] } : undefined}
                >
                  {letter}
                </span>
              );
            })
          )}
        </div>
      </div>

      <div className="min-h-[52px] border border-gold-dim/25 bg-deep/40 px-4 py-3">
        {hover ? (
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <span className="font-display text-2xl text-gold-pale">{hover.letter}</span>
            <span className="font-mono text-xs text-gold-dim">
              row {hover.row + 1} · col {hover.col + 1}
            </span>
            {hover.uncertainty ? (
              <span className="font-display text-[9px] uppercase tracking-[0.18em] text-gold-light/80">
                {hover.uncertainty}
              </span>
            ) : null}
            <span className="text-xs italic text-gold-dim">{hover.quarterLabel}</span>
            {hover.note ? <span className="w-full text-xs text-gold-pale/80">{hover.note}</span> : null}
          </div>
        ) : (
          <p className="text-xs italic text-gold-dim/70">
            Run your pointer across the table — every cell carries its witness level; some carry manuscript notes.
          </p>
        )}
      </div>
    </div>
  );
}
