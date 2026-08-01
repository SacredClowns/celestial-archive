import type { RelationshipWebEdge, RelationshipWebNode } from "@/lib/relationship-web/types";

export const RELATIONSHIP_WEB_NODES: RelationshipWebNode[] = [
  { id: "dee", label: "John Dee", kind: "person" },
  { id: "kelley", label: "Edward Kelley", kind: "person" },
  { id: "jane-dee", label: "Jane Dee", kind: "person" },
  { id: "laski", label: "Albert Łaski", kind: "person" },
  { id: "rudolf-ii", label: "Rudolf II", kind: "person" },
  { id: "rozmberk", label: "Vilém Rožmberk", kind: "person" },
  { id: "barnabas-saul", label: "Barnabas Saul", kind: "person" },
  { id: "walsingham", label: "Francis Walsingham", kind: "person" },
  { id: "elizabeth-i", label: "Elizabeth I", kind: "person" },
  { id: "casaubon", label: "Méric Casaubon", kind: "person" },
  { id: "mathers", label: "S.L. MacGregor Mathers", kind: "person" },
  { id: "westcott", label: "W.W. Westcott", kind: "person" },
  { id: "crowley", label: "Aleister Crowley", kind: "person" },
  { id: "regardie", label: "Israel Regardie", kind: "person" },
  { id: "waite", label: "Arthur Edward Waite", kind: "person" },
  { id: "case", label: "Paul Foster Case", kind: "person" },
  { id: "laycock", label: "Donald Laycock", kind: "person" },
  { id: "peterson", label: "Joseph H. Peterson", kind: "person" },
  { id: "harkness", label: "Deborah Harkness", kind: "person" },
  { id: "enochian-system", label: "Enochian System", kind: "system" },
  { id: "heptarchia", label: "Heptarchia Mystica", kind: "system" },
  { id: "seven-kings", label: "Seven Kings", kind: "system" },
  { id: "seven-princes", label: "Seven Princes", kind: "system" },
  { id: "great-table", label: "Great Table", kind: "system" },
  { id: "watchtower-tablets", label: "Watchtower Tablets", kind: "artifact" },
  { id: "nineteen-calls", label: "19 Angelic Calls", kind: "text" },
  { id: "thirty-aethyrs", label: "30 Aethyrs", kind: "system" },
  { id: "liber-loagaeth", label: "Liber Loagaeth", kind: "text" },
  { id: "book-of-enoch", label: "Book of Enoch", kind: "text" },
  { id: "sloane-3188", label: "Sloane MS 3188", kind: "artifact" },
  { id: "sloane-3191", label: "Sloane MS 3191", kind: "artifact" },
  { id: "cotton-xlv", label: "Cotton Appendix XLVI", kind: "artifact" },
  { id: "sigillum-dei", label: "Sigillum Dei Aemeth", kind: "artifact" },
  { id: "holy-table", label: "Holy Table", kind: "artifact" },
  { id: "true-faithful-relation", label: "A True & Faithful Relation", kind: "text" },
  { id: "golden-dawn", label: "Hermetic Order of the Golden Dawn", kind: "organization" },
  { id: "oto", label: "Ordo Templi Orientis", kind: "organization" },
  { id: "vision-and-voice", label: "The Vision and the Voice", kind: "text" }
];

export const RELATIONSHIP_WEB_EDGES: RelationshipWebEdge[] = [
  { id: "e-dee-kelley", fromNodeId: "dee", toNodeId: "kelley", label: "Recorded by" },
  { id: "e-kelley-scry", fromNodeId: "kelley", toNodeId: "sloane-3188", label: "Scried for" },
  { id: "e-dee-sloane3188", fromNodeId: "dee", toNodeId: "sloane-3188", label: "Recorded by" },
  { id: "e-dee-jane", fromNodeId: "dee", toNodeId: "jane-dee", label: "Associated with" },
  { id: "e-dee-elizabeth", fromNodeId: "dee", toNodeId: "elizabeth-i", label: "Patronized" },
  { id: "e-walsingham-dee", fromNodeId: "walsingham", toNodeId: "dee", label: "Associated with" },
  { id: "e-saul-dee", fromNodeId: "barnabas-saul", toNodeId: "dee", label: "Scried for" },
  { id: "e-laski-dee", fromNodeId: "laski", toNodeId: "dee", label: "Patronized" },
  { id: "e-rozmberk-dee", fromNodeId: "rozmberk", toNodeId: "dee", label: "Patronized" },
  { id: "e-rudolf-kelley", fromNodeId: "rudolf-ii", toNodeId: "kelley", label: "Patronized" },
  { id: "e-dee-enochian", fromNodeId: "dee", toNodeId: "enochian-system", label: "Recorded by" },
  { id: "e-kelley-enochian", fromNodeId: "kelley", toNodeId: "enochian-system", label: "Transmitted" },
  { id: "e-enochian-heptarchia", fromNodeId: "enochian-system", toNodeId: "heptarchia", label: "Derived from" },
  { id: "e-heptarchia-kings", fromNodeId: "heptarchia", toNodeId: "seven-kings", label: "Associated with" },
  { id: "e-kings-princes", fromNodeId: "seven-kings", toNodeId: "seven-princes", label: "Associated with" },
  { id: "e-heptarchia-sigillum", fromNodeId: "heptarchia", toNodeId: "sigillum-dei", label: "Associated with" },
  { id: "e-heptarchia-holy", fromNodeId: "heptarchia", toNodeId: "holy-table", label: "Associated with" },
  { id: "e-enochian-loagaeth", fromNodeId: "enochian-system", toNodeId: "liber-loagaeth", label: "Derived from" },
  { id: "e-loagaeth-3189", fromNodeId: "liber-loagaeth", toNodeId: "sloane-3189", label: "Appears in" },
  { id: "e-enochian-calls", fromNodeId: "enochian-system", toNodeId: "nineteen-calls", label: "Derived from" },
  { id: "e-calls-cotton", fromNodeId: "nineteen-calls", toNodeId: "cotton-xlv", label: "Appears in" },
  { id: "e-enochian-watchtowers", fromNodeId: "enochian-system", toNodeId: "watchtower-tablets", label: "Derived from" },
  { id: "e-watchtowers-great", fromNodeId: "watchtower-tablets", toNodeId: "great-table", label: "Associated with" },
  { id: "e-watchtowers-3191", fromNodeId: "watchtower-tablets", toNodeId: "sloane-3191", label: "Appears in" },
  { id: "e-enochian-aethyrs", fromNodeId: "enochian-system", toNodeId: "thirty-aethyrs", label: "Derived from" },
  { id: "e-enochian-enoch", fromNodeId: "enochian-system", toNodeId: "book-of-enoch", label: "Associated in later synthesis" },
  { id: "e-sloane3188-casaubon", fromNodeId: "sloane-3188", toNodeId: "casaubon", label: "Published" },
  { id: "e-casaubon-tfr", fromNodeId: "casaubon", toNodeId: "true-faithful-relation", label: "Published" },
  { id: "e-tfr-gd", fromNodeId: "true-faithful-relation", toNodeId: "golden-dawn", label: "Studied under" },
  { id: "e-great-table-gd", fromNodeId: "great-table", toNodeId: "golden-dawn", label: "Reorganized by" },
  { id: "e-gd-mathers", fromNodeId: "golden-dawn", toNodeId: "mathers", label: "Associated with" },
  { id: "e-gd-westcott", fromNodeId: "golden-dawn", toNodeId: "westcott", label: "Associated with" },
  { id: "e-mathers-enochian", fromNodeId: "mathers", toNodeId: "enochian-system", label: "Reorganized by" },
  { id: "e-gd-crowley", fromNodeId: "golden-dawn", toNodeId: "crowley", label: "Studied under" },
  { id: "e-crowley-oto", fromNodeId: "crowley", toNodeId: "oto", label: "Associated with" },
  { id: "e-crowley-vav", fromNodeId: "crowley", toNodeId: "vision-and-voice", label: "Published" },
  { id: "e-vav-aethyrs", fromNodeId: "vision-and-voice", toNodeId: "thirty-aethyrs", label: "Expanded by" },
  { id: "e-crowley-regardie", fromNodeId: "crowley", toNodeId: "regardie", label: "Associated with" },
  { id: "e-regardie-gd", fromNodeId: "regardie", toNodeId: "golden-dawn", label: "Published" },
  { id: "e-waite-occult", fromNodeId: "waite", toNodeId: "golden-dawn", label: "Associated with" },
  { id: "e-case-occult", fromNodeId: "case", toNodeId: "golden-dawn", label: "Studied under" },
  { id: "e-laycock-enochian", fromNodeId: "laycock", toNodeId: "enochian-system", label: "Associated with" },
  { id: "e-peterson-sloane3188", fromNodeId: "peterson", toNodeId: "sloane-3188", label: "Published" },
  { id: "e-harkness-dee", fromNodeId: "harkness", toNodeId: "dee", label: "Associated with" }
];

export function getRelationshipWebNodeById(id: string): RelationshipWebNode | undefined {
  return RELATIONSHIP_WEB_NODES.find((n) => n.id === id);
}

export function getRelationshipWebSlice(nodeIds: string[]): {
  nodes: RelationshipWebNode[];
  edges: RelationshipWebEdge[];
} {
  const idSet = new Set(nodeIds);
  const nodes = nodeIds
    .map((id) => getRelationshipWebNodeById(id))
    .filter((n): n is RelationshipWebNode => Boolean(n));
  const edges = RELATIONSHIP_WEB_EDGES.filter((e) => idSet.has(e.fromNodeId) && idSet.has(e.toNodeId));
  return { nodes, edges };
}
