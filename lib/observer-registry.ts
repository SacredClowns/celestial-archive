/**
 * Stage 3 — Observer registry.
 *
 * Mirrors the Seeker registry in `lib/content-registry.ts`. A folio becomes
 * routable the moment it appears here with status "open" AND has both a
 * markdown body (content/curriculum/stage-3-observer) and a lesson pack
 * (lib/lessons/observer). Rows marked "planned" render on the stage page as
 * the road ahead but are not routed.
 */
export type ObserverLessonStatus = "open" | "planned";

export type ObserverLessonRecord = {
  id: string;
  stage: "observer";
  order: number;
  slug: string;
  title: string;
  subtitle?: string;
  lessonNumber: string;
  status: ObserverLessonStatus;
  theme: string;
  sourcePackId?: string;
  previousLessonId: string | null;
  nextLessonId: string | null;
};

export const OBSERVER_PATH = "/path/observer";

export const observerLessonRegistry: ObserverLessonRecord[] = [
  {
    id: "observer-3-1",
    stage: "observer",
    order: 1,
    slug: "the-ink-on-the-page",
    title: "The Ink on the Page",
    subtitle: "Reading the Session Diaries Directly",
    lessonNumber: "Lesson 3.1",
    status: "open",
    theme: "Session diaries in their original texture — editorial layers named",
    sourcePackId: "SOURCE_PACK_OBSERVER_3_1",
    previousLessonId: null,
    nextLessonId: "observer-3-2"
  },
  {
    id: "observer-3-2",
    stage: "observer",
    order: 2,
    slug: "what-the-scryer-saw",
    title: "What the Scryer Saw",
    lessonNumber: "Lesson 3.2",
    status: "planned",
    theme: "Sessions as negotiation, not passive reception",
    previousLessonId: "observer-3-1",
    nextLessonId: "observer-3-3"
  },
  {
    id: "observer-3-3",
    stage: "observer",
    order: 3,
    slug: "the-architecture-observed",
    title: "The Architecture Observed",
    lessonNumber: "Lesson 3.3",
    status: "planned",
    theme: "Watchtowers in motion across living traditions",
    previousLessonId: "observer-3-2",
    nextLessonId: "observer-3-4"
  },
  {
    id: "observer-3-4",
    stage: "observer",
    order: 4,
    slug: "thirty-rooms-thirty-readings",
    title: "Thirty Rooms, Thirty Readings",
    lessonNumber: "Lesson 3.4",
    status: "planned",
    theme: "Aethyrs as map of interpretations, not a single journey",
    previousLessonId: "observer-3-3",
    nextLessonId: "observer-3-5"
  },
  {
    id: "observer-3-5",
    stage: "observer",
    order: 5,
    slug: "the-parallel-problem",
    title: "The Parallel Problem",
    lessonNumber: "Lesson 3.5",
    status: "planned",
    theme: "Comparative discernment — Kabbalah, Gnosticism, Hermeticism",
    previousLessonId: "observer-3-4",
    nextLessonId: "observer-3-6"
  },
  {
    id: "observer-3-6",
    stage: "observer",
    order: 6,
    slug: "the-sincerity-problem-revisited",
    title: "The Sincerity Problem Revisited",
    lessonNumber: "Lesson 3.6",
    status: "planned",
    theme: "Single-witness testimony at Observer depth",
    previousLessonId: "observer-3-5",
    nextLessonId: "observer-3-7"
  },
  {
    id: "observer-3-7",
    stage: "observer",
    order: 7,
    slug: "the-living-system",
    title: "The Living System",
    lessonNumber: "Lesson 3.7",
    status: "planned",
    theme: "Enochian as practiced today — multiple communities",
    previousLessonId: "observer-3-6",
    nextLessonId: "observer-3-8"
  },
  {
    id: "observer-3-8",
    stage: "observer",
    order: 8,
    slug: "the-observers-map",
    title: "The Observer's Map",
    lessonNumber: "Lesson 3.8",
    status: "planned",
    theme: "Integration without choosing a winner",
    previousLessonId: "observer-3-7",
    nextLessonId: null
  }
];

export function getObserverRecordBySlug(slug: string): ObserverLessonRecord | undefined {
  return observerLessonRegistry.find((r) => r.slug === slug);
}

/** Only folios whose prose and pack actually exist are routable. */
export function listOpenObserverSlugs(): string[] {
  return observerLessonRegistry.filter((r) => r.status === "open").map((r) => r.slug);
}
