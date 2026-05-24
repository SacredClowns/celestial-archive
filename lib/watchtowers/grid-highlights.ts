import type { WatchtowerQuadrant } from "@/lib/watchtowers/watchtower-types";
import { getHierarchyForQuadrant } from "@/lib/watchtowers/hierarchy-data";

export type CellHighlightKind =
  | "king-row"
  | "senior-cross"
  | "senior-band"
  | "spirit-god"
  | "kerubic-god"
  | "name-run"
  | null;

export type CellHighlight = {
  kind: CellHighlightKind;
  /** Human-readable labels (e.g. matched name or structural role). */
  labels: string[];
};

export type GridHighlightMap = CellHighlight[][];

const SUB_QUADRANTS: [number, number][] = [
  [0, 2],
  [3, 5],
  [6, 8],
  [9, 11]
];

const SENIOR_CROSS_ROWS = [2, 3, 4];
const SPIRIT_GOD_ROW = 6;
const KERUBIC_ROW = 0;
const KING_ROW = 12;

function emptyMap(rows: number, cols: number): GridHighlightMap {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ kind: null, labels: [] }))
  );
}

function setCell(
  map: GridHighlightMap,
  r: number,
  c: number,
  kind: CellHighlightKind,
  label: string
) {
  if (!map[r]?.[c]) return;
  const cell = map[r][c];
  if (!cell.labels.includes(label)) cell.labels.push(label);
  if (!cell.kind || priority(kind) > priority(cell.kind)) {
    cell.kind = kind;
  }
}

function priority(kind: CellHighlightKind): number {
  switch (kind) {
    case "name-run":
      return 5;
    case "spirit-god":
      return 4;
    case "senior-cross":
      return 3;
    case "kerubic-god":
      return 2;
    case "senior-band":
      return 2;
    case "king-row":
      return 1;
    default:
      return 0;
  }
}

function applyStructuralPattern(map: GridHighlightMap, rows: number, cols: number) {
  if (cols < 12 || rows < 13) return;

  for (const [c0, c1] of SUB_QUADRANTS) {
    for (let c = c0; c <= c1 && c < cols; c++) {
      setCell(map, KERUBIC_ROW, c, "kerubic-god", "Kerubic god-name row");
    }
    if (SPIRIT_GOD_ROW < rows) {
      for (let c = c0; c <= c1 && c < cols; c++) {
        setCell(map, SPIRIT_GOD_ROW, c, "spirit-god", "Spirit god-name (3-letter)");
      }
    }
  }

  for (let seniorIdx = 0; seniorIdx < 6; seniorIdx++) {
    const c0 = seniorIdx * 2;
    const c1 = c0 + 1;
    if (c1 >= cols) break;
    for (const r of SENIOR_CROSS_ROWS) {
      if (r >= rows) continue;
      for (let c = c0; c <= c1; c++) {
        setCell(map, r, c, "senior-cross", `Senior ${seniorIdx + 1} (6-letter cross)`);
      }
    }
    if (SENIOR_CROSS_ROWS[0] < rows) {
      setCell(map, SENIOR_CROSS_ROWS[0], c0, "senior-band", `Senior ${seniorIdx + 1} opening pair`);
      if (c1 < cols) setCell(map, SENIOR_CROSS_ROWS[0], c1, "senior-band", `Senior ${seniorIdx + 1} opening pair`);
    }
  }

  if (KING_ROW < rows) {
    for (let c = 0; c < cols; c++) {
      setCell(map, KING_ROW, c, "king-row", "King / servient base row");
    }
  }
}

type NameRun = { name: string; r: number; c: number; dr: number; dc: number };

function findNameRuns(grid: string[][], name: string): NameRun[] {
  const n = name.toUpperCase().replace(/[^A-Z]/g, "");
  if (n.length < 3) return [];

  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const dirs: [number, number][] = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1]
  ];
  const runs: NameRun[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of dirs) {
        let built = "";
        for (let i = 0; i < n.length; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) break;
          built += (grid[nr][nc] ?? "").toUpperCase();
        }
        if (built === n) runs.push({ name: n, r, c, dr, dc });
      }
    }
  }
  return runs;
}

function applyNameRun(map: GridHighlightMap, run: NameRun) {
  for (let i = 0; i < run.name.length; i++) {
    const r = run.r + run.dr * i;
    const c = run.c + run.dc * i;
    setCell(map, r, c, "name-run", run.name);
  }
}

function collectSearchNames(
  quadrant: WatchtowerQuadrant,
  tablet: { seniors: string[]; angelicKing: string; divineName: string }
): string[] {
  const names = new Set<string>();
  const add = (s: string | null | undefined) => {
    const u = (s ?? "").toUpperCase().replace(/[^A-Z]/g, "");
    if (u.length >= 3) names.add(u);
  };

  add(tablet.divineName);
  add(tablet.angelicKing);
  tablet.seniors.forEach((s) => add(s));

  const hierarchy = getHierarchyForQuadrant(quadrant);
  if (hierarchy) {
    hierarchy.seniors.godName.forEach((g) => add(g));
    hierarchy.seniors.names.forEach((s) => add(s));
    hierarchy.seniors.alternateNames?.forEach((s) => add(s ?? undefined));

    for (const group of [
      hierarchy.angelsOfMedicine,
      hierarchy.angelsOfPreciousStones,
      hierarchy.angelsOfTransformation
    ]) {
      group.godNames.forEach((g) => add(g));
      group.godNamesReversed.forEach((g) => add(g));
      group.angels.forEach((a) => {
        add(a.name);
        add(a.alternate ?? undefined);
      });
    }
  }

  if (quadrant === "air") {
    ["ORO", "IBAH", "AOZPI"].forEach((g) => add(g));
  }
  if (quadrant === "fire") {
    ["MOR", "DIAL", "HCTGA"].forEach((g) => add(g));
  }
  if (quadrant === "water") {
    ["OIP", "TEAA", "PDOCE"].forEach((g) => add(g));
  }
  if (quadrant === "earth") {
    ["MPH", "ARSL", "GAIOL"].forEach((g) => add(g));
  }

  return [...names].sort((a, b) => b.length - a.length);
}

export function getGridHighlightMap(
  quadrant: WatchtowerQuadrant,
  grid: string[][],
  tablet: { seniors: string[]; angelicKing: string; divineName: string }
): GridHighlightMap {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const map = emptyMap(rows, cols);

  applyStructuralPattern(map, rows, cols);

  const names = collectSearchNames(quadrant, tablet);
  const seen = new Set<string>();

  for (const name of names) {
    const runs = findNameRuns(grid, name);
    for (const run of runs) {
      const key = `${run.name}:${run.r}:${run.c}:${run.dr}:${run.dc}`;
      if (seen.has(key)) continue;
      seen.add(key);
      applyNameRun(map, run);
    }
  }

  return map;
}

export const HIGHLIGHT_LEGEND: {
  kind: NonNullable<CellHighlightKind>;
  label: string;
  description: string;
}[] = [
  {
    kind: "name-run",
    label: "Matched name",
    description: "Letters forming a known god-name, senior, or angel name from the hierarchy data."
  },
  {
    kind: "spirit-god",
    label: "Spirit god-names",
    description: "Three-letter divine names on the spirit row (Golden Dawn reading)."
  },
  {
    kind: "senior-cross",
    label: "Senior cross",
    description: "Six 2×3 letter-blocks — each Senior name reads across rows 3–5."
  },
  {
    kind: "senior-band",
    label: "Senior opening pair",
    description: "First letter-pair of each Senior on the horizontal band."
  },
  {
    kind: "kerubic-god",
    label: "Kerubic row",
    description: "Top row of each 3-column sub-quadrant."
  },
  {
    kind: "king-row",
    label: "King row",
    description: "Bottom row where the Elemental King name is extracted."
  }
];

export function primaryHighlightKind(cell: CellHighlight): CellHighlightKind {
  return cell.kind;
}
