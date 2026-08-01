import { isAdminEmail } from "@/lib/instrumentarium/admin-access";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type AdminSession = {
  userId: string;
  email: string;
};

export async function requireAdminSession(): Promise<
  { ok: true; admin: AdminSession } | { ok: false; status: number; message: string }
> {
  if (!isSupabaseConfigured()) {
    return { ok: false, status: 503, message: "Supabase not configured" };
  }
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user?.email) {
      return { ok: false, status: 401, message: "Sign in required" };
    }
    if (!isAdminEmail(user.email)) {
      return { ok: false, status: 403, message: "Keeper access only" };
    }
    return { ok: true, admin: { userId: user.id, email: user.email } };
  } catch {
    return { ok: false, status: 401, message: "Unauthorized" };
  }
}
