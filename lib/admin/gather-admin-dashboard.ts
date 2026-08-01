import { ADMIN_AGENTS, isAgentConfigured } from "@/lib/admin/agents-registry";
import type { AdminDashboardSnapshot } from "@/lib/admin/crm-types";
import {
  createAdminCelestialClient,
  createAdminSupabaseClient,
  adminServiceRoleConfigured
} from "@/lib/supabase/admin-server";

export async function gatherAdminDashboard(): Promise<AdminDashboardSnapshot> {
  const generatedAt = new Date().toISOString();
  const empty: AdminDashboardSnapshot = {
    generatedAt,
    counts: {
      contacts: 0,
      newsletterActive: 0,
      courseActive: 0,
      eventsLast7d: 0,
      agentQueued: 0,
      contentDrafts: 0,
      registeredUsers: 0
    },
    funnel: { leads: 0, newsletter: 0, enrolled: 0, activeStudents: 0 },
    recentEvents: [],
    agents: ADMIN_AGENTS.map((a) => ({
      id: a.id,
      label: a.name,
      configured: isAgentConfigured(a)
    }))
  };

  const admin = createAdminSupabaseClient();
  const celestial = createAdminCelestialClient();
  if (!admin || !celestial || !adminServiceRoleConfigured()) {
    return empty;
  }

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    contactsRes,
    newsletterRes,
    courseRes,
    eventsRes,
    jobsRes,
    contentRes,
    profilesRes
  ] = await Promise.all([
    admin.from("celestial_crm_contacts").select("id, stage", { count: "exact", head: false }),
    admin
      .from("celestial_newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
    admin
      .from("celestial_course_enrollments")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
    admin
      .from("celestial_marketing_events")
      .select("event_name")
      .gte("created_at", weekAgo),
    admin
      .from("celestial_agent_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "queued"),
    admin
      .from("celestial_content_pieces")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    celestial.from("celestial_profiles").select("user_id", { count: "exact", head: true })
  ]);

  const contacts = contactsRes.data ?? [];
  const stages = contacts.map((c) => c.stage as string);

  const eventCounts = new Map<string, number>();
  for (const e of eventsRes.data ?? []) {
    const name = e.event_name as string;
    eventCounts.set(name, (eventCounts.get(name) ?? 0) + 1);
  }
  const recentEvents = [...eventCounts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  return {
    generatedAt,
    counts: {
      contacts: contactsRes.count ?? contacts.length,
      newsletterActive: newsletterRes.count ?? 0,
      courseActive: courseRes.count ?? 0,
      eventsLast7d: eventsRes.data?.length ?? 0,
      agentQueued: jobsRes.count ?? 0,
      contentDrafts: contentRes.count ?? 0,
      registeredUsers: profilesRes.count ?? 0
    },
    funnel: {
      leads: stages.filter((s) => s === "lead").length,
      newsletter: stages.filter((s) => s === "newsletter").length,
      enrolled: stages.filter((s) => s === "enrolled").length,
      activeStudents: stages.filter((s) => s === "student" || s === "seeker").length
    },
    recentEvents,
    agents: ADMIN_AGENTS.map((a) => ({
      id: a.id,
      label: a.name,
      configured: isAgentConfigured(a)
    }))
  };
}
