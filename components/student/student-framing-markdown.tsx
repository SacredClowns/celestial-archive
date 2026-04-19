import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const baseProse =
  "text-[0.97rem] leading-[1.82] text-gold-pale [&_strong]:font-semibold [&_strong]:text-gold-light/95";

const components: Components = {
  h1: ({ children }) => (
    <h2 className="mt-8 font-display text-xl tracking-[0.06em] text-gold-light first:mt-0">{children}</h2>
  ),
  h2: ({ children }) => (
    <h3 className="mt-7 border-t border-gold-dim/20 pt-6 font-display text-lg tracking-[0.05em] text-gold-light first:mt-0 first:border-t-0 first:pt-0">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="mt-5 font-display text-base tracking-[0.04em] text-gold">{children}</h4>
  ),
  p: ({ children }) => <p className="mt-4 text-pretty first:mt-0">{children}</p>,
  hr: () => <hr className="my-8 border-gold-dim/25" />,
  ul: ({ children }) => <ul className="mt-3 list-none space-y-2 pl-0">{children}</ul>,
  ol: ({ children }) => <ol className="mt-3 list-decimal space-y-2 pl-5">{children}</ol>,
  li: ({ children }) => (
    <li className="border-l border-gold-dim/25 pl-3 text-gold-pale/95 [&>p]:mt-0">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-gold-dim/40 pl-4 italic text-gold-dim/95">{children}</blockquote>
  ),
  em: ({ children }) => <em className="italic text-gold-pale/92">{children}</em>
};

type StudentFramingMarkdownProps = {
  markdown: string;
  className?: string;
};

/**
 * Quiet archival typography for curriculum framing docs (K/L/M). No lesson directives or glossary wiring.
 */
export function StudentFramingMarkdown({ markdown, className = "" }: StudentFramingMarkdownProps) {
  return (
    <div className={`${baseProse} ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
