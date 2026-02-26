'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Download, Eye, CheckCircle, XCircle, Clock, RefreshCw, Trash2, AlertTriangle } from 'lucide-react'
import { toast } from 'react-hot-toast'

type Application = {
  id: string
  student_name: string
  parent_name: string
  email: string
  phone: string
  student_age: string
  grade: string
  program: string
  previous_experience: string
  goals: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  admin_notes: string
  submitted_at: string
}

const statusBadge = {
  pending:  { bg: 'bg-yellow-100', color: 'text-yellow-800', icon: <Clock size={11} /> },
  reviewed: { bg: 'bg-blue-100',   color: 'text-blue-800',   icon: <Eye size={11} /> },
  accepted: { bg: 'bg-green-100',  color: 'text-green-900',  icon: <CheckCircle size={11} /> },
  rejected: { bg: 'bg-red-100',    color: 'text-red-900',    icon: <XCircle size={11} /> },
}

function Badge({ status }: { status: Application['status'] }) {
  const s = statusBadge[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${s.bg} ${s.color}`}>
      {s.icon} {status}
    </span>
  )
}

// ── Delete Confirm Popup ──
function DeleteConfirmModal({
  app,
  onCancel,
  onConfirm,
  deleting,
}: {
  app: Application
  onCancel: () => void
  onConfirm: () => void
  deleting: boolean
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-800">Delete Application</h3>
            <p className="text-xs text-stone-400 mt-0.5">This action cannot be undone</p>
          </div>
        </div>

        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          Are you sure you want to delete the application for{" "}
          <span className="font-semibold text-stone-800">{app.student_name}</span>?
          This will permanently remove all their application data.
        </p>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="flex-1 px-4 py-2.5 border border-stone-200 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <Trash2 size={14} />
            {deleting ? 'Deleting…' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Detail Modal ──
function DetailModal({ app, onClose, onUpdate }: {
  app: Application
  onClose: () => void
  onUpdate: () => void
}) {
  const [notes, setNotes] = useState(app.admin_notes || '')
  const [updating, setUpdating] = useState(false)

  const updateStatus = async (status: string) => {
    setUpdating(true)
    await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: app.id, status, admin_notes: notes }),
    })
    setUpdating(false)
    onUpdate()
    onClose()
  }

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-stone-900 font-serif">{app.student_name}</h2>
            <p className="text-xs text-stone-400 mt-1">
              Submitted {new Date(app.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl leading-none">✕</button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              ['Student',         app.student_name],
              ['Parent/Guardian', app.parent_name],
              ['Email',           app.email],
              ['Phone',           app.phone],
              ['Age Group',       app.student_age],
              ['Grade',           app.grade],
              ['Program',         app.program],
            ].map(([l, v]) => v ? (
              <div key={l}>
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{l}</p>
                <p className="text-sm text-stone-800 mt-0.5">{v}</p>
              </div>
            ) : null)}
          </div>

          {app.previous_experience && (
            <div className="bg-stone-50 rounded-lg p-3 mb-2.5">
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">Previous Experience</p>
              <p className="text-sm text-stone-800 leading-relaxed">{app.previous_experience}</p>
            </div>
          )}

          {app.goals && (
            <div className="bg-stone-50 rounded-lg p-3 mb-4">
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">Learning Goals</p>
              <p className="text-sm text-stone-800 leading-relaxed">{app.goals}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">
              Admin Notes
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Add internal notes…"
              className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm outline-none resize-y focus:border-green-500 focus:ring-1 focus:ring-green-200"
            />
          </div>

          <div className="flex gap-2 pt-3 border-t border-stone-100">
            <button
              disabled={updating}
              onClick={() => updateStatus('accepted')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              <CheckCircle size={14} /> Accept
            </button>
            <button
              disabled={updating}
              onClick={() => updateStatus('reviewed')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              <Eye size={14} /> Mark Reviewed
            </button>
            <button
              disabled={updating}
              onClick={() => updateStatus('rejected')}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              <XCircle size={14} /> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──
function ApplicationsPage() {
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
      try {
        data = JSON.parse(text)
      } catch {
        console.error('API returned non-JSON:', text)
        toast.error('Server returned invalid response')
        setLoading(false)
        return
      }
      if (!res.ok) {
        toast.error(data.error || 'Failed to fetch applications')
        setLoading(false)
        return
      }
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
      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || 'Failed to delete application')
        return
      }
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

  return (
    <div className="p-7 pb-16 max-w-7xl mx-auto">

      {/* Modals */}
      {selected && (
        <DetailModal app={selected} onClose={() => setSelected(null)} onUpdate={fetchApps} />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          app={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          deleting={deleting}
        />
      )}

      {/* Page Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">Applications</h1>
          <p className="text-sm text-stone-400 mt-1">Live data — updates instantly when students apply</p>
        </div>
        <button
          onClick={fetchApps}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-500 hover:bg-stone-50 transition-colors"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(['all', 'pending', 'reviewed', 'accepted', 'rejected'] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3.5 py-1 rounded-full border text-xs font-semibold capitalize transition-colors
              ${filterStatus === s
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
              }`}
          >
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      {/* Search + Export */}
      <div className="flex gap-2.5 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name, parent, or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-500 hover:bg-stone-50 transition-colors">
          <Download size={14} /> Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {loading ? (
          <p className="text-center text-stone-400 text-sm py-16">Loading applications…</p>
        ) : apps.length === 0 ? (
          <p className="text-center text-stone-400 text-sm py-16">
            {search || filterStatus !== 'all'
              ? 'No applications match your search.'
              : 'No applications yet. They will appear here when students apply.'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-100 bg-stone-50">
                  {['Student', 'Parent', 'Program', 'Grade', 'Submitted', 'Status', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apps.map(app => (
                  <tr key={app.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-stone-800">{app.student_name}</p>
                      <p className="text-xs text-stone-400">{app.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600">{app.parent_name}</td>
                    <td className="px-4 py-3 text-sm text-stone-600">{app.program || '—'}</td>
                    <td className="px-4 py-3 text-sm text-stone-600">{app.grade || '—'}</td>
                    <td className="px-4 py-3 text-xs text-stone-400 whitespace-nowrap">
                      {new Date(app.submitted_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-4 py-3">
                      <Badge status={app.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {/* View */}
                        <button
                          onClick={() => setSelected(app)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 border border-stone-200 rounded-md text-xs text-stone-500 hover:bg-stone-50 transition-colors"
                        >
                          <Eye size={12} /> View
                        </button>

                        {/* Delete — only for non-accepted */}
                        {app.status !== 'accepted' && (
                          <button
                            onClick={() => setDeleteTarget(app)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-red-200 rounded-md text-xs text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-stone-100 text-xs text-stone-400">
          {apps.length} application{apps.length !== 1 ? 's' : ''} · Live from Supabase
        </div>
      </div>
    </div>
  )
}

export default ApplicationsPage