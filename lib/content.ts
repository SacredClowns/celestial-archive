export type EpistemicTone = "historical" | "consensus" | "occult" | "later" | "speculative";

export const pillarCards = [
  { name: "Initiation Path", href: "/path/seeker", state: "open", detail: "The guided curriculum — five folios of the Seeker stage, read in order, sealed as you go." },
  { name: "Aethyr Journey", href: "/aethyrs", state: "open", detail: "Descend the thirty heavens — LIL to TEX, ninety-one governors, each with its seal." },
  { name: "Language Chamber", href: "/language", state: "open", detail: "The twenty-one letters, the nineteen Calls, and the full dictionary of the angelic tongue." },
  { name: "Celestial Map", href: "/watchtowers", state: "open", detail: "The four Great Tables — twelve by thirteen letters each — in four scholarly recensions." },
  { name: "Archive", href: "/archive", state: "open", detail: "The reference backbone: figures, sessions, heptarchy, ritual furniture, sources." },
  { name: "Timeline", href: "/timeline", state: "open", detail: "The documented arc — Mortlake to the continental years to the manuscript afterlife." },
  { name: "Intelligence Observatory", href: "/observatory", state: "open", detail: "A contemplative lens on the system's claimed intelligences." },
  { name: "Documentary Mode", href: "/observatory", state: "locked", detail: "Narrative module in future phases." },
  { name: "Research Lens", href: "/archive", state: "locked", detail: "Advanced comparative overlays." },
  { name: "Labyrinth", href: "/discovery", state: "locked", detail: "Discovery layer revealed later." }
] as const;

export const stageProgress = { currentRank: "Seeker", nextRank: "Student", futureRanks: ["Observer", "Interpreter", "Cartographer", "Adept", "Archivist"] };

export const lessonMeta = {
  title: "The Lost Language",
  stage: "Stage 1 - Seeker",
  lessonNumber: "Lesson 1.1",
  duration: "18-25 minutes",
  goals: [
    "Describe who John Dee and Edward Kelley were and why their partnership matters.",
    "Differentiate historical record from interpretation.",
    "Understand why ambiguity is treated as a valid starting position."
  ]
};
