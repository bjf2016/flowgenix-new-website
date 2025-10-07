import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getSecret } from "@/lib/secrets";

export async function createSupabaseAdmin() {
  const url = (await getSecret("SUPABASE_PROJECT_URL")) || process.env.SUPABASE_PROJECT_URL;
  const key = (await getSecret("SUPABASE_SERVICE_ROLE_KEY")) || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_PROJECT_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
    global: { headers: { "x-client-info": "flowgenix-next-admin" } },
  });
}
