export type FormulaAnalytics = {
  copied: number;
  sharedTwitter: number;
  sharedBluesky: number;
  sharedLinkedIn: number;
  sharedGeneric: number;
};

export type FormulaEntry = {
  id: string;
  /** The aha spark — one clear sentence */
  spark: string;
  /** Deeper thought after the moment passes */
  elaboration: string;
  sourceLabel?: string;
  sourceHref?: string;
  tags: string[];
  /** 1 = surface recognition … 5 = mechanism-level integration */
  meditationDepth: 1 | 2 | 3 | 4 | 5;
  share: {
    draftShort: string;
    draftLong: string;
  };
  analytics: FormulaAnalytics;
  createdAt: string;
  updatedAt: string;
};

export type FormulaeStore = {
  entries: FormulaEntry[];
};

export const FORMULAE_STORAGE_KEY = "enochia-grimoire-formulae";

export const MEDITATION_DEPTH_LABELS: Record<FormulaEntry["meditationDepth"], string> = {
  1: "Surface — the word caught your eye",
  2: "Resonance — a pattern begins to hum",
  3: "Contemplation — you sit with the claim",
  4: "Integration — structure meets practice",
  5: "Mechanism — magick as a whole comes into view"
};
