import aethyrRaw from "@/content/phase-4-data/aethyr-explorer-data.json";
import type { AethyrData, AethyrExplorerData } from "@/lib/aethyrs/aethyr-types";

type RawFile = {
  totalAethyrs: number;
  totalGovernors: number;
  source?: string;
  manuscriptSource?: string;
  badge?: string;
  columnKey?: Record<string, string>;
  angelicKings?: AethyrExplorerData["angelicKings"];
  aethyrs: Array<{
    number: number;
    name: string;
    order: string;
    totalMinisters?: number;
    governors: AethyrData["governors"];
    callVariant?: string;
    badge?: string;
  }>;
  _dataStatus?: AethyrExplorerData["_dataStatus"];
};

const raw = aethyrRaw as RawFile;

const normalizedAethyrs: AethyrData[] = raw.aethyrs.map((a) => ({
  number: a.number,
  name: a.name,
  order: a.order,
  totalMinisters: a.totalMinisters,
  callVariant: a.callVariant ?? a.name,
  badge: a.badge ?? raw.badge ?? "historical",
  governors: a.governors
}));

const data: AethyrExplorerData = {
  source: raw.source,
  manuscriptSource: raw.manuscriptSource,
  badge: raw.badge,
  totalAethyrs: raw.totalAethyrs,
  totalGovernors: raw.totalGovernors,
  columnKey: raw.columnKey,
  angelicKings: raw.angelicKings,
  aethyrs: normalizedAethyrs,
  _dataStatus: raw._dataStatus
};

export function getAethyrExplorerData(): AethyrExplorerData {
  return data;
}

export function getAllAethyrs(): AethyrData[] {
  return data.aethyrs;
}

export function getAethyrByName(name: string): AethyrData | undefined {
  const upper = name.toUpperCase();
  return data.aethyrs.find((a) => a.name === upper);
}

export function getAethyrByNumber(num: number): AethyrData | undefined {
  return data.aethyrs.find((a) => a.number === num);
}

export function getAdjacentAethyrs(name: string): {
  aethyr: AethyrData;
  prev: AethyrData | null;
  next: AethyrData | null;
} {
  const aethyr = getAethyrByName(name);
  if (!aethyr) throw new Error(`Unknown Aethyr: ${name}`);
  const sorted = [...data.aethyrs].sort((a, b) => a.number - b.number);
  const idx = sorted.findIndex((a) => a.number === aethyr.number);
  return {
    aethyr,
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null
  };
}

export function getAethyrsForRingDisplay(): AethyrData[] {
  return [...data.aethyrs].sort((a, b) => b.number - a.number);
}
