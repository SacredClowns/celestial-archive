"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { JournalFab } from "@/components/journal/journal-fab";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { RoomTransition } from "@/components/motion/room-transition";
import { Starfield } from "@/components/motion/starfield";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AccountMenu } from "@/components/auth/account-menu";
import { PageDidYouKnow } from "@/components/layout/page-did-you-know";
import { SearchOverlay, useSearchShortcut } from "@/components/search/search-overlay";
import { SessionBeacon } from "@/components/analytics/session-beacon";

const navItems = [
  { href: "/archive", label: "Archive" },
  { href: "/path", label: "Path" },
  { href: "/language", label: "Language" },
  { href: "/watchtowers", label: "Watchtowers" },
  { href: "/aethyrs", label: "Aethyrs" },
  { href: "/timeline", label: "Timeline" },
  { href: "/glossary", label: "Glossary" },
  { href: "/relationships", label: "Web" },
  { href: "/observatory", label: "Observatory" },
  { href: "/journal", label: "Journal" },
  { href: "/discovery", label: "Discoveries" }
];

export function AppChromeClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  useSearchShortcut(openSearch);

  if (
    pathname?.startsWith("/instrumentarium") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/grimoire")
  ) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen bg-ink text-gold-pale">
      <SessionBeacon />
      <Starfield />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="border-b border-gold-dim/30 bg-deep/90">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-4 sm:px-8">
            <Link
              href="/archive"
              className="font-display text-[11px] uppercase tracking-[0.32em] text-gold transition-colors duration-slow ease-gravity hover:text-gold-light"
            >
              <span className="md:hidden">Archive</span>
              <span className="hidden md:inline">Celestial Archive</span>
            </Link>

            <nav className="hidden items-center gap-0.5 md:flex">
              {navItems.map((item, idx) => (
                <span key={item.href} className="flex items-center">
                  <Link
                    href={item.href}
                    className="px-2 py-1.5 font-display text-[10px] uppercase tracking-[0.12em] text-gold-dim transition-colors hover:text-gold-light"
                  >
                    {item.label}
                  </Link>
                  {idx < navItems.length - 1 ? (
                    <span className="text-gold-dim/30" aria-hidden>
                      ·
                    </span>
                  ) : null}
                </span>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <AccountMenu />
              <button
                type="button"
                onClick={openSearch}
                className="rounded-sm border border-gold-dim/25 px-2.5 py-1.5 font-display text-[10px] uppercase tracking-wider text-gold-dim hover:border-gold/40 hover:text-gold"
                aria-label="Search"
              >
                ⌕
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="rounded-sm border border-gold-dim/25 px-2.5 py-1.5 font-display text-lg text-gold-dim hover:text-gold md:hidden"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </div>
        </header>

        <Breadcrumbs />

        <main className="page-enter mx-auto w-full max-w-[1200px] flex-1 px-6 py-16 sm:px-8">
          <PageDidYouKnow />
          <RoomTransition>{children}</RoomTransition>
        </main>

        <SiteFooter />
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={navItems}
        onSearch={openSearch}
        onJournalQuick={() => {
          window.location.href = "/journal/new";
        }}
      />
      <JournalFab />
      <ScrollToTop />
    </div>
  );
}
