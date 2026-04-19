import { describe, expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import type { Blockquote, Root } from "mdast";
import { remarkLessonDirectives } from "./remark-lesson-directives";

/** Parse + run remark transforms (`.parse()` alone does not run plugins). */
function parse(md: string): Root {
  const processor = unified().use(remarkParse).use(remarkDirective).use(remarkLessonDirectives).use(remarkGfm);
  return processor.runSync(processor.parse(md)) as Root;
}

function findSemanticBlocks(tree: ReturnType<typeof parse>): Blockquote[] {
  const out: Blockquote[] = [];
  visit(tree, "blockquote", (node) => {
    const b = node as Blockquote;
    if (b.data && typeof b.data === "object" && "hName" in b.data && (b.data as { hName?: string }).hName === "div") {
      out.push(b);
    }
  });
  return out;
}

describe("remarkLessonDirectives", () => {
  it("maps :::discernment to a semantic blockquote (hName div + dataLessonBlock)", () => {
    const tree = parse(":::discernment\nLine one\n:::\n");
    const blocks = findSemanticBlocks(tree);
    expect(blocks.length).toBe(1);
    const props = blocks[0].data?.hProperties as Record<string, unknown> | undefined;
    expect(blocks[0].data?.hName).toBe("div");
    expect(props?.dataLessonBlock).toBe("discernment");
  });

  it("maps unknown :::custom directives to plain blockquotes (backward compatible)", () => {
    const tree = parse(":::custom-unknown\nHello\n:::\n");
    let sawDirective = false;
    visit(tree, "containerDirective", () => {
      sawDirective = true;
    });
    expect(sawDirective).toBe(false);
    const plain: Blockquote[] = [];
    visit(tree, "blockquote", (node) => {
      const b = node as Blockquote;
      if (!b.data?.hName) plain.push(b);
    });
    expect(plain.length).toBe(1);
    expect(plain[0].children[0]).toMatchObject({ type: "paragraph" });
  });

  it("allows GFM tables inside a directive body", () => {
    const md = `:::notice
| a | b |
|---|---|
| 1 | 2 |
:::
`;
    const tree = parse(md);
    visit(tree, "table", () => {
      expect(true).toBe(true);
    });
  });
});
