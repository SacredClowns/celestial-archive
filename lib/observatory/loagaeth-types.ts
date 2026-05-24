export type TranscriptionStatus = "transcribed" | "partially-transcribed" | "catalogued" | "unverified";
export type ContentType = "letter-grid" | "word-grid" | "mixed" | "text";
export type UncertaintyLevel = "certain" | "probable" | "uncertain" | "contested" | "unknown";
export type SymmetryType = "rotational" | "reflective" | "diagonal" | "positional" | "other";

export type LoagaethCell = {
  character: string;
  row: number;
  col: number;
  uncertaintyLevel: UncertaintyLevel;
  note: string | null;
};

export type SymmetryNote = {
  type: SymmetryType;
  description: string;
  discoveredBy: string | null;
  uncertaintyLevel: UncertaintyLevel;
};

export type ScholarshipNote = {
  scholar: string;
  observation: string;
  badge: string;
};

export type LeafSide = {
  gridRows: number | null;
  gridColumns: number | null;
  contentType: ContentType;
  description: string;
  transcriptionSource: string | null;
  transcriptionStatus: TranscriptionStatus;
  uncertaintyLevel: UncertaintyLevel;
  cells: LoagaethCell[][] | "PENDING_TRANSCRIPTION" | null;
  structuralNotes: string | null;
};

export type LoagaethLeaf = {
  leafNumber: number;
  dictationOrder: number;
  recto: LeafSide;
  verso: LeafSide;
  scholarshipNotes: ScholarshipNote[];
  symmetryAnalysis: SymmetryNote[] | null;
};

export type LoagaethViewerData = {
  id: string;
  title: string;
  subtitle: string;
  totalLeaves: number;
  totalGridPages: number;
  standardGridDimensions: { rows: number; columns: number };
  dictationOrder: string;
  leaves: LoagaethLeaf[];
};

export type LoagaethOrder = "manuscript" | "dictation";
export type LoagaethSideKey = "recto" | "verso";

export type OverlayMode = {
  frequency: boolean;
  symmetry: boolean;
  repetition: boolean;
};

export type LoagaethComparisonSource = {
  id: string;
  label: string;
  witness: string;
  cells: LoagaethCell[][];
};
