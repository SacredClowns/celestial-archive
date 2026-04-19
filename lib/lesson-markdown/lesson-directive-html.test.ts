import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import matter from "gray-matter";
import { extractMainReaderColumn } from "./split-body";
import { remarkLessonDirectives } from "./remark-lesson-directives";

async function toHtml(md: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkLessonDirectives)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

describe("lesson directives → HTML (react-markdown–compatible AST)", () => {
  it("emits a div with data-lesson-block for :::discernment", async () => {
    const html = await toHtml(":::discernment\nOne **two**.\n:::\n");
    expect(html).toContain('data-lesson-block="discernment"');
    expect(html).toContain("<strong>two</strong>");
  });

  it("Lesson 1.2 main column contains semantic divs after migration", async () => {
    const raw = readFileSync(
      path.join(process.cwd(), "content", "curriculum", "stage-1-seeker", "STAGE_1_SEEKER_LESSON_2.md"),
      "utf8"
    );
    const main = extractMainReaderColumn(matter(raw).content);
    const html = await toHtml(main);
    expect(html).toContain('data-lesson-block="notice"');
    expect(html).toContain('data-lesson-block="warning"');
    expect(html).toContain('data-lesson-block="discernment"');
    expect(html).toContain('data-lesson-block="reflection"');
    expect(html).toContain('data-lesson-block="unlocks"');
  });
});
