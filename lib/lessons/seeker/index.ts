import { getSeekerRecordBySlug, seekerLessonRegistry, SEEKER_PATH } from "@/lib/content-registry";
import { loadSeekerLessonMarkdown } from "@/lib/lesson-markdown/load-seeker-lesson-md";
import type { LessonSchema, LessonSidebarManifest } from "@/lib/lesson-types";
import { getSeekerLessonPack } from "@/lib/lessons/seeker/seeker-lesson-metadata";

export function getSeekerSidebarManifest(slug: string): LessonSidebarManifest | undefined {
  return getSeekerLessonPack(slug)?.sidebar;
}

export function finalizeSeekerLesson(slug: string): LessonSchema {
  const record = getSeekerRecordBySlug(slug);
  const pack = getSeekerLessonPack(slug);
  const md = loadSeekerLessonMarkdown(slug);

  if (!record || !pack) {
    throw new Error(`Unknown Seeker lesson slug: ${slug}`);
  }

  const prev = record.previousLessonId
    ? seekerLessonRegistry.find((r) => r.id === record.previousLessonId)
    : undefined;
  const next = record.nextLessonId
    ? seekerLessonRegistry.find((r) => r.id === record.nextLessonId)
    : undefined;

  const previousLesson =
    prev
      ? {
          label: `${prev.lessonNumber} — ${prev.title}`,
          href: `${SEEKER_PATH}/${prev.slug}`
        }
      : undefined;

  let nextLesson: LessonSchema["nextLesson"];
  if (record.nextIsThreshold) {
    nextLesson = {
      label: "Seeker threshold",
      href: `${SEEKER_PATH}/threshold`,
      note: "A resting point before the Student doorway."
    };
  } else if (next) {
    nextLesson = {
      label: `${next.lessonNumber} — ${next.title}`,
      href: `${SEEKER_PATH}/${next.slug}`
    };
  }

  return {
    contentMode: "markdown",
    lessonId: record.id,
    sourcePackId: record.sourcePackId,
    subtitle: record.subtitle,
    slug: record.slug,
    title: record.title,
    stage: "Stage 1 — Seeker",
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

export function getSeekerLesson(slug: string): LessonSchema {
  return finalizeSeekerLesson(slug);
}

export function listSeekerSlugs(): string[] {
  return seekerLessonRegistry.map((r) => r.slug);
}
