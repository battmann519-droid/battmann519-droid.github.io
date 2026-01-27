"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getTeam } from '../../lib/api'
import TeamCard from '../../components/TeamCard'
import AuthGuard from '../../components/AuthGuard'

type Fighter = { id: number; name: string }
type Team = { id: number; user: string; league: any; fighters: Fighter[] }

function MyTeamContent() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [availableFighters, setAvailableFighters] = useState<any[]>([])
  const [selectedFighters, setSelectedFighters] = useState<number[]>([])
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [leagues, setLeagues] = useState<any[]>([])
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null)

  const router = useRouter()

  // fighters for selection when creating a team
  useEffect(() => {
    let mounted = true
    import('../../lib/api').then(({ getFighters }) =>
      getFighters({ page: 1, page_size: 200 }).then((data) => {
        if (!mounted) return
        // if paginated
        const list = data.results ? data.results : data
        setAvailableFighters(list || [])
      }).catch(() => {})
    )
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    // fetch leagues for team creation
    import('../../lib/api').then(({ getLeagues }) => getLeagues().then((d) => setLeagues(d)).catch(() => {}))
  }, [])

  useEffect(() => {
    let mounted = true
    getTeam()
      .then((data) => {
        if (mounted) setTeams(data)
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">My Team</h1>

                <div className="mt-2">
                  <label className="block text-sm font-medium">Select fighters (max {process.env.NEXT_PUBLIC_TEAM_MAX_ROSTER || 5})</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-64 overflow-y-auto border rounded p-2">
                    {availableFighters.map((f) => (
                      <label key={f.id} className="flex items-center gap-2 p-1 border rounded">
                        <input
                          type="checkbox"
                          checked={selectedFighters.includes(f.id)}
                          onChange={() => {
                            const max = Number(process.env.NEXT_PUBLIC_TEAM_MAX_ROSTER || 5)
                            if (!selectedFighters.includes(f.id)) {
                              if (selectedFighters.length >= max) {
                                setToast({ message: `Max roster size is ${max}`, type: 'error' })
                                return
                              }
                              setSelectedFighters((s) => [...s, f.id])
                            } else {
                              setSelectedFighters((s) => s.filter((id) => id !== f.id))
                            }
                          }}
                        />
                        <div className="text-sm">{f.name}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-sm text-slate-600 mb-2">Selected: {selectedFighters.length} / {process.env.NEXT_PUBLIC_TEAM_MAX_ROSTER || 5}</div>
                  <button
                    onClick={async () => {
                      if (!selectedLeague) return setToast({ message: 'Select a league', type: 'error' })
                      const { createTeam, getTeam } = await import('../../lib/api')
                      try {
                        await createTeam(selectedLeague, selectedFighters)
                        const updated = await getTeam()
                        setTeams(updated)
                        setToast({ message: 'Team created', type: 'success' })
                        setSelectedFighters([])
                      } catch (err: any) {
                        setToast({ message: String(err), type: 'error' })
                      }
                    }}
                    className="mt-2 bg-slate-800 text-white px-4 py-2 rounded"
                    disabled={
                      !selectedLeague || selectedFighters.length === 0 || selectedFighters.length > Number(process.env.NEXT_PUBLIC_TEAM_MAX_ROSTER || 5)
                    }
                  >
                    Create Team
                  </button>
                </div>
              </div>
      {loading && <p className="mt-4">Loading teams...</p>}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
      {toast && (
        // dynamic import to avoid SSR issues with client-only components
        // but Toast is client component so can be rendered directly
        (() => {
          const Toast = require('../../components/Toast').default
          return <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        })()
      )}
        {teams.length ? (
          teams.map((t) => <TeamCard key={t.id} team={t} />)
        ) : (
          <div>
            <p className="text-slate-500">No teams found. Create or join a league to make a team.</p>
            <div className="mt-4">
              <label className="block text-sm">Create team for league</label>
              <select className="w-full border rounded px-3 py-2 mt-2" value={selectedLeague ?? ''} onChange={(e) => setSelectedLeague(Number(e.target.value))}>
                <option value="">Select a league</option>
                {leagues.map((l) => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
              <div className="mt-2">
                <button onClick={async () => {
                  if (!selectedLeague) return alert('Select a league')
                  const { createTeam, getTeam } = await import('../../lib/api')
                  try {
                    await createTeam(selectedLeague)
                    // refresh teams list
                    const updated = await getTeam()
                    setTeams(updated)
                    alert('Team created')
                  } catch (err: any) {
                    alert('Failed to create team: ' + String(err))
                  }
                }} className="mt-2 bg-slate-800 text-white px-4 py-2 rounded">Create Team</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MyTeam() {
  return (
    <AuthGuard>
      <MyTeamContent />
    </AuthGuard>
  )
}
