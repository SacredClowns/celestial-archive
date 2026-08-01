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
  "the-ink-on-the-page": "STAGE_3_OBSERVER_LESSON_1.md"
};

export type LoadedObserverMarkdown = {
  frontmatter: LessonMarkdownFrontmatter;
  main: string;
  closing: string;
  postface: string;
};

function readLessonFile(slug: string): string {
  const file = SLUG_TO_FILE[slug];
  if (!file) {
    throw new Error(`No markdown file mapped for Observer slug: ${slug}`);
  }
  const abs = path.join(process.cwd(), "content", "curriculum", "stage-3-observer", file);
  return readFileSync(abs, "utf8");
}

/** Loads and splits canonical Observer lesson markdown. Cached per request. */
export const loadObserverLessonMarkdown = cache((slug: string): LoadedObserverMarkdown => {
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

export function observerMarkdownExists(slug: string): boolean {
  return Boolean(SLUG_TO_FILE[slug]);
}
