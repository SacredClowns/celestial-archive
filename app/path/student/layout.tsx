import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Student path",
    template: "%s — Student — Celestial Archive"
  },
  robots: { index: true, follow: true }
};

export default function StudentPathLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="student-path-preview pb-16">
      <div
        className="sticky top-0 z-50 w-full border-b border-gold-dim/30 bg-ink/90 px-3 py-2 text-center font-display text-[10px] uppercase tracking-[0.15em] text-gold-dim backdrop-blur-sm sm:py-1.5"
        role="status"
        aria-label="Archive posture"
      >
        <span className="text-balance">Controlled preview — Student path</span>
      </div>
      <main id="student-path-main" className="scroll-mt-[2.75rem]">
        {children}
      </main>
    </div>
  );
}
