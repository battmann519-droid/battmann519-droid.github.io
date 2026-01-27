import React from 'react'

type Fighter = {
  id: number
  name: string
  weight_class?: string
  reach?: number
  stance?: string
  record?: string
  image_url?: string
}

export default function FighterCard({ fighter }: { fighter: Fighter }) {
  return (
    <div className="border rounded-lg p-4 flex items-center space-x-4">
      <img src={fighter.image_url || '/placeholder.png'} alt={fighter.name} className="w-16 h-16 rounded" />
      <div>
        <h3 className="font-semibold">{fighter.name}</h3>
        <p className="text-sm text-slate-500">{fighter.weight_class}</p>
        <p className="text-sm text-slate-500">{fighter.record}</p>
      </div>
    </div>
  )
}
