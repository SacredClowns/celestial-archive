import loagaethRaw from "@/content/phase-3-data/loagaeth-viewer-data.json";
import type {
  LoagaethComparisonSource,
  LoagaethLeaf,
  LoagaethViewerData
} from "@/lib/observatory/loagaeth-types";

const data = loagaethRaw as LoagaethViewerData;

export function getViewerData(): LoagaethViewerData {
  return data;
}

export function getLeafByNumber(n: number): LoagaethLeaf {
  const leaf = data.leaves.find((item) => item.leafNumber === n);
  if (!leaf) {
    throw new Error(`Unknown Loagaeth leaf number: ${n}`);
  }
  return leaf;
}

export function getAllLeaves(): LoagaethLeaf[] {
  return data.leaves;
}

export function getLeavesInDictationOrder(): LoagaethLeaf[] {
  return [...data.leaves].sort((a, b) => a.dictationOrder - b.dictationOrder);
}

/**
 * Placeholder for independent transcriptions. The current shipped dataset does not
 * include per-cell second-source transcriptions yet.
 */
export function getComparisonsForLeaf(_leafNumber: number, _side: "recto" | "verso"): LoagaethComparisonSource[] {
  return [];
}
