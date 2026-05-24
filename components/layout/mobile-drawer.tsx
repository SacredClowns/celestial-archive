"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function MobileDrawer({
  open,
  onClose,
  navItems,
  onSearch,
  onJournalQuick
}: {
  open: boolean;
  onClose: () => void;
  navItems: { href: string; label: string }[];
  onSearch: () => void;
  onJournalQuick: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-ink/80"
        aria-label="Close menu"
        onClick={onClose}
      />
      <nav
        ref={panelRef}
        className="absolute right-0 top-0 flex h-full w-[min(320px,85vw)] flex-col border-l border-gold-dim/30 bg-deep px-6 py-8 shadow-2xl"
        aria-label="Mobile navigation"
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-xs uppercase tracking-[0.2em] text-gold-dim">Archive</span>
          <button
            type="button"
            onClick={onClose}
            className="font-display text-lg text-gold-dim hover:text-gold"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            onSearch();
            onClose();
          }}
          className="mb-4 w-full rounded-sm border border-gold-dim/30 py-3 text-left font-display text-sm uppercase tracking-wider text-gold-pale"
        >
          Search ⌘K
        </button>
        <button
          type="button"
          onClick={() => {
            onJournalQuick();
            onClose();
          }}
          className="mb-6 w-full rounded-sm border border-gold-dim/30 py-3 text-left font-display text-sm uppercase tracking-wider text-gold-pale"
        >
          Quick journal entry
        </button>
        <Link
          href="/bookmarks"
          onClick={onClose}
          className="mb-6 block w-full rounded-sm border border-gold-dim/20 py-3 text-center font-display text-sm uppercase tracking-wider text-gold-dim hover:text-gold"
        >
          Bookmarks
        </Link>
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-3 font-display text-sm uppercase tracking-[0.14em] text-gold-dim transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
