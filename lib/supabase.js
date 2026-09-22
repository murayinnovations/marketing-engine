import { createClient } from "@supabase/supabase-js";

// For server-side (API routes)
export function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}

// For client-side (pass these via a config endpoint or embed in HTML)
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
