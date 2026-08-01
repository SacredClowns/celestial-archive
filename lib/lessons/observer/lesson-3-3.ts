import type { ObserverLessonPack } from "@/lib/lessons/observer/observer-lesson-pack";

/** Sidebar, glossary surface and claim panels for Lesson 3.3 — body text lives in markdown only. */
export const observerLesson3_3Pack: ObserverLessonPack = {
  duration: "50–65 minutes",
  epistemicTones: ["historical", "consensus", "occult", "later", "parallel", "speculative", "disputed", "caution"],
  verificationNote:
    "Draft folio in controlled preview. Edition-level citations for Regardie and Leitch are still open, and the characterization of modern working currents awaits review against Asprem (2012). No practitioner tradition is endorsed or dismissed here — if you find one described unfairly, that is a defect and the Archive wants to hear about it.",
  sidebar: {
    glossaryTerms: [
      { term: "Tabula Recensa", hoverDefinition: "The reformed Great Table associated with the 1587 revision", badge: "historical" },
      { term: "Watchtower Working", hoverDefinition: "Ritual practice organized around the four elemental tablets", badge: "later" },
      { term: "Skrying in the Spirit Vision", hoverDefinition: "The Golden Dawn's term for structured visionary practice", badge: "later" },
      { term: "Elemental Grade Working", hoverDefinition: "Practice tied to an initiatory grade and its element", badge: "later" },
      { term: "Concourse of the Forces", hoverDefinition: "The Order's organizing scheme for the lesser squares of the tablets", badge: "later" },
      { term: "Tablet of Union", hoverDefinition: "The small grid — EXARP, HCOMA, NANTA, BITOM — binding the four quarters", badge: "historical" }
    ],
    relatedPeople: [
      { name: "John Dee", role: "Recorder of the table, and of its revision", lifespan: "1527–1608/9" },
      { name: "S.L. MacGregor Mathers", role: "Central to the Order's arrangement of the tablets", lifespan: "1854–1918" },
      { name: "Israel Regardie", role: "Published the Order's corpus, against internal objection", lifespan: "1907–1985" },
      { name: "Egil Asprem", role: "Historian of Enochian magic in modern occulture", lifespan: "b. 1984" },
      { name: "Lon Milo DuQuette", role: "Modern practitioner-scholar", lifespan: "b. 1948" }
    ],
    relatedTexts: [
      { title: "Great Table material (Sloane MS 3191)", author: "John Dee", year: "1580s", traditionColor: "Gold" },
      { title: "The Golden Dawn", author: "Israel Regardie", year: "1937–1940", traditionColor: "Silver" },
      { title: "Practical Angel Magic of Dr. John Dee's Enochian Tables", author: "Skinner & Rankine", year: "2004", traditionColor: "Bronze" },
      { title: "Enochian Vision Magick", author: "Lon Milo DuQuette", year: "2008", traditionColor: "Bronze" },
      { title: "Arguing with Angels", author: "Egil Asprem", year: "2012", traditionColor: "Bronze" }
    ],
    relatedSymbols: [
      { symbol: "The four Watchtowers", description: "Four elemental quarters, each a letter grid, each a station in practice" },
      { symbol: "Tablet of Union", description: "The fifth object — in the manuscripts one thing, in the Order's practice another" }
    ],
    relatedLessons: [
      { lesson: "Lesson 2.4: The Architecture of the World", connection: "Where the grid was learned as geometry; here it is watched in motion." },
      { lesson: "Lesson 3.2: What the Scryer Saw", connection: "Negotiation inside the sessions; here, negotiation across four centuries." },
      { lesson: "Lesson 3.5: The Parallel Problem", connection: "The formal test for the comparative move this folio only gestures at." }
    ],
    timelineAnchors: [
      { date: "1580s", event: "The Great Table recorded across the sessions" },
      { date: "1587", event: "The reformed table — revision inside Dee's own working" },
      { date: "1888–1900", event: "The Golden Dawn builds a working system on the tablets" },
      { date: "1937–1940", event: "Regardie publishes the Order's material" },
      { date: "2003–2012", event: "Critical editions and reception scholarship reopen the manuscript layer" }
    ],
    relatedQuestions: [
      "What changes when a manuscript grid becomes a ritual instrument — and whose grid is it?",
      "If Dee revised the table himself, what does 'the original' mean?",
      "Can two sincere practitioners be addressing different sets of names without either being wrong?"
    ],
    shadowItems: [
      { concept: "Cacodemon and operative lore", note: "Named, not opened — Observer rank adds cartography, not instruction." },
      { concept: "Initiatory grade content", note: "Belongs to the traditions that hold it; this Archive is a study, not an initiation." }
    ]
  },
  glossarySurface: [
    {
      term: "Tabula Recensa",
      definition: "The reformed Great Table associated with the 1587 revision — evidence that the system was corrected inside Dee's own lifetime, in his own record.",
      category: "Structure",
      beginnerLevel: "Observer",
      relatedTerms: ["Tablet of Union", "Watchtower Working"],
      badge: "historical"
    },
    {
      term: "Watchtower Working",
      definition: "Ritual practice organized around the four elemental tablets. A reception-era development, documented and widely practised, not a manuscript procedure.",
      category: "Practice",
      beginnerLevel: "Observer",
      relatedTerms: ["Skrying in the Spirit Vision", "Elemental Grade Working", "Concourse of the Forces"],
      badge: "later"
    },
    {
      term: "Concourse of the Forces",
      definition: "The Golden Dawn's organizing scheme for the lesser squares of the tablets, integrating elemental and Kabbalistic attributions. Not present in Dee.",
      category: "Reception",
      beginnerLevel: "Observer",
      relatedTerms: ["Watchtower Working", "Elemental Grade Working"],
      badge: "later"
    },
    {
      term: "Skrying in the Spirit Vision",
      definition: "The Order's term for structured visionary practice, typically entered through a symbol or tablet square.",
      category: "Practice",
      beginnerLevel: "Observer",
      relatedTerms: ["Watchtower Working"],
      badge: "later"
    }
  ],
  sourceClaims: [
    {
      claimId: "claim-table-revised-1587",
      claimText: "The Great Table was revised within Dee's own working — the reformed table of 1587.",
      tone: "historical",
      who: "The manuscript record",
      source: "Sloane MS 3191; Peterson (2003)",
      confidence: "Historical Evidence",
      competingInterpretation:
        "Cuts both ways: revision is native to the record, and 'the original table' is therefore already ambiguous before any later tradition touches it."
    },
    {
      claimId: "claim-gd-overlays-later",
      claimText: "Colour scales, Kabbalistic correspondences, grade attributions and the Concourse of the Forces are Golden Dawn synthesis, not Dee.",
      tone: "later",
      who: "Order papers and published corpus; reception scholarship",
      source: "Regardie; Asprem (2012)",
      confidence: "Later Interpretation — well documented",
      competingInterpretation:
        "'Not in Dee' is not a synonym for illegitimate. The synthesis is coherent and has sustained practice for over a century; the objection is only ever to elaboration presented as manuscript."
    },
    {
      claimId: "claim-arrangement-disputed",
      claimText: "Whether the Order's arrangement best represents Dee's intent is unresolved.",
      tone: "disputed",
      who: "Practitioner-scholars and historians, on both sides",
      source: "Skinner & Rankine (2004); DuQuette (2008); Leitch; Asprem (2012)",
      confidence: "Disputed — actively argued",
      competingInterpretation:
        "Reconstructionists argue from the manuscripts; Order lineages argue from workability and continuity. Both cite real warrants."
    },
    {
      claimId: "claim-practice-reports",
      claimText: "Practitioner reports of results are recorded here as reports, not as evidence of mechanism.",
      tone: "caution",
      who: "The Archive, about its own limits",
      source: "Method statement",
      confidence: "Disclosed boundary",
      competingInterpretation:
        "A report of an experience is excellent evidence that an experience was reported. The Archive does not adjudicate efficacy in either direction."
    }
  ],
  relationshipChain: ["Sloane MS 3191", "The Tabula Recensa", "The Golden Dawn", "Israel Regardie", "Living practice"]
};
