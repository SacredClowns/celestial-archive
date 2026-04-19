import type { SeekerLessonPack } from "@/lib/lessons/seeker/seeker-lesson-pack";

export const seekerLesson1_5Pack: SeekerLessonPack = {
  duration: "90–120 minutes",
  epistemicTones: ["historical", "consensus", "occult", "later", "speculative", "disputed", "caution"],
  sidebar: {
    glossaryTerms: [
      { term: "Třeboň", hoverDefinition: "Bohemian estate — key Continental stop", badge: "historical" },
      { term: "Meric Casaubon", hoverDefinition: "1659 editor of printed session material", badge: "historical" },
      { term: "A True & Faithful Relation", hoverDefinition: "Printed Dee–spirit diary — editorial frame is hostile", badge: "historical" },
      { term: "Elias Ashmole", hoverDefinition: "Antiquarian preservation of Dee papers", badge: "historical" },
      { term: "Continental sessions", hoverDefinition: "Fragmentary survival vs. English manuscripts", badge: "historical" }
    ],
    relatedPeople: [
      { name: "Albert Łaski", role: "Polish patron", lifespan: "c.1536–1605" },
      { name: "Rudolf II", role: "Holy Roman Emperor — court context", lifespan: "1552–1612" },
      { name: "John Dee", role: "Recorder", lifespan: "1527–1608/9" },
      { name: "Edward Kelley", role: "Scryer", lifespan: "1555–1597" }
    ],
    relatedTexts: [
      { title: "Cotton Appendix XLVI", author: "John Dee", year: "1583–1588 (fragments)", traditionColor: "Gold" },
      { title: "A True & Faithful Relation", author: "Meric Casaubon", year: "1659", traditionColor: "Gold" },
      { title: "John Dee's Diary", author: "John Dee (Fenton ed.)", year: "1998", traditionColor: "Bronze" }
    ],
    relatedSymbols: [{ symbol: "Mortlake gate", description: "Departure — September 1583" }],
    relatedLessons: [
      { lesson: "Lesson 1.4: The Enochian Language Emerges", connection: "Manuscripts carried onto the Continent." },
      { lesson: "Stage 2 — Student", connection: "Structural work with Heptarchia — threshold ahead." }
    ],
    timelineAnchors: [
      { date: "September 1583", event: "Household leaves Mortlake" },
      { date: "1583–1589", event: "Continental courts and patrons" },
      { date: "1659", event: "Casaubon prints relation" }
    ],
    relatedQuestions: [
      "Does a longer chain of transmission make the text more or less trustworthy — and which kind of trust?",
      "When is it appropriate to stop reading for a day?"
    ],
    shadowItems: [
      { concept: "Operational ritual instructions", note: "Held for Adept-tier framing with full cautions." },
      { concept: "Golden Dawn reception history", note: "Interpreter and Cartographer paths." }
    ]
  },
  glossarySurface: [
    {
      term: "Třeboň",
      definition: "Bohemian estate associated with Rožmberk patronage — Continental working context.",
      category: "Place",
      beginnerLevel: "Seeker",
      relatedTerms: ["Continental sessions", "Prague", "Enochian"],
      badge: "historical"
    },
    {
      term: "Meric Casaubon",
      definition: "Editor of the 1659 printed relation — his frame is adversarial; the text remains indispensable.",
      category: "Transmission",
      beginnerLevel: "Seeker",
      relatedTerms: ["A True & Faithful Relation", "Source Discernment", "Historical"],
      badge: "historical"
    },
    {
      term: "A True & Faithful Relation",
      definition: "Early printed edition of substantial Dee–spirit material — read with chain-of-transmission awareness.",
      category: "Printed source",
      beginnerLevel: "Seeker",
      relatedTerms: ["Meric Casaubon", "Cotton Appendix XLVI", "Disputed"],
      badge: "historical"
    },
    {
      term: "Elias Ashmole",
      definition: "Seventeenth-century antiquarian; key manuscript preservation for later scholarship.",
      category: "Transmission",
      beginnerLevel: "Seeker",
      relatedTerms: ["Meric Casaubon", "John Dee", "Manuscript"],
      badge: "historical"
    },
    {
      term: "Continental sessions",
      definition: "Sessions after 1583 — thinner autograph survival; more dependence on printed and composite witnesses.",
      category: "Evidence",
      beginnerLevel: "Seeker",
      relatedTerms: ["Source Discernment", "Caution", "Historical"],
      badge: "historical"
    }
  ],
  sourceClaims: [
    {
      claimId: "claim-departure-1583",
      claimText: "Dee's household departed Mortlake for the Continent in September 1583 with Łaski's sponsorship.",
      tone: "historical",
      who: "Dee diaries; secondary scholarship",
      source: "Fenton 1998; Harkness 1999",
      confidence: "Historical evidence",
      competingInterpretation: "Motives and expectations differ by interpreter; dates are the stable spine."
    },
    {
      claimId: "claim-1587-care",
      claimText:
        "Material involving the 1587 revelation session requires slow reading and psychological care — the Archive does not treat it as spectacle.",
      tone: "caution",
      who: "Archive editorial policy",
      source: "CONTENT_VOICE_GUIDE; Breaking Problem framework",
      confidence: "Caution marker",
      competingInterpretation: "Scholarly accounts differ in emphasis; the caution is about reader posture, not verdict."
    }
  ],
  relationshipChain: ["Mortlake", "Łaski", "Continental courts", "Manuscript survival", "You — the reader"]
};
