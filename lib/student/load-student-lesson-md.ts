import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { LessonMarkdownFrontmatter } from "@/lib/lesson-markdown/types";
import { studentLessonMarkdownExists } from "@/lib/student/student-content-flags";
import { getStudentRecordBySlug } from "@/lib/student/student-lesson-registry";
import { preprocessVerificationPendingInMarkdown } from "@/lib/lesson-markdown/verification-pending-markers";
import {
  extractClosingPassage,
  extractMainReaderColumn,
  extractPostface
} from "@/lib/lesson-markdown/split-body";

const STAGE_ABS = path.join(process.cwd(), "content", "curriculum", "stage-2-student");

export type LoadedStudentMarkdown = {
  frontmatter: LessonMarkdownFrontmatter;
  main: string;
  closing: string;
  postface: string;
};

export function hasStudentLessonMarkdown(slug: string): boolean {
  return studentLessonMarkdownExists(slug);
}

/**
 * Loads and splits Student lesson markdown (same companion / closing / postface rules as Seeker).
 * Filename comes from `studentLessonRegistry`; cached per request for static generation.
 */
export const loadStudentLessonMarkdown = cache((slug: string): LoadedStudentMarkdown => {
  const record = getStudentRecordBySlug(slug);
  if (!record?.markdownFileName) {
    throw new Error(`No markdown file mapped for Student slug: ${slug}`);
  }
  const abs = path.join(STAGE_ABS, record.markdownFileName);
  const raw = readFileSync(abs, "utf8");
  const { data, content } = matter(raw);
  const fm = data as LessonMarkdownFrontmatter;
  const body = content.trim();

  const main = preprocessVerificationPendingInMarkdown(extractMainReaderColumn(body));
  const closing = preprocessVerificationPendingInMarkdown(extractClosingPassage(body));
  const postface = preprocessVerificationPendingInMarkdown(extractPostface(body));

  return { frontmatter: fm, main, closing, postface };
});
