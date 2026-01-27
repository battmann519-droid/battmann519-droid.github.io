"use client"

import React, { useEffect, useState } from 'react'
import FighterCard from '../../components/FighterCard'
import { getFighters } from '../../lib/api'

type Fighter = {
  id: number
  name: string
  weight_class?: string
  reach?: number
  stance?: string
  record?: string
  image_url?: string
}

export default function Fighters() {
  const [fighters, setFighters] = useState<Fighter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getFighters({ page, search })
      .then((data) => {
        if (!mounted) return
        // DRF paginated response
        if (data.results) {
          setFighters(data.results)
          setCount(data.count || 0)
        } else {
          setFighters(data)
          setCount(Array.isArray(data) ? data.length : 0)
        }
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [page, search])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Fighters</h1>

      <div className="mt-4 flex items-center gap-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search fighters..." className="border rounded px-3 py-2" />
        <div className="text-sm text-slate-500">Total: {count}</div>
      </div>

      {loading && <p className="mt-4">Loading fighters...</p>}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {fighters.map((f) => (
          <FighterCard key={f.id} fighter={f} />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
        <div className="text-sm">Page {page}</div>
        <button disabled={fighters.length === 0} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  )
}
