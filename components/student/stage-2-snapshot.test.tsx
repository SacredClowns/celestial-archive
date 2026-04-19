import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

vi.mock("next/link", () => {
  return {
    default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  };
});

import { StudentPathIndexBody } from "@/components/student/student-path-index-body";
import { buildStudentIndexFraming } from "@/lib/curriculum/load-student-framing";
import { listStudentLessonsOrdered } from "@/lib/student/student-registry-helpers";
import { StudentLessonRenderer } from "@/components/lesson/student-lesson-renderer";
import { StudentLessonSidebar } from "@/components/student/student-lesson-sidebar";
import { StudentSourcePackReference } from "@/components/student/student-source-pack-reference";
import { finalizeStudentLesson } from "@/lib/student/student-lesson-view";
import type { StudentLessonRecord } from "@/lib/student/student-lesson-registry";

describe("Stage 2 snapshots (behavioral)", () => {
  afterEach(() => {
    cleanup();
  });

  it("Student index renders six lessons in order", () => {
    render(
      <StudentPathIndexBody lessons={listStudentLessonsOrdered()} framing={buildStudentIndexFraming()} />
    );
    const links = screen.getAllByRole("link");
    const stageLinks = links
      .map((a) => a.textContent ?? "")
      .filter((t) => t.includes("Lesson 2."));
    expect(stageLinks).toHaveLength(6);
    expect(stageLinks[0]).toContain("Lesson 2.1");
    expect(stageLinks[1]).toContain("Lesson 2.2");
    expect(stageLinks[2]).toContain("Lesson 2.3");
    expect(stageLinks[3]).toContain("Lesson 2.4");
    expect(stageLinks[4]).toContain("Lesson 2.5");
    expect(stageLinks[5]).toContain("Lesson 2.6");
  });

  it("Student 2.1 mounts the safety frame and all declared comparison surfaces", () => {
    const vm = finalizeStudentLesson("the-seven-kings");
    render(<StudentLessonRenderer viewModel={vm} />);
    expect(screen.getByText("How to read this structure")).toBeInTheDocument();
    expect(screen.getByText("Historical witness vs later arrangement")).toBeInTheDocument();
    expect(screen.getByText("Letter grid (fragment)")).toBeInTheDocument();
    expect(screen.getByText("Transmission Map (local)")).toBeInTheDocument();
  });

  it("Student 2.2 mounts grid and transmission without the Great Table fragment", () => {
    const vm = finalizeStudentLesson("the-book-that-cannot-be-read");
    render(<StudentLessonRenderer viewModel={vm} />);
    expect(screen.getByText("How to read this structure")).toBeInTheDocument();
    expect(screen.queryByText("Historical witness vs later arrangement")).not.toBeInTheDocument();
    expect(screen.getByText("Letter grid (fragment)")).toBeInTheDocument();
    expect(screen.getByText("Transmission Map (local)")).toBeInTheDocument();
  });

  it("Renderer uses the calm room-note filler when a folio has no surfaces and no reader manuscript", () => {
    const record: StudentLessonRecord = {
      id: "student-test-0",
      stage: "student",
      order: 999,
      slug: "test-empty",
      title: "Test empty",
      subtitle: "Test",
      lessonNumber: "Lesson 2.x",
      status: "shadow",
      sourcePackId: "SOURCE_PACK_TEST",
      sourcePackFileName: null,
      previousLessonId: null,
      nextLessonId: null,
      relationshipNodeIds: [],
      comparisonRequirements: {
        requiresVersionToggle: false,
        requiresInteractiveGrid: false,
        requiresSourceComparisonLayout: false,
        requiresRelationshipWeb: false
      },
      glossaryTerms: [],
      timelineAnchors: [],
      epistemicTonesHeader: ["historical"],
      markdownFileName: null,
      internalPreviewOnly: true
    };

    render(
      <StudentLessonRenderer
        viewModel={{
          record,
          relationshipNodes: [],
          relationshipEdges: [],
          markdown: null,
          readerColumnParseFailed: false,
          displayTitle: record.title,
          displaySubtitle: record.subtitle,
          displayDuration: "Reading length not yet inscribed on this folio.",
          displaySourcePackId: record.sourcePackId,
          sourcePackDocumentAvailable: false,
          displayGlossaryTerms: [],
          displayTimelineAnchors: [],
          displayEpistemicTonesHeader: ["historical"]
        }}
      />
    );

    expect(screen.getByText("Room note")).toBeInTheDocument();
  });

  it("Sidebar suppresses empty blocks (no glossary, no timeline, no demonstrations)", () => {
    const record: StudentLessonRecord = {
      id: "student-test-sidebar",
      stage: "student",
      order: 998,
      slug: "test-sidebar",
      title: "Test sidebar",
      subtitle: "Test",
      lessonNumber: "Lesson 2.x",
      status: "shadow",
      sourcePackId: "SOURCE_PACK_TEST",
      sourcePackFileName: null,
      previousLessonId: null,
      nextLessonId: null,
      relationshipNodeIds: [],
      comparisonRequirements: {
        requiresVersionToggle: false,
        requiresInteractiveGrid: false,
        requiresSourceComparisonLayout: false,
        requiresRelationshipWeb: false
      },
      glossaryTerms: [],
      timelineAnchors: [],
      epistemicTonesHeader: ["historical"],
      markdownFileName: null,
      internalPreviewOnly: true
    };

    render(
      <StudentLessonSidebar
        viewModel={{
          record,
          relationshipNodes: [],
          relationshipEdges: [],
          markdown: null,
          readerColumnParseFailed: false,
          displayTitle: record.title,
          displaySubtitle: record.subtitle,
          displayDuration: "Reading length not yet inscribed on this folio.",
          displaySourcePackId: record.sourcePackId,
          sourcePackDocumentAvailable: false,
          displayGlossaryTerms: [],
          displayTimelineAnchors: [],
          displayEpistemicTonesHeader: ["historical"]
        }}
        onOpenGlossary={() => {}}
      />
    );

    expect(screen.queryByText("Key glossary terms")).not.toBeInTheDocument();
    expect(screen.queryByText("Timeline anchors")).not.toBeInTheDocument();
    expect(screen.queryByText("Demonstrations declared for this folio")).not.toBeInTheDocument();
  });

  it("Source pack reference renders for present and absent packs", () => {
    const { rerender } = render(
      <StudentSourcePackReference sourcePackId="SOURCE_PACK_TEST" documentAvailable={true} />
    );
    expect(screen.getByText("Source pack")).toBeInTheDocument();
    expect(screen.getByText("SOURCE_PACK_TEST")).toBeInTheDocument();
    expect(screen.getByText(/Support document on shelf/i)).toBeInTheDocument();

    rerender(<StudentSourcePackReference sourcePackId="SOURCE_PACK_TEST" documentAvailable={false} />);
    expect(screen.getByText(/not filed yet/i)).toBeInTheDocument();
  });
});

