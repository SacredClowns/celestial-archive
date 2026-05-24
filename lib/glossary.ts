import coreImportRaw from "@/content/glossary-core-import.json";
import { EpistemicTone } from "@/lib/lesson-types";

const CORE_IMPORT = coreImportRaw as GlossaryEntry[];
const CANONICAL_SLUGS = new Set([
  "scrying",
  "enochian",
  "lingua-adamica",
  "watchtower",
  "aethyr"
]);
const CORE_GLOSSARY_ENTRIES = CORE_IMPORT.filter((e) => !CANONICAL_SLUGS.has(e.slug));

// ============================================================================
// GLOSSARY SCHEMA
// ============================================================================
//
// The glossary is the Archive's most intimate surface. Every entry obeys the
// same architecture: a single definition, lenses that keep evidence and
// interpretation visibly separated, a list of common misunderstandings, and
// explicit links back into the rest of the Archive.
//
// Epistemic badge canon (Build Pass 4):
//   ◆  Historical Evidence          -> tone: "historical"
//   ◇  Strong Scholarly Consensus   -> tone: "consensus"
//   ○  Traditional Occult Claim     -> tone: "occult"
//   △  Later Interpretation         -> tone: "later"
//   ~   Speculative                  -> tone: "speculative"
//
// "? Disputed" and "⚠ Caution" exist in the full Archive canon but are not
// yet represented in the EpistemicTone union. They arrive in Build Pass 5
// when Lesson 1.2 introduces the Disputed badge.
// ============================================================================

export type GlossaryLens = {
  text: string;
  // Optional inline badge marker for any strong claim in this lens.
  badge?: EpistemicTone;
};

export type GlossaryAppearance = {
  label: string;           // e.g. "Lesson 1.1: The Lost Language"
  href: string;            // internal route
  note?: string;           // one-line description of how the term is used there
};

export type GlossaryEntry = {
  slug: string;
  term: string;
  oneLine: string;           // used in the index preview
  definition: string;        // full definition paragraph
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Beginner–Advanced";
  primaryBadge: EpistemicTone;

  historicalLens?: string;
  occultLens?: string;
  psychologicalLens?: string;

  commonMisunderstandings: string[];
  multipleInterpretations?: string;

  relatedTerms: string[];    // other glossary terms (use the displayed `term`, not the slug)
  relatedTermsExternal?: string[]; // named concepts not yet in the glossary (non-clickable)

  sourceNotes: string;
  appearsIn: GlossaryAppearance[];
  archivePlaceholder?: string[]; // future archive destinations
  appTags: string[];
};

// A small helper so component code doesn't need to do lookups by term name.
export const slugifyTerm = (term: string): string =>
  term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Terms named in Student Stage 2 folios before full glossary entries are authored (Claude). */
const STAGE2_GLOSSARY_STUB_TERMS = [
  "Great Table",
  "Watchtower Tablet",
  "Tablet of Union",
  "Black Cross",
  "Linea Spiritus Sancti",
  "Senior",
  "Kerubic Angel",
  "Lesser Angel",
  "Three Holy Names",
  "Reformed Table",
  "Sub-quadrant",
  "Reformed Great Table",
  "Concourse of the Forces",
  "Cipher Manuscript",
  "Second Order",
  "Abyss",
  "Choronzon",
  "ZAX",
  "Experiential Authority"
] as const;

function stage2GlossaryStub(term: string): GlossaryEntry {
  return {
    slug: slugifyTerm(term),
    term,
    oneLine: "[CONTENT PENDING]",
    definition: "[CONTENT PENDING]",
    category: "Student Stage 2 — indexing",
    level: "Intermediate",
    primaryBadge: "caution",
    commonMisunderstandings: [],
    relatedTerms: [],
    sourceNotes: "[CONTENT PENDING]",
    appearsIn: [],
    appTags: ["student-2", "glossary-stub"]
  };
}

const STAGE2_GLOSSARY_STUBS: GlossaryEntry[] = STAGE2_GLOSSARY_STUB_TERMS.map((t) => stage2GlossaryStub(t));

// ============================================================================
// THE FIVE FOUNDATIONAL ENTRIES
// Sourced from STAGE_1_CONTENT_PACKET_2.md Section 2.
// Every claim in these entries either carries an inline badge or is tagged by
// the entry's primaryBadge. Description and interpretation are kept separate.
// ============================================================================

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: "scrying",
    term: "Scrying",
    oneLine:
      "The practice of gazing into a reflective surface to receive visions. The method through which the entire Enochian system was transmitted.",
    definition:
      "The practice of gazing into a reflective or translucent surface — crystal, obsidian, water, polished metal — to receive visions, images, or communications attributed to non-material sources. In the Enochian context, the method through which every element of the system was transmitted. Kelley was the scryer; Dee was the recorder.",
    category: "Practice / History",
    level: "Beginner",
    primaryBadge: "historical",

    historicalLens:
      "Scrying has roots across cultures and millennia. The Greek Pythia inhaled vapors; the Roman augurs watched birds; the Jewish Urim and Thummim may have functioned as a divinatory surface. In Dee's era, scrying was understood as a legitimate method of angelic communication, supported by a long grimoire tradition. Dee's specific instruments included a polished obsidian mirror (possibly of Aztec origin, now in the British Museum) and a crystal shew-stone (also in the British Museum). ◆ Both are documented in his records and surviving physical objects. Dee employed at least two scryers before Kelley. Barnabas Saul produced limited results and was dismissed in early 1582. Kelley, arriving March 8, 1582, produced results within days that surpassed everything Saul had delivered. ◆",
    occultLens:
      "Within Western esoteric practice, scrying is understood as a technique for stilling the conscious mind and allowing a deeper perceptual faculty to operate — one capable of receiving information from non-physical sources. The scryer does not imagine content; in traditional accounts, the visions arise with an involuntary quality, often surprising or disturbing the scryer. Modern practitioners distinguish between soft scrying (gazing until visual patterns appear) and deep scrying (entering a trance-like state in which detailed scenes, figures, and voices appear). Kelley's scrying, as described in Dee's diaries, appears to have been of the deep variety.",
    psychologicalLens:
      "From a psychological perspective, scrying is a method of inducing a mild dissociative state through sustained gaze fixation. The Ganzfeld effect — perceptual deprivation leading to hallucination — is a documented phenomenon. This does not explain the structured, internally consistent nature of what Kelley produced, but it offers a framework for how the process may have begun. William James documented similar phenomena in mediumship studies; Frederic Myers coined subliminal consciousness; Jung's active imagination is the closest modern therapeutic parallel. The psychological lens reframes the question: not 'Did Kelley see angels?' but 'What cognitive state produces material of this complexity?'",

    commonMisunderstandings: [
      "Scrying is not 'crystal ball fortune-telling' in the popular sense. Dee's scrying was embedded in elaborate ritual preparation, prayer, and specific physical arrangements.",
      "The scryer and the operator are different roles. Dee did not scry. Kelley did not record or ask questions. The division of labor was absolute.",
      "Scrying is not the same as meditation. The scryer is actively perceiving content — reporting visual scenes, transcribing dictated language, responding to questions. It is cognitively intense, not passive."
    ],
    multipleInterpretations:
      "A genuine technique for contacting non-human intelligences (traditional); a method of inducing controlled hallucination (clinical); a form of deep creative trance that accesses unconscious material (Jungian); a performance by the scryer, possibly with prior preparation (fraud hypothesis); a technique whose mechanism is not understood but whose results are documented (agnostic).",

    relatedTerms: ["Enochian", "Watchtower", "Aethyr"],
    relatedTermsExternal: [
      "Edward Kelley",
      "John Dee",
      "Shew-Stone",
      "Altered State of Consciousness",
      "Active Imagination",
      "Dissociation",
      "Angelic Sessions"
    ],

    sourceNotes:
      "Dee's session descriptions: Sloane MS 3188, passim. Physical objects: British Museum collection (obsidian mirror: ref. 1966,1001.1; crystal ball: British Museum museum number SLCups.232). Myers, F.W.H., Human Personality and Its Survival of Bodily Death (1903). James, William, The Varieties of Religious Experience (1902).",
    appearsIn: [
      {
        label: "Lesson 1.1: The Lost Language",
        href: "/path/seeker/the-lost-language",
        note: "Introduced as the method by which the system was received."
      }
    ],
    archivePlaceholder: [
      "Archive → Angelic Sessions → Method (forthcoming)",
      "Intelligence Observatory → Interior Intelligence (forthcoming)",
      "Documentary Mode → Episode 2 (forthcoming)"
    ],
    appTags: ["practice", "history", "psychology", "primary"]
  },

  {
    slug: "enochian",
    term: "Enochian",
    oneLine:
      "The adjective describing the system transmitted to Dee and Kelley between 1582–1587. Named for the patriarch Enoch; the name is a claim of lineage, not a textual derivation.",
    definition:
      "The adjective describing the system of language, cosmology, and angelic architecture transmitted to John Dee and Edward Kelley between 1582 and 1587. Named after the biblical patriarch Enoch, based on Dee's claim that the system represents the recovery of divine knowledge originally given to Enoch and lost after the Flood.",
    category: "Framework",
    level: "Beginner",
    primaryBadge: "historical",

    historicalLens:
      "The term 'Enochian' as a label for Dee's system is not Dee's own coinage in its modern usage. Dee referred to the received language as the Angelical language or the Celestial Speech and positioned it as the lingua Adamica — the language Adam spoke before the Fall. The connection to Enoch was part of his mythic framework: the angels told Dee (via Kelley) that the knowledge had been entrusted to Enoch, lost in the Flood, and was now being restored. ◆ (Documented in the session records, particularly Sloane MS 3188.) The term 'Enochian' as a systematic label became standard in the Golden Dawn period (late 19th century), when Mathers and Westcott organized Dee's material into a coherent magical curriculum. ◇ It has remained the standard term since, though some modern scholars prefer 'Dee's angelic system' or 'the Dee–Kelley system' to avoid the implied endorsement of the Enochian lineage claim.",
    occultLens:
      "Within esoteric practice, 'Enochian' refers to a specific magical system with identifiable components: a 21-letter alphabet, 19 Calls or Keys, four Watchtower tablets forming the Great Table, a Tablet of Union, 30 Aethyrs, 91 Governors, and a hierarchy of angelic entities derivable from the tablet letter-grids. The system is widely regarded as the most complex and internally consistent magical system in the Western tradition.",
    psychologicalLens:
      "The adjective can be used neutrally to designate a body of material without endorsing its claimed origin. In academic and psychological usage, 'Enochian' simply identifies the system — it does not assert that it genuinely derives from the patriarch Enoch or from angelic sources.",

    commonMisunderstandings: [
      "'Enochian' does not mean 'from the Book of Enoch.' The Books of Enoch (1, 2, and 3 Enoch) are separate texts composed centuries before Dee. The name is Dee's claim of lineage — a thematic connection, not a textual derivation.",
      "'Enochian' as used today covers three distinct layers: Dee's original material (1582–1587), the Golden Dawn's reconstruction (c. 1888–1900), and Crowley's adaptations (1900–1947). The Archive always specifies which layer is being discussed.",
      "The system is not a single unified text. It was received in stages across multiple years, in multiple cities, and includes subsystems (Heptarchic, Loagaeth, Watchtower/Aethyr) that may not have been intended to form a single structure."
    ],
    multipleInterpretations:
      "A genuine recovery of pre-diluvian divine knowledge (Dee's own understanding); a remarkably complex system of uncertain origin (academic); a versatile magical technology regardless of origin (practitioner); an elaborate construction by Kelley, consciously or unconsciously (skeptical).",

    relatedTerms: ["Scrying", "Lingua Adamica", "Watchtower", "Aethyr"],
    relatedTermsExternal: [
      "John Dee",
      "Edward Kelley",
      "Enochian Alphabet",
      "Enochian Language",
      "Angelic Call",
      "Enoch"
    ],

    sourceNotes:
      "Dee's terminology: Sloane MS 3188, passim. Golden Dawn standardization: Regardie, The Golden Dawn (1937). Modern scholarly usage: Asprem, Arguing with Angels (2012), pp. 12–15.",
    appearsIn: [
      {
        label: "Lesson 1.1: The Lost Language",
        href: "/path/seeker/the-lost-language",
        note: "Introduced as the descriptor for the system."
      }
    ],
    archivePlaceholder: [
      "Appears across every pillar — this is the primary descriptor of the system.",
      "Archive → System Overview (forthcoming)"
    ],
    appTags: ["framework", "primary"]
  },

  {
    slug: "lingua-adamica",
    term: "Lingua Adamica",
    oneLine:
      "The hypothetical original language of humanity — the language Adam spoke before Babel. Dee understood Enochian as its recovery.",
    definition:
      "The hypothetical original language of humanity — the language Adam spoke in the Garden of Eden before the Fall and the confusion of tongues at Babel. In Dee's framework, the Enochian language is the lingua Adamica restored: the language of creation itself, recovered through angelic transmission.",
    category: "Comparative Systems / Language",
    level: "Intermediate",
    primaryBadge: "consensus",

    historicalLens:
      "The search for the lingua Adamica was a recognized intellectual project in Renaissance Europe, not a fringe obsession. Major scholars participated. The logic was straightforward: Genesis describes God bringing the animals to Adam to be named (Genesis 2:19–20). If those names were divinely given — or if the act of naming was itself a divine faculty — then the original language of humanity was not merely a communication system. It was a structural map of reality. The Kabbalists argued that Hebrew was this language, or its closest surviving descendant. The Sefer Yetzirah (dated ◇ somewhere between the 2nd and 6th centuries CE) taught that the 22 Hebrew letters were the instruments through which God created the world. Christian Kabbalists like Pico della Mirandola (1486) and Johann Reuchlin (1517) adopted and extended this view. Dee knew these traditions intimately. When the angels began transmitting a language through Kelley, Dee received it within this framework.",
    occultLens:
      "The lingua Adamica is understood across esoteric traditions as a language in which words and things are not separated — where to name something correctly is to know its nature directly. This is not a linguistic theory; it is a metaphysical one. In this framework, all human languages are fragmentary reflections of the original language, which was shattered at Babel. The Enochian system, if genuine, would represent the most significant recovery of that language since the Fall.",
    psychologicalLens:
      "The concept of a 'perfect language' — one in which signs and meanings are unified — can be understood as a projection of the human desire for unmediated knowledge. Umberto Eco explored this in The Search for the Perfect Language (1995), tracing the history of attempts to construct or recover a language that eliminates ambiguity. The lingua Adamica is the mythic expression of a real cognitive longing.",

    commonMisunderstandings: [
      "The lingua Adamica is a concept, not a documented language. No historical text contains the 'original language of Adam' in any recoverable form. The claim that Enochian is that language is Dee's claim (transmitted via the angels), not an established fact.",
      "The search for the lingua Adamica was not unique to Dee. It was a major intellectual project across Renaissance Europe. Dee was participating in a tradition, not inventing one.",
      "Hebrew's candidacy as the lingua Adamica was not universally accepted, even among Kabbalists. Some traditions argued that the original language was not any surviving language at all."
    ],
    multipleInterpretations:
      "A literal divine language lost at Babel and recovered by Dee (traditional); a Renaissance cultural obsession that shaped Dee's expectations and colored his reception of the scrying material (historical); a symbolic representation of the human desire for direct, unmediated knowledge (psychological); a framework that Kelley may have exploited — giving Dee exactly the kind of material Dee was primed to receive (skeptical).",

    relatedTerms: ["Enochian", "Scrying"],
    relatedTermsExternal: [
      "Enochian Language",
      "Babel",
      "Genesis",
      "Kabbalah",
      "Sefer Yetzirah",
      "Pico della Mirandola",
      "John Dee",
      "Liber Loagaeth"
    ],

    sourceNotes:
      "Genesis 2:19–20, 11:1–9. Sefer Yetzirah (various editions). Pico della Mirandola, 900 Theses (1486). Reuchlin, De Arte Cabalistica (1517). Eco, Umberto, The Search for the Perfect Language (1995). Dee's diary references: Sloane MS 3188.",
    appearsIn: [
      {
        label: "Lesson 1.1: The Lost Language",
        href: "/path/seeker/the-lost-language",
        note: "The central framing concept of the lesson."
      }
    ],
    archivePlaceholder: [
      "Archive → Comparative Systems → The Lost Language Tradition (forthcoming)",
      "Language Chamber → Historical Context (forthcoming)",
      "Intelligence Observatory → What would a divine language be? (forthcoming)"
    ],
    appTags: ["language", "comparative", "history", "religion"]
  },

  {
    slug: "watchtower",
    term: "Watchtower",
    oneLine:
      "One of four 12×13 letter grids that form the spatial architecture of the Enochian cosmos. Received in 1584; expanded by the Golden Dawn.",
    definition:
      "One of four large letter grids — each 12 columns by 13 rows — that form the spatial architecture of the Enochian cosmological system. Each Watchtower is associated with a cardinal direction and, in most interpretive traditions, with one of the four classical elements. Together, the four Watchtowers and the Tablet of Union form the Great Table — the horizontal map of the Enochian cosmos.",
    category: "Cosmology / System Architecture",
    level: "Beginner–Advanced",
    primaryBadge: "historical",

    historicalLens:
      "The Watchtower tablets were transmitted to Dee and Kelley in June–July 1584, during their stay on the European continent. ◆ They are documented in Cotton Appendix XLVI, Part 2, in Dee's handwriting. The transmission was complex: the angels dictated letters into specific grid positions, building each tablet cell by cell. Each tablet is structured around a Great Cross (a vertical and horizontal bar dividing the tablet into four subquadrants) and Calvary Crosses within each subquadrant. From these structural features, the names of hundreds of angelic entities can be derived. Dee recorded directional attributions for the tablets ◆. The specific element-to-direction mapping became a point of significant divergence. Dee's records are ambiguous on certain elemental attributions. △ The Golden Dawn (specifically Mathers, c. 1888–1900) assigned definitive elemental correspondences: Air/East, Fire/South, Water/West, Earth/North. These are now standard in most practice — but they are not original to Dee, and their basis is debated. ◇",
    occultLens:
      "The Watchtowers are understood as the quadrants of heaven — the spatial architecture through which all Enochian magical operations proceed. To 'open a Watchtower' is to ritually engage with a specific elemental domain and its angelic hierarchy. The entities derived from the tablets are not understood as mere names but as real beings — intelligences that can be contacted, petitioned, and interacted with through the correct use of the Calls. The Golden Dawn expanded the system dramatically: assigning elemental attributions, creating color scales, mapping the tablets onto the Tree of Life, and developing ritual procedures Dee never described. △ Mathers also produced the 'Reformed' or 'Corrected' Great Table, which rearranges the internal letter order. He claimed angelic authority for this change.",
    psychologicalLens:
      "The Watchtowers can be read as a mandala — a geometric structure that maps psychological space. Four quadrants, each with its own character, governed by hierarchies of increasingly specific forces. In this framework, the Watchtowers are not a map of heaven but a map of the psyche's organizational structure. The elements (Air = intellect, Fire = will, Water = emotion, Earth = body) correspond to classical and Jungian personality typologies. Whether this correspondence is designed or projected is an open question.",

    commonMisunderstandings: [
      "The Watchtowers are letter grids, not physical towers. The name invites a visual image of stone towers at the cardinal points, but the actual structure is a 12×13 matrix of letters from which names are extracted by positional rules.",
      "Most published representations of the Watchtowers show the Golden Dawn's version, not Dee's original. The differences include internal letter arrangement (Reformed vs. Original), color scales (GD addition), elemental attributions (GD standardization), and the method of deriving certain angel names.",
      "The Watchtowers were received after the Heptarchic system and Liber Loagaeth. They are not the first thing Dee and Kelley produced.",
      "The four Watchtowers and the 30 Aethyrs are related but distinct structures. The Watchtowers map horizontal (elemental) space; the Aethyrs map vertical (cosmological) space. The 91 Governors of the Aethyrs are derived from the Watchtower tablets, linking the two systems."
    ],
    multipleInterpretations:
      "Genuine cosmological architecture revealed by angels (traditional); a complex pattern-generation system that may have been constructed by Kelley with or without conscious intent (skeptical); a psycho-cosmological mandala mapping inner and outer space simultaneously (Jungian/psychological); an unfinished system whose full logic was never completely transmitted (scholarly); one of the most remarkable systematic achievements in the history of constructed symbolic systems, regardless of origin (agnostic).",

    relatedTerms: ["Enochian", "Aethyr", "Scrying"],
    relatedTermsExternal: [
      "Great Table",
      "Tablet of Union",
      "Element",
      "King",
      "Senior",
      "Kerubic Angel",
      "Servient Angel",
      "Calvary Cross",
      "Three Great Names",
      "Reformed Table",
      "Mathers"
    ],

    sourceNotes:
      "Primary: Cotton Appendix XLVI, Part 2 (Dee's handwriting). Casaubon, A True & Faithful Relation (1659), partial. Mathers' reconstruction: Regardie, The Golden Dawn (1937). Modern analysis: Laycock, The Complete Enochian Dictionary (1978/1994). Peterson, John Dee's Five Books of Mystery (2003). Comparison of original vs. Reformed: Dean Wilson, Enochian Magic in Theory (2012).",
    appearsIn: [
      {
        label: "Lesson 1.1: The Lost Language",
        href: "/path/seeker/the-lost-language",
        note: "Introduced as a structural component of the system."
      }
    ],
    archivePlaceholder: [
      "Celestial Map → Watchtowers (primary content, forthcoming)",
      "Archive → Watchtowers (major section, forthcoming)",
      "Research Lens → Original vs. Reformed (flagship comparison, forthcoming)",
      "Lesson 4.1+ (explored in depth, forthcoming)"
    ],
    appTags: ["cosmology", "watchtowers", "primary", "golden-dawn"]
  },

  {
    slug: "aethyr",
    term: "Aethyr",
    oneLine:
      "One of 30 concentric regions in the Enochian cosmology, extending from outer matter to inner divinity. Names recorded by Dee; visionary content added by Crowley 325 years later.",
    definition:
      "One of 30 concentric regions in the Enochian cosmology, extending from the outermost material threshold (Aethyr 30, TEX) inward toward the divine source (Aethyr 1, LIL). Each Aethyr is governed by three of the 91 Governors, whose names are derived from the Watchtower tablets. The Aethyrs constitute the vertical axis of the Enochian cosmos — the system's depth chart.",
    category: "Cosmology",
    level: "Intermediate",
    primaryBadge: "historical",

    historicalLens:
      "The term appears in Dee's records as 'Aethyr' or 'Aire.' ◆ The 30 Aethyrs and their three-letter names (TEX, RII, BAG, etc.) were transmitted in 1584, along with the 91 Governors who administer them and their correspondences to geographic regions of Earth. ◆ (Documented in Dee's working papers and Cotton Appendix XLVI.) Critically: Dee did not describe the experiential content of the Aethyrs. He recorded their names, numbers, governors, and geographic correspondences. He did not produce anything resembling a vision or a description of what one would encounter in each Aethyr. The Aethyrs, in Dee's records, are a structural classification — regions on a map, not destinations in a travelogue. The experiential content that most people associate with the Aethyrs comes from Crowley, 325 years later. This distinction is one of the most important in the entire Enochian tradition and one of the most frequently collapsed.",
    occultLens:
      "Within esoteric practice, the 30 Aethyrs are accessed through the 19th Call — the same Call used each time, with the name of the target Aethyr substituted into a specific position. The practitioner recites the Call, then scries (or otherwise enters a visionary state) to perceive the Aethyr's content. The Golden Dawn treated the Aethyrs as advanced material, accessible only to higher-grade initiates, and mapped them onto the Kabbalistic Tree of Life (outer Aethyrs = Malkuth; inner = Kether). △ This mapping is a Golden Dawn creation; Dee's records do not contain it. Crowley's 1909 workings in the Algerian desert produced The Vision and the Voice (Liber 418), in which each Aethyr receives detailed visionary content: landscapes, entities, dialogues, symbolic events. The 10th Aethyr (ZAX) became the locus of Crowley's famous encounter with Choronzon and his concept of the Abyss. ◆ (The workings are documented; the interpretation is Crowley's.)",
    psychologicalLens:
      "The 30 Aethyrs can be read as a map of consciousness — 30 stations ranging from ordinary, externally-focused awareness (outer Aethyrs) to formless, ego-dissolved unity (inner Aethyrs). The midpoint — the Abyss at ZAX — corresponds to the dissolution of the structured self, the boundary between personal identity and transpersonal experience. This reading is modern and speculative (~), but it has productive parallels: the Buddhist jhānas, the Christian mystics' stages of prayer (Teresa of Ávila's Interior Castle), and the Tibetan bardos. Whether these parallels indicate a shared structure of consciousness or a shared structure of storytelling is an open question.",

    commonMisunderstandings: [
      "The 30 Aethyrs are not simply '30 heavens.' They were not described as experiential destinations by Dee. Crowley's detailed visions are one person's account, produced 325 years after the system was transmitted, filtered through a Thelemic worldview. They are not canonical.",
      "The Aethyrs and the Watchtowers are related but distinct. The Aethyrs map vertical (depth) space; the Watchtowers map horizontal (elemental) space. The 91 Governors link the two: their names come from the Watchtower tablets, but they govern the Aethyrs.",
      "The numbering runs inward: Aethyr 30 is the outermost (closest to the material world), Aethyr 1 is the innermost (closest to the divine). This is counterintuitive — the highest number is the lowest level.",
      "The 'Abyss' at ZAX is not a Dee concept. It is a Crowley/Kabbalistic interpretation layered onto the system. In Dee's records, ZAX is simply the 10th Aethyr."
    ],
    multipleInterpretations:
      "A literal map of cosmological regions accessible through ritual (traditional); a structural classification with no prescribed experiential content — the content is reader-supplied (historical); a Thelemic initiatory topology imported by Crowley and mistaken for Dee's (critical); a phenomenological chart of the interior states a mind passes through when it turns fully inward (psychological).",

    relatedTerms: ["Enochian", "Watchtower", "Scrying"],
    relatedTermsExternal: [
      "Governor",
      "19th Call",
      "Great Table",
      "Abyss",
      "ZAX",
      "TEX",
      "LIL",
      "Choronzon",
      "Vision and the Voice",
      "Crowley"
    ],

    sourceNotes:
      "Dee's records: Cotton Appendix XLVI. Governor names and geographic correspondences: Sloane MS 3191. Crowley's visions: The Vision and the Voice (Liber 418), serialized in The Equinox (1911). Golden Dawn Aethyr workings: Regardie, The Golden Dawn (1937). Scholarly analysis: Asprem, Arguing with Angels (2012), ch. 4.",
    appearsIn: [
      {
        label: "Lesson 1.1: The Lost Language",
        href: "/path/seeker/the-lost-language",
        note: "Introduced as a cosmological component of the system."
      }
    ],
    archivePlaceholder: [
      "Aethyr Journey → entire pillar (forthcoming)",
      "Celestial Map → Aethyr Sphere (forthcoming)",
      "Archive → Aethyrs (major section, forthcoming)",
      "Lesson 5.1+ (explored in depth, forthcoming)"
    ],
    appTags: ["aethyr", "cosmology", "crowley", "watchtower", "governor"]
  },
  ...CORE_GLOSSARY_ENTRIES,
  ...STAGE2_GLOSSARY_STUBS
];

export function isPublishedGlossaryEntry(entry: GlossaryEntry): boolean {
  return entry.definition !== "[CONTENT PENDING]" && entry.oneLine !== "[CONTENT PENDING]";
}

/** Entries ready for public index (excludes Student-stage stubs). */
export function publishedGlossaryEntries(): GlossaryEntry[] {
  return glossaryEntries.filter(isPublishedGlossaryEntry);
}

export function alphabeticalEntries(): GlossaryEntry[] {
  return [...glossaryEntries].sort((a, b) => a.term.localeCompare(b.term));
}

export function publishedAlphabeticalEntries(): GlossaryEntry[] {
  return publishedGlossaryEntries().sort((a, b) => a.term.localeCompare(b.term));
}

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug);
}

export function getGlossaryEntryByTerm(term: string): GlossaryEntry | undefined {
  return glossaryEntries.find(
    (e) => e.term.toLowerCase() === term.toLowerCase()
  );
}