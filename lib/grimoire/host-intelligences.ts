export type HostIntelligence = {
  id: string;
  name: string;
  title: string;
  domain: string;
  greeting: string;
  counsel: string[];
};

/** Personae that host the Seeker — pedagogical frames, not claims of contact. */
export const HOST_INTELLIGENCES: HostIntelligence[] = [
  {
    id: "lexicographer",
    name: "The Lexicographer",
    title: "Keeper of the Clear Channel",
    domain: "Angelical language — letters, calls, and what the manuscripts actually record",
    greeting:
      "You are learning to hear the language without forcing it to speak your conclusions back to you.",
    counsel: [
      "Read a Call aloud once for sound, once for structure, once for what Dee did not claim.",
      "When a word repeats in the dictionary, ask who counted it — Laycock, Dee, or your own pattern-seeking.",
      "The clear channel is disciplined listening: badge first, interpretation second."
    ]
  },
  {
    id: "scribe",
    name: "The Scribe",
    title: "Witness of the Ink",
    domain: "Sessions, editorial layers, and the gap between diary and printed book",
    greeting: "The page you see may be Dee, Kelley, a copyist, or Casaubon — name the layer before you trust the voice.",
    counsel: [
      "Every session entry is a document, not a revelation delivered to you personally.",
      "Marginalia and lacunae are data. Do not rush to fill silence with certainty.",
      "Source Discernment is your professor here — recognized, not reintroduced."
    ]
  },
  {
    id: "cartographer",
    name: "The Cartographer",
    title: "Mapper Without Conquest",
    domain: "Watchtowers, Aethyrs, and traditions that rearrange the same letters",
    greeting: "You are learning dashboards as well as doctrine — notice what moves when the map changes.",
    counsel: [
      "Hold two arrangements side by side without choosing a winner on first glance.",
      "The Student taught structure; the Observer will teach texture. Your Grimoire tracks both.",
      "A map is a hypothesis about relationship, not proof of territory."
    ]
  },
  {
    id: "witness",
    name: "The Single Witness",
    title: "Host of Sincerity and Accuracy",
    domain: "Kelley at the glass, Dee at the desk, and the grid that does not force a verdict",
    greeting: "Intensity is not evidence. Dismissal is not rigor. You are learning to stand in the middle.",
    counsel: [
      "When you feel certainty arrive quickly, pause — Collapse A and Collapse B are both nearby.",
      "Record your aha as a Formula before it hardens into dogma; elaboration is where wisdom grows.",
      "Return to the mechanism of magick when Enochian asks you what magic is, not only what it says."
    ]
  }
];

export function pickHostForProgress(opts: {
  rank: string;
  completedLessons: number;
  formulaCount: number;
  journalCount: number;
}): HostIntelligence {
  const { rank, completedLessons, formulaCount, journalCount } = opts;
  if (formulaCount >= 3) return HOST_INTELLIGENCES.find((h) => h.id === "witness")!;
  if (rank === "student" || completedLessons >= 5)
    return HOST_INTELLIGENCES.find((h) => h.id === "cartographer")!;
  if (journalCount >= 2) return HOST_INTELLIGENCES.find((h) => h.id === "scribe")!;
  return HOST_INTELLIGENCES.find((h) => h.id === "lexicographer")!;
}

export function pickCounsel(host: HostIntelligence, seed: number): string {
  const idx = Math.abs(seed) % host.counsel.length;
  return host.counsel[idx]!;
}
