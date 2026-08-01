import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/require-admin";
import type { CrmContact, CrmStage } from "@/lib/admin/crm-types";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";

function rowToContact(row: Record<string, unknown>): CrmContact {
  return {
    id: row.id as string,
    userId: (row.user_id as string) ?? null,
    email: row.email as string,
    displayName: (row.display_name as string) ?? null,
    stage: row.stage as CrmStage,
    source: (row.source as string) ?? null,
    tags: (row.tags as string[]) ?? [],
    notes: (row.notes as string) ?? "",
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string
  };
}

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const admin = createAdminSupabaseClient();
  if (!admin) {
    return NextResponse.json({ error: "Service role not configured", contacts: [] }, { status: 503 });
  }

  const { data, error } = await admin
    .from("celestial_crm_contacts")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ contacts: (data ?? []).map(rowToContact) });
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const admin = createAdminSupabaseClient();
  if (!admin) return NextResponse.json({ error: "Service role not configured" }, { status: 503 });

  const body = (await request.json()) as {
    email: string;
    displayName?: string;
    stage?: CrmStage;
    source?: string;
    notes?: string;
    tags?: string[];
  };

  const email = body.email?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const { data, error } = await admin
    .from("celestial_crm_contacts")
    .upsert(
      {
        email,
        display_name: body.displayName ?? null,
        stage: body.stage ?? "lead",
        source: body.source ?? "admin",
        notes: body.notes ?? "",
        tags: body.tags ?? [],
        updated_at: new Date().toISOString()
      },
      { onConflict: "email" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ contact: rowToContact(data) });
}
