// Single universal Supabase client for browser use
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Alias for server-side usage in API routes
export function getSupabaseServerClient() {
  const { createClient: createServerClient } = require('@supabase/supabase-js')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseAnonKey
  return createServerClient(supabaseUrl, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// Alias for backwards compatibility
export const getSupabaseBrowserClient = createClient
