import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getServiceRoleClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE;

  if (!url || !serviceRole) {
    return null;
  }

  if (!cached) {
    cached = createClient(url, serviceRole, {
      auth: {
        persistSession: false
      },
      global: {
        headers: {
          "X-Client-Info": "dreamsynth-waitlist-edge"
        }
      }
    });
  }

  return cached;
}
