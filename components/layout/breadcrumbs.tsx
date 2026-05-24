"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  archive: "Archive",
  figures: "Figures",
  sessions: "Sessions",
  sources: "Sources",
  path: "Path",
  seeker: "Seeker",
  student: "Student",
  language: "Language",
  dictionary: "Dictionary",
  calls: "Calls",
  alphabet: "Alphabet",
  pronunciation: "Pronunciation",
  watchtowers: "Watchtowers",
  aethyrs: "Aethyrs",
  timeline: "Timeline",
  glossary: "Glossary",
  relationships: "Web",
  observatory: "Observatory",
  loagaeth: "Loagaeth",
  journal: "Journal",
  bookmarks: "Bookmarks",
  search: "Search",
  "john-dee": "John Dee",
  "edward-kelley": "Edward Kelley",
  overview: "Overview",
  "first-contact": "First Contact"
};

function labelFor(segment: string): string {
  return LABELS[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const parts = pathname.split("/").filter(Boolean);
  const crumbs = parts.map((part, i) => ({
    href: "/" + parts.slice(0, i + 1).join("/"),
    label: labelFor(part)
  }));

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-[1200px] px-6 pb-2 pt-1 text-[11px] text-gold-dim sm:px-8"
    >
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/archive" className="hover:text-gold">
            Archive
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            <span aria-hidden>/</span>
            {i === crumbs.length - 1 ? (
              <span className="text-gold-dim/80">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:text-gold">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
