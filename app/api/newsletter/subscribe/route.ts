import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";

/** Public newsletter signup — requires service role on server. */
export async function POST(request: Request) {
  const admin = createAdminSupabaseClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Newsletter not configured on this deployment." },
      { status: 503 }
    );
  }

  const body = (await request.json()) as { email?: string; source?: string };
  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const { error } = await admin.from("celestial_newsletter_subscribers").upsert(
    {
      email,
      status: "active",
      source: body.source ?? "website",
      subscribed_at: new Date().toISOString(),
      unsubscribed_at: null
    },
    { onConflict: "email" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await admin.from("celestial_crm_contacts").upsert(
    {
      email,
      stage: "newsletter",
      source: body.source ?? "newsletter",
      updated_at: new Date().toISOString()
    },
    { onConflict: "email" }
  );

  await admin.from("celestial_marketing_events").insert({
    event_name: "newsletter_subscribe",
    properties: { source: body.source ?? "website", email_domain: email.split("@")[1] }
  });

  return NextResponse.json({ ok: true });
}
