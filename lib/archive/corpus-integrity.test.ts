import { describe, expect, it } from "vitest";
import { getAethyrExplorerData, getAllAethyrs } from "@/lib/aethyrs/aethyr-data";
import { getAllCallTextData, getAllCalls, getAllLetters } from "@/lib/language/language-data";
import { GREAT_TABLE_VERSIONS, getGreatTableFullGrid } from "@/lib/watchtowers/watchtower-data";
import { GLYPH_PATHS } from "@/lib/language/glyph-paths";

/**
 * Corpus integrity.
 *
 * These are not unit tests of behaviour — they are guardrails around the
 * scholarship. The Archive's entire claim is that its numbers are the
 * manuscript's numbers. If a data file is ever truncated, re-keyed or
 * half-migrated, these fail loudly instead of the site quietly presenting
 * a corpus that is subtly wrong.
 */

describe("the thirty Aethyrs", () => {
  const aethyrs = getAllAethyrs();
  const meta = getAethyrExplorerData();

  it("numbers exactly thirty heavens", () => {
    expect(aethyrs).toHaveLength(30);
    expect(meta.totalAethyrs).toBe(30);
  });

  it("is numbered 1..30 with no gaps or repeats", () => {
    const numbers = aethyrs.map((a) => a.number).sort((x, y) => x - y);
    expect(numbers).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
  });

  it("opens at LIL and ends at TEX", () => {
    expect(aethyrs.find((a) => a.number === 1)?.name).toBe("LIL");
    expect(aethyrs.find((a) => a.number === 30)?.name).toBe("TEX");
  });

  it("carries ninety-one governors in total", () => {
    const total = aethyrs.reduce((sum, a) => sum + a.governors.length, 0);
    expect(total).toBe(91);
    expect(meta.totalGovernors).toBe(91);
  });

  it("gives every governor a name and an angelic king", () => {
    for (const aethyr of aethyrs) {
      for (const governor of aethyr.governors) {
        expect(governor.name, `${aethyr.name} has an unnamed governor`).toBeTruthy();
        expect(governor.angelicKing, `${governor.name} has no angelic king`).toBeTruthy();
      }
    }
  });

  it("gives every Aethyr a name that can be routed to", () => {
    for (const aethyr of aethyrs) {
      expect(aethyr.name).toMatch(/^[A-Z]{3,4}$/);
    }
  });
});

describe("the twenty-one letters", () => {
  const letters = getAllLetters();

  it("numbers exactly twenty-one", () => {
    expect(letters).toHaveLength(21);
  });

  it("holds positions 1..21 with no gaps", () => {
    const positions = letters.map((l) => l.position).sort((a, b) => a - b);
    expect(positions).toEqual(Array.from({ length: 21 }, (_, i) => i + 1));
  });

  it("gives every letter a name and an English equivalent", () => {
    for (const letter of letters) {
      expect(letter.name).toBeTruthy();
      expect(letter.englishEquivalent).toBeTruthy();
    }
  });

  it("has a drawn sigil for every letter on the Sigil Wall", () => {
    const missing = letters.filter((l) => !GLYPH_PATHS[l.name.toLowerCase()]).map((l) => l.name);
    expect(missing, `letters with no glyph: ${missing.join(", ")}`).toEqual([]);
  });

  it("draws every sigil with at least one stroke", () => {
    for (const [name, paths] of Object.entries(GLYPH_PATHS)) {
      expect(paths.length, `${name} has no strokes`).toBeGreaterThan(0);
      for (const d of paths) {
        expect(d.startsWith("M"), `${name} has a stroke that does not begin with a move`).toBe(true);
      }
    }
  });
});

describe("the nineteen Calls", () => {
  const calls = getAllCalls();
  const texts = getAllCallTextData();

  it("numbers exactly nineteen", () => {
    expect(calls).toHaveLength(19);
    expect(texts).toHaveLength(19);
  });

  it("is numbered 1..19 with no gaps", () => {
    const numbers = texts.map((c) => c.number).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: 19 }, (_, i) => i + 1));
  });

  it("gives every Call a title and a body", () => {
    for (const call of texts) {
      expect(call.title, `Call ${call.number} has no title`).toBeTruthy();
      expect(call.enochianText.length, `Call ${call.number} has no text`).toBeGreaterThan(0);
    }
  });

  it("glosses every word it recites, and every word can be voiced", () => {
    for (const call of texts) {
      expect(call.words.length, `Call ${call.number} has no word breakdown`).toBeGreaterThan(0);
      for (const word of call.words) {
        expect(word.enochian, `Call ${call.number} has a wordless entry`).toBeTruthy();
        expect(word.english, `Call ${call.number} word ${word.pos} has no gloss`).toBeDefined();
        // Not every word carries a reconstructed pronunciation; the reciter
        // falls back to the Enochian spelling, so one of the two must exist.
        expect(
          word.pronunciation || word.enochian,
          `Call ${call.number} word ${word.pos} cannot be voiced at all`
        ).toBeTruthy();
      }
    }
  });
});

describe("the Great Table", () => {
  it("offers every recension the Archive advertises", () => {
    expect(GREAT_TABLE_VERSIONS.length).toBeGreaterThanOrEqual(4);
  });

  for (const version of GREAT_TABLE_VERSIONS) {
    it(`renders ${version.id} as a complete rectangular grid`, () => {
      const { grid, rows, columns } = getGreatTableFullGrid(version.id);
      expect(grid.length).toBe(rows);
      for (const row of grid) {
        expect(row.length, `${version.id} has a ragged row`).toBe(columns);
        for (const cell of row) {
          expect(cell, `${version.id} has an empty cell`).toBeTruthy();
        }
      }
    });
  }

  it("keeps the recensions the same shape so they can be compared", () => {
    const shapes = GREAT_TABLE_VERSIONS.map((v) => {
      const { rows, columns } = getGreatTableFullGrid(v.id);
      return `${rows}x${columns}`;
    });
    expect(new Set(shapes).size, `recensions differ in shape: ${shapes.join(", ")}`).toBe(1);
  });

  it("actually differs from Dee's witness where later traditions rewrote it", () => {
    const sloane = getGreatTableFullGrid("sloane-3191").grid;
    const goldenDawn = getGreatTableFullGrid("golden-dawn").grid;
    let differences = 0;
    sloane.forEach((row, r) =>
      row.forEach((letter, c) => {
        if (goldenDawn[r]?.[c] !== letter) differences++;
      })
    );
    // If this ever hits zero, the diff view is silently lying to the reader.
    expect(differences).toBeGreaterThan(0);
  });
});
