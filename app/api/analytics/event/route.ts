import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const body = (await request.json()) as {
    eventName: string;
    properties?: Record<string, unknown>;
    sessionId?: string;
  };

  if (!body.eventName?.trim()) {
    return NextResponse.json({ error: "eventName required" }, { status: 400 });
  }

  let userId: string | null = null;
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    /* anonymous event */
  }

  const admin = createAdminSupabaseClient();
  if (admin) {
    await admin.from("celestial_marketing_events").insert({
      event_name: body.eventName.trim(),
      user_id: userId,
      session_id: body.sessionId ?? null,
      properties: body.properties ?? {}
    });
  }

  return NextResponse.json({ ok: true });
}
