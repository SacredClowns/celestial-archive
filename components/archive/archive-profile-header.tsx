import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import type { ArchiveMarkdownFrontmatter } from "@/lib/archive/load-archive-markdown";

export function ArchiveProfileHeader({
  frontmatter,
  kind
}: {
  frontmatter: ArchiveMarkdownFrontmatter;
  kind: "figure" | "session";
}) {
  return (
    <header className="space-y-4 border-b border-gold-dim/35 pb-8">
      <p className="font-display text-xs uppercase tracking-[0.28em] text-gold-dim">
        The Archive · {kind === "figure" ? "Figure" : "Session"}
      </p>
      <h1 className="font-display text-4xl tracking-[0.06em] text-gold">
        {frontmatter.title ?? "Untitled"}
      </h1>
      {frontmatter.subject ? (
        <p className="text-lg italic text-gold-light">{frontmatter.subject}</p>
      ) : null}
      {(frontmatter.born || frontmatter.died) && (
        <p className="text-sm text-gold-dim">
          {frontmatter.born}
          {frontmatter.born && frontmatter.died ? " — " : ""}
          {frontmatter.died}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <EpistemicBadge tone="historical" compact />
        <span className="font-display text-[10px] uppercase tracking-[0.14em] text-gold-dim">
          Source-badged reference
        </span>
      </div>
    </header>
  );
}
