import React from 'react'

type Fighter = {
  id: number
  name: string
}

type Team = {
  id: number
  user: string
  league: number | { id: number; name?: string }
  fighters: Fighter[]
}

export default function TeamCard({ team }: { team: Team }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Team #{team.id}</h3>
          <p className="text-sm text-slate-500">Owner: {typeof team.user === 'string' ? team.user : team.user.username}</p>
        </div>
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-medium">Fighters</h4>
        <ul className="mt-2 space-y-1">
          {team.fighters && team.fighters.length ? (
            team.fighters.map((f) => (
              <li key={f.id} className="text-sm">{f.name}</li>
            ))
          ) : (
            <li className="text-sm text-slate-500">No fighters selected</li>
          )}
        </ul>
      </div>
    </div>
  )
}
