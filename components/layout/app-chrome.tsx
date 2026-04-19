import Link from "next/link";
import { RoomTransition } from "@/components/motion/room-transition";
import { Starfield } from "@/components/motion/starfield";

const primaryNav = [
  { href: "/archive", label: "Archive" },
  { href: "/path/seeker", label: "Seeker" },
  { href: "/path/student", label: "Student" },
  { href: "/glossary", label: "Glossary" },
  { href: "/timeline", label: "Timeline" },
  { href: "/observatory", label: "Observatory" }
];

export function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-ink text-gold-pale">
      <Starfield />
      <div className="relative z-10">
        <header className="border-b border-gold-dim/30 bg-deep/90">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-4 sm:px-8">
            <Link href="/" className="font-display text-[11px] uppercase tracking-[0.32em] text-gold transition-colors duration-slow ease-gravity hover:text-gold-light">
              Celestial Archive
            </Link>
            <nav className="flex flex-wrap items-center gap-1 sm:gap-0.5">
              {primaryNav.map((item, idx) => (
                <span key={item.href} className="flex items-center">
                  <Link
                    href={item.href}
                    className="px-2.5 py-1.5 font-display text-[10px] uppercase tracking-[0.14em] text-gold-dim transition-colors duration-slow ease-gravity hover:text-gold-light sm:px-3"
                  >
                    {item.label}
                  </Link>
                  {idx < primaryNav.length - 1 ? (
                    <span className="hidden text-gold-dim/30 sm:inline" aria-hidden>·</span>
                  ) : null}
                </span>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
          <RoomTransition>
            {children}
          </RoomTransition>
        </main>
      </div>
    </div>
  );
}