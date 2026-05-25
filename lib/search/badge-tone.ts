import type { EpistemicTone } from "@/lib/lesson-types";

const BADGE_MAP: Record<string, EpistemicTone> = {
  historical: "historical",
  consensus: "consensus",
  occult: "occult",
  later: "later",
  speculative: "speculative",
  parallel: "parallel",
  disputed: "disputed",
  caution: "caution",
  mixed: "disputed"
};

export function badgeToTone(badge?: string): EpistemicTone | null {
  if (!badge) return null;
  return BADGE_MAP[badge.toLowerCase()] ?? null;
}
