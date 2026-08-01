/**
 * Relationship Web — data layer only (no graph canvas).
 * Edge labels are a closed set: transmission / association language, not causality or truth claims.
 */

export const RELATIONSHIP_WEB_EDGE_LABELS = [
  "Derived from",
  "Reorganized by",
  "Reorganized in published work",
  "Expanded by",
  "Later elaboration",
  "Associated with",
  "Associated in later synthesis",
  "Appears in",
  "Published",
  "Scried for",
  "Patronized",
  "Studied under",
  "Transmitted",
  "Recorded by",
  "Commissioned"
] as const;

export type RelationshipWebNodeKind =
  | "person"
  | "artifact"
  | "text"
  | "organization"
  | "system";

export type RelationshipWebEdgeLabel = (typeof RELATIONSHIP_WEB_EDGE_LABELS)[number];

export type RelationshipWebNode = {
  id: string;
  /** Display name for lists and future diagrams */
  label: string;
  kind?: RelationshipWebNodeKind;
};

export type RelationshipWebEdge = {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  label: RelationshipWebEdgeLabel;
};

export function isRelationshipWebEdgeLabel(s: string): s is RelationshipWebEdgeLabel {
  return (RELATIONSHIP_WEB_EDGE_LABELS as readonly string[]).includes(s);
}
