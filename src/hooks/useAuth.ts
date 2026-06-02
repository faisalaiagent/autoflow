'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import { useAppStore } from '@/store/useAppStore'

export function useAuth() {
  const { user, accessToken, setUser, setAccessToken, logout } = useAppStore()
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setAccessToken(session.access_token)
        // Fetch user from our DB
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        })
        if (res.ok) {
          const { user: dbUser } = await res.json()
          setUser(dbUser)
        }
      } else {
        logout()
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return { user, accessToken, isAuthenticated: !!user }
}

export function useRequireAuth() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.replace('/login')
  }, [user])

  return { user }
}
