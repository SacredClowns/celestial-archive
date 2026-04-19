export type EpistemicTone =
  | "historical"
  | "consensus"
  | "occult"
  | "later"
  | "speculative"
  | "parallel"
  | "disputed"
  | "caution";

export type LessonBlock =
  | { type: "paragraph"; text: string }
  | { type: "notice"; text: string }
  | { type: "discernment"; text: string }
  | { type: "reflection"; text: string }
  | { type: "warning"; text: string }
  | {
      type: "interpretations";
      items: Array<{ lens: string; tone: EpistemicTone; text: string }>;
    };

export type LessonSection = {
  heading: string;
  blocks: LessonBlock[];
};

export type GlossaryItem = {
  term: string;
  definition: string;
  category: string;
  beginnerLevel: string;
  relatedTerms: string[];
  badge?: EpistemicTone;
};

export type ClaimSource = {
  claimId: string;
  claimText: string;
  tone: EpistemicTone;
  who: string;
  source: string;
  confidence: string;
  competingInterpretation: string;
};

export type LessonSidebarManifest = {
  glossaryTerms: Array<{ term: string; hoverDefinition: string; badge?: EpistemicTone }>;
  relatedPeople: Array<{ name: string; role: string; lifespan: string }>;
  relatedTexts: Array<{ title: string; author: string; year: string; traditionColor: string }>;
  relatedSymbols: Array<{ symbol: string; description: string }>;
  relatedLessons: Array<{ lesson: string; connection: string }>;
  timelineAnchors: Array<{ date: string; event: string }>;
  relatedQuestions: string[];
  shadowItems: Array<{ concept: string; note: string }>;
};

export type LessonNavLink = {
  label: string;
  href?: string;
  note?: string;
  shadow?: boolean;
};

export type LessonContentMode = "markdown" | "structured";

export type LessonSchema = {
  /** Registry id, e.g. seeker-1-1 — set when serving Seeker lessons from the content registry */
  lessonId?: string;
  /** Source pack document id for archival reference */
  sourcePackId?: string;
  subtitle?: string;
  slug: string;
  title: string;
  stage: string;
  lessonNumber: string;
  duration: string;
  epistemicTones: EpistemicTone[];
  contentMode: LessonContentMode;

  /** Markdown lesson body (primary content). */
  markdownMain?: string;
  /** Markdown closing passage. */
  markdownClosing?: string;
  /** Markdown postface / source strip. */
  markdownPostface?: string;

  sidebar: LessonSidebarManifest;
  glossarySurface: GlossaryItem[];
  sourceClaims: ClaimSource[];
  relationshipChain: string[];

  previousLesson?: LessonNavLink;
  nextLesson?: LessonNavLink;
  timelineHookHref?: string;

  /** Learning goals displayed in the structured lesson view. */
  goals?: string[];

  /** Structured sections (used in non-markdown content mode). */
  sections?: LessonSection[];

  /** Knowledge check questions at the end of the lesson. */
  knowledgeChecks?: string[];

  /** Unlocks shown after lesson completion. */
  unlocks?: string[];

  /** When true, displays verification-pending chips in the markdown body. */
  verificationPending?: boolean;
};