export type RitualFurnitureItem = {
  slug: string;
  title: string;
  subtitle: string;
  badge: "historical" | "consensus" | "occult" | "later";
  summary: string;
  manuscriptNote: string;
  questions: string[];
};

export const RITUAL_FURNITURE_ITEMS: RitualFurnitureItem[] = [
  {
    slug: "sigillum-dei",
    title: "Sigillum Dei Aemeth",
    subtitle: "Seal of God — wax disc for angelic contact",
    badge: "historical",
    summary:
      "Dee received specifications for a wax seal bearing divine names in concentric rings. The surviving physical seal is among the best-documented objects in the Enochian corpus.",
    manuscriptNote: "Described in Dee's actions and surviving artifacts; dimensions and naming vary slightly by edition.",
    questions: [
      "Which claims about the seal come from Dee's diaries versus later ritual manuals?",
      "How do you distinguish documented use from Golden Dawn reconstructions?"
    ]
  },
  {
    slug: "holy-table",
    title: "Holy Table",
    subtitle: "Wooden table for instruments and the four seals",
    badge: "historical",
    summary:
      "The table held the four smaller seals, the shew-stone, and other instruments during scrying. Reconstructions differ on proportions and inscriptions.",
    manuscriptNote: "Peterson's edition collates table instructions across manuscript witnesses.",
    questions: [
      "What parts of modern reconstructions are manuscript-backed?",
      "Why might furniture details matter for source discernment but not for cosmology?"
    ]
  },
  {
    slug: "ring",
    title: "Dee's Ring",
    subtitle: "Gold ring with angelic names",
    badge: "historical",
    summary:
      "A gold ring bearing names associated with the Heptarchic material. A ring matching the description is held in the British Museum.",
    manuscriptNote: "Physical object ◆; ritual use described in diary tradition ◇.",
    questions: [
      "How does a museum object change the epistemic status of a claim?",
      "What would it mean if the ring were later copy rather than Dee's own?"
    ]
  },
  {
    slug: "lamen",
    title: "Lamen",
    subtitle: "Breastplate or badge of office",
    badge: "historical",
    summary:
      "Instructions for a lamen appear in the Heptarchic reception. Later occult orders produced variant designs.",
    manuscriptNote: "Heptarchic lamen instructions in Sloane/Cotton tradition; GD variants are △.",
    questions: [
      "Where does Dee's lamen end and Mathers's begin?",
      "Should a lamen page show both without collapsing them?"
    ]
  }
];

export function getRitualFurnitureBySlug(slug: string): RitualFurnitureItem | undefined {
  return RITUAL_FURNITURE_ITEMS.find((i) => i.slug === slug);
}
