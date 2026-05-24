import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-gold-dim/10 py-10">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <p className="font-display text-sm text-gold-dim/70">The Celestial Archive</p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-gold-dim/50">
          An exploration of the Enochian system of John Dee and Edward Kelley. All historical claims are sourced and
          badged. No claim is endorsed as fact.
        </p>
        <nav className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-wider text-gold-dim/50">
          <Link href="/archive" className="hover:text-gold-dim">
            Archive
          </Link>
          <Link href="/glossary" className="hover:text-gold-dim">
            Glossary
          </Link>
          <Link href="/path/seeker/the-lost-language" className="hover:text-gold-dim">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
