import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/require-admin";
import type { CourseEnrollment } from "@/lib/admin/crm-types";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";

function rowToEnrollment(row: Record<string, unknown>): CourseEnrollment {
  return {
    id: row.id as string,
    contactId: (row.contact_id as string) ?? null,
    userId: (row.user_id as string) ?? null,
    email: row.email as string,
    product: row.product as string,
    status: row.status as CourseEnrollment["status"],
    accessTier: row.access_tier as string,
    enrolledAt: row.enrolled_at as string
  };
}

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const admin = createAdminSupabaseClient();
  if (!admin) return NextResponse.json({ enrollments: [] }, { status: 503 });

  const { data, error } = await admin
    .from("celestial_course_enrollments")
    .select("*")
    .order("enrolled_at", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ enrollments: (data ?? []).map(rowToEnrollment) });
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const admin = createAdminSupabaseClient();
  if (!admin) return NextResponse.json({ error: "Service role not configured" }, { status: 503 });

  const body = (await request.json()) as {
    email: string;
    product?: string;
    accessTier?: string;
    userId?: string;
  };
  const email = body.email?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const { data: contact } = await admin
    .from("celestial_crm_contacts")
    .upsert(
      {
        email,
        stage: "enrolled",
        source: "course",
        updated_at: new Date().toISOString()
      },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  const { data, error } = await admin
    .from("celestial_course_enrollments")
    .insert({
      email,
      contact_id: contact?.id ?? null,
      user_id: body.userId ?? null,
      product: body.product ?? "celestial-archive-course",
      status: "active",
      access_tier: body.accessTier ?? "full",
      enrolled_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ enrollment: rowToEnrollment(data) });
}
