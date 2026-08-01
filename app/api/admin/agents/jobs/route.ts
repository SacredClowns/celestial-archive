import { NextResponse } from "next/server";
import { ADMIN_AGENTS, getAgentWebhook } from "@/lib/admin/agents-registry";
import { requireAdminSession } from "@/lib/admin/require-admin";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const admin = createAdminSupabaseClient();
  if (!admin) return NextResponse.json({ jobs: [], agents: ADMIN_AGENTS }, { status: 503 });

  const { data, error } = await admin
    .from("celestial_agent_jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ jobs: data ?? [], agents: ADMIN_AGENTS });
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const admin = createAdminSupabaseClient();
  if (!admin) return NextResponse.json({ error: "Service role not configured" }, { status: 503 });

  const body = (await request.json()) as {
    agentId: string;
    jobType: string;
    payload?: Record<string, unknown>;
    scheduledFor?: string;
  };

  const agent = ADMIN_AGENTS.find((a) => a.id === body.agentId);
  if (!agent) return NextResponse.json({ error: "Unknown agent" }, { status: 400 });
  if (!agent.jobTypes.includes(body.jobType)) {
    return NextResponse.json({ error: "Invalid job type for agent" }, { status: 400 });
  }

  const { data: job, error } = await admin
    .from("celestial_agent_jobs")
    .insert({
      agent_id: body.agentId,
      job_type: body.jobType,
      status: "queued",
      payload: body.payload ?? {},
      scheduled_for: body.scheduledFor ?? null,
      created_by: auth.admin.userId
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const webhook = getAgentWebhook(body.agentId);
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          agentId: body.agentId,
          jobType: body.jobType,
          payload: body.payload ?? {}
        })
      });
      await admin
        .from("celestial_agent_jobs")
        .update({ status: "running", started_at: new Date().toISOString() })
        .eq("id", job.id);
    } catch (e) {
      await admin
        .from("celestial_agent_jobs")
        .update({
          status: "failed",
          result: { error: String(e) },
          completed_at: new Date().toISOString()
        })
        .eq("id", job.id);
    }
  }

  return NextResponse.json({ job });
}
