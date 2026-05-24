import type { EpistemicTone } from "@/lib/lesson-types";

export type StudentLessonStatus = "prototype" | "open" | "shadow" | "locked";

/** Surfaces the Student lesson engine may mount per lesson (declared in registry). */
export type StudentComparisonRequirements = {
  requiresVersionToggle: boolean;
  requiresInteractiveGrid: boolean;
  requiresSourceComparisonLayout: boolean;
  requiresRelationshipWeb: boolean;
};

/**
 * Full Stage 2 registry row. Lesson bodies live under `content/curriculum/stage-2-student/`
 * when `markdownFileName` is set; presence on disk is resolved at load time.
 */
export type StudentLessonRecord = {
  id: string;
  stage: "student";
  order: number;
  slug: string;
  title: string;
  subtitle?: string;
  lessonNumber: string;
  status: StudentLessonStatus;
  /** Canonical id string; matches Source Pack filename stem where applicable */
  sourcePackId: string;
  /** Rigor-layer file in `stage-2-student/` — `SOURCE_PACK_<n>_STUDENT_2_<n>.md` */
  sourcePackFileName: string | null;
  /** One-line archival description for the source-pack surface (registry-authored, not lorem). */
  sourcePackDescriptor?: string;
  previousLessonId: string | null;
  nextLessonId: string | null;
  /** Relationship Web node ids (subset of `lib/relationship-web/seed` ids). */
  relationshipNodeIds: string[];
  comparisonRequirements: StudentComparisonRequirements;
  glossaryTerms: string[];
  timelineAnchors: Array<{ date: string; event: string }>;
  epistemicTonesHeader: EpistemicTone[];
  /** Lesson markdown filename in `stage-2-student/`, or null if not yet mapped. */
  markdownFileName: string | null;
  /** Controlled preview: robots off; ribbon marks rank until public launch. */
  internalPreviewOnly: boolean;
};

export const studentLessonRegistry: StudentLessonRecord[] = [
  {
    id: "student-2-1",
    stage: "student",
    order: 1,
    slug: "the-seven-kings",
    title: "The Seven Kings",
    subtitle: "The Heptarchia Mystica as a complete system",
    lessonNumber: "Lesson 2.1",
    status: "open",
    sourcePackId: "SOURCE_PACK_1_STUDENT_2_1",
    sourcePackFileName: "SOURCE_PACK_1_STUDENT_2_1.md",
    sourcePackDescriptor:
      "Manuscript claims, Peterson (2003) verification spine, and badge audit for the Heptarchia Mystica lesson.",
    previousLessonId: "seeker-1-5",
    nextLessonId: "student-2-2",
    relationshipNodeIds: ["great-table", "seven-kings", "seven-princes", "golden-dawn", "crowley"],
    comparisonRequirements: {
      requiresVersionToggle: false,
      requiresInteractiveGrid: true,
      requiresSourceComparisonLayout: true,
      requiresRelationshipWeb: true
    },
    glossaryTerms: ["Enochian", "Scrying"],
    timelineAnchors: [
      { date: "Spring 1582 – summer 1583", event: "Heptarchic reception window (session diaries, Sloane MS 3188)" }
    ],
    epistemicTonesHeader: ["historical", "occult", "later"],
    markdownFileName: "STAGE_2_STUDENT_LESSON_1.md",
    internalPreviewOnly: true
  },
  {
    id: "student-2-2",
    stage: "student",
    order: 2,
    slug: "the-book-that-cannot-be-read",
    title: "The Book That Cannot Be Read",
    subtitle: "Liber Loagaeth as an unresolved problem",
    lessonNumber: "Lesson 2.2",
    status: "open",
    sourcePackId: "SOURCE_PACK_2_STUDENT_2_2",
    sourcePackFileName: "SOURCE_PACK_2_STUDENT_2_2.md",
    sourcePackDescriptor:
      "Sloane MS 3189 witness, Laycock letter-frequency datum, reception history, and badge audit for Liber Loagaeth.",
    previousLessonId: "student-2-1",
    nextLessonId: "student-2-3",
    relationshipNodeIds: ["great-table", "seven-kings", "golden-dawn"],
    comparisonRequirements: {
      requiresVersionToggle: false,
      requiresInteractiveGrid: true,
      requiresSourceComparisonLayout: false,
      requiresRelationshipWeb: true
    },
    glossaryTerms: ["Enochian", "Scrying", "Watchtower", "Aethyr"],
    timelineAnchors: [],
    epistemicTonesHeader: ["historical", "consensus", "speculative"],
    markdownFileName: "STAGE_2_STUDENT_LESSON_2.md",
    internalPreviewOnly: true
  },
  {
    id: "student-2-3",
    stage: "student",
    order: 3,
    slug: "a-grammar-of-invocation",
    title: "A Grammar of Invocation",
    subtitle: "The forty-eight Calls and their structure",
    lessonNumber: "Lesson 2.3",
    status: "open",
    sourcePackId: "SOURCE_PACK_3_STUDENT_2_3",
    sourcePackFileName: "SOURCE_PACK_3_STUDENT_2_3.md",
    sourcePackDescriptor:
      "Calls, manuscript chains, linguistic analyses, and badge audit — verification tables awaiting editorial closure in the paired Source Pack.",
    previousLessonId: "student-2-2",
    nextLessonId: "student-2-4",
    relationshipNodeIds: ["great-table", "golden-dawn", "crowley"],
    comparisonRequirements: {
      requiresVersionToggle: false,
      requiresInteractiveGrid: true,
      requiresSourceComparisonLayout: true,
      requiresRelationshipWeb: true
    },
    glossaryTerms: ["Enochian"],
    timelineAnchors: [],
    epistemicTonesHeader: ["historical", "consensus"],
    markdownFileName: "STAGE_2_STUDENT_LESSON_3.md",
    internalPreviewOnly: true
  },
  {
    id: "student-2-4",
    stage: "student",
    order: 4,
    slug: "the-architecture-of-the-world",
    title: "The Architecture of the World",
    subtitle: "The Great Table and the Watchtower system",
    lessonNumber: "Lesson 2.4",
    status: "open",
    sourcePackId: "SOURCE_PACK_4_STUDENT_2_4",
    sourcePackFileName: "SOURCE_PACK_4_STUDENT_2_4.md",
    sourcePackDescriptor:
      "Great Table manuscript witness, reconstruction plates, Watchtower nomenclature lines, and badge audit — under editorial review in the paired Source Pack.",
    previousLessonId: "student-2-3",
    nextLessonId: "student-2-5",
    relationshipNodeIds: ["great-table", "golden-dawn", "crowley", "seven-kings"],
    comparisonRequirements: {
      requiresVersionToggle: false,
      requiresInteractiveGrid: true,
      requiresSourceComparisonLayout: true,
      requiresRelationshipWeb: true
    },
    glossaryTerms: ["Watchtower", "Enochian"],
    timelineAnchors: [],
    epistemicTonesHeader: ["historical", "later", "consensus"],
    markdownFileName: "STAGE_2_STUDENT_LESSON_4.md",
    internalPreviewOnly: true
  },
  {
    id: "student-2-5",
    stage: "student",
    order: 5,
    slug: "the-inheritors",
    title: "The Inheritors",
    subtitle: "The Golden Dawn reconstruction and later hands",
    lessonNumber: "Lesson 2.5",
    status: "open",
    sourcePackId: "SOURCE_PACK_5_STUDENT_2_5",
    sourcePackFileName: "SOURCE_PACK_5_STUDENT_2_5.md",
    sourcePackDescriptor:
      "Golden Dawn and reception-line editions, attribution tables, and badge audit — verification awaiting editorial closure in the paired Source Pack.",
    previousLessonId: "student-2-4",
    nextLessonId: "student-2-6",
    relationshipNodeIds: ["golden-dawn", "great-table", "crowley"],
    comparisonRequirements: {
      requiresVersionToggle: false,
      requiresInteractiveGrid: false,
      requiresSourceComparisonLayout: true,
      requiresRelationshipWeb: true
    },
    glossaryTerms: ["Enochian"],
    timelineAnchors: [],
    epistemicTonesHeader: ["historical", "later", "occult"],
    markdownFileName: "STAGE_2_STUDENT_LESSON_5.md",
    internalPreviewOnly: true
  },
  {
    id: "student-2-6",
    stage: "student",
    order: 6,
    slug: "the-voice-and-the-abyss",
    title: "The Voice and the Abyss",
    subtitle: "Crowley's Aethyr workings and experiential authority",
    lessonNumber: "Lesson 2.6",
    status: "open",
    sourcePackId: "SOURCE_PACK_6_STUDENT_2_6",
    sourcePackFileName: "SOURCE_PACK_6_STUDENT_2_6.md",
    sourcePackDescriptor:
      "Crowley-era documentary witnesses, Aethyr reception claims, caution review, and badge audit — under editorial review in the paired Source Pack.",
    previousLessonId: "student-2-5",
    nextLessonId: null,
    relationshipNodeIds: ["crowley", "golden-dawn", "great-table"],
    comparisonRequirements: {
      requiresVersionToggle: false,
      requiresInteractiveGrid: false,
      requiresSourceComparisonLayout: true,
      requiresRelationshipWeb: true
    },
    glossaryTerms: ["Aethyr", "Enochian"],
    timelineAnchors: [],
    epistemicTonesHeader: ["historical", "later", "speculative"],
    markdownFileName: "STAGE_2_STUDENT_LESSON_6.md",
    internalPreviewOnly: true
  }
];

export function getStudentRecordBySlug(slug: string): StudentLessonRecord | undefined {
  return studentLessonRegistry.find((r) => r.slug === slug);
}

export function getStudentRecordById(id: string): StudentLessonRecord | undefined {
  return studentLessonRegistry.find((r) => r.id === id);
}

export function listStudentSlugs(): string[] {
  return studentLessonRegistry.map((r) => r.slug);
}
