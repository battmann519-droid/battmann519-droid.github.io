"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { logout } from '../lib/api'

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(Boolean(localStorage.getItem('accessToken')))
  }, [])

  return (
    <nav className="bg-white dark:bg-slate-900 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <a className="text-lg font-bold">Fantasy MMA</a>
        </Link>
        <div className="space-x-4">
          <Link href="/fighters"><a className="hover:underline">Fighters</a></Link>
          <Link href="/events"><a className="hover:underline">Events</a></Link>
          <Link href="/leagues"><a className="hover:underline">Leagues</a></Link>
          <Link href="/my-team"><a className="hover:underline">My Team</a></Link>
          <Link href="/standings"><a className="hover:underline">Standings</a></Link>
          {loggedIn ? (
            <button onClick={() => { logout(); setLoggedIn(false); location.href = '/' }} className="ml-2 px-3 py-1 border rounded">Logout</button>
          ) : (
            <>
              <Link href="/login"><a className="hover:underline">Login</a></Link>
              <Link href="/register"><a className="hover:underline">Register</a></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
