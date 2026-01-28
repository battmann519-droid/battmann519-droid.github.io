import '../styles/globals.css'
import React from 'react'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Fantasy MMA',
  description: 'Fantasy MMA platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
