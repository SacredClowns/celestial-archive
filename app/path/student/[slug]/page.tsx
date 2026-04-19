import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StudentLessonRenderer } from "@/components/lesson/student-lesson-renderer";
import { StudentLessonArchiveFault } from "@/components/student/student-lesson-archive-fault";
import { finalizeStudentLesson } from "@/lib/student/student-lesson-view";
import { getStudentRecordBySlug, listStudentSlugs } from "@/lib/student/student-lesson-registry";

/** Slugs are kebab-case identifiers from the catalogue only. */
const STUDENT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listStudentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getStudentRecordBySlug(slug);
  if (!record) return { title: "Student lesson" };
  return {
    title: `${record.title}`,
    robots: { index: false, follow: false }
  };
}

export default async function StudentLessonPage({ params }: PageProps) {
  const { slug } = await params;
  if (!STUDENT_SLUG_PATTERN.test(slug) || !listStudentSlugs().includes(slug)) notFound();
  try {
    const viewModel = finalizeStudentLesson(slug);
    return <StudentLessonRenderer viewModel={viewModel} />;
  } catch {
    return <StudentLessonArchiveFault />;
  }
}
