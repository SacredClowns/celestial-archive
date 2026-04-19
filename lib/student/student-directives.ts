import { directiveNamesInMarkdown } from "@/lib/lesson-markdown/remark-lesson-directives";

/**
 * Canonical directive names supported in Stage 2 (Student) lesson manuscripts.
 * Keep this list small and stable; validation fails loudly on drift.
 */
export const STUDENT_DIRECTIVE_NAMES = [
  "notice",
  "discernment",
  "warning",
  "reflection",
  "knowledge-check",
  "multiple-interpretations",
  "unlocks",
  "source-strip",
  "closing-passage"
] as const;

export type StudentDirectiveName = (typeof STUDENT_DIRECTIVE_NAMES)[number];

export const STUDENT_DIRECTIVE_SET = new Set<string>(STUDENT_DIRECTIVE_NAMES);

export function studentDirectiveNamesInMarkdown(md: string): string[] {
  return directiveNamesInMarkdown(md);
}

