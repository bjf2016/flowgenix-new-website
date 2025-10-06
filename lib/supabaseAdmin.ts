// lib/supabaseAdmin.ts
import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getRequiredSecret } from "@/lib/secrets";

export async function createSupabaseAdmin() {
  const url = await getRequiredSecret("SUPABASE_PROJECT_URL");
  const key = await getRequiredSecret("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, {
    auth: { persistSession: false },
    global: { headers: { "x-client-info": "flowgenix-next-admin" } },
  });
}
