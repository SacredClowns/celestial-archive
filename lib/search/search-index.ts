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

export function searchIndex(query: string, limitPerType = 5): Record<string, SearchIndexEntry[]> {
  const q = query.trim().toLowerCase();
  if (!q) return {};
  const grouped: Record<string, SearchIndexEntry[]> = {};
  for (const item of getSearchIndex()) {
    if (!item.searchText.includes(q) && !item.title.toLowerCase().includes(q)) continue;
    if (!grouped[item.type]) grouped[item.type] = [];
    if (grouped[item.type].length < limitPerType) grouped[item.type].push(item);
  }
  return grouped;
}
