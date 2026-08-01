import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/require-admin";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const admin = createAdminSupabaseClient();
  if (!admin) return NextResponse.json({ pieces: [] }, { status: 503 });

  const { data, error } = await admin
    .from("celestial_content_pieces")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pieces: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const admin = createAdminSupabaseClient();
  if (!admin) return NextResponse.json({ error: "Service role not configured" }, { status: 503 });

  const body = (await request.json()) as {
    title: string;
    body: string;
    channel?: string;
    status?: string;
    formulaId?: string;
  };

  if (!body.title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const { data, error } = await admin
    .from("celestial_content_pieces")
    .insert({
      title: body.title.trim(),
      body: body.body ?? "",
      channel: body.channel ?? "generic",
      status: body.status ?? "draft",
      formula_id: body.formulaId ?? null
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ piece: data });
}
