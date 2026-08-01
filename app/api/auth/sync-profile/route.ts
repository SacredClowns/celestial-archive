import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ensureCelestialProfile } from "@/lib/supabase/celestial-db";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/** After sign-in: ensure profile + CRM contact exist (service role). */
export async function POST() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ ok: false, reason: "no_user" }, { status: 401 });
  }

  await ensureCelestialProfile(supabase, user.id, user.email);

  const admin = createAdminSupabaseClient();
  if (admin) {
    const email = user.email.toLowerCase();
    await admin.from("celestial_crm_contacts").upsert(
      {
        user_id: user.id,
        email,
        display_name: user.email.split("@")[0],
        stage: "seeker",
        source: "app_sign_in",
        updated_at: new Date().toISOString()
      },
      { onConflict: "email" }
    );

    await admin.from("celestial_marketing_events").insert({
      event_name: "user_sync",
      user_id: user.id,
      properties: { email_domain: email.split("@")[1] ?? "" }
    });
  }

  return NextResponse.json({
    ok: true,
    crmSynced: Boolean(admin),
    userId: user.id
  });
}
