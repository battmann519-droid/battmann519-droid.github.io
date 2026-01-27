"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { me } from '../lib/api'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    me()
      .then(() => {
        if (mounted) setChecking(false)
      })
      .catch(() => {
        if (mounted) router.push('/login')
      })
    return () => {
      mounted = false
    }
  }, [router])

  if (checking) return <div className="p-8">Checking authentication...</div>

  return <>{children}</>
}
