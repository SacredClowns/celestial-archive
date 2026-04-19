/**
 * YAML frontmatter for Seeker curriculum markdown (Stage 1).
 * Merged at load time with `SeekerLessonRecord` from `content-registry.ts`.
 */
export type LessonMarkdownFrontmatter = {
  /** Registry id, e.g. seeker-1-1 */
  id?: string;
  title?: string;
  subtitle?: string;
  /** e.g. seeker */
  stage?: string;
  order?: number;
  slug?: string;
  lessonNumber?: string;
  duration?: string;
  sourcePackId?: string;
  /** Optional override for archival source-pack descriptor (Student). */
  sourcePackDescriptor?: string;
  glossaryTerms?: string[];
  timelineAnchors?: Array<{ date: string; event: string }>;
  previousLessonId?: string | null;
  nextLessonId?: string | null;
  nextIsThreshold?: boolean;
  /** Editorial / pipeline status */
  status?: "draft" | "open" | "shadow" | "locked";
  /** Optional hook for future sidebar JSON or manifest id */
  sidebarManifest?: string;
  /** Compact header badges — must match EpistemicTone slugs */
  epistemicTonesHeader?: string[];
};
