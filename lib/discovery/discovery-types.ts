export type DiscoveryKind =
  | "manuscript"
  | "term"
  | "pattern"
  | "connection"
  | "question"
  | "insight";

export type DiscoveryEntry = {
  id: string;
  kind: DiscoveryKind;
  title: string;
  note: string;
  href?: string;
  createdAt: string;
};

export type DiscoveryStore = {
  entries: DiscoveryEntry[];
};

export const DISCOVERY_STORAGE_KEY = "celestial-archive-discoveries";
