/**
 * Supabase client — uses plain @supabase/supabase-js everywhere.
 * No SSR package needed. Works in browser, API routes, and server components.
 */
import { createClient as _create } from '@supabase/supabase-js'

const URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? ''
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Singleton browser client
let _browser: ReturnType<typeof _create> | null = null

export function createClient() {
  if (typeof window !== 'undefined') {
    // Browser — reuse singleton
    if (!_browser) {
      _browser = _create(URL, ANON, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storageKey: 'autoflow-auth',
        },
      })
    }
    return _browser
  }
  // Server — new instance per call (no cookies needed for our use case)
  return _create(URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

// Aliases used across the codebase
export const getSupabaseBrowserClient = createClient
export function getSupabaseServerClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ANON
  return _create(URL, key, { auth: { persistSession: false, autoRefreshToken: false } })
}
