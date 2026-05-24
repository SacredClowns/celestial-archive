"use client";

import { useBookmarks } from "@/lib/bookmarks/bookmark-context";

export function BookmarkButton({ title, href }: { title: string; href: string }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(href);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(title, href)}
      className={`rounded-sm border px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.12em] transition-colors ${
        saved
          ? "border-gold/50 bg-gold/10 text-gold"
          : "border-gold-dim/30 text-gold-dim hover:border-gold/40 hover:text-gold"
      }`}
      aria-pressed={saved}
    >
      {saved ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
