import { getRelationshipWebSlice } from "@/lib/relationship-web/seed";
import type { RelationshipWebEdge, RelationshipWebNode } from "@/lib/relationship-web/types";
import { STUDENT_PATH } from "@/lib/lessons/student-path";
import { getSeekerRecordById, SEEKER_PATH } from "@/lib/content-registry";
import type { EpistemicTone, LessonNavLink } from "@/lib/lesson-types";
import { hasStudentLessonMarkdown, loadStudentLessonMarkdown, type LoadedStudentMarkdown } from "@/lib/student/load-student-lesson-md";
import { studentSourcePackFileExists } from "@/lib/student/student-content-flags";
import { getStudentRecordBySlug, studentLessonRegistry, type StudentLessonRecord } from "@/lib/student/student-lesson-registry";

const EPISTEMIC_TONES: readonly EpistemicTone[] = [
  "historical",
  "consensus",
  "occult",
  "later",
  "parallel",
  "speculative",
  "disputed",
  "caution"
];

function isEpistemicTone(s: string): s is EpistemicTone {
  return (EPISTEMIC_TONES as readonly string[]).includes(s);
}

export type StudentLessonViewModel = {
  record: StudentLessonRecord;
  relationshipNodes: RelationshipWebNode[];
  relationshipEdges: RelationshipWebEdge[];
  previousLesson?: LessonNavLink;
  nextLesson?: LessonNavLink;
  markdown: LoadedStudentMarkdown | null;
  /** Folio file exists but split / load failed — reader column cannot render */
  readerColumnParseFailed: boolean;
  displayTitle: string;
  displaySubtitle?: string;
  displayDuration: string;
  displaySourcePackId: string;
  displaySourcePackDescriptor?: string;
  /** True when rigor-layer markdown exists on disk */
  sourcePackDocumentAvailable: boolean;
  displayGlossaryTerms: string[];
  displayTimelineAnchors: Array<{ date: string; event: string }>;
  displayEpistemicTonesHeader: EpistemicTone[];
};

export function finalizeStudentLesson(slug: string): StudentLessonViewModel {
  const record = getStudentRecordBySlug(slug);
  if (!record) {
    throw new Error(`Unknown Student lesson slug: ${slug}`);
  }

  const { nodes, edges } = getRelationshipWebSlice(record.relationshipNodeIds);

  let markdown: LoadedStudentMarkdown | null = null;
  let readerColumnParseFailed = false;
  if (hasStudentLessonMarkdown(slug)) {
    try {
      markdown = loadStudentLessonMarkdown(slug);
    } catch {
      readerColumnParseFailed = true;
      markdown = null;
    }
  }

  const fm = markdown?.frontmatter;

  const displayTitle = (typeof fm?.title === "string" && fm.title.trim() ? fm.title : record.title) as string;
  const displaySubtitle =
    (typeof fm?.subtitle === "string" && fm.subtitle.trim() ? fm.subtitle : record.subtitle) ?? undefined;
  const displayDuration =
    (typeof fm?.duration === "string" && fm.duration.trim() ? fm.duration : undefined) ??
    "Reading length not yet inscribed on this folio.";
  const displaySourcePackId =
    (typeof fm?.sourcePackId === "string" && fm.sourcePackId.trim() ? fm.sourcePackId : undefined) ??
    record.sourcePackId;

  const displaySourcePackDescriptor =
    (fm?.sourcePackDescriptor && fm.sourcePackDescriptor.trim() ? fm.sourcePackDescriptor : undefined) ??
    record.sourcePackDescriptor;

  const sourcePackDocumentAvailable = Boolean(
    record.sourcePackFileName && studentSourcePackFileExists(record.sourcePackFileName)
  );

  const displayGlossaryTerms =
    fm?.glossaryTerms && fm.glossaryTerms.length > 0 ? fm.glossaryTerms : record.glossaryTerms;
  const displayTimelineAnchors =
    fm?.timelineAnchors && fm.timelineAnchors.length > 0 ? fm.timelineAnchors : record.timelineAnchors;

  const fromFmTones = fm?.epistemicTonesHeader?.filter(isEpistemicTone) ?? [];
  const displayEpistemicTonesHeader: EpistemicTone[] =
    fromFmTones.length > 0 ? fromFmTones : record.epistemicTonesHeader;

  let previousLesson: LessonNavLink | undefined;
  const prevSeekerId = typeof fm?.previousLessonId === "string" ? fm.previousLessonId : record.previousLessonId;
  if (prevSeekerId?.startsWith("seeker-")) {
    const sk = getSeekerRecordById(prevSeekerId);
    if (sk) {
      previousLesson = {
        label: `${sk.lessonNumber} — ${sk.title} (Seeker)`,
        href: `${SEEKER_PATH}/${sk.slug}`
      };
    }
  }
  if (!previousLesson && record.previousLessonId?.startsWith("student-")) {
    const prev = studentLessonRegistry.find((r) => r.id === record.previousLessonId);
    if (prev) {
      previousLesson = {
        label: `${prev.lessonNumber} — ${prev.title}`,
        href: `${STUDENT_PATH}/${prev.slug}`
      };
    }
  }

  const next = record.nextLessonId ? studentLessonRegistry.find((r) => r.id === record.nextLessonId) : undefined;

  const nextLesson: LessonNavLink | undefined = next
    ? {
        label: `${next.lessonNumber} — ${next.title}`,
        href: `${STUDENT_PATH}/${next.slug}`,
        shadow: next.status === "shadow" || next.status === "locked"
      }
    : undefined;

  return {
    record,
    relationshipNodes: nodes,
    relationshipEdges: edges,
    previousLesson,
    nextLesson,
    markdown,
    readerColumnParseFailed,
    displayTitle,
    displaySubtitle,
    displayDuration,
    displaySourcePackId,
    displaySourcePackDescriptor,
    sourcePackDocumentAvailable,
    displayGlossaryTerms,
    displayTimelineAnchors,
    displayEpistemicTonesHeader
  };
}

export type { StudentLessonRecord } from "@/lib/student/student-lesson-registry";
