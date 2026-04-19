const MAIN_START = "### Learning Goals";

/** Companion / production appendix — excluded from reader column */
const COMPANION_PATTERNS: RegExp[] = [
  /\n---\s*\n+\s*# ═══════════════════════════════════════════════\s*\n# COMPANION ELEMENTS\s*\n/,
  /\n# ═══════════════════════════════════════════════\s*\n# COMPANION ELEMENTS\s*\n/,
  /\n# COMPANION ELEMENTS\s*\n/,
  /\n## Companion Elements\s*\n/
];

const CLOSING_BANNER: RegExp[] = [
  /\n---\s*\n+\s*# ═══════════════════════════════════════════════\s*\n# CLOSING PASSAGE\s*\n# ═══════════════════════════════════════════════\s*\n/,
  /\n# ═══════════════════════════════════════════════\s*\n# CLOSING PASSAGE\s*\n# ═══════════════════════════════════════════════\s*\n/,
  /\n## Closing Passage\s*\n/
];

function findCompanionStart(body: string, searchFrom: number): number {
  let min = body.length;
  for (const re of COMPANION_PATTERNS) {
    const slice = body.slice(searchFrom);
    const m = slice.match(re);
    if (m && m.index !== undefined) {
      min = Math.min(min, searchFrom + m.index);
    }
  }
  return min;
}

/** Markdown body after CLOSING PASSAGE headings (if any). */
function sliceAfterClosingBanner(body: string): string {
  for (const re of CLOSING_BANNER) {
    const m = body.match(re);
    if (m && m.index !== undefined) {
      return body.slice(m.index + m[0].length);
    }
  }
  return "";
}

export function stripClosingPassageDecorators(md: string): string {
  return md
    .replace(/^# ═══[^\n]*\n# CLOSING PASSAGE\n# ═══[^\n]*\n?/m, "")
    .replace(/^# CLOSING PASSAGE\s*\n# ═══[^\n]*\n?/m, "")
    .replace(/^## Closing Passage\s*\n/m, "")
    .trim();
}

export function extractMainReaderColumn(body: string): string {
  const start = body.indexOf(MAIN_START);
  if (start === -1) {
    throw new Error("Lesson markdown must contain a '### Learning Goals' section.");
  }
  const companionAt = findCompanionStart(body, start);
  return body.slice(start, companionAt).trim();
}

export function extractClosingPassage(body: string): string {
  const after = sliceAfterClosingBanner(body);
  if (!after) return "";

  const ep = after.indexOf("*Epistemic status");
  const end = ep === -1 ? after.length : after.lastIndexOf("\n---", ep);
  const chunk = ep === -1 ? after : after.slice(0, end === -1 ? ep : end);
  return stripClosingPassageDecorators(chunk.trim());
}

/** Epistemic line + sources (from horizontal rule before *Epistemic or **Sources). */
export function extractPostface(body: string): string {
  const ep = body.indexOf("*Epistemic status");
  if (ep !== -1) {
    const blockStart = body.lastIndexOf("\n---", ep);
    return blockStart === -1 ? body.slice(ep).trim() : body.slice(blockStart + 1).trim();
  }
  const src = body.indexOf("**Sources cited in this lesson:**");
  if (src === -1) return "";
  const blockStart = body.lastIndexOf("\n---", src);
  return blockStart === -1 ? body.slice(src).trim() : body.slice(blockStart + 1).trim();
}
