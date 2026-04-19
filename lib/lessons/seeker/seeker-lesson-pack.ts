import type { ClaimSource, EpistemicTone, GlossaryItem, LessonSidebarManifest } from "@/lib/lesson-types";

/** Structured lesson data that is not authored lesson prose — sidebars, glossary surface, claim panels. */
export type SeekerLessonPack = {
  duration: string;
  epistemicTones: EpistemicTone[];
  sidebar: LessonSidebarManifest;
  glossarySurface: GlossaryItem[];
  sourceClaims: ClaimSource[];
  relationshipChain: string[];
};
