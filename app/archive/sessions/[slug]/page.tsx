import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveMarkdownView } from "@/components/archive/archive-markdown-view";
import { ArchiveProfileHeader } from "@/components/archive/archive-profile-header";
import { BookmarkButton } from "@/components/layout/bookmark-button";
import { ARCHIVE_SESSIONS } from "@/lib/archive/archive-registry";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { loadArchiveSessionMarkdown } from "@/lib/archive/load-archive-markdown";
import { SESSION_QUESTIONS } from "@/lib/archive/session-questions";

export function generateStaticParams() {
  return ARCHIVE_SESSIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = ARCHIVE_SESSIONS.find((s) => s.slug === slug);
  return {
    title: session ? `${session.title} · Sessions` : "Session · Archive",
    description: `Angelic session: ${session?.title ?? ""}.`
  };
}

export default async function ArchiveSessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!ARCHIVE_SESSIONS.some((s) => s.slug === slug)) notFound();

  const doc = loadArchiveSessionMarkdown(slug);
  const pageTitle = doc.frontmatter.title ?? doc.record.title;

  return (
    <section className="page-enter mx-auto max-w-reading space-y-10">
      <Link
        href="/archive/sessions"
        className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim hover:text-gold"
      >
        ← Angelic Sessions
      </Link>
      <ArchiveProfileHeader frontmatter={doc.frontmatter} kind="session" />
      <BookmarkButton title={pageTitle} href={`/archive/sessions/${slug}`} />
      <ArchiveMarkdownView markdown={doc.body} />
      <QuestionsThisRaises questions={SESSION_QUESTIONS[slug]} />
    </section>
  );
}
