'use client'

import { useState, useEffect, useCallback } from 'react'
import { Application } from './types'
import StatCards from './statCards'
import RecentApplications from './recentApplications'

export default function AdminDashboard() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/applications')
      if (!res.ok) throw new Error('Failed to fetch applications')
      const data = await res.json()
      setApps([...(data.applications || [])].sort(
        (a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
      ))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <div className="p-5 sm:p-7 pb-16 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 font-serif">Dashboard</h1>
        <p className="text-sm text-stone-500 mt-2">
          Welcome back —{' '}
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <StatCards apps={apps} loading={loading} />
      <RecentApplications apps={apps} loading={loading} />
    </div>
  )
}