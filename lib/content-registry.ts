export type SeekerLessonStatus = "open" | "shadow" | "locked";

/**
 * Typed registry row for each Seeker folio. Lesson body and full sidebar manifest
 * live in `lib/lessons/seeker/*`; this table is the integration index for routing and UI.
 */
export type SeekerLessonRecord = {
  id: string;
  stage: "seeker";
  order: number;
  slug: string;
  title: string;
  subtitle?: string;
  lessonNumber: string;
  status: SeekerLessonStatus;
  sourcePackId: string;
  glossaryTerms: string[];
  timelineAnchors: Array<{ date: string; event: string }>;
  previousLessonId: string | null;
  nextLessonId: string | null;
  /** When true, navigation forward resolves to `/path/seeker/threshold` instead of another lesson */
  nextIsThreshold?: boolean;
};

export const SEEKER_PATH = "/path/seeker";

export const seekerLessonRegistry: SeekerLessonRecord[] = [
  {
    id: "seeker-1-1",
    stage: "seeker",
    order: 1,
    slug: "the-lost-language",
    title: "The Lost Language",
    lessonNumber: "Lesson 1.1",
    status: "open",
    sourcePackId: "STAGE_1_SEEKER_LESSON_1",
    glossaryTerms: [
      "Scrying",
      "Enochian",
      "Lingua Adamica",
      "Sigillum Dei Aemeth",
      "Watchtower",
      "Aethyr",
      "Gnosis",
      "Epistemic Status"
    ],
    timelineAnchors: [
      { date: "July 13, 1527", event: "John Dee born" },
      { date: "March 8, 1582", event: "Edward Kelley arrives at Mortlake" },
      { date: "April–July 1584", event: "Alphabet and Calls recorded" },
      { date: "1659", event: "Casaubon publishes Dee's diaries" }
    ],
    previousLessonId: null,
    nextLessonId: "seeker-1-2"
  },
  {
    id: "seeker-1-2",
    stage: "seeker",
    order: 2,
    slug: "the-partnership",
    title: "The Partnership",
    lessonNumber: "Lesson 1.2",
    status: "open",
    sourcePackId: "SOURCE_PACK_2_LESSON_1_2",
    glossaryTerms: [
      "Scrying",
      "Shew-Stone",
      "Barnabas Saul",
      "Holy Table",
      "Sigillum Dei Aemeth",
      "Altered State of Consciousness",
      "Medium",
      "Dissociation"
    ],
    timelineAnchors: [
      { date: "March 8, 1582", event: "Kelley arrives at Mortlake" },
      { date: "March 10, 1582", event: "First formal session with Dee" },
      { date: "April–July 1584", event: "Alphabet, Calls, and Watchtower era" },
      { date: "1587–1589", event: "Partnership rupture and separation" }
    ],
    previousLessonId: "seeker-1-1",
    nextLessonId: "seeker-1-3"
  },
  {
    id: "seeker-1-3",
    stage: "seeker",
    order: 3,
    slug: "the-first-transmissions",
    title: "The First Transmissions",
    subtitle: "The sessions at Mortlake",
    lessonNumber: "Lesson 1.3",
    status: "open",
    sourcePackId: "SOURCE_PACK_3_LESSON_1_3",
    glossaryTerms: [
      "Shew-Stone",
      "Holy Table",
      "Sigillum Dei Aemeth",
      "Heptarchic",
      "Angelic Language",
      "Parallel"
    ],
    timelineAnchors: [
      { date: "Spring 1582", event: "Early Mortlake sessions; apparatus in development" },
      { date: "1582–1583", event: "Sloane MS 3188 Liber Primus window" },
      { date: "1584 onward", event: "Continental and expanded transmissions" }
    ],
    previousLessonId: "seeker-1-2",
    nextLessonId: "seeker-1-4"
  },
  {
    id: "seeker-1-4",
    stage: "seeker",
    order: 4,
    slug: "the-enochian-language-emerges",
    title: "The Enochian Language Emerges",
    subtitle: "Alphabet, Loagaeth, reverse dictation",
    lessonNumber: "Lesson 1.4",
    status: "open",
    sourcePackId: "SOURCE_PACK_4_LESSON_1_4",
    glossaryTerms: [
      "Liber Loagaeth",
      "Angelic Alphabet",
      "Reverse Dictation",
      "Call",
      "Madimi",
      "Strange Feeling"
    ],
    timelineAnchors: [
      { date: "1583", event: "Alphabet and Loagaeth material at Mortlake" },
      { date: "April 1584", event: "Kraków — reverse-order alphabet and Calls window" },
      { date: "Sloane MS 3189", event: "Liber Loagaeth shelfmark" }
    ],
    previousLessonId: "seeker-1-3",
    nextLessonId: "seeker-1-5"
  },
  {
    id: "seeker-1-5",
    stage: "seeker",
    order: 5,
    slug: "the-long-arc-and-the-breaking",
    title: "The Long Arc and the Breaking",
    subtitle: "Continental years and manuscript afterlife",
    lessonNumber: "Lesson 1.5",
    status: "open",
    sourcePackId: "SOURCE_PACK_5_LESSON_1_5",
    glossaryTerms: [
      "Třeboň",
      "Meric Casaubon",
      "A True & Faithful Relation",
      "Elias Ashmole",
      "Continental sessions"
    ],
    timelineAnchors: [
      { date: "September 1583", event: "Departure from Mortlake for the Continent" },
      { date: "1583–1589", event: "Kraków, Prague, Třeboň; sessions abroad" },
      { date: "1659", event: "Casaubon's edition prints Continental material" }
    ],
    previousLessonId: "seeker-1-4",
    nextLessonId: null,
    nextIsThreshold: true
  }
];

export type StudentStagePreview = {
  id: "stage-2-student";
  rankLabel: "Student";
  /** Route does not ship yet — doorway stays visible but unopened */
  pathHref: "/path/student";
  note: string;
};

export const studentStagePreview: StudentStagePreview = {
  id: "stage-2-student",
  rankLabel: "Student",
  pathHref: "/path/student",
  note:
    "Stage 2 is open in controlled preview — folios and verification documents stay on the shelf as drafts until review closes."
};

export function getSeekerRecordBySlug(slug: string): SeekerLessonRecord | undefined {
  return seekerLessonRegistry.find((r) => r.slug === slug);
}

export function getSeekerRecordById(id: string): SeekerLessonRecord | undefined {
  return seekerLessonRegistry.find((r) => r.id === id);
}
