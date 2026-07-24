import "server-only";
import { createAdminClient } from "@supabase/server/core";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Service-role client — bypasses RLS. Use only on the server. */
export function getAdminClient(): SupabaseClient {
  return createAdminClient() as unknown as SupabaseClient;
}
