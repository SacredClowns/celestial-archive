/**
 * Inline lesson tokenizer.
 *
 * Lesson prose carries epistemic glyphs inline (◆ ◇ ○ △ ◎ ~ ? ⚠), which the
 * renderer turns into badges. Two of those glyphs are also ordinary
 * punctuation: `?` ends a question and `~` precedes an approximate figure.
 * Treating every `?` as a badge marked ~700 rhetorical questions across the
 * curriculum as "Disputed — attested but contested", which is both ugly and
 * epistemically false.
 *
 * So the ambiguous glyphs only count as badges when they stand alone —
 * whitespace (or an edge) on both sides, which is how the curriculum actually
 * writes them: `| ? |` in witness tables, or `**Claim:** ? Contested.`
 */

export const INLINE_TOKEN_RE = /([◆◇○△◎~?⚠]|\b[A-Z]{3,}\b)/g;

const GLYPHS = new Set(["◆", "◇", "○", "△", "◎", "~", "?", "⚠"]);

/** Glyphs that double as ordinary punctuation and need a standalone check. */
const AMBIGUOUS = new Set(["~", "?"]);

export type InlineToken =
  | { kind: "text"; value: string }
  | { kind: "glyph"; value: string }
  | { kind: "word"; value: string };

function standsAlone(segments: string[], index: number): boolean {
  const prev = segments[index - 1] ?? "";
  const next = segments[index + 1] ?? "";
  const openLeft = prev === "" || /\s$/.test(prev);
  const openRight = next === "" || /^\s/.test(next);
  return openLeft && openRight;
}

/**
 * Splits a run of lesson text into badge glyphs, candidate Enochian words,
 * and plain text. Pure — the renderer decides what to draw for each token.
 */
export function tokenizeInline(text: string): InlineToken[] {
  const segments = text.split(INLINE_TOKEN_RE);

  return segments.map((segment, index) => {
    if (segment.length === 1 && GLYPHS.has(segment)) {
      if (!AMBIGUOUS.has(segment) || standsAlone(segments, index)) {
        return { kind: "glyph", value: segment };
      }
      return { kind: "text", value: segment };
    }
    if (/^[A-Z]{3,}$/.test(segment)) {
      return { kind: "word", value: segment };
    }
    return { kind: "text", value: segment };
  });
}
