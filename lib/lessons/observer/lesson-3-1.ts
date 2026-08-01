import type { ObserverLessonPack } from "@/lib/lessons/observer/observer-lesson-pack";

/** Sidebar, glossary surface and claim panels for Lesson 3.1 — body text lives in markdown only. */
export const observerLesson3_1Pack: ObserverLessonPack = {
  duration: "45–60 minutes",
  epistemicTones: ["historical", "consensus", "occult", "later", "parallel", "speculative", "disputed", "caution"],
  verificationNote:
    "Draft folio in controlled preview. The passages here are composite paraphrase, not quoted folio transcriptions — the folio-level extract audit is still open in Source Pack OBSERVER 3.1. Read it as a guided approach to the manuscripts, not as a transcription to cite.",
  sidebar: {
    glossaryTerms: [
      { term: "Critical Edition", hoverDefinition: "A scholarly text reconstructed from witnesses, with variants recorded", badge: "consensus" },
      { term: "Lacuna", hoverDefinition: "A gap in a manuscript where text is lost or was never written", badge: "historical" },
      { term: "Marginalia", hoverDefinition: "Notes written in the margins, often by the manuscript's own author", badge: "historical" },
      { term: "Facsimile", hoverDefinition: "An exact reproduction of a manuscript page, image rather than transcription", badge: "consensus" },
      { term: "Editorial Decision", hoverDefinition: "A choice made by an editor that shapes what the reader receives as the text", badge: "consensus" },
      { term: "Manuscript Hand", hoverDefinition: "The identifiable handwriting of a particular scribe or period", badge: "historical" }
    ],
    relatedPeople: [
      { name: "John Dee", role: "Diarist — the hand that kept the record", lifespan: "1527–1608/9" },
      { name: "Edward Kelley", role: "Scryer — the voice the record reports", lifespan: "1555–1597" },
      { name: "Meric Casaubon", role: "First publisher, and first interpretive frame", lifespan: "1599–1671" },
      { name: "Deborah Harkness", role: "Historian of the sessions in their intellectual context", lifespan: "b. 1965" },
      { name: "Joseph H. Peterson", role: "Modern editor of the Five Books of Mystery", lifespan: "b. 1955" }
    ],
    relatedTexts: [
      { title: "Mysteriorum Libri Quinti (Sloane MS 3188)", author: "John Dee", year: "1581–1583", traditionColor: "Gold" },
      { title: "Working papers (Cotton Appendix XLVI)", author: "John Dee", year: "1583–1587", traditionColor: "Gold" },
      { title: "Private Diary (Ashmole MS 487)", author: "John Dee", year: "1577–1601", traditionColor: "Gold" },
      { title: "A True & Faithful Relation", author: "Meric Casaubon", year: "1659", traditionColor: "Silver" },
      { title: "John Dee's Five Books of Mystery", author: "Joseph H. Peterson", year: "2003", traditionColor: "Bronze" },
      { title: "John Dee's Conversations with Angels", author: "Deborah Harkness", year: "1999", traditionColor: "Bronze" }
    ],
    relatedSymbols: [
      { symbol: "quaere", description: "Dee's marginal query mark — the moment the diarist doubts his own record" }
    ],
    relatedLessons: [
      { lesson: "Lesson 1.2: The Partnership", connection: "The relationship whose texture this folio reads in the primary hand." },
      { lesson: "Lesson 3.2: What the Scryer Saw", connection: "Moves from the page to the session as negotiation." },
      { lesson: "Observatory: Loagaeth", connection: "The manuscript object this reading discipline prepares you for." }
    ],
    timelineAnchors: [
      { date: "March 8, 1582", event: "Kelley arrives at Mortlake — the diaries begin in earnest" },
      { date: "September 1583", event: "Mortlake library looted during Dee's absence" },
      { date: "1659", event: "Casaubon publishes the diaries, with his own frame" },
      { date: "1999", event: "Harkness reads the sessions in their intellectual context" },
      { date: "2003", event: "Peterson's critical edition of the Five Books" }
    ],
    relatedQuestions: [
      "How many hands stand between the session and the sentence you just read?",
      "What did Casaubon's frame make it impossible for his readers to see?",
      "When Dee writes quaere in his own margin, what is he doing?"
    ],
    shadowItems: [
      { concept: "Folio-level collation", note: "This practice becomes visible at Interpreter rank." },
      { concept: "The reception lineage", note: "This concept becomes visible at Cartographer rank." }
    ]
  },
  glossarySurface: [
    {
      term: "Critical Edition",
      definition: "A text reconstructed by an editor from surviving witnesses, recording variants so a reader can see where the witnesses disagree.",
      category: "Scholarship",
      beginnerLevel: "Observer",
      relatedTerms: ["Editorial Decision", "Facsimile", "Manuscript Hand"],
      badge: "consensus"
    },
    {
      term: "Lacuna",
      definition: "A gap in a manuscript — text lost to damage, excision, or an entry the writer never completed.",
      category: "Manuscript Study",
      beginnerLevel: "Observer",
      relatedTerms: ["Marginalia", "Manuscript Hand"],
      badge: "historical"
    },
    {
      term: "Marginalia",
      definition: "Notes in the margin. In Dee's diaries these are often his own second thoughts about what had just been dictated.",
      category: "Manuscript Study",
      beginnerLevel: "Observer",
      relatedTerms: ["Lacuna", "Editorial Decision"],
      badge: "historical"
    },
    {
      term: "Editorial Decision",
      definition: "Any choice an editor makes — what to include, normalize, translate or silently correct — that shapes what the reader receives as 'the text'.",
      category: "Scholarship",
      beginnerLevel: "Observer",
      relatedTerms: ["Critical Edition", "Facsimile"],
      badge: "consensus"
    }
  ],
  sourceClaims: [
    {
      claimId: "claim-mortlake-looted-1583",
      claimText: "Dee's Mortlake library was looted during his absence on the Continent, in or around September 1583.",
      tone: "historical",
      who: "Dee's own later accounts; modern biographical scholarship",
      source: "Ashmole MS 487; Harkness (1999); Peterson (2003) notes",
      confidence: "Historical Evidence",
      competingInterpretation: "Extent and exact dating of losses are debated; the fact of the loss is not."
    },
    {
      claimId: "claim-casaubon-frame-1659",
      claimText: "Casaubon published the diaries in 1659 to present Dee as deluded by demons, not to vindicate the system.",
      tone: "later",
      who: "Casaubon's own preface; historians of the reception",
      source: "A True & Faithful Relation (1659); Harkness (1999)",
      confidence: "Later Interpretation — well documented",
      competingInterpretation: "Some practitioners read the publication as preservation regardless of intent."
    },
    {
      claimId: "claim-composite-extracts",
      claimText: "The manuscript passages presented in this folio are composite paraphrase pending folio-level audit.",
      tone: "caution",
      who: "The Archive, about its own draft",
      source: "SOURCE_PACK_OBSERVER_3_1 (open)",
      confidence: "Disclosed limitation",
      competingInterpretation: "Not to be quoted as transcription until the audit closes."
    }
  ],
  relationshipChain: ["John Dee", "Sloane MS 3188", "Meric Casaubon", "Joseph H. Peterson", "The Reader"]
};
