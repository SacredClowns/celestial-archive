import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { LessonMarkdownFrontmatter } from "@/lib/lesson-markdown/types";
import {
  extractClosingPassage,
  extractMainReaderColumn,
  extractPostface
} from "@/lib/lesson-markdown/split-body";

const SLUG_TO_FILE: Record<string, string> = {
  "the-lost-language": "STAGE_1_SEEKER_LESSON_1.md",
  "the-partnership": "STAGE_1_SEEKER_LESSON_2.md",
  "the-first-transmissions": "STAGE_1_SEEKER_LESSON_3.md",
  "the-enochian-language-emerges": "STAGE_1_SEEKER_LESSON_4.md",
  "the-long-arc-and-the-breaking": "STAGE_1_SEEKER_LESSON_5.md"
};

export type LoadedSeekerMarkdown = {
  frontmatter: LessonMarkdownFrontmatter;
  /** Reader column: Learning Goals → before Companion */
  main: string;
  closing: string;
  postface: string;
};

function readLessonFile(slug: string): string {
  const file = SLUG_TO_FILE[slug];
  if (!file) {
    throw new Error(`No markdown file mapped for slug: ${slug}`);
  }
  const abs = path.join(process.cwd(), "content", "curriculum", "stage-1-seeker", file);
  return readFileSync(abs, "utf8");
}

/**
 * Loads and splits canonical Seeker lesson markdown. Cached per request for static generation.
 */
export const loadSeekerLessonMarkdown = cache((slug: string): LoadedSeekerMarkdown => {
  const raw = readLessonFile(slug);
  const { data, content } = matter(raw);
  const fm = data as LessonMarkdownFrontmatter;
  const body = content.trim();

  return {
    frontmatter: fm,
    main: extractMainReaderColumn(body),
    closing: extractClosingPassage(body),
    postface: extractPostface(body)
  };
});
