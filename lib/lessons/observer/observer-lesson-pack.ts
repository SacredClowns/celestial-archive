import type { ClaimSource, EpistemicTone, GlossaryItem, LessonSidebarManifest } from "@/lib/lesson-types";

/** Non-prose Observer lesson machinery — sidebar, glossary surface, claim panels. */
export type ObserverLessonPack = {
  duration: string;
  epistemicTones: EpistemicTone[];
  sidebar: LessonSidebarManifest;
  glossarySurface: GlossaryItem[];
  sourceClaims: ClaimSource[];
  relationshipChain: string[];
  /** Shown to the reader when the folio's source pack has not yet cleared review. */
  verificationNote?: string;
};
