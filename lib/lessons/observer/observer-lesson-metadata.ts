import type { ObserverLessonPack } from "@/lib/lessons/observer/observer-lesson-pack";
import { observerLesson3_1Pack } from "@/lib/lessons/observer/lesson-3-1";
import { observerLesson3_2Pack } from "@/lib/lessons/observer/lesson-3-2";
import { observerLesson3_3Pack } from "@/lib/lessons/observer/lesson-3-3";

/** Observer lesson machinery keyed by route slug. Add a row as each folio's prose lands. */
export const OBSERVER_LESSON_METADATA: Record<string, ObserverLessonPack> = {
  "the-ink-on-the-page": observerLesson3_1Pack,
  "what-the-scryer-saw": observerLesson3_2Pack,
  "the-architecture-observed": observerLesson3_3Pack
};

export function getObserverLessonPack(slug: string): ObserverLessonPack | undefined {
  return OBSERVER_LESSON_METADATA[slug];
}
