"use client"

import React, { useEffect } from 'react'

type ToastProps = {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose?: () => void
  duration?: number
}

export default function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), duration)
    return () => clearTimeout(t)
  }, [onClose, duration])

  const bg = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-slate-600'

  return (
    <div className={`fixed bottom-6 right-6 ${bg} text-white px-4 py-2 rounded shadow-lg`}>{message}</div>
  )
}
