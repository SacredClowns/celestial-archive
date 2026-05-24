import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveMarkdownView } from "@/components/archive/archive-markdown-view";
import { ArchiveProfileHeader } from "@/components/archive/archive-profile-header";
import { BookmarkButton } from "@/components/layout/bookmark-button";
import { ARCHIVE_FIGURES } from "@/lib/archive/archive-registry";
import { QuestionsThisRaises } from "@/components/discernment/questions-this-raises";
import { loadArchiveFigureMarkdown } from "@/lib/archive/load-archive-markdown";

export function generateStaticParams() {
  return ARCHIVE_FIGURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = ARCHIVE_FIGURES.find((f) => f.slug === slug);
  return {
    title: figure ? `${figure.title} · Archive` : "Figure · Archive",
    description: `Archive profile: ${figure?.title ?? "figure"}.`
  };
}

export default async function ArchiveFigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!ARCHIVE_FIGURES.some((f) => f.slug === slug)) notFound();

  const doc = loadArchiveFigureMarkdown(slug);
  const pageTitle = doc.frontmatter.title ?? doc.record.title;

  return (
    <section className="page-enter mx-auto max-w-reading space-y-10">
      <Link
        href="/archive"
        className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim hover:text-gold"
      >
        ← The Archive
      </Link>
      <ArchiveProfileHeader frontmatter={doc.frontmatter} kind="figure" />
      <BookmarkButton title={pageTitle} href={`/archive/figures/${slug}`} />
      <ArchiveMarkdownView markdown={doc.body} />
      {doc.frontmatter.key_scholarly_sources && doc.frontmatter.key_scholarly_sources.length > 0 ? (
        <aside className="border-t border-gold-dim/30 pt-8">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-gold-dim">Key sources</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-gold-pale">
            {doc.frontmatter.key_scholarly_sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </aside>
      ) : null}
      <QuestionsThisRaises
        questions={
          slug === "john-dee"
            ? [
                "How do you hold Dee's Christian piety together with his angelic practice without collapsing one into the other?",
                "What does the looting of Mortlake library mean for what we can still verify about his work?",
                "Is Dee best read as scientist, magician, or something the modern categories do not capture?"
              ]
            : [
                "How do you evaluate the forgery conviction without a surviving court record?",
                "What does Kelley's distress during sessions suggest — if anything — about sincerity?",
                "Who benefits from the claim that Kelley was purely a fraud?"
              ]
        }
      />
    </section>
  );
}
