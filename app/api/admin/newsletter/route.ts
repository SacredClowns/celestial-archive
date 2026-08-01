import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/require-admin";
import type { NewsletterSubscriber } from "@/lib/admin/crm-types";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";

function rowToSub(row: Record<string, unknown>): NewsletterSubscriber {
  return {
    id: row.id as string,
    email: row.email as string,
    status: row.status as "active" | "unsubscribed",
    source: (row.source as string) ?? null,
    tags: (row.tags as string[]) ?? [],
    subscribedAt: row.subscribed_at as string
  };
}

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const admin = createAdminSupabaseClient();
  if (!admin) return NextResponse.json({ subscribers: [] }, { status: 503 });

  const { data, error } = await admin
    .from("celestial_newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false })
    .limit(500);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ subscribers: (data ?? []).map(rowToSub) });
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const admin = createAdminSupabaseClient();
  if (!admin) return NextResponse.json({ error: "Service role not configured" }, { status: 503 });

  const body = (await request.json()) as { email: string; source?: string; tags?: string[] };
  const email = body.email?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const { data, error } = await admin
    .from("celestial_newsletter_subscribers")
    .upsert(
      {
        email,
        status: "active",
        source: body.source ?? "admin",
        tags: body.tags ?? [],
        subscribed_at: new Date().toISOString(),
        unsubscribed_at: null
      },
      { onConflict: "email" }
    )
    .select()
    .single();

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

  return NextResponse.json({ subscriber: rowToSub(data) });
}
