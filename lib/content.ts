export type EpistemicTone = "historical" | "consensus" | "occult" | "later" | "speculative";

export const pillarCards = [
  { name: "Archive", href: "/archive", state: "open", detail: "Reference backbone and core entities." },
  { name: "Timeline", href: "/timeline", state: "open", detail: "Chronological context for Dee and Kelley." },
  { name: "Celestial Map", href: "/archive", state: "open", detail: "Spatial orientation through Watchtower structures." },
  { name: "Language Chamber", href: "/glossary", state: "locked", detail: "Available after deeper Stage 1 completion." },
  { name: "Initiation Path", href: "/path/seeker", state: "open", detail: "Guided curriculum with reflection." },
  { name: "Aethyr Journey", href: "/observatory", state: "locked", detail: "Planned for later phases." },
  { name: "Intelligence Observatory", href: "/observatory", state: "locked", detail: "Future contemplative lens space." },
  { name: "Documentary Mode", href: "/observatory", state: "locked", detail: "Narrative module in future phases." },
  { name: "Research Lens", href: "/archive", state: "locked", detail: "Advanced comparative overlays." },
  { name: "Labyrinth", href: "/observatory", state: "locked", detail: "Discovery layer revealed later." }
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
