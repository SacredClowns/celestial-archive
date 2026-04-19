import type { SeekerLessonPack } from "@/lib/lessons/seeker/seeker-lesson-pack";
import { seekerLesson1_1Pack } from "@/lib/lessons/seeker/lesson-1-1";
import { seekerLesson1_2Pack } from "@/lib/lessons/seeker/lesson-1-2";
import { seekerLesson1_3Pack } from "@/lib/lessons/seeker/lesson-1-3";
import { seekerLesson1_4Pack } from "@/lib/lessons/seeker/lesson-1-4";
import { seekerLesson1_5Pack } from "@/lib/lessons/seeker/lesson-1-5";

/** Non-prose lesson machinery keyed by route slug (sidebar, glossary surface, claim panels). */
export const SEEKER_LESSON_METADATA: Record<string, SeekerLessonPack> = {
  "the-lost-language": seekerLesson1_1Pack,
  "the-partnership": seekerLesson1_2Pack,
  "the-first-transmissions": seekerLesson1_3Pack,
  "the-enochian-language-emerges": seekerLesson1_4Pack,
  "the-long-arc-and-the-breaking": seekerLesson1_5Pack
};

export function getSeekerLessonPack(slug: string): SeekerLessonPack | undefined {
  return SEEKER_LESSON_METADATA[slug];
}
