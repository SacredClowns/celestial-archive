export type AethyrGovernor = {
  number: number;
  name: string;
  region: string;
  ministers: number;
  angelicKing: string;
  kingNumber: number;
  tribe: string;
  quarter: string;
  sigil?: string;
  letterExtraction?: string;
};

export type AethyrData = {
  number: number;
  name: string;
  governors: AethyrGovernor[];
  callVariant: string;
  order: "supernal" | "middle" | "lower" | string;
  badge: string;
  totalMinisters?: number;
};

export type AngelicKingRow = {
  number: number;
  name: string;
  tribe: string;
  quarter: string;
};

export type AethyrExplorerData = {
  source?: string;
  manuscriptSource?: string;
  badge?: string;
  totalAethyrs: number;
  totalGovernors: number;
  columnKey?: Record<string, string>;
  angelicKings?: AngelicKingRow[];
  aethyrs: AethyrData[];
  _dataStatus?: {
    status: string;
    note?: string;
  };
};
