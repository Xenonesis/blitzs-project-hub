import { createClient } from '@supabase/supabase-js';

// Use environment variables from .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://afgromdzethkscaskofz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_uc-Q0_9szmdqnrMPE0-QGQ_Og9mhzx4';

// Create Supabase client with production-safe configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.39.0'
    }
  },
  db: {
    schema: 'public'
  }
});

// Helper function to check if Supabase is properly initialized
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && 
           supabaseUrl !== 'https://afgromdzethkscaskofz.supabase.co');
};

export default supabase;
