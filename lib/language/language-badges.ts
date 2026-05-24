import type { EpistemicTone } from "@/lib/lesson-types";
import type { BadgeKind } from "@/lib/language/language-types";

const badgeKindToTone: Record<BadgeKind, EpistemicTone> = {
  historical: "historical",
  consensus: "consensus",
  later: "later",
  occult: "occult"
};

export function badgeKindToEpistemicTone(kind: string): EpistemicTone {
  if (kind in badgeKindToTone) {
    return badgeKindToTone[kind as BadgeKind];
  }
  return "caution";
}
