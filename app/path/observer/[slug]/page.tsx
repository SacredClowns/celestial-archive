import { notFound } from "next/navigation";
import { LessonRenderer } from "@/components/lesson/lesson-renderer";
import { getObserverLesson, listObserverSlugs } from "@/lib/lessons/observer";
import { getObserverRecordBySlug } from "@/lib/observer-registry";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listObserverSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const record = getObserverRecordBySlug(slug);
  if (!record) return {};
  return {
    title: `${record.title} · Observer ${record.lessonNumber} · Celestial Archive`,
    description: record.subtitle ?? record.theme
  };
}

export default async function ObserverLessonPage({ params }: PageProps) {
  const { slug } = await params;
  if (!listObserverSlugs().includes(slug)) notFound();
  const lesson = getObserverLesson(slug);
  return <LessonRenderer lesson={lesson} />;
}
