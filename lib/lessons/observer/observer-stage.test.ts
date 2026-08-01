import { describe, expect, it } from "vitest";
import { observerLessonRegistry, listOpenObserverSlugs } from "@/lib/observer-registry";
import { getObserverLessonPack } from "@/lib/lessons/observer/observer-lesson-metadata";
import { observerMarkdownExists } from "@/lib/lesson-markdown/load-observer-lesson-md";
import { finalizeObserverLesson } from "@/lib/lessons/observer";

/**
 * Stage 3 wiring guard.
 *
 * A folio is only routable when three things exist together: a registry row
 * marked open, a markdown body, and a lesson pack. Marking a row "open"
 * without the other two would 500 the route at request time, so it fails here
 * instead — at the moment someone edits the registry.
 */
describe("Observer stage wiring", () => {
  it("keeps lesson numbering and ordering consistent", () => {
    observerLessonRegistry.forEach((record, i) => {
      expect(record.order, `${record.id} is out of order`).toBe(i + 1);
      expect(record.lessonNumber).toBe(`Lesson 3.${i + 1}`);
      expect(record.stage).toBe("observer");
    });
  });

  it("chains previous/next ids into an unbroken path", () => {
    const ids = observerLessonRegistry.map((r) => r.id);
    observerLessonRegistry.forEach((record, i) => {
      expect(record.previousLessonId).toBe(i === 0 ? null : ids[i - 1]);
      expect(record.nextLessonId).toBe(i === ids.length - 1 ? null : ids[i + 1]);
    });
  });

  it("gives every folio a unique, url-safe slug", () => {
    const slugs = observerLessonRegistry.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug, `${slug} is not url-safe`).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("only opens a folio that has both prose and a lesson pack", () => {
    for (const slug of listOpenObserverSlugs()) {
      expect(observerMarkdownExists(slug), `${slug} is open but has no markdown mapped`).toBe(true);
      expect(getObserverLessonPack(slug), `${slug} is open but has no lesson pack`).toBeDefined();
    }
  });

  it("renders every open folio into a complete lesson with a body", () => {
    for (const slug of listOpenObserverSlugs()) {
      const lesson = finalizeObserverLesson(slug);
      expect(lesson.title).toBeTruthy();
      expect(lesson.stage).toBe("Stage 3 — Observer");
      expect(lesson.stagePath).toBe("/path/observer");
      expect(lesson.markdownMain?.length, `${slug} rendered an empty body`).toBeGreaterThan(500);
    }
  });

  it("discloses review status on any folio still in controlled preview", () => {
    for (const slug of listOpenObserverSlugs()) {
      const pack = getObserverLessonPack(slug);
      const record = observerLessonRegistry.find((r) => r.slug === slug);
      // A folio may carry no note only once its source pack id is dropped,
      // i.e. once the audit has closed. Draft folios must say so.
      if (record?.sourcePackId?.startsWith("SOURCE_PACK_OBSERVER")) {
        expect(pack?.verificationNote, `${slug} is a draft but discloses nothing`).toBeTruthy();
      }
    }
  });
});
