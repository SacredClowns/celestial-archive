import {
  getObserverRecordBySlug,
  listOpenObserverSlugs,
  observerLessonRegistry,
  OBSERVER_PATH
} from "@/lib/observer-registry";
import { loadObserverLessonMarkdown } from "@/lib/lesson-markdown/load-observer-lesson-md";
import type { LessonSchema, LessonSidebarManifest } from "@/lib/lesson-types";
import { getObserverLessonPack } from "@/lib/lessons/observer/observer-lesson-metadata";

export function getObserverSidebarManifest(slug: string): LessonSidebarManifest | undefined {
  return getObserverLessonPack(slug)?.sidebar;
}

export function finalizeObserverLesson(slug: string): LessonSchema {
  const record = getObserverRecordBySlug(slug);
  const pack = getObserverLessonPack(slug);

  if (!record || !pack) {
    throw new Error(`Unknown Observer lesson slug: ${slug}`);
  }

  const md = loadObserverLessonMarkdown(slug);

  const prev = record.previousLessonId
    ? observerLessonRegistry.find((r) => r.id === record.previousLessonId)
    : undefined;
  const next = record.nextLessonId
    ? observerLessonRegistry.find((r) => r.id === record.nextLessonId)
    : undefined;

  // Only link onward to folios that are actually routable.
  const previousLesson =
    prev && prev.status === "open"
      ? { label: `${prev.lessonNumber} — ${prev.title}`, href: `${OBSERVER_PATH}/${prev.slug}` }
      : undefined;

  const nextLesson =
    next && next.status === "open"
      ? { label: `${next.lessonNumber} — ${next.title}`, href: `${OBSERVER_PATH}/${next.slug}` }
      : next
        ? {
            label: `${next.lessonNumber} — ${next.title}`,
            href: OBSERVER_PATH,
            note: "Still in the scriptorium — the stage page tracks its progress."
          }
        : undefined;

  return {
    contentMode: "markdown",
    lessonId: record.id,
    sourcePackId: record.sourcePackId,
    subtitle: record.subtitle,
    slug: record.slug,
    title: record.title,
    stage: "Stage 3 — Observer",
    stageLabel: "Return to Observer path",
    stagePath: OBSERVER_PATH,
    verificationNote: pack.verificationNote,
    lessonNumber: record.lessonNumber,
    duration: pack.duration,
    epistemicTones: pack.epistemicTones,
    markdownMain: md.main,
    markdownClosing: md.closing,
    markdownPostface: md.postface,
    sidebar: pack.sidebar,
    glossarySurface: pack.glossarySurface,
    sourceClaims: pack.sourceClaims,
    relationshipChain: pack.relationshipChain,
    previousLesson,
    nextLesson,
    timelineHookHref: "/timeline"
  };
}

export function getObserverLesson(slug: string): LessonSchema {
  return finalizeObserverLesson(slug);
}

export function listObserverSlugs(): string[] {
  return listOpenObserverSlugs();
}
