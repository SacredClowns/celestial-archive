"use client";

import type { Element as HastElement } from "hast";
import Link from "next/link";
import type { ReactNode } from "react";
import { Children, Fragment, cloneElement, isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { EpistemicBadge } from "@/components/discernment/epistemic-badge";
import { EnochianTextLink } from "@/components/language/enochian-text-link";
import { isEnochianDictionaryWord } from "@/lib/language/enochian-link-words";
import { SemanticLessonBlock } from "@/components/lesson/semantic-lesson-block";
import { VerificationPendingChip } from "@/components/lesson/verification-pending-chip";
import { remarkLessonDirectives } from "@/lib/lesson-markdown/remark-lesson-directives";
import { VERIFICATION_PENDING_SENTINEL_PREFIX } from "@/lib/lesson-markdown/verification-pending-markers";
import type { EpistemicTone } from "@/lib/lesson-types";

function readDataLessonBlock(node: HastElement | undefined): string | undefined {
  if (!node?.properties) return undefined;
  const raw = node.properties.dataLessonBlock;
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw) && typeof raw[0] === "string") return raw[0];
  return undefined;
}

const GLYPH_TO_TONE: Partial<Record<string, EpistemicTone>> = {
  "◆": "historical",
  "◇": "consensus",
  "○": "occult",
  "△": "later",
  "◎": "parallel",
  "~": "speculative",
  "?": "disputed",
  "⚠": "caution"
};

const INLINE_TOKEN_RE = /([◆◇○△◎~?⚠]|\b[A-Z]{3,}\b)/g;

function renderStringWithBadges(text: string, keyPrefix: string): ReactNode[] {
  const segments = text.split(INLINE_TOKEN_RE);
  return segments.map((seg, i) => {
    const tone = GLYPH_TO_TONE[seg];
    if (tone) {
      return <EpistemicBadge key={`${keyPrefix}-${i}`} tone={tone} compact />;
    }
    if (/^[A-Z]{3,}$/.test(seg) && isEnochianDictionaryWord(seg)) {
      return <EnochianTextLink key={`${keyPrefix}-en-${i}`} word={seg} />;
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{seg}</Fragment>;
  });
}

const VERIFICATION_TOKEN_RE = /<<<VERIFICATION_PENDING:([\w-]+)>>>/g;

function renderStringWithVerificationAndBadges(
  text: string,
  keyPrefix: string,
  verificationPending: boolean
): ReactNode[] {
  if (!verificationPending || !text.includes(VERIFICATION_PENDING_SENTINEL_PREFIX)) {
    return renderStringWithBadges(text, keyPrefix);
  }
  const chunks: Array<{ kind: "text"; s: string } | { kind: "chip"; variant: string }> = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(VERIFICATION_TOKEN_RE.source, "g");
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      chunks.push({ kind: "text", s: text.slice(last, m.index) });
    }
    chunks.push({ kind: "chip", variant: m[1] ?? "peterson-name" });
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    chunks.push({ kind: "text", s: text.slice(last) });
  }
  const out: ReactNode[] = [];
  chunks.forEach((c, i) => {
    if (c.kind === "text") {
      out.push(...renderStringWithBadges(c.s, `${keyPrefix}-vseg${i}`));
    } else {
      out.push(<VerificationPendingChip key={`${keyPrefix}-vp${i}`} variant={c.variant} />);
    }
  });
  return out;
}

function getTextFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextFromNode).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    if (props.children !== undefined) {
      return getTextFromNode(props.children);
    }
  }
  return "";
}

/** Section labels in Student source strip (`*Label*` → single `em` in AST). */
function isSourceStripSectionLabelEm(text: string): boolean {
  const inner = text.trim().toLowerCase();
  return (
    inner.startsWith("primary manuscript") ||
    inner.startsWith("early printed") ||
    inner.startsWith("modern critical") ||
    inner.startsWith("modern scholarly") ||
    inner.startsWith("practitioner-scholar") ||
    inner.startsWith("parallel/precedent")
  );
}

function isEpistemicStatusOpening(text: string): boolean {
  return text.trim().toLowerCase().startsWith("epistemic status");
}

/**
 * Detect whether any React children contain block-level elements that would
 * violate HTML nesting rules if placed inside a <p>.  When true, the paragraph
 * renderer should emit a <div> with paragraph styling instead.
 */
function hasBlockChildren(children: ReactNode): boolean {
  const BLOCK_TYPES = new Set(["div", "table", "ul", "ol", "blockquote", "pre", "hr", "section", "figure"]);
  let found = false;
  Children.forEach(children, (child) => {
    if (found) return;
    if (isValidElement(child)) {
      if (typeof child.type === "string" && BLOCK_TYPES.has(child.type)) {
        found = true;
      } else if (typeof child.type === "function" || typeof child.type === "object") {
        // Custom components (SemanticLessonBlock, etc.) render block-level elements
        const cprops = child.props as { node?: HastElement };
        if (cprops.node?.properties?.dataLessonBlock) {
          found = true;
        }
      }
      if (!found) {
        const cprops = child.props as { children?: ReactNode };
        if (cprops.children !== undefined) {
          found = hasBlockChildren(cprops.children);
        }
      }
    }
  });
  return found;
}

function processTextChildren(
  children: ReactNode,
  termSet: Set<string>,
  onGlossaryTerm: (term: string) => void,
  path: string,
  verificationPending = false
): ReactNode {
  return Children.map(children, (child, idx) => {
    const key = `${path}-${idx}`;
    if (typeof child === "string") {
      return (
        <Fragment key={key}>{renderStringWithVerificationAndBadges(child, key, verificationPending)}</Fragment>
      );
    }
    if (isValidElement(child) && child.type === "strong") {
      const cprops = child.props as { children?: ReactNode };
      if (cprops.children !== undefined) {
        const inner = getTextFromNode(cprops.children);
        if (termSet.has(inner)) {
          return (
            <strong key={key}>
              <span
                role="button"
                tabIndex={0}
                className="cursor-pointer border-b border-gold-dim text-gold-light transition-colors duration-slow ease-gravity hover:text-gold"
                onClick={() => onGlossaryTerm(inner)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onGlossaryTerm(inner); } }}
              >
                {processTextChildren(cprops.children, new Set(), onGlossaryTerm, `${key}-gbtn`, verificationPending)}
              </span>
            </strong>
          );
        }
        return (
          <strong key={key}>
            {processTextChildren(cprops.children, termSet, onGlossaryTerm, key, verificationPending)}
          </strong>
        );
      }
    }
    if (isValidElement(child)) {
      const cprops = child.props as { children?: ReactNode };
      if (cprops.children !== undefined) {
        return cloneElement(child, {
          key,
          children: processTextChildren(cprops.children, termSet, onGlossaryTerm, key, verificationPending)
        } as never);
      }
    }
    return child;
  });
}

const proseTableWrap = "my-8 w-full overflow-x-auto border border-gold-dim/30";
const proseTable = "min-w-[280px] border-collapse text-left text-[14px] text-gold-pale";
const proseTh = "border border-gold-dim/30 bg-ink/30 px-4 py-3 font-display text-[12px] uppercase tracking-[0.06em] text-gold-light/90";
const proseTd = "border border-gold-dim/20 px-4 py-3 align-top";

export function LessonMarkdownBody({
  markdown,
  glossaryTermSet,
  onGlossaryTerm,
  verificationPending = false,
  tieredSourcePostface = false,
  lessonSlug
}: {
  markdown: string;
  glossaryTermSet: Set<string>;
  onGlossaryTerm: (term: string) => void;
  /** When true, replaces Peterson 2003 verification sentinels with an inline chip. */
  verificationPending?: boolean;
  /** Looser vertical rhythm + section labels for Student source / postface markdown. */
  tieredSourcePostface?: boolean;
  lessonSlug?: string;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkDirective, remarkLessonDirectives, remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h2 className="mt-16 font-display text-3xl tracking-[0.05em] text-gold first:mt-0">{children}</h2>
        ),
        h2: ({ children }) => (
          <h2 className="mt-14 font-display text-2xl tracking-[0.05em] text-gold-light">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-12 font-display text-xl tracking-[0.04em] text-gold-light/90">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="mt-10 font-display text-lg tracking-[0.04em] text-gold/90">{children}</h4>
        ),
        p: ({ children }) => {
          if (tieredSourcePostface) {
            const arr = Children.toArray(children);
            if (arr.length === 1 && isValidElement(arr[0]) && arr[0].type === "em") {
              const emText = getTextFromNode(arr[0]);
              if (isEpistemicStatusOpening(emText)) {
                return (
                  <p className="border-l-2 border-amber/55 bg-ink/30 py-3 pl-4 pr-2 text-sm italic leading-relaxed text-gold-pale">
                    {processTextChildren(children, glossaryTermSet, onGlossaryTerm, "p-epi", verificationPending)}
                  </p>
                );
              }
              if (isSourceStripSectionLabelEm(emText)) {
                return (
                  <p className="mt-6 border-t border-gold-dim/30 pt-4 font-display text-[11px] uppercase tracking-[0.14em] text-gold-light first:mt-0 first:border-t-0 first:pt-0">
                    {processTextChildren(children, glossaryTermSet, onGlossaryTerm, "p-srcsec", verificationPending)}
                  </p>
                );
              }
            }
            if (arr.length === 1 && isValidElement(arr[0]) && arr[0].type === "strong") {
              const st = getTextFromNode(arr[0]);
              if (tieredSourcePostface && st.toLowerCase().includes("sources cited")) {
                return (
                  <p className="mt-8 border-t border-gold-dim/35 pt-5 font-display text-sm uppercase tracking-[0.12em] text-gold-light">
                    {processTextChildren(children, glossaryTermSet, onGlossaryTerm, "p-srctitle", verificationPending)}
                  </p>
                );
              }
            }
          }
          const processed = processTextChildren(children, glossaryTermSet, onGlossaryTerm, "p", verificationPending);
          // If any children are block-level elements (div, table, etc.),
          // render as <div> to avoid HTML nesting violation / hydration error.
          if (hasBlockChildren(children) || hasBlockChildren(processed)) {
            return (
              <div className="leading-[1.9] text-gold-pale">
                {processed}
              </div>
            );
          }
          return (
            <p className="leading-[1.9] text-gold-pale">
              {processed}
            </p>
          );
        },
        ul: ({ children }) => (
          <ul
            className={`list-disc space-y-2 pl-6 text-gold-pale ${tieredSourcePostface ? "my-2 text-sm leading-relaxed" : "my-4"}`}
          >
            {children}
          </ul>
        ),
        ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6 text-gold-pale">{children}</ol>,
        li: ({ children }) => (
          <li className="leading-[1.85] text-gold-pale">
            {processTextChildren(children, glossaryTermSet, onGlossaryTerm, "li", verificationPending)}
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-8 border-l-2 border-gold-dim/50 bg-ink/25 px-5 py-4 text-gold-pale/90">
            {processTextChildren(children, glossaryTermSet, onGlossaryTerm, "bq", verificationPending)}
          </blockquote>
        ),
        div: ({ node, children }) => {
          const block = readDataLessonBlock(node as HastElement | undefined);
          if (block) {
            return (
              <SemanticLessonBlock name={block} lessonSlug={lessonSlug}>
                {processTextChildren(children, glossaryTermSet, onGlossaryTerm, `block-${block}`, verificationPending)}
              </SemanticLessonBlock>
            );
          }
          return <div>{children}</div>;
        },
        hr: () => <hr className="my-10 border-gold-dim/35" />,
        table: ({ children }) => (
          <div className={proseTableWrap}>
            <table className={proseTable}>{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead>{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr>{children}</tr>,
        th: ({ children }) => (
          <th className={proseTh}>
            {processTextChildren(children, glossaryTermSet, onGlossaryTerm, "th", verificationPending)}
          </th>
        ),
        td: ({ children }) => (
          <td className={proseTd}>
            {processTextChildren(children, glossaryTermSet, onGlossaryTerm, "td", verificationPending)}
          </td>
        ),
        a: ({ href, children }) => {
          if (href?.startsWith("/")) {
            return (
              <Link href={href} className="border-b border-gold-dim text-gold-light hover:text-gold">
                {processTextChildren(children, glossaryTermSet, onGlossaryTerm, "a", verificationPending)}
              </Link>
            );
          }
          return (
            <a href={href} className="border-b border-gold-dim text-gold-light hover:text-gold">
              {processTextChildren(children, glossaryTermSet, onGlossaryTerm, "a-ext", verificationPending)}
            </a>
          );
        },
        em: ({ children }) => <em className="italic text-gold-pale">{children}</em>,
        code: ({ children, className }) => (
          <code className={`font-mono text-[0.92em] text-gold-pale ${className ?? ""}`}>{children}</code>
        )
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
