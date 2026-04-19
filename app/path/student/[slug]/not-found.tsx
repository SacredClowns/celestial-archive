import Link from "next/link";
import { STUDENT_PATH } from "@/lib/lessons/student-path";

export default function StudentLessonNotFound() {
  return (
    <div className="reading-column mx-auto space-y-6 px-1 py-14 sm:px-0">
      <header className="space-y-2 border-b border-gold-dim/30 pb-6">
        <p className="font-display text-xs uppercase tracking-[0.18em] text-gold-dim">Student path</p>
        <h1 className="font-display text-2xl tracking-[0.06em] text-gold-light">No folio at this call number</h1>
      </header>
      <p className="leading-[1.9] text-gold-pale">
        The catalogue does not list a Student lesson at this address. Check the slug, or return to the Stage map and
        choose a numbered folio from the shelf.
      </p>
      <p className="text-sm text-gold-dim">
        <Link href={STUDENT_PATH} className="border-b border-gold-dim text-gold-light hover:text-gold">
          Return to Student path
        </Link>
      </p>
    </div>
  );
}
