import { describe, expect, it } from "vitest";
import { tokenizeInline } from "@/lib/lesson-markdown/inline-tokens";

const glyphs = (text: string) =>
  tokenizeInline(text)
    .filter((t) => t.kind === "glyph")
    .map((t) => t.value);

const rebuilt = (text: string) =>
  tokenizeInline(text)
    .map((t) => t.value)
    .join("");

describe("inline lesson tokenizer", () => {
  it("never loses or alters a character", () => {
    const samples = [
      "A plain sentence.",
      "Did the angels speak? Dee thought so.",
      "◆ The manuscript survives.",
      "| 15 | Kelley's name change | ? | Contested |",
      "Roughly ~1584, on the road.",
      "Nothing here asks you to believe — everything asks you to look. ⚠"
    ];
    for (const s of samples) {
      expect(rebuilt(s)).toBe(s);
    }
  });

  it("reads unambiguous glyphs as badges anywhere", () => {
    expect(glyphs("◆ attested")).toEqual(["◆"]);
    expect(glyphs("consensus ◇ here")).toEqual(["◇"]);
    expect(glyphs("tradition ○ says")).toEqual(["○"]);
    expect(glyphs("later △ reading")).toEqual(["△"]);
    expect(glyphs("parallel ◎ noted")).toEqual(["◎"]);
    expect(glyphs("care ⚠ needed")).toEqual(["⚠"]);
  });

  it("does not badge a question mark that ends a sentence", () => {
    expect(glyphs("Which direction did your mind pull?")).toEqual([]);
    expect(glyphs("What was the Enochian system? Nobody agrees.")).toEqual([]);
    expect(glyphs("Really?!")).toEqual([]);
  });

  it("still badges a question mark standing alone, as the witness tables write it", () => {
    expect(glyphs("| 16 | Kelley's ears cropped | ? | Contested |")).toEqual(["?"]);
    expect(glyphs("**That the mirror was obsidian:** ? Contested.")).toEqual(["?"]);
    expect(glyphs("? Disputed at the outset")).toEqual(["?"]);
  });

  it("does not badge a tilde attached to a figure", () => {
    expect(glyphs("~1584")).toEqual([]);
    expect(glyphs("roughly ~60,000 words")).toEqual([]);
  });

  it("still badges a tilde standing alone", () => {
    expect(glyphs("The reading is ~ speculative at best")).toEqual(["~"]);
  });

  it("keeps rhetorical questions clean in a realistic passage", () => {
    const passage =
      "You have spent two ranks learning about these pages. What stands between the manuscript and you — " +
      "and how do you read through it without pretending it is not there? That is the Observer's question. ◆";
    expect(glyphs(passage)).toEqual(["◆"]);
  });

  it("surfaces candidate Enochian words for linking", () => {
    const words = tokenizeInline("The word MADRIAX appears in the Call.")
      .filter((t) => t.kind === "word")
      .map((t) => t.value);
    expect(words).toContain("MADRIAX");
  });
});
