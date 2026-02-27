'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Download, RefreshCw } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Application } from './types'
// import Badge from './Badge'
import DetailModal from './detailModal'
// import DeleteConfirmModal from './deleteConfirmModal'
import ApplicationsTable from './applicationsTable'
import DeleteConfirmModal from './deleteConfirmationModal'

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState<Application | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchApps = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filterStatus !== 'all') params.set('status', filterStatus)
    if (search) params.set('search', search)
    try {
      const res = await fetch(`/api/admin/applications?${params.toString()}`)
      const text = await res.text()
      let data
      try { data = JSON.parse(text) } catch {
        toast.error('Server returned invalid response')
        setLoading(false)
        return
      }
      if (!res.ok) { toast.error(data.error || 'Failed to fetch applications'); setLoading(false); return }
      setApps(data.applications || [])
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [filterStatus, search])

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteTarget.id }),
      })
      if (!res.ok) { const data = await res.json(); toast.error(data.error || 'Failed to delete'); return }
      toast.success(`${deleteTarget.student_name}'s application deleted`)
      setDeleteTarget(null)
      fetchApps()
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(fetchApps, 300)
    return () => clearTimeout(timer)
  }, [fetchApps])

  const counts = {
    all:      apps.length,
    pending:  apps.filter(a => a.status === 'pending').length,
    reviewed: apps.filter(a => a.status === 'reviewed').length,
    accepted: apps.filter(a => a.status === 'accepted').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  }

  const handleExport = () => {
    const headers = [
      'Student Name', 'Parent Name', 'Email', 'Phone', 'Age Group',
      'Western Education Level', 'Last School Attended', 'Nationality',
      'Parent/Guardian Contact', 'Next of Kin Contact',
      'Studied Quran Before', 'Previous Quran Level', 'Needs Quran Help',
      'Level of Study Interested', 'Selected Courses', 'Preferred Learning Style',
      'Goals', 'Why Interested', 'Class Time', 'Agreed to Terms',
      'Status', 'Submitted At'
    ]
    const rows = apps.map(a => [
      a.student_name, a.parent_name, a.email, a.phone, a.student_age,
      a.western_education_level || a.grade, a.last_school_attended, a.nationality,
      a.parent_guardian_contact, a.next_of_kin_contact,
      a.studied_quran_before, a.previous_quran_level, a.needs_quran_reading_help,
      a.level_of_study_interested, a.selected_courses, a.preferred_learning_style,
      a.goals, a.why_interested, a.class_time, a.agree_to_terms,
      a.status, new Date(a.submitted_at).toLocaleDateString('en-GB')
    ].map(v => `"${(v || '').toString().replace(/"/g, '""')}"`))

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `applications-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV exported!')
  }

  return (
    <div className="p-7 pb-16 max-w-7xl mx-auto">
      {selected && <DetailModal app={selected} onClose={() => setSelected(null)} onUpdate={fetchApps} />}
      {deleteTarget && (
        <DeleteConfirmModal app={deleteTarget} onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm} deleting={deleting} />
      )}

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">Applications</h1>
          <p className="text-sm text-stone-400 mt-1">Live data — updates instantly when students apply</p>
        </div>
        <button onClick={fetchApps}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-500 hover:bg-stone-50 transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(['all', 'pending', 'reviewed', 'accepted', 'rejected'] as const).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3.5 py-1 rounded-full border text-xs font-semibold capitalize transition-colors
              ${filterStatus === s ? 'bg-green-700 text-white border-green-700' : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'}`}>
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      <div className="flex gap-2.5 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" placeholder="Search by name, parent, or email…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200" />
        </div>
        <button onClick={handleExport}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-500 hover:bg-stone-50 transition-colors">
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <ApplicationsTable
          apps={apps}
          loading={loading}
          search={search}
          filterStatus={filterStatus}
          onView={setSelected}
          onDelete={setDeleteTarget}
        />
        <div className="px-4 py-2.5 border-t border-stone-100 text-xs text-stone-400">
          {apps.length} application{apps.length !== 1 ? 's' : ''} · Live from Supabase
        </div>
      </div>
    </div>
  )
}