/**
 * Instrumentarium domains — named after sysadmin practice areas
 * (see awesome-sysadmin: Monitoring, Metrics, Logs, Identity, Backups, Config, etc.)
 */
export type InstrumentariumDomainId =
  | "vigil"
  | "measures"
  | "scrolls"
  | "seals"
  | "vault"
  | "glyphs"
  | "constellation"
  | "rites"
  | "lenses";

export type InstrumentariumDomain = {
  id: InstrumentariumDomainId;
  /** Display title in the chamber */
  title: string;
  /** awesome-sysadmin analogue */
  sysadminAnalogue: string;
  glyph: string;
  description: string;
};

export const INSTRUMENTARIUM_DOMAINS: InstrumentariumDomain[] = [
  {
    id: "vigil",
    title: "Vigil of the Spheres",
    sysadminAnalogue: "Monitoring & status",
    glyph: "◎",
    description: "Whether the instrument answers, and whether the sky-database holds."
  },
  {
    id: "measures",
    title: "Measures & Omens",
    sysadminAnalogue: "Metrics & collection",
    glyph: "◇",
    description: "Counts of folios, routes, and indexed words — the pulse of the Archive."
  },
  {
    id: "scrolls",
    title: "Scroll of Echoes",
    sysadminAnalogue: "Log management",
    glyph: "◆",
    description: "Recent rites performed in this session and build inscriptions."
  },
  {
    id: "seals",
    title: "Seals of Identity",
    sysadminAnalogue: "Identity & SSO",
    glyph: "○",
    description: "Who may cross the threshold and how their seal is verified."
  },
  {
    id: "vault",
    title: "Vault of Memory",
    sysadminAnalogue: "Backups & databases",
    glyph: "△",
    description: "Celestial tables on the shared Old Gods vault."
  },
  {
    id: "glyphs",
    title: "Glyphs of Configuration",
    sysadminAnalogue: "Configuration management",
    glyph: "◎",
    description: "Environment seals and feature gates — read-only in this chamber."
  },
  {
    id: "constellation",
    title: "Constellation Registry",
    sysadminAnalogue: "Service discovery",
    glyph: "◇",
    description: "Internal doors and external stars the instrument may call upon."
  },
  {
    id: "rites",
    title: "Rites of Renewal",
    sysadminAnalogue: "CI / deployment",
    glyph: "◆",
    description: "Commands the keepers run to rebuild, verify, and publish."
  },
  {
    id: "lenses",
    title: "Lenses of Trouble",
    sysadminAnalogue: "Troubleshooting",
    glyph: "?",
    description: "Quick oracles when something refuses to align."
  }
];
