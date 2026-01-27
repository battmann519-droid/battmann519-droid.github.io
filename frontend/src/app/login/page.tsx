"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../../lib/api'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login(username, password)
      router.push('/my-team')
    } catch (err: any) {
      setError(err?.message || 'Login failed')
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <label className="block text-sm">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <button className="bg-slate-800 text-white px-4 py-2 rounded">Login</button>
        </div>
      </form>
    </div>
  )
}
