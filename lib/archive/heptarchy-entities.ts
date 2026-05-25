export type HeptarchyRole = "king" | "prince";

export type HeptarchyEntity = {
  slug: string;
  name: string;
  role: HeptarchyRole;
  pairedWith?: string;
  day?: string;
  planet?: string;
  badge: "historical" | "disputed";
  summary: string;
  manuscriptNote: string;
};

export const HEPTARCHY_KINGS: HeptarchyEntity[] = [
  {
    slug: "baligon",
    name: "Baligon",
    role: "king",
    day: "Saturday",
    badge: "disputed",
    summary: "One of seven Heptarchic kings in the compiled Heptarchia Mystica (Sloane MS 3188 / 3191).",
    manuscriptNote: "Planetary and diurnal assignments in secondary literature vary; verify against Peterson (2003)."
  },
  {
    slug: "carmara",
    name: "Carmara",
    role: "king",
    day: "Monday",
    badge: "historical",
    summary: "Sovereign king in the Heptarchic hierarchy; among the most frequently cited names in Dee's diaries.",
    manuscriptNote: "Recorded in session transcripts and the compiled Heptarchia."
  },
  {
    slug: "blumaza",
    name: "Blumaza",
    role: "king",
    day: "Tuesday",
    badge: "disputed",
    summary: "Heptarchic king name from the compiled manuscript tradition.",
    manuscriptNote: "Spelling and day-planet pairing require Peterson verification."
  },
  {
    slug: "hagonel-king",
    name: "Hagonel",
    role: "king",
    day: "Wednesday",
    badge: "disputed",
    summary: "Appears in provisional tables as both king and prince — may be cognate ranks or transcription error.",
    manuscriptNote: "Name overlap flagged in Student Lesson 2.1; hold until manuscript pass."
  },
  {
    slug: "bagenol",
    name: "Bagenol",
    role: "king",
    day: "Thursday",
    badge: "disputed",
    summary: "One of the seven kings named in the Heptarchic revelation phase (spring–summer 1582).",
    manuscriptNote: "Functional descriptions for paired ministers vary by session entry."
  },
  {
    slug: "bnapsen",
    name: "Bnapsen",
    role: "king",
    day: "Friday",
    badge: "disputed",
    summary: "Heptarchic king associated with the Friday column in organizational grids.",
    manuscriptNote: "Seal geometry dictated in sessions; drawings survive in Dee's hand."
  },
  {
    slug: "bnaspol",
    name: "Bnaspol",
    role: "king",
    day: "Sunday",
    badge: "disputed",
    summary: "Seventh king in the sevenfold Heptarchic structure.",
    manuscriptNote: "Sunday assignment provisional in curriculum tables."
  }
];

export const HEPTARCHY_PRINCES: HeptarchyEntity[] = [
  {
    slug: "bornogo",
    name: "Bornogo",
    role: "prince",
    pairedWith: "Baligon",
    badge: "disputed",
    summary: "Prince paired with a Heptarchic king; shares day and planetary assignment in the system logic.",
    manuscriptNote: "Pairing table in Student Lesson 2.1 is provisional."
  },
  {
    slug: "hagonel-prince",
    name: "Hagonel",
    role: "prince",
    pairedWith: "Carmara",
    badge: "disputed",
    summary: "Prince name; see king entry for duplicate-name question in the record.",
    manuscriptNote: "Listed as prince while Hagonel also appears as king in some tables — ? disputed."
  },
  {
    slug: "befafes",
    name: "Befafes",
    role: "prince",
    badge: "disputed",
    summary: "Prince name appearing at different hierarchical levels in some secondary sources.",
    manuscriptNote: "Lesson 2.1 flags level ambiguity; verify against Peterson."
  },
  {
    slug: "butmono",
    name: "Butmono",
    role: "prince",
    badge: "disputed",
    summary: "Heptarchic prince in the sevenfold pairing structure.",
    manuscriptNote: "Recorded in Sloane 3188 session material."
  },
  {
    slug: "blisdon",
    name: "Blisdon",
    role: "prince",
    badge: "disputed",
    summary: "Prince name from the compiled Heptarchia tradition.",
    manuscriptNote: "Minister lists below each pair total forty-nine across the system."
  },
  {
    slug: "brorges",
    name: "Brorges",
    role: "prince",
    badge: "disputed",
    summary: "One of seven princes governing alongside the seven kings.",
    manuscriptNote: "Operational protocols name specific seals and session days."
  },
  {
    slug: "bralges",
    name: "Bralges",
    role: "prince",
    badge: "disputed",
    summary: "Seventh prince in the Heptarchic pairing grid.",
    manuscriptNote: "Full minister roster deferred to Celestial Map pillar in curriculum design."
  }
];

export const HEPTARCHY_ENTITIES: HeptarchyEntity[] = [...HEPTARCHY_KINGS, ...HEPTARCHY_PRINCES];

export function getHeptarchyEntity(slug: string): HeptarchyEntity | undefined {
  return HEPTARCHY_ENTITIES.find((e) => e.slug === slug);
}
