export type WatchtowerQuadrant = "air" | "water" | "earth" | "fire";

export type GreatTableVersionId = "sloane-3191" | "golden-dawn" | "regardie" | "reformed";

export type WatchtowerTablet = {
  quadrant: WatchtowerQuadrant;
  direction: "East" | "West" | "North" | "South";
  divineName: string;
  seniors: string[];
  angelicKing: string;
  grid: string[][];
  calls: number[];
  badge: string;
};

export type TabletOfUnion = {
  grid: string[][];
  purpose: string;
  badge: string;
};

export type WatchtowerSystemData = {
  tablets: WatchtowerTablet[];
  tabletOfUnion: TabletOfUnion | null;
  greatTableVersions: GreatTableVersionId[];
  totalLetters: number;
  extractableAngelNamesEstimate: string;
};

export type GreatTableVersionMeta = {
  id: GreatTableVersionId;
  label: string;
  description: string;
};
