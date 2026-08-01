export type CrmStage =
  | "lead"
  | "newsletter"
  | "seeker"
  | "student"
  | "enrolled"
  | "alumni"
  | "churned";

export type CrmContact = {
  id: string;
  userId: string | null;
  email: string;
  displayName: string | null;
  stage: CrmStage;
  source: string | null;
  tags: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  source: string | null;
  tags: string[];
  subscribedAt: string;
};

export type CourseEnrollment = {
  id: string;
  contactId: string | null;
  userId: string | null;
  email: string;
  product: string;
  status: "active" | "paused" | "revoked";
  accessTier: string;
  enrolledAt: string;
};

export type AgentJob = {
  id: string;
  agentId: string;
  jobType: string;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  payload: Record<string, unknown>;
  result: Record<string, unknown> | null;
  scheduledFor: string | null;
  createdAt: string;
};

export type ContentPiece = {
  id: string;
  title: string;
  body: string;
  channel: string;
  status: "draft" | "scheduled" | "published" | "archived";
  createdAt: string;
};

export type AdminDashboardSnapshot = {
  generatedAt: string;
  counts: {
    contacts: number;
    newsletterActive: number;
    courseActive: number;
    eventsLast7d: number;
    agentQueued: number;
    contentDrafts: number;
    registeredUsers: number;
  };
  funnel: {
    leads: number;
    newsletter: number;
    enrolled: number;
    activeStudents: number;
  };
  recentEvents: Array<{ name: string; count: number }>;
  agents: Array<{ id: string; label: string; configured: boolean }>;
};
