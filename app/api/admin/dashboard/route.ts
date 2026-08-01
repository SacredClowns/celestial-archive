import { NextResponse } from "next/server";
import { gatherAdminDashboard } from "@/lib/admin/gather-admin-dashboard";
import { requireAdminSession } from "@/lib/admin/require-admin";
import { adminServiceRoleConfigured } from "@/lib/supabase/admin-server";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  const snapshot = await gatherAdminDashboard();
  return NextResponse.json({
    ...snapshot,
    viewer: auth.admin,
    serviceRoleConfigured: adminServiceRoleConfigured()
  });
}
