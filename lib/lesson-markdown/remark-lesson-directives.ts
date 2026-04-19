import type { Blockquote, Root } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";
import { visit } from "unist-util-visit";

/** Canonical fenced directive names (kebab-case). */
export const LESSON_DIRECTIVE_NAMES = [
  "discernment",
  "notice",
  "warning",
  "multiple-interpretations",
  "reflection",
  "knowledge-check",
  "unlocks",
  "source-strip",
  "closing-passage"
] as const;

export type LessonDirectiveName = (typeof LESSON_DIRECTIVE_NAMES)[number];

const ALLOWED = new Set<string>(LESSON_DIRECTIVE_NAMES);

function toSemanticBlock(node: ContainerDirective): Blockquote {
  const name = node.name;
  return {
    type: "blockquote",
    data: {
      hName: "div",
      hProperties: {
        className: ["lesson-semantic-block", `lesson-semantic-block--${name}`],
        dataLessonBlock: name
      }
    },
    children: node.children as Blockquote["children"]
  };
}

function toPlainBlockquote(node: ContainerDirective): Blockquote {
  return {
    type: "blockquote",
    children: node.children as Blockquote["children"]
  };
}

/**
 * Turns `:::name ... :::` (remark-directive) into divs with `data-lesson-block`
 * so react-markdown can map them to Archive lesson shells.
 * Unknown `:::custom` directives become plain blockquotes (backward compatible).
 */
export function remarkLessonDirectives() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node, index, parent) => {
      if (!parent || index === undefined || typeof index !== "number") return;
      const d = node as ContainerDirective;
      if (ALLOWED.has(d.name)) {
        parent.children[index] = toSemanticBlock(d);
      } else {
        parent.children[index] = toPlainBlockquote(d);
      }
    });
  };
}

/** Test helper: stringify inner phrasing for assertions */
export function directiveNamesInMarkdown(md: string): string[] {
  const re = /^:::([\w-]+)\s*$/gm;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    out.push(m[1]);
  }
  return out;
}
