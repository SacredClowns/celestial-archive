import { notFound } from "next/navigation";
import { LessonRenderer } from "@/components/lesson/lesson-renderer";
import { listSeekerSlugs, getSeekerLesson } from "@/lib/lessons/seeker";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listSeekerSlugs().map((slug) => ({ slug }));
}

export default async function SeekerLessonPage({ params }: PageProps) {
  const { slug } = await params;
  if (!listSeekerSlugs().includes(slug)) notFound();
  const lesson = getSeekerLesson(slug);
  return <LessonRenderer lesson={lesson} />;
}
