import { createBrowserClient } from "@supabase/ssr";
import { celestialDbOptions } from "@/lib/supabase/celestial-schema";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local (same project as Old Gods)."
    );
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    celestialDbOptions
  );
}

/** Safe client for optional Supabase usage (returns null if env missing). */
export function createClientIfConfigured() {
  if (!isSupabaseConfigured()) return null;
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    celestialDbOptions
  );
}
