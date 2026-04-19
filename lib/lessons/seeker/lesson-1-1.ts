import type { SeekerLessonPack } from "@/lib/lessons/seeker/seeker-lesson-pack";

/** Sidebar, glossary surface, and claim panels for Lesson 1.1 — body text lives in markdown only. */
export const seekerLesson1_1Pack: SeekerLessonPack = {
  duration: "18–25 minutes",
  epistemicTones: ["historical", "consensus", "occult", "later", "speculative"],
  sidebar: {
    glossaryTerms: [
      { term: "Scrying", hoverDefinition: "Gazing into a reflective surface to receive visions", badge: "historical" },
      { term: "Enochian", hoverDefinition: "The adjective describing the system received by Dee and Kelley", badge: "historical" },
      { term: "Lingua Adamica", hoverDefinition: "The hypothetical original language of humanity", badge: "consensus" },
      { term: "Sigillum Dei Aemeth", hoverDefinition: "Seal of God's Truth, central to Dee's practice", badge: "historical" },
      { term: "Watchtower", hoverDefinition: "One of four letter-grid tablets in the system", badge: "historical" },
      { term: "Aethyr", hoverDefinition: "One of 30 concentric cosmological regions", badge: "historical" },
      { term: "Gnosis", hoverDefinition: "Direct experiential knowledge of the divine", badge: "consensus" },
      { term: "Epistemic Status", hoverDefinition: "The confidence label assigned to a claim" }
    ],
    relatedPeople: [
      { name: "John Dee", role: "Mathematician, polymath, angel-summoner", lifespan: "1527–1608/9" },
      { name: "Edward Kelley", role: "Scryer and Dee's partner", lifespan: "1555–1597" },
      { name: "Meric Casaubon", role: "Publisher of Dee's diaries", lifespan: "1599–1671" }
    ],
    relatedTexts: [
      { title: "Sloane MS 3188", author: "John Dee", year: "1582–1587", traditionColor: "Gold" },
      { title: "Cotton Appendix XLVI", author: "John Dee", year: "1584", traditionColor: "Gold" },
      { title: "A True & Faithful Relation", author: "Meric Casaubon", year: "1659", traditionColor: "Gold" },
      { title: "John Dee's Conversations with Angels", author: "Deborah Harkness", year: "1999", traditionColor: "Bronze" },
      { title: "The Complete Enochian Dictionary", author: "Donald Laycock", year: "1978/1994", traditionColor: "Bronze" }
    ],
    relatedSymbols: [{ symbol: "Sigillum Dei Aemeth", description: "The heptagonal seal and first visual threshold" }],
    relatedLessons: [
      { lesson: "Lesson 1.2: The Partnership", connection: "Explores the Dee–Kelley relationship introduced here." },
      { lesson: "Lesson 2.1: The Alphabet", connection: "Examines the language Dee believed he had received." },
      { lesson: "Comparative: The Lost Language Tradition", connection: "Extends this lesson into the broader Babel lineage." }
    ],
    timelineAnchors: [
      { date: "July 13, 1527", event: "John Dee born" },
      { date: "March 8, 1582", event: "Edward Kelley arrives at Mortlake" },
      { date: "April–July 1584", event: "Alphabet and Calls recorded" },
      { date: "1659", event: "Casaubon publishes Dee's diaries" }
    ],
    relatedQuestions: [
      "Is the Enochian language a genuine constructed language, a cipher, or something else?",
      "Why was the alphabet received in reverse order?"
    ],
    shadowItems: [
      { concept: "Liber Loagaeth", note: "This concept becomes visible at Observer rank." },
      { concept: "Intelligence Observatory", note: "This concept becomes visible at Observer rank." }
    ]
  },
  glossarySurface: [
    {
      term: "Scrying",
      definition: "Gazing into a reflective surface to receive visions or communications.",
      category: "Practice",
      beginnerLevel: "Seeker",
      relatedTerms: ["Enochian", "Sigillum Dei Aemeth", "Epistemic Status"],
      badge: "historical"
    },
    {
      term: "Enochian",
      definition: "The adjective describing the system recorded by Dee and Kelley.",
      category: "System",
      beginnerLevel: "Seeker",
      relatedTerms: ["Aethyr", "Watchtower", "Lingua Adamica"],
      badge: "historical"
    },
    {
      term: "Lingua Adamica",
      definition: "The hypothesized pre-Babel language associated with Adamic naming.",
      category: "Comparative Concept",
      beginnerLevel: "Seeker",
      relatedTerms: ["Gnosis", "Enochian", "Watchtower"],
      badge: "consensus"
    },
    {
      term: "Watchtower",
      definition: "One of the four large letter-grid tablets in the Enochian architecture.",
      category: "Structure",
      beginnerLevel: "Seeker",
      relatedTerms: ["Aethyr", "Enochian", "Sigillum Dei Aemeth"],
      badge: "historical"
    },
    {
      term: "Aethyr",
      definition: "One of thirty concentric cosmological regions used in later visionary mappings.",
      category: "Cosmology",
      beginnerLevel: "Seeker",
      relatedTerms: ["Watchtower", "Enochian", "Gnosis"],
      badge: "historical"
    }
  ],
  sourceClaims: [
    {
      claimId: "claim-dee-born-1527",
      claimText: "John Dee was born on July 13, 1527, in Tower Ward, London.",
      tone: "historical",
      who: "Dee's autobiographical notes; Cambridge archival records",
      source: "Sloane manuscript references and Cambridge records",
      confidence: "Historical Evidence",
      competingInterpretation: "Not materially contested in mainstream scholarship."
    },
    {
      claimId: "claim-kelley-fabrication",
      claimText: "Kelley may have fabricated portions of the angelic communication record.",
      tone: "disputed",
      who: "Critical historians and later evaluative scholarship",
      source: "Casaubon (1659), Woolley (2001), counterpoints in Harkness and Laycock",
      confidence: "Disputed / unresolved",
      competingInterpretation: "Counter-arguments cite linguistic coherence and documented session intensity."
    }
  ],
  relationshipChain: ["John Dee", "Edward Kelley", "Liber Loagaeth", "The Angelic Language"]
};
