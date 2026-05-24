import hierarchyRaw from "@/content/phase-4-data/watchtower-hierarchy-data.json";
import type { WatchtowerQuadrant } from "@/lib/watchtowers/watchtower-types";

type AngelRow = { name: string; alternate?: string | null };
type AngelGroup = {
  godNames: string[];
  angels: AngelRow[];
  cacodemons: string[];
  godNamesReversed: string[];
};

type QuarterData = {
  direction: string;
  element: string;
  seniors: {
    godName: string[];
    names: string[];
    alternateNames?: (string | null)[];
  };
  angelsOfMedicine: AngelGroup;
  angelsOfPreciousStones: AngelGroup;
  angelsOfTransformation: AngelGroup;
};

const data = hierarchyRaw as {
  quarters: Record<string, QuarterData>;
};

const DIR_TO_QUADRANT: Record<string, WatchtowerQuadrant> = {
  east: "air",
  south: "water",
  west: "earth",
  north: "fire"
};

export function getHierarchyQuarter(direction: keyof typeof data.quarters) {
  return data.quarters[direction];
}

export function getHierarchyForQuadrant(quadrant: WatchtowerQuadrant) {
  const entry = Object.entries(DIR_TO_QUADRANT).find(([, q]) => q === quadrant);
  if (!entry) return null;
  return getHierarchyQuarter(entry[0] as keyof typeof data.quarters);
}

export const HIERARCHY_NOTES = {
  medicine:
    "These are the sixteen good angels who are most skilled and powerful in medicine and in the curing of diseases.",
  preciousStones:
    "These are the names of the sixteen good angels who are powerful and learned in the finding, collection, use, and virtues of metals, and in the coagulations and powers of jewels.",
  transformation:
    "These are the names of the sixteen good angels who are powerful and learned in Transformation.",
  cacodemons:
    "These are the corresponding cacodemons — entities that can inflict the inverse of what the good angels provide. Their names are listed for completeness, not for invocation."
} as const;
