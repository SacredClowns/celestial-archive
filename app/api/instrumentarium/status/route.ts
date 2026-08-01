import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/instrumentarium/admin-access";
import { gatherInstrumentariumStatus } from "@/lib/instrumentarium/gather-status";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!isAdminEmail(user?.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const status = await gatherInstrumentariumStatus();
    return NextResponse.json({
      ...status,
      viewer: { email: user?.email ?? null, id: user?.id ?? null }
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
