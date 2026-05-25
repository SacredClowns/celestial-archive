import type { SearchIndexEntry } from "@/lib/search/search-types";
import staticSearchIndex from "@/content/search-index.json";
import { buildSearchIndex } from "@/lib/search/build-search-index-data";

export { buildSearchIndex } from "@/lib/search/build-search-index-data";

let cached: SearchIndexEntry[] | null = null;

export function getSearchIndex(): SearchIndexEntry[] {
  if (!cached) {
    const staticItems = staticSearchIndex as SearchIndexEntry[];
    cached = staticItems.length > 0 ? staticItems : buildSearchIndex();
  }
  return cached;
}

export type SearchIndexResult = {
  grouped: Record<string, SearchIndexEntry[]>;
  totals: Record<string, number>;
};

function matchesQuery(item: SearchIndexEntry, q: string): boolean {
  return item.searchText.includes(q) || item.title.toLowerCase().includes(q);
}

/** All matches grouped by type (unsliced). */
export function searchIndexAll(query: string): Record<string, SearchIndexEntry[]> {
  const q = query.trim().toLowerCase();
  if (!q) return {};
  const grouped: Record<string, SearchIndexEntry[]> = {};
  for (const item of getSearchIndex()) {
    if (!matchesQuery(item, q)) continue;
    if (!grouped[item.type]) grouped[item.type] = [];
    grouped[item.type].push(item);
  }
  return grouped;
}

export function searchIndex(
  query: string,
  limitPerType = 5,
  expandedTypes: ReadonlySet<string> = new Set()
): SearchIndexResult {
  const all = searchIndexAll(query);
  const grouped: Record<string, SearchIndexEntry[]> = {};
  const totals: Record<string, number> = {};

  for (const [type, items] of Object.entries(all)) {
    totals[type] = items.length;
    const limit = expandedTypes.has(type) ? items.length : limitPerType;
    grouped[type] = items.slice(0, limit);
  }

  return { grouped, totals };
}
