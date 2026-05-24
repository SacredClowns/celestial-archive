"use client";

import { ComparisonGrid } from "@/components/observatory/comparison-grid";
import { computeCellDiff } from "@/lib/observatory/cell-diff";
import type { LoagaethComparisonSource } from "@/lib/observatory/loagaeth-types";

export function LoagaethComparison({ sources }: { sources: LoagaethComparisonSource[] }) {
  if (sources.length < 2) {
    return (
      <p className="mt-6 border border-gold-dim/30 bg-ink/20 px-4 py-3 text-sm text-gold-dim">
        Only one published transcription has been identified for this leaf. Comparison mode requires at least two
        independent sources.
      </p>
    );
  }

  const [left, right] = sources;
  const diff = computeCellDiff(
    left.cells,
    right.cells,
    (a, b) => a?.character === b?.character,
    (cell) => cell?.uncertaintyLevel === "uncertain" || cell?.uncertaintyLevel === "contested"
  );
  const diffSet = new Set(diff.cells.filter((item) => item.changed).map((item) => `${item.row}:${item.col}`));

  return (
    <section className="mt-6 space-y-3">
      <h3 className="font-display text-sm uppercase tracking-[0.16em] text-gold-light">
        Compare two transcriptions of the same leaf side by side.
      </h3>
      <ComparisonGrid
        leftLabel={left.label}
        rightLabel={right.label}
        leftGrid={left.cells}
        rightGrid={right.cells}
        diffMap={diffSet}
        summary={diff.summary}
        renderCell={(cell) => <span className="font-display text-[10px] text-gold-pale">{cell.character || "·"}</span>}
      />
    </section>
  );
}
