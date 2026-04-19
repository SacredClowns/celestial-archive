import Link from "next/link";
import { STUDENT_PATH } from "@/lib/lessons/student-path";

/**
 * Server-only archival surface when a folio view model cannot be assembled.
 * No stack traces; no framework error vocabulary.
 */
export function StudentLessonArchiveFault() {
  return (
    <div className="reading-column mx-auto space-y-6 px-1 py-14 sm:px-0">
      <header className="space-y-2 border-b border-gold-dim/30 pb-6">
        <p className="font-display text-xs uppercase tracking-[0.18em] text-gold-dim">Student path</p>
        <h1 className="font-display text-2xl tracking-[0.06em] text-gold-light">This folio could not be assembled</h1>
      </header>
      <p className="leading-[1.9] text-gold-pale">
        The catalogue points here, but the reader column, registry slice, or filing marks did not resolve into a stable
        view. The shelf is unchanged; only the display failed.
      </p>
      <p className="text-sm text-gold-dim">
        <Link href={STUDENT_PATH} className="border-b border-gold-dim text-gold-light hover:text-gold">
          Return to stage map
        </Link>
      </p>
    </div>
  );
}
