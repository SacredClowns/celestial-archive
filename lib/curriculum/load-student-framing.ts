import { readFileSync } from "node:fs";
import path from "node:path";

const CONTENT_ROOT = path.join(process.cwd(), "content", "curriculum");

export const STUDENT_INTRO_FOLIO_PATH = path.join(
  CONTENT_ROOT,
  "stage-2-student",
  "STUDENT_INTRO_FOLIO.md"
);

export const SEEKER_TO_STUDENT_BRIDGE_PATH = path.join(CONTENT_ROOT, "SEEKER_TO_STUDENT_BRIDGE.md");

export const HOW_TO_READ_THIS_ARCHIVE_PATH = path.join(CONTENT_ROOT, "HOW_TO_READ_THIS_ARCHIVE.md");

/** Split intro placard: opening through first horizontal break before "What Student Is" (keeps scan-ability). */
export const STUDENT_INTRO_SPLIT_MARKER = "\n## What Student Is\n";

export function readStudentFramingFile(absolutePath: string): string | null {
  try {
    return readFileSync(absolutePath, "utf8");
  } catch {
    return null;
  }
}

export function loadStudentIntroFolioRaw(): string | null {
  return readStudentFramingFile(STUDENT_INTRO_FOLIO_PATH);
}

export function loadSeekerToStudentBridgeRaw(): string | null {
  return readStudentFramingFile(SEEKER_TO_STUDENT_BRIDGE_PATH);
}

export function loadHowToReadThisArchiveRaw(): string | null {
  return readStudentFramingFile(HOW_TO_READ_THIS_ARCHIVE_PATH);
}

/** Remove duplicate page title when the page shell already names the section. */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+[^\n]+\n+/, "");
}

export type StudentIndexFraming = {
  introTeaser: string;
  introRest: string | null;
  bridge: string | null;
  fieldGuide: string | null;
};

/**
 * Placard (K), bridge (M), field guide (L) for /path/student. Returns null if intro folio is missing.
 */
export function buildStudentIndexFraming(): StudentIndexFraming | null {
  const introRaw = loadStudentIntroFolioRaw();
  if (!introRaw) return null;
  const intro = stripLeadingH1(introRaw);
  const marker = STUDENT_INTRO_SPLIT_MARKER;
  const idx = intro.indexOf(marker);
  let introTeaser: string;
  let introRest: string | null;
  if (idx === -1) {
    introTeaser = intro.trim();
    introRest = null;
  } else {
    introTeaser = intro.slice(0, idx).trim();
    introRest = intro.slice(idx).trim();
  }

  const bridgeRaw = loadSeekerToStudentBridgeRaw();
  const fieldRaw = loadHowToReadThisArchiveRaw();

  return {
    introTeaser,
    introRest,
    bridge: bridgeRaw ? stripLeadingH1(bridgeRaw).trim() : null,
    fieldGuide: fieldRaw ? stripLeadingH1(fieldRaw).trim() : null
  };
}
