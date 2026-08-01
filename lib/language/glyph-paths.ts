/**
 * Stylized SVG stroke paths for the 21 Enochian letters, drawn on a 100×100
 * grid. These are STYLIZED renderings for the Archive's visual layer — they
 * follow the received letterforms in spirit and general gesture, but are not
 * paleographic reproductions. The manuscript plates (Sloane MS 3188/3191)
 * remain the authority; the alphabet pages say so.
 *
 * Keyed by lowercase letter name. Each entry is one or more path strings,
 * drawn stroke-style (fill:none), intended for stroke-dashoffset inscription
 * animation.
 */
export const GLYPH_PATHS: Record<string, string[]> = {
  // A — a leaning crescent opening east, with a dropped tail
  un: ["M62 22 C34 26 24 46 28 62 C32 80 52 86 68 78", "M28 62 L20 84"],
  // B — tall stem, low bowl breaking right, foot flick
  pa: ["M38 16 L38 84", "M38 52 C60 44 74 58 62 74 C54 84 42 82 38 74", "M38 84 L52 90"],
  // C/K — a flame of two nested arcs
  veh: ["M64 20 C36 24 30 44 44 52 C30 58 32 80 62 82", "M64 20 L74 14"],
  // G — an angular hook with a crossing bar
  ged: ["M30 22 L66 22 L66 58 L44 58 L44 84", "M44 70 L70 70"],
  // D — an open spiral, like a nautilus begun
  gal: ["M68 34 C54 16 28 24 26 46 C24 70 44 84 62 78 C74 74 76 60 66 56 C58 53 50 58 52 66"],
  // F — a staff with two beams and rising serif
  or: ["M40 14 L40 86", "M40 32 L72 26", "M40 56 L66 52", "M32 86 L48 86"],
  // E — a candelabrum: center stem, two curled arms
  graph: ["M50 20 L50 84", "M50 40 C34 38 26 48 30 60", "M50 40 C66 38 74 48 70 60", "M38 84 L62 84"],
  // M — twin peaks with a long central plunge
  tal: ["M24 82 L24 30 L46 58 L50 66", "M50 66 L54 58 L76 30 L76 82", "M50 66 L50 88"],
  // I/Y — a short banner on a mast
  gon: ["M54 18 L54 78", "M54 24 C42 26 38 36 46 42 L54 44", "M46 84 L62 84"],
  // H — a stepped zigzag between two stems
  na: ["M30 20 L30 82", "M70 20 L70 82", "M30 44 L52 36 L70 56"],
  // L — one great sweeping hook
  ur: ["M36 16 L36 68 C36 84 54 90 68 82 C76 76 76 66 70 62"],
  // P — a peaked roof with hanging tail
  mals: ["M26 46 L50 20 L74 46", "M50 20 L50 72", "M50 72 C60 78 58 88 46 88"],
  // Q — an open figure held by a slash
  ger: ["M50 24 C30 24 24 44 34 56 C42 64 58 64 66 56 C76 44 70 24 50 24 Z", "M58 58 L74 84"],
  // N — a doorway with lowered lintel
  drux: ["M28 84 L28 28 L72 28 L72 84", "M28 46 L72 46"],
  // X — crossed strokes with a binding arc
  pal: ["M28 24 L72 80", "M72 24 L28 80", "M36 52 C44 44 56 44 64 52"],
  // O — the eye: circle with inner spark and tail
  med: ["M50 26 C32 26 24 42 28 56 C32 72 50 80 64 72 C78 64 76 40 62 30 C58 27 54 26 50 26 Z", "M50 50 L52 52", "M64 72 L74 84"],
  // R — stem with unfurling banner
  don: ["M34 18 L34 84", "M34 36 C56 26 70 38 60 52 C54 60 42 60 34 54", "M52 58 L70 84"],
  // Z — the lightning stroke, barred
  ceph: ["M30 24 L70 24 L34 78 L74 78", "M42 50 L62 50"],
  // U/V — a deep cup with west serif
  vau: ["M28 22 L44 78 L50 88 L56 78 L72 22", "M20 28 L36 22"],
  // S — the serpent under a yoke
  fam: ["M68 28 C54 16 32 22 34 38 C36 52 66 50 68 64 C70 80 46 86 32 74", "M38 14 L62 14"],
  // T — a tau with drooping arms
  gisg: ["M24 30 C32 22 44 22 50 28 C56 22 68 22 76 30", "M50 26 L50 86"]
};

export const GLYPH_ORDER = [
  "un", "pa", "veh", "ged", "gal", "or", "graph",
  "tal", "gon", "na", "ur", "mals", "ger", "drux",
  "pal", "med", "don", "ceph", "vau", "fam", "gisg"
];
