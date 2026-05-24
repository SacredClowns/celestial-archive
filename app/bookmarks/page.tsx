"use client";

import Link from "next/link";
import { useBookmarks } from "@/lib/bookmarks/bookmark-context";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <section className="page-enter mx-auto max-w-[720px] space-y-10">
      <header className="space-y-3 border-b border-gold-dim/35 pb-8">
        <h1 className="font-display text-4xl tracking-[0.06em] text-gold">Bookmarks</h1>
        <p className="text-gold-pale">Pages you marked to return to — stored on this device only.</p>
      </header>

      {bookmarks.length === 0 ? (
        <p className="italic text-gold-dim">
          No bookmarks yet. Use the bookmark control on archive profiles, lessons, and reference pages.
        </p>
      ) : (
        <ul className="space-y-3">
          {bookmarks.map((b) => (
            <li
              key={b.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-gold-dim/25 bg-ink/20 px-4 py-3"
            >
              <div>
                <Link href={b.href} className="font-display text-gold hover:text-gold-light">
                  {b.title}
                </Link>
                <p className="text-xs text-gold-dim">{b.href}</p>
              </div>
              <button
                type="button"
                onClick={() => removeBookmark(b.id)}
                className="font-display text-[10px] uppercase tracking-wider text-gold-dim hover:text-gold"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
