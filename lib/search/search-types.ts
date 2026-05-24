export type SearchResultType =
  | "dictionary"
  | "glossary"
  | "lesson"
  | "call"
  | "aethyr"
  | "watchtower"
  | "alphabet"
  | "timeline";

export type SearchIndexEntry = {
  type: SearchResultType;
  title: string;
  subtitle: string;
  url: string;
  searchText: string;
  badge?: string;
};
