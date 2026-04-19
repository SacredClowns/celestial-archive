import { existsSync } from "node:fs";
import path from "node:path";
import type { StudentLessonRecord } from "@/lib/student/student-lesson-registry";
import { getStudentRecordBySlug } from "@/lib/student/student-lesson-registry";

const STAGE_DIR = path.join(process.cwd(), "content", "curriculum", "stage-2-student");

/** Server-only: whether the lesson markdown file for this slug exists on disk. */
export function studentLessonMarkdownExists(slug: string): boolean {
  const r = getStudentRecordBySlug(slug);
  if (!r?.markdownFileName) return false;
  return existsSync(path.join(STAGE_DIR, r.markdownFileName));
}

/** Server-only: whether the named source pack file exists beside the lesson. */
export function studentSourcePackFileExists(fileName: string): boolean {
  return existsSync(path.join(STAGE_DIR, fileName));
}

/** Filing state for stage index / audits — honest, not gamified. */
export function studentLessonFilingSnapshot(record: StudentLessonRecord): {
  lessonOnDisk: boolean;
  sourcePackOnDisk: boolean;
} {
  return {
    lessonOnDisk: studentLessonMarkdownExists(record.slug),
    sourcePackOnDisk: Boolean(record.sourcePackFileName && studentSourcePackFileExists(record.sourcePackFileName))
  };
}
