/**
 * Replaces editorial verification placeholders in lesson markdown with parse-time sentinels
 * so the React renderer can mount `VerificationPendingChip` without rehype-raw.
 */

/** Opening delimiter — must stay unique to lesson editorial workflow. */
export const VERIFICATION_PENDING_SENTINEL_PREFIX = "<<<VERIFICATION_PENDING:";
export const VERIFICATION_PENDING_SENTINEL_SUFFIX = ">>>";

/** Legacy tests / imports — Peterson name cell placeholder. */
export const VERIFICATION_PENDING_PETERSON_2003_SENTINEL = `${VERIFICATION_PENDING_SENTINEL_PREFIX}peterson-name${VERIFICATION_PENDING_SENTINEL_SUFFIX}`;

export type VerificationPendingVariant =
  | "peterson-name"
  | "peterson-planetary"
  | "table-layout"
  | "name-generic";

type Rule = { pattern: RegExp; variant: VerificationPendingVariant };

const RULES: Rule[] = [
  {
    pattern: /\[Name to be confirmed against Peterson 2003\.\]/g,
    variant: "peterson-name"
  },
  {
    pattern: /\[Planetary and diurnal assignments to be confirmed against Peterson 2003\.\]/g,
    variant: "peterson-planetary"
  },
  {
    pattern: /\[Table layout to be verified\.\]/g,
    variant: "table-layout"
  },
  {
    pattern: /\[Name to be confirmed\.\]/g,
    variant: "name-generic"
  }
];

/** Split/match in `lesson-markdown-body` — global. */
export const VERIFICATION_PENDING_SENTINEL_REGEX = /<<<VERIFICATION_PENDING:([\w-]+)>>>/g;

/** Bracketed editorial phrases from Student lessons — replaced before markdown render. */
export function preprocessVerificationPendingInMarkdown(md: string): string {
  let out = md;
  for (const { pattern, variant } of RULES) {
    out = out.replace(
      pattern,
      `${VERIFICATION_PENDING_SENTINEL_PREFIX}${variant}${VERIFICATION_PENDING_SENTINEL_SUFFIX}`
    );
  }
  return out;
}
