export type PronunciationTradition = "dee" | "goldenDawn" | "modern";

export type BadgeKind = "historical" | "consensus" | "later" | "occult";

export type PronunciationEntry = {
  description: string;
  ipa: string;
  englishApprox?: string;
  badge: BadgeKind;
};

export type LetterPhonology = {
  dee: PronunciationEntry;
  goldenDawn: PronunciationEntry;
  modern: PronunciationEntry;
};

export type ScholarNote = {
  scholar: string;
  observation: string;
  badge: string;
};

export type EnochianLetter = {
  position: number;
  name: string;
  englishEquivalent: string;
  fontCharacter: string;
  phonology: LetterPhonology;
  historicalNote: {
    text: string;
    source: string;
    badge: string;
  };
  exampleWords: string[];
  scholarlyNotes: ScholarNote[];
};

export type EnochianAlphabetData = {
  id: string;
  title: string;
  subtitle: string;
  totalLetters: number;
  writingDirection: string;
  receptionDate: string;
  letters: EnochianLetter[];
};

export type DictionaryCorpusStatistics = {
  hapaxLegomena: number;
  frequencyBands: Record<string, number>;
  topWords: { word: string; count: number }[];
};

export type FullDictionaryFile = {
  source: string;
  manuscriptSource: string;
  badge: string;
  note: string;
  totalUniqueWords: number;
  totalWordTokens: number;
  corpusStatistics: DictionaryCorpusStatistics;
  entries: DictionaryEntry[];
};

export type DictionaryEntry = {
  id: string;
  enochian: string;
  transliteration: string;
  pronunciation: {
    dee?: string | null;
    goldenDawn?: string | null;
    modern?: string | null;
  };
  meanings: {
    english: string;
    source: string;
    badge: string;
  }[];
  partOfSpeech: string | null;
  sourceLocation: string;
  frequency: number;
  callAppearances?: number[];
  relatedWords: string[];
  morphologicalNotes: string | null;
  scholarlyNotes: ScholarNote[];
};

export type CoreVocabularyRow = {
  enochian: string;
  meaning: string;
  partOfSpeech: string;
  frequency: number;
  badge: string;
  pronunciation?: string;
  note?: string;
};

export type CallLine = {
  lineNumber: number;
  enochian: string;
  english: string;
  pronunciation: {
    dee: string;
    goldenDawn: string;
    modern: string;
  };
  words: {
    enochian: string;
    dictionaryRef: string | null;
  }[];
};

export type CallAssociation = {
  type: "watchtower" | "aethyr" | "general";
  description: string;
  badge: string;
  deeNote?: string;
};

export type AngelicCall = {
  number: number;
  title: string;
  totalLines: number;
  lines: CallLine[] | "PENDING_TRANSCRIPTION";
  association: CallAssociation;
  historicalNotes: {
    text: string;
    source: string;
    badge: string;
  }[];
  scholarlyNotes: ScholarNote[];
  receptionOrder: number;
  uniqueWords?: number;
  totalWords?: number;
  aethyrVariable?: {
    position: string;
    placeholder: string;
    note: string;
  };
};

export type AethyrName = {
  number: number;
  name: string;
};

export type CallsData = {
  id: string;
  title: string;
  subtitle?: string;
  totalCalls: number;
  receptionDate: string;
  receptionLocation: string;
  receptionBadge?: string;
  receptionOrder?: string;
  calls: AngelicCall[];
  aethyrNames: AethyrName[];
  coreVocabulary: CoreVocabularyRow[];
};

export type DigraphRow = {
  digraph: string;
  sound: string;
  englishExample: string;
  source: string;
};

export type CallWordEntry = {
  pos: string;
  enochian: string;
  pronunciation: string;
  english: string;
};

export type CallTextData = {
  number: number;
  title: string;
  enochianText: string;
  words: CallWordEntry[];
  footnotes: string[];
};

export type CallsTextDataFile = {
  source: string;
  manuscriptSource: string;
  badge: string;
  note: string;
  calls: CallTextData[];
};

export type CallCorpusStatistics = {
  totalUniqueWords: number;
  averageWordsPerCall: number;
  longest: { number: number; title: string; count: number };
  shortest: { number: number; title: string; count: number };
  topWords: { word: string; count: number }[];
  wordsPerCall: { number: number; title: string; count: number }[];
};

export type LegendItem = { label: string; description: string };

export type DictionaryFilterOption = { id: string; label: string; description: string };

export type DictionaryEntryLabels = {
  enochian: string;
  transliteration: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  source: string;
  frequency: string;
  related: string;
  notes: string;
};

export type CallSectionLabels = {
  enochianText: string;
  englishTranslation: string;
  pronunciationGuide: string;
  wordBreakdown: string;
  historicalNotes: string;
  scholarship: string;
  association: string;
};

export type PronunciationTraditionLabel = {
  key: PronunciationTradition;
  label: string;
  description: string;
};

/** Narrative copy from `content/phase-4-data/language-chamber-content.md` */
export type LanguageChamberContent = {
  landingIntro: string[];
  landingSubtitle: string;
  landingSummary: string;
  alphabetHeader: string;
  dictionaryHeader: string;
  callsHeader: string;
  pronunciationHeader: string;
  sourceNote: string;
  traditionDee: string;
  traditionGd: string;
  traditionModern: string;
  pronunciationComparisonNote: string;
  digraphs: DigraphRow[];
  alphabetLegend: LegendItem[];
  traditionLabels: Record<PronunciationTradition, string>;
  letterLabels: {
    glyph: string;
    name: string;
    mapsTo: string;
    pronunciation: string;
    writingDirection: string;
    historicalReception: string;
    scholarlyObservation: string;
    exampleWords: string;
  };
  writingDirectionNote: string;
  fontNote: string;
  dictionarySearchPlaceholder: string;
  dictionaryFilters: DictionaryFilterOption[];
  dictionaryEntryLabels: DictionaryEntryLabels;
  dictionaryEmptySearch: string;
  numberSystemNote: string;
  callSectionLabels: CallSectionLabels;
  pronunciationTraditions: PronunciationTraditionLabel[];
  call19SpecialNote: string;
  call19AethyrPrompt: string;
  call19AethyrFootnote: string;
  callsAssociationNote: string;
  pronounsHeader: string;
  verbConjugationHeader: string;
  biblicalEchoesHeader: string;
  wordNotFound: string;
  pronunciationUnavailable: string;
  callTextLoading: string;
  noScholarlyNotes: string;
  mobileGridWarning: string;
  chamberPanels: Array<{ href: string; title: string; subtitle: string }>;
};
