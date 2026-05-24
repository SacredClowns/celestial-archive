import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { studentLessonRegistry } from "@/lib/student/student-lesson-registry";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

const PREFIX = "/path/student/";

/** Legacy lesson-id URLs → canonical catalogue slugs (308). */
const LESSON_ID_TO_SLUG = Object.fromEntries(studentLessonRegistry.map((r) => [r.id, r.slug]));

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(PREFIX) && pathname !== PREFIX.slice(0, -1)) {
    const segment = pathname.slice(PREFIX.length);
    if (segment && !segment.includes("/")) {
      const slug = LESSON_ID_TO_SLUG[segment];
      if (slug) {
        const url = request.nextUrl.clone();
        url.pathname = `${PREFIX}${slug}`;
        return NextResponse.redirect(url, 308);
      }
    }
  }

  return updateSupabaseSession(request);
}

export const config = {
  matcher: [
    "/path/student/:segment",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
