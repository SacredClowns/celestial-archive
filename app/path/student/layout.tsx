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
      <main id="student-path-main">{children}</main>
      <p
        className="mx-auto mt-12 max-w-reading px-6 text-center text-[11px] text-gold-dim/70"
        role="note"
      >
        Student path — expanded curriculum; some assignments and tables remain under verification.
      </p>
    </div>
  );
}
