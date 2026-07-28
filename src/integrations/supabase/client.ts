import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Publishable (anon) credentials — safe in client code, protected by RLS.
const FALLBACK_URL = "https://aegipnrlklsdzjpirsgt.supabase.co";
const FALLBACK_ANON_KEY = "sb_publishable__k-NqcLEdC_0wSDBSoy_-A_qHOhahV5";

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || FALLBACK_URL;
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || FALLBACK_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;
