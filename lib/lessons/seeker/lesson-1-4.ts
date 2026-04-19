import type { SeekerLessonPack } from "@/lib/lessons/seeker/seeker-lesson-pack";

export const seekerLesson1_4Pack: SeekerLessonPack = {
  duration: "70–90 minutes",
  epistemicTones: ["historical", "consensus", "occult", "later", "speculative", "parallel", "disputed", "caution"],
  sidebar: {
    glossaryTerms: [
      { term: "Liber Loagaeth", hoverDefinition: "Sloane MS 3189 — 49 letter-grid tables", badge: "historical" },
      { term: "Angelic Alphabet", hoverDefinition: "21 named letterforms received in session", badge: "historical" },
      { term: "Reverse Dictation", hoverDefinition: "Last letter first; unusual documentary order", badge: "historical" },
      { term: "Strange Feeling", hoverDefinition: "Intensity vs. verdict — third Seeker practice", badge: "caution" },
      { term: "Madimi", hoverDefinition: "Entity prominent in 1583–1584 session window", badge: "historical" }
    ],
    relatedPeople: [
      { name: "John Dee", role: "Transcriber and examiner", lifespan: "1527–1608/9" },
      { name: "Edward Kelley", role: "Scryer", lifespan: "1555–1597" }
    ],
    relatedTexts: [
      { title: "Sloane MS 3189", author: "John Dee (Liber Loagaeth)", year: "1583–1584", traditionColor: "Gold" },
      { title: "Sloane MS 3188", author: "John Dee", year: "1581–1587", traditionColor: "Gold" },
      { title: "John Dee's Five Books of Mystery", author: "Joseph H. Peterson (ed.)", year: "2003", traditionColor: "Bronze" }
    ],
    relatedSymbols: [{ symbol: "Liber Loagaeth grid", description: "Forty-nine tables of letters" }],
    relatedLessons: [
      { lesson: "Lesson 1.3: The First Transmissions", connection: "Single-witness context for alphabet reception." },
      { lesson: "Lesson 1.5: The Long Arc and the Breaking", connection: "Continental fate of the manuscripts." }
    ],
    timelineAnchors: [
      { date: "1583", event: "Alphabet and Loagaeth material at Mortlake" },
      { date: "April 1584", event: "Kraków — reverse-order alphabet and Calls window" },
      { date: "Sloane MS 3189", event: "Liber Loagaeth shelfmark" }
    ],
    relatedQuestions: [
      "Does internal coherence of a script tell you its origin?",
      "When you feel awe before a manuscript, what question should you ask next?"
    ],
    shadowItems: [
      { concept: "Full 19 Calls in operational context", note: "Student rank introduces structured work with the Keys." },
      { concept: "Watchtower grids as spatial map", note: "Observer rank — Celestial Map pillar." }
    ]
  },
  glossarySurface: [
    {
      term: "Liber Loagaeth",
      definition: "Sloane MS 3189 — forty-nine large leaves of letter grids received through Kelley.",
      category: "Manuscript",
      beginnerLevel: "Seeker",
      relatedTerms: ["Angelic Alphabet", "Enochian", "Reverse Dictation"],
      badge: "historical"
    },
    {
      term: "Angelic Alphabet",
      definition: "Twenty-one letterforms with names — the script layer of the received language.",
      category: "Language",
      beginnerLevel: "Seeker",
      relatedTerms: ["Liber Loagaeth", "Enochian", "Parallel"],
      badge: "historical"
    },
    {
      term: "Reverse Dictation",
      definition: "Letters and Calls received last-first — a documented feature of the record.",
      category: "Transmission",
      beginnerLevel: "Seeker",
      relatedTerms: ["Angelic Alphabet", "Call", "Historical"],
      badge: "historical"
    },
    {
      term: "Strange Feeling",
      definition: "Discernment practice: separate the intensity of response from the truth of the claim.",
      category: "Discernment",
      beginnerLevel: "Seeker",
      relatedTerms: ["Caution", "Psychological Lens", "Historical Lens"],
      badge: "caution"
    },
    {
      term: "Parallel",
      definition: "◎ marks structural resemblance to other scripts without claiming direct copying.",
      category: "Epistemic badge",
      beginnerLevel: "Seeker",
      relatedTerms: ["Angelic Alphabet", "Later Interpretation", "Historical"],
      badge: "parallel"
    }
  ],
  sourceClaims: [
    {
      claimId: "claim-loagaeth-exists",
      claimText: "Liber Loagaeth exists as Sloane MS 3189 in the British Library — a material manuscript object.",
      tone: "historical",
      who: "British Library catalog; Dee's hand",
      source: "Sloane MS 3189",
      confidence: "Historical evidence",
      competingInterpretation: "Interpretive significance of the object is what lessons debate — not its existence."
    },
    {
      claimId: "claim-letterforms-parallel",
      claimText:
        "Some letter-forms echo features of earlier magical scripts; the full inventory is not documentary-traceable to one prior source. ◎",
      tone: "parallel",
      who: "Paleographic comparison in scholarship and reception",
      source: "SOURCE_PACK_4_LESSON_1_4",
      confidence: "Parallel (structural)",
      competingInterpretation: "Echo does not prove borrowing; absence of a prototype does not prove otherworldly origin."
    }
  ],
  relationshipChain: ["Alphabet", "Liber Loagaeth", "Reverse order", "Calls named — not yet opened"]
};
