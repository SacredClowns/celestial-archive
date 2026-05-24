"use client";

import type { ReactNode } from "react";
import type { CellDiffSummary } from "@/lib/observatory/cell-diff";

type ComparisonGridProps<T> = {
  leftLabel: string;
  rightLabel: string;
  leftGrid: T[][];
  rightGrid: T[][];
  diffMap: Set<string>;
  summary: CellDiffSummary;
  renderCell: (cell: T, row: number, col: number, changed: boolean) => ReactNode;
};

export function ComparisonGrid<T>({
  leftLabel,
  rightLabel,
  leftGrid,
  rightGrid,
  diffMap,
  summary,
  renderCell
}: ComparisonGridProps<T>) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 border border-gold-dim/30 bg-ink/30 px-4 py-3 text-xs text-gold-dim">
        <span>Matching: {summary.matching}</span>
        <span>Differing: {summary.differing}</span>
        <span>Uncertain: {summary.uncertain}</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GridPanel title={leftLabel} grid={leftGrid} renderCell={renderCell} diffMap={diffMap} />
        <GridPanel title={rightLabel} grid={rightGrid} renderCell={renderCell} diffMap={diffMap} />
      </div>
    </section>
  );
}

function GridPanel<T>({
  title,
  grid,
  diffMap,
  renderCell
}: {
  title: string;
  grid: T[][];
  diffMap: Set<string>;
  renderCell: (cell: T, row: number, col: number, changed: boolean) => ReactNode;
}) {
  return (
    <section className="inscribed-frame overflow-auto bg-ink/30 p-4">
      <h3 className="mb-3 font-display text-xs uppercase tracking-[0.18em] text-gold-light">{title}</h3>
      <div className="inline-grid gap-[1px] bg-gold-dim/15 p-[1px]" style={{ gridTemplateColumns: `repeat(${grid[0]?.length ?? 1}, minmax(0, 1fr))` }}>
        {grid.flatMap((row, rowIdx) =>
          row.map((cell, colIdx) => {
            const changed = diffMap.has(`${rowIdx}:${colIdx}`);
            return (
              <div key={`${rowIdx}:${colIdx}`} className={`min-h-5 min-w-5 bg-deep ${changed ? "ring-1 ring-amber/60" : ""}`}>
                {renderCell(cell, rowIdx, colIdx, changed)}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
