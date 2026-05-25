export type DidYouKnowTip = {
  id: string;
  text: string;
};

/** Pathname prefix → tip shown once per browser (localStorage). */
export const DID_YOU_KNOW_BY_PATH: Record<string, DidYouKnowTip> = {
  "/watchtowers": {
    id: "watchtowers-great-table",
    text: "The Great Table exists in several manuscript states — Sloane 3191, Golden Dawn, Regardie, and the 1587 \"reformed\" layer. Elemental quarter assignments are not identical across witnesses."
  },
  "/language": {
    id: "language-chamber",
    text: "The nineteen Calls were received in reverse order (Call 19 first). The Enochian–English alignment was established after dictation — a central problem for linguistic analysis."
  },
  "/timeline": {
    id: "timeline-chronology",
    text: "Heptarchic material (1582) predates Liber Loagaeth (1583) and the Watchtower tablets (1584). Chronology matters when judging how \"complete\" the system looked at any single moment."
  },
  "/archive": {
    id: "archive-hub",
    text: "The Archive separates manuscript record (◆) from later operative rearrangements (△). Golden Dawn tables are a reception layer, not Dee's shelfmark."
  },
  "/archive/hierarchy": {
    id: "archive-hierarchy",
    text: "Angel names on the Watchtower grids are extracted by reading rules — seniors on crosses, kings on fixed rows, lesser angels in sub-quadrants. The rules are tradition-specific."
  },
  "/archive/heptarchy": {
    id: "archive-heptarchy",
    text: "Seven kings, seven princes, and forty-nine ministers form the Heptarchia Mystica — the first formally complete sub-system in the diaries, before the alphabet or Calls."
  },
  "/observatory": {
    id: "observatory-loagaeth",
    text: "Liber Loagaeth was dictated leaf 49 → leaf 1. The Observatory presents structure and witness comparison — not a claimed full translation."
  },
  "/path": {
    id: "path-progress",
    text: "Progress on lessons and discoveries is stored locally in your browser. Clearing site data resets your path — the Archive does not sync to a server in this build."
  },
  "/aethyrs": {
    id: "aethyrs-call19",
    text: "Call 19 exists in thirty variants — one per Aethyr — inserting each heaven's name into a fixed position in the text."
  }
};

export function tipForPathname(pathname: string): DidYouKnowTip | null {
  const prefixes = Object.keys(DID_YOU_KNOW_BY_PATH).sort((a, b) => b.length - a.length);
  for (const prefix of prefixes) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return DID_YOU_KNOW_BY_PATH[prefix];
    }
  }
  return null;
}
