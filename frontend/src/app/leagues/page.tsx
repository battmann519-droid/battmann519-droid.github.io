"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getLeagues, createLeague, joinLeague } from '../../lib/api'
import AuthGuard from '../../components/AuthGuard'

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getLeagues()
      .then((data) => setLeagues(data))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await createLeague({ name, is_public: isPublic })
      setLeagues((l) => [res, ...l])
      setName('')
    } catch (err: any) {
      setError(err?.message || 'Failed to create')
    }
  }

  const router = useRouter()

  const handleJoin = async (id: number) => {
    try {
      const res = await joinLeague(id)
      if (res && res.created) {
        router.push('/my-team')
      } else {
        // already has a team - still navigate to my-team
        router.push('/my-team')
      }
    } catch (err: any) {
      alert('Failed to join: ' + String(err))
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Leagues</h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold">Create League</h2>
          <AuthGuard>
            <form onSubmit={handleCreate} className="mt-3 space-y-3">
              {error && <div className="text-red-600">{error}</div>}
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="League name" className="w-full border rounded px-3 py-2" />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} /> Public
              </label>
              <button className="bg-slate-800 text-white px-4 py-2 rounded">Create</button>
            </form>
          </AuthGuard>
        </div>

        <div>
          <h2 className="font-semibold">Available Leagues</h2>
          {loading && <p className="mt-2">Loading...</p>}
          {!loading && (
            <ul className="mt-3 space-y-2">
              {leagues.map((l) => (
                <li key={l.id} className="border rounded p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{l.name}</div>
                    <div className="text-sm text-slate-500">Owner: {l.owner}</div>
                  </div>
                  <div>
                    <button onClick={() => handleJoin(l.id)} className="px-3 py-1 border rounded">Join</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
