export type CellDiffResult<T> = {
  row: number;
  col: number;
  left: T | null;
  right: T | null;
  changed: boolean;
};

export type CellDiffSummary = {
  matching: number;
  differing: number;
  uncertain: number;
};

export function computeCellDiff<T>(
  leftGrid: (T | null)[][],
  rightGrid: (T | null)[][],
  areEqual: (left: T | null, right: T | null) => boolean,
  isUncertain?: (cell: T | null) => boolean
): { cells: CellDiffResult<T>[]; summary: CellDiffSummary } {
  const maxRows = Math.max(leftGrid.length, rightGrid.length);
  const rows: CellDiffResult<T>[] = [];
  let matching = 0;
  let differing = 0;
  let uncertain = 0;

  for (let r = 0; r < maxRows; r += 1) {
    const leftRow = leftGrid[r] ?? [];
    const rightRow = rightGrid[r] ?? [];
    const maxCols = Math.max(leftRow.length, rightRow.length);

    for (let c = 0; c < maxCols; c += 1) {
      const left = leftRow[c] ?? null;
      const right = rightRow[c] ?? null;
      const changed = !areEqual(left, right);
      rows.push({ row: r, col: c, left, right, changed });

      if (changed) differing += 1;
      else matching += 1;

      if (isUncertain && (isUncertain(left) || isUncertain(right))) uncertain += 1;
    }
  }

  return { cells: rows, summary: { matching, differing, uncertain } };
}
