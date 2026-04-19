import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getGlossaryEntryByTerm } from "@/lib/glossary";
import { getSeekerRecordById } from "@/lib/content-registry";
import { extractMainReaderColumn } from "@/lib/lesson-markdown/split-body";
import type { LessonMarkdownFrontmatter } from "@/lib/lesson-markdown/types";
import { studentSourcePackFileExists } from "@/lib/student/student-content-flags";
import { STUDENT_DIRECTIVE_SET, studentDirectiveNamesInMarkdown } from "@/lib/student/student-directives";
import { studentLessonRegistry, type StudentLessonRecord } from "@/lib/student/student-lesson-registry";
import { comparisonRequirementLabels, studentComparisonSurfaceCount } from "@/lib/student/student-registry-helpers";

const STAGE_DIR = path.join(process.cwd(), "content", "curriculum", "stage-2-student");

export type StudentStageIssue = {
  code: string;
  lessonId: string;
  message: string;
};

function orderedLessons(): StudentLessonRecord[] {
  return [...studentLessonRegistry].sort((a, b) => a.order - b.order);
}

const ALLOWED_FRONTMATTER_KEYS = new Set<string>([
  "id",
  "title",
  "subtitle",
  "stage",
  "order",
  "slug",
  "lessonNumber",
  "duration",
  "sourcePackId",
  "sourcePackDescriptor",
  "glossaryTerms",
  "timelineAnchors",
  "previousLessonId",
  "nextLessonId",
  "nextIsThreshold",
  "status",
  "sidebarManifest",
  "epistemicTonesHeader"
]);

export function validateStudentManuscript(record: StudentLessonRecord, raw: string): StudentStageIssue[] {
  const issues: StudentStageIssue[] = [];
  let fm: LessonMarkdownFrontmatter;
  let body = "";

  try {
    const parsed = matter(raw);
    fm = parsed.data as LessonMarkdownFrontmatter;
    body = parsed.content.trim();
  } catch {
    issues.push({
      code: "FRONTMATTER_PARSE",
      lessonId: record.id,
      message: "YAML frontmatter could not be parsed"
    });
    return issues;
  }

  const need = (field: keyof LessonMarkdownFrontmatter, label: string) => {
    const v = fm[field];
    if (typeof v !== "string" || !v.trim()) {
      issues.push({ code: "FM_REQUIRED", lessonId: record.id, message: `Frontmatter missing or empty: ${label}` });
    }
  };

  need("title", "title");
  need("subtitle", "subtitle");
  need("lessonNumber", "lessonNumber");
  need("duration", "duration");
  need("sourcePackId", "sourcePackId");

  for (const key of Object.keys(fm as Record<string, unknown>)) {
    if (!ALLOWED_FRONTMATTER_KEYS.has(key)) {
      issues.push({
        code: "FM_UNKNOWN_KEY",
        lessonId: record.id,
        message: `Frontmatter key is not recognized by the Archive contract: "${key}"`
      });
    }
  }

  if (typeof fm.slug === "string" && fm.slug.trim() && fm.slug !== record.slug) {
    issues.push({
      code: "SLUG_MISMATCH",
      lessonId: record.id,
      message: `Frontmatter slug "${fm.slug}" ≠ registry slug "${record.slug}"`
    });
  }
  if (typeof fm.id === "string" && fm.id.trim() && fm.id !== record.id) {
    issues.push({
      code: "ID_MISMATCH",
      lessonId: record.id,
      message: `Frontmatter id "${fm.id}" ≠ registry id "${record.id}"`
    });
  }

  try {
    extractMainReaderColumn(body);
  } catch (e) {
    issues.push({
      code: "READER_COLUMN_SPLIT",
      lessonId: record.id,
      message: e instanceof Error ? e.message : "Reader column split failed"
    });
  }

  if (!body.includes(":::closing-passage")) {
    issues.push({
      code: "MISSING_CLOSING_PASSAGE",
      lessonId: record.id,
      message: "Folio is missing :::closing-passage."
    });
  }

  if (!body.includes(":::source-strip")) {
    issues.push({
      code: "MISSING_SOURCE_STRIP",
      lessonId: record.id,
      message: "Folio is missing :::source-strip."
    });
  }

  const directiveNames = studentDirectiveNamesInMarkdown(body);
  for (const name of directiveNames) {
    if (!STUDENT_DIRECTIVE_SET.has(name)) {
      issues.push({
        code: "UNSUPPORTED_DIRECTIVE",
        lessonId: record.id,
        message: `Unsupported :::${name} directive in Student folio. File the content using canonical directives only.`
      });
    }
  }

  const terms = fm.glossaryTerms?.length ? fm.glossaryTerms : record.glossaryTerms;
  for (const term of terms) {
    if (!getGlossaryEntryByTerm(term)) {
      issues.push({
        code: "GLOSSARY_TERM",
        lessonId: record.id,
        message: `Glossary term not indexed: "${term}"`
      });
    }
  }

  return issues;
}

/**
 * Lightweight invariant checks for Stage 2. Run in CI; fails loudly on registry/content drift.
 */
export function validateStudentStage(): StudentStageIssue[] {
  const issues: StudentStageIssue[] = [];
  const lessons = orderedLessons();
  const byId = new Map(lessons.map((r) => [r.id, r] as const));
  const slugs = new Set<string>();
  const lessonNumbers = new Set<string>();
  const sourcePackIds = new Set<string>();
  const sourcePackFiles = new Set<string>();

  for (const r of lessons) {
    if (!r.internalPreviewOnly) {
      issues.push({
        code: "PREVIEW_POSTURE",
        lessonId: r.id,
        message: "Student lessons must remain controlled preview (internalPreviewOnly: true)."
      });
    }

    if (slugs.has(r.slug)) {
      issues.push({ code: "DUPLICATE_SLUG", lessonId: r.id, message: `Duplicate slug: ${r.slug}` });
    }
    slugs.add(r.slug);

    if (lessonNumbers.has(r.lessonNumber)) {
      issues.push({
        code: "DUPLICATE_LESSON_NUMBER",
        lessonId: r.id,
        message: `Duplicate lessonNumber: ${r.lessonNumber}`
      });
    }
    lessonNumbers.add(r.lessonNumber);

    if (sourcePackIds.has(r.sourcePackId)) {
      issues.push({
        code: "DUPLICATE_SOURCE_PACK_ID",
        lessonId: r.id,
        message: `Duplicate sourcePackId: ${r.sourcePackId}`
      });
    }
    sourcePackIds.add(r.sourcePackId);

    if (r.sourcePackFileName) {
      if (sourcePackFiles.has(r.sourcePackFileName)) {
        issues.push({
          code: "DUPLICATE_SOURCE_PACK_FILENAME",
          lessonId: r.id,
          message: `Duplicate sourcePackFileName: ${r.sourcePackFileName}`
        });
      }
      sourcePackFiles.add(r.sourcePackFileName);
    }

    if (r.order < 1 || r.order > lessons.length) {
      issues.push({
        code: "ORDER_RANGE",
        lessonId: r.id,
        message: `order ${r.order} out of stage range`
      });
    }

    if (!r.markdownFileName) {
      issues.push({ code: "NO_MARKDOWN_MAP", lessonId: r.id, message: "markdownFileName is null" });
      continue;
    }

    const mdPath = path.join(STAGE_DIR, r.markdownFileName);
    if (!existsSync(mdPath)) {
      issues.push({
        code: "MARKDOWN_MISSING",
        lessonId: r.id,
        message: `File missing: ${r.markdownFileName}`
      });
      continue;
    }

    const raw = readFileSync(mdPath, "utf8");
    const manuscriptIssues = validateStudentManuscript(r, raw);
    issues.push(...manuscriptIssues);

    if (r.sourcePackFileName) {
      if (!studentSourcePackFileExists(r.sourcePackFileName)) {
        issues.push({
          code: "SOURCE_PACK_MISSING",
          lessonId: r.id,
          message: `Source pack not on disk: ${r.sourcePackFileName}`
        });
      }
    } else {
      issues.push({ code: "SOURCE_PACK_UNMAPPED", lessonId: r.id, message: "sourcePackFileName is null" });
    }

    if (r.comparisonRequirements.requiresRelationshipWeb && r.relationshipNodeIds.length === 0) {
      issues.push({
        code: "WEB_WITHOUT_NODES",
        lessonId: r.id,
        message: "requiresRelationshipWeb but relationshipNodeIds is empty"
      });
    }

    const nodeIds = r.relationshipNodeIds;
    const nodeIdSet = new Set<string>();
    for (const id of nodeIds) {
      const clean = id.trim();
      if (!clean) {
        issues.push({
          code: "WEB_NODE_EMPTY",
          lessonId: r.id,
          message: "relationshipNodeIds contains an empty id."
        });
      }
      if (nodeIdSet.has(clean)) {
        issues.push({
          code: "WEB_NODE_DUPLICATE",
          lessonId: r.id,
          message: `relationshipNodeIds contains a duplicate id: ${clean}`
        });
      }
      nodeIdSet.add(clean);
    }

    const c = r.comparisonRequirements;
    const count = studentComparisonSurfaceCount(r);
    let expected = 0;
    if (c.requiresSourceComparisonLayout || c.requiresVersionToggle) expected++;
    if (c.requiresInteractiveGrid) expected++;
    if (c.requiresRelationshipWeb) expected++;
    if (count !== expected) {
      issues.push({
        code: "SURFACE_COUNT",
        lessonId: r.id,
        message: `studentComparisonSurfaceCount (${count}) ≠ expected (${expected})`
      });
    }

    if (count > 0) {
      const labels = comparisonRequirementLabels(r);
      if (labels.length !== count) {
        issues.push({
          code: "COMPARISON_LABELS",
          lessonId: r.id,
          message: `Comparison labels (${labels.length}) must match mounted surfaces (${count}).`
        });
      }
      for (const label of labels) {
        if (!label.trim()) {
          issues.push({
            code: "COMPARISON_LABEL_EMPTY",
            lessonId: r.id,
            message: "A declared comparison label is empty."
          });
        }
      }
    }
  }

  for (let i = 0; i < lessons.length; i++) {
    if (lessons[i]!.order !== i + 1) {
      issues.push({
        code: "ORDER_SEQUENCE",
        lessonId: lessons[i]!.id,
        message: `Lessons must be ordered 1..n; found order ${lessons[i]!.order} at index ${i}`
      });
    }
  }

  for (const r of lessons) {
    if (r.previousLessonId?.startsWith("student-")) {
      const prev = byId.get(r.previousLessonId);
      if (!prev) {
        issues.push({
          code: "PREV_MISSING",
          lessonId: r.id,
          message: `previousLessonId ${r.previousLessonId} not in registry`
        });
      } else if (prev.nextLessonId !== r.id) {
        issues.push({
          code: "CHAIN_PREV",
          lessonId: r.id,
          message: `Previous lesson ${prev.id} must list nextLessonId ${r.id}`
        });
      }
    } else if (r.previousLessonId?.startsWith("seeker-")) {
      if (!getSeekerRecordById(r.previousLessonId)) {
        issues.push({
          code: "PREV_SEEKER",
          lessonId: r.id,
          message: `Seeker id ${r.previousLessonId} not found`
        });
      }
    }

    if (r.nextLessonId) {
      const next = byId.get(r.nextLessonId);
      if (!next) {
        issues.push({
          code: "NEXT_MISSING",
          lessonId: r.id,
          message: `nextLessonId ${r.nextLessonId} not in registry`
        });
      } else if (next.previousLessonId !== r.id) {
        issues.push({
          code: "CHAIN_NEXT",
          lessonId: r.id,
          message: `Next lesson ${next.id} must list previousLessonId ${r.id}`
        });
      }
    }
  }

  return issues;
}
