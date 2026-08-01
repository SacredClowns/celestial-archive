import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  CELESTIAL_DB_SCHEMA,
  celestialDbOptions
} from "@/lib/supabase/celestial-schema";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function adminServiceKey(): string | null {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.CELESTIAL_SERVICE_ROLE_KEY ??
    null
  );
}

/** Service-role client — `public` schema (CRM, newsletter, Hermes memory). */
export function createAdminSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  const key = adminServiceKey();
  if (!key) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

/** Service-role client — `enochia` schema (profiles, journal, progress). */
export function createAdminCelestialClient(): SupabaseClient<any, any, any> | null {
  if (!isSupabaseConfigured()) return null;
  const key = adminServiceKey();
  if (!key) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    ...celestialDbOptions
  });
}

export { CELESTIAL_DB_SCHEMA };

export function adminServiceRoleConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.CELESTIAL_SERVICE_ROLE_KEY
  );
}
