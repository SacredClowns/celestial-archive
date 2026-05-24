import Link from "next/link";

export function LessonNavFooter({
  previous,
  next,
  stageLabel,
  stageHref
}: {
  stageLabel: string;
  stageHref: string;
  previous?: { href: string; title: string; label: string } | null;
  next?: { href: string; title: string; label: string } | null;
}) {
  return (
    <nav className="mt-16 flex flex-col gap-6 border-t border-gold-dim/40 pt-10 sm:flex-row sm:justify-between">
      {previous ? (
        <Link
          href={previous.href}
          className="group max-w-sm rounded-sm border border-gold-dim/25 bg-ink/20 px-5 py-4 transition-colors hover:border-gold/40"
        >
          <p className="font-display text-[10px] uppercase tracking-[0.14em] text-gold-dim">Previous</p>
          <p className="mt-1 font-display text-gold group-hover:text-gold-light">{previous.title}</p>
          <p className="text-xs text-gold-dim">{previous.label}</p>
        </Link>
      ) : (
        <div />
      )}
      <Link href={stageHref} className="self-center font-display text-xs uppercase tracking-[0.16em] text-gold-dim hover:text-gold">
        {stageLabel}
      </Link>
      {next ? (
        <Link
          href={next.href}
          className="group max-w-sm rounded-sm border border-gold-dim/25 bg-ink/20 px-5 py-4 text-right transition-colors hover:border-gold/40 sm:ml-auto"
        >
          <p className="font-display text-[10px] uppercase tracking-[0.14em] text-gold-dim">Next</p>
          <p className="mt-1 font-display text-gold group-hover:text-gold-light">{next.title}</p>
          <p className="text-xs text-gold-dim">{next.label}</p>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
