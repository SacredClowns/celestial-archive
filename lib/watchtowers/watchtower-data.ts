import sloaneRaw from "@/content/phase-3-data/great-table-state-sloane-3191.json";
import goldenDawnRaw from "@/content/phase-3-data/great-table-state-golden-dawn.json";
import regardieRaw from "@/content/phase-3-data/great-table-state-regardie.json";
import reformedRaw from "@/content/phase-3-data/great-table-state-reformed.json";
import { getAllCalls } from "@/lib/language/language-data";
import type {
  GreatTableVersionId,
  GreatTableVersionMeta,
  TabletOfUnion,
  WatchtowerQuadrant,
  WatchtowerSystemData,
  WatchtowerTablet
} from "@/lib/watchtowers/watchtower-types";

type Cell = { letter: string };
type Quarter = {
  element: string;
  direction?: string;
  rowRange: number[];
  colRange: number[];
  seniorNames?: string[];
  kingName?: string;
  label?: string;
  notes?: string;
};
type StateFile = {
  label: string;
  description: string;
  stateData: {
    cells: Cell[][];
    elementalQuarters: Quarter[];
    tabletOfUnion?: { grid: string[][]; note?: string } | null;
  };
};

const VERSION_FILES: Record<GreatTableVersionId, StateFile> = {
  "sloane-3191": sloaneRaw as unknown as StateFile,
  "golden-dawn": goldenDawnRaw as unknown as StateFile,
  regardie: regardieRaw as unknown as StateFile,
  reformed: reformedRaw as unknown as StateFile
};

export const GREAT_TABLE_VERSIONS: GreatTableVersionMeta[] = [
  { id: "sloane-3191", label: "Sloane 3191", description: "Earliest surviving grid (c. 1584)" },
  { id: "golden-dawn", label: "Golden Dawn", description: "Mathers rearrangement (c. 1890)" },
  { id: "regardie", label: "Regardie", description: "20th-century published table" },
  { id: "reformed", label: "Reformed", description: "1587 Raphael correction layer" }
];

const ELEMENT_TO_QUADRANT: Record<string, WatchtowerQuadrant> = {
  air: "air",
  water: "water",
  earth: "earth",
  fire: "fire"
};

const DIRECTION_MAP: Record<WatchtowerQuadrant, WatchtowerTablet["direction"]> = {
  air: "East",
  water: "West",
  earth: "North",
  fire: "South"
};

const QUADRANT_TINT: Record<WatchtowerQuadrant, string> = {
  air: "border-gold/30 bg-gold/5",
  water: "border-sky-900/40 bg-sky-950/20",
  earth: "border-emerald-900/30 bg-emerald-950/15",
  fire: "border-red-950/40 bg-red-950/15"
};

export function getQuadrantTint(quadrant: WatchtowerQuadrant): string {
  return QUADRANT_TINT[quadrant];
}

function extractSubgrid(cells: Cell[][], quarter: Quarter): string[][] {
  const [r0, r1] = quarter.rowRange as [number, number];
  const [c0, c1] = quarter.colRange as [number, number];
  const rows: string[][] = [];
  for (let r = r0; r <= r1; r++) {
    const row: string[] = [];
    for (let c = c0; c <= c1; c++) {
      row.push(cells[r]?.[c]?.letter ?? "·");
    }
    rows.push(row);
  }
  return rows;
}

function divineNameFromGrid(grid: string[][]): string {
  return grid[0]?.slice(0, 8).join("") ?? "";
}

function callsForQuadrant(quadrant: WatchtowerQuadrant): number[] {
  return getAllCalls()
    .filter((c) => c.association.type === "watchtower")
    .filter((c) => {
      const d = c.association.description.toLowerCase();
      if (quadrant === "air") return d.includes("air") || d.includes("first");
      if (quadrant === "water") return d.includes("water") || d.includes("second");
      if (quadrant === "earth") return d.includes("earth") || d.includes("third");
      if (quadrant === "fire") return d.includes("fire") || d.includes("fourth");
      return true;
    })
    .map((c) => c.number);
}

function buildTabletsFromVersion(versionId: GreatTableVersionId): WatchtowerTablet[] {
  const file = VERSION_FILES[versionId];
  const { cells, elementalQuarters } = file.stateData;
  const tablets: WatchtowerTablet[] = [];

  for (const q of elementalQuarters) {
    if (q.element === "debated" || !(q.element in ELEMENT_TO_QUADRANT)) continue;
    const quadrant = ELEMENT_TO_QUADRANT[q.element];
    const grid = extractSubgrid(cells, q);
    tablets.push({
      quadrant,
      direction: DIRECTION_MAP[quadrant],
      divineName: divineNameFromGrid(grid),
      seniors: q.seniorNames ?? [],
      angelicKing: q.kingName ?? "",
      grid,
      calls: callsForQuadrant(quadrant).length ? callsForQuadrant(quadrant) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      badge: versionId === "sloane-3191" ? "historical" : "later"
    });
  }

  return tablets;
}

export function getGreatTableVersion(versionId: GreatTableVersionId): StateFile {
  return VERSION_FILES[versionId];
}

export function getGreatTableFullGrid(versionId: GreatTableVersionId = "golden-dawn"): {
  grid: string[][];
  rows: number;
  columns: number;
  quarters: Quarter[];
} {
  const file = VERSION_FILES[versionId];
  const { cells, elementalQuarters } = file.stateData;
  const raw = file.stateData as { rows?: number; columns?: number };
  const grid = cells.map((row) => row.map((c) => c.letter || "·"));
  return {
    grid,
    rows: raw.rows ?? grid.length,
    columns: raw.columns ?? grid[0]?.length ?? 0,
    quarters: elementalQuarters
  };
}

export function getWatchtowerSystem(versionId: GreatTableVersionId = "golden-dawn"): WatchtowerSystemData {
  const file = VERSION_FILES[versionId];
  const tablets = buildTabletsFromVersion(versionId);
  const letters = file.stateData.cells.flat().filter((c) => c.letter && c.letter !== "·").length;
  const union = file.stateData.tabletOfUnion;

  return {
    tablets,
    tabletOfUnion: union
      ? {
          grid: union.grid,
          purpose: union.note ?? "Tablet of Union — Spirit bridging the four quarters",
          badge: "later"
        }
      : null,
    greatTableVersions: ["sloane-3191", "golden-dawn", "regardie", "reformed"],
    totalLetters: letters,
    extractableAngelNamesEstimate: "hundreds (by letter-reading rules)"
  };
}

export function getTabletByQuadrant(
  quadrant: WatchtowerQuadrant,
  versionId: GreatTableVersionId = "golden-dawn"
): WatchtowerTablet {
  const tablet = getWatchtowerSystem(versionId).tablets.find((t) => t.quadrant === quadrant);
  if (tablet) return tablet;
  if (versionId !== "golden-dawn") {
    return getTabletByQuadrant(quadrant, "golden-dawn");
  }
  throw new Error(`No tablet for quadrant: ${quadrant}`);
}

export function getTabletOfUnion(versionId: GreatTableVersionId = "golden-dawn"): TabletOfUnion | null {
  return getWatchtowerSystem(versionId).tabletOfUnion;
}

export function compareQuadrantGrids(
  quadrant: WatchtowerQuadrant
): { versionId: GreatTableVersionId; grid: string[][] }[] {
  return (Object.keys(VERSION_FILES) as GreatTableVersionId[]).map((versionId) => ({
    versionId,
    grid: getTabletByQuadrant(quadrant, versionId).grid
  }));
}
