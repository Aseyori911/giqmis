'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, RefreshCw, Download, Eye, Trash2, CheckCircle, XCircle, Clock, BookOpen } from 'lucide-react'
import { toast } from 'react-hot-toast'

type TeacherApp = {
  id: string
  full_name: string
  gender: string
  email: string
  whatsapp: string
  country_city: string
  teaching_mode: string
  subjects: string
  years_experience: string
  qualifications: string
  has_ijazah: string
  ijazah_details: string
  islamic_methodology: string
  scholars_follow: string
  engagement_type: string
  teaching_availability: string
  weekly_availability: string
  taught_females_before: string
  why_teach_here: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  submitted_at: string
  admin_notes?: string
}

// ── Reusable field components (same pattern as student modal) ──

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-stone-100">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  )
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div>
      <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm text-stone-800 mt-0.5">{value}</p>
    </div>
  )
}

function FullWidthField({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="col-span-2 bg-stone-50 rounded-lg p-3 mb-2">
      <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm text-stone-800 leading-relaxed">{value}</p>
    </div>
  )
}

const statusBadge = {
  pending:  { bg: 'bg-yellow-100', color: 'text-yellow-800', icon: <Clock size={11} /> },
  reviewed: { bg: 'bg-blue-100',   color: 'text-blue-800',   icon: <Eye size={11} /> },
  accepted: { bg: 'bg-green-100',  color: 'text-green-900',  icon: <CheckCircle size={11} /> },
  rejected: { bg: 'bg-red-100',    color: 'text-red-900',    icon: <XCircle size={11} /> },
}

function StatusBadge({ status }: { status: TeacherApp['status'] }) {
  const s = statusBadge[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${s.bg} ${s.color}`}>
      {s.icon} {status}
    </span>
  )
}

// ── Detail Modal ──

function DetailModal({ app, onClose, onUpdate }: {
  app: TeacherApp
  onClose: () => void
  onUpdate: () => void
}) {
  const [notes, setNotes] = useState(app.admin_notes || '')
  const [updating, setUpdating] = useState(false)
  const [current, setCurrent] = useState<TeacherApp>(app)

  const updateStatus = async (status: string) => {
    setUpdating(true)
    try {
      const res = await fetch('/api/teacher-apply', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: current.id, status, admin_notes: notes }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Failed to update'); return }
      setCurrent(prev => ({ ...prev, status: status as TeacherApp['status'], admin_notes: notes }))
      toast.success('Status updated')
      onUpdate()
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

  const subjects = current.subjects
    ? current.subjects.split(',').map(s => s.trim()).filter(Boolean)
    : []

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-start sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-stone-900 font-serif">{current.full_name}</h2>
              <StatusBadge status={current.status} />
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Submitted{' '}
              {new Date(current.submitted_at).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl leading-none">✕</button>
        </div>

        <div className="px-6 py-5 space-y-1">

          {/* Basic Info */}
          <Section title="👤 Basic Information">
            <Field label="Full Name" value={current.full_name} />
            <Field label="Gender" value={current.gender} />
            <Field label="Country / City" value={current.country_city} />
            <Field label="Email" value={current.email} />
            <Field label="WhatsApp" value={current.whatsapp} />
          </Section>

          {/* Teaching Info */}
          <Section title="📖 Teaching Information">
            <Field label="Teaching Mode" value={current.teaching_mode} />
            <Field label="Years of Experience" value={current.years_experience} />
            <Field label="Ijazah" value={current.has_ijazah === 'Yes'
              ? `Yes — ${current.ijazah_details || 'details not provided'}`
              : current.has_ijazah} />
          </Section>

          {/* Subjects — tag style like selected courses */}
          <div className="mb-5">
            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-stone-100 flex items-center gap-2">
              <BookOpen size={12} /> Subjects
            </h3>
            {subjects.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {subjects.map((s, i) => (
                  <span key={i}
                    className="px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-400">{current.subjects || 'Not specified'}</p>
            )}
          </div>

          {/* Full width fields */}
          <div className="space-y-2">
            <FullWidthField label="Qualifications" value={current.qualifications} />
            <FullWidthField label="Islamic Methodology" value={current.islamic_methodology} />
            <FullWidthField label="Scholars / Teachers They Benefit From" value={current.scholars_follow} />
          </div>

          {/* Availability */}
          <Section title="📅 Availability & Engagement">
            <Field label="Nature of Engagement" value={current.engagement_type} />
            <Field label="Teaching Availability" value={current.teaching_availability} />
            <Field label="Taught Female Students Before" value={current.taught_females_before} />
          </Section>

          <div className="space-y-2">
            <FullWidthField label="Weekly Availability" value={current.weekly_availability} />
            <FullWidthField label="Why Teach Here" value={current.why_teach_here} />
          </div>

          {/* Admin notes */}
          <div className="pt-2">
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

          {/* Action buttons */}
          <div className="flex gap-2 pt-3 border-t border-stone-100">
            <button disabled={updating} onClick={() => updateStatus('accepted')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50">
              <CheckCircle size={14} />
              {current.status === 'accepted' ? 'Accepted ✓' : 'Accept'}
            </button>
            <button disabled={updating} onClick={() => updateStatus('reviewed')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50">
              <Eye size={14} /> Mark Reviewed
            </button>
            <button disabled={updating} onClick={() => updateStatus('rejected')}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50">
              <XCircle size={14} /> Reject
            </button>
          </div>

          <div className="pt-3">
            <button onClick={onClose}
              className="w-full py-2.5 border border-stone-200 text-stone-500 hover:bg-stone-50 text-sm font-semibold rounded-lg transition-colors">
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Main Page ──

export default function TeacherApplicationsPage() {
  const [apps, setApps] = useState<TeacherApp[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState<TeacherApp | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<TeacherApp | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchApps = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filterStatus !== 'all') params.set('status', filterStatus)
    if (search) params.set('search', search)
    try {
      const res = await fetch(`/api/teacher-apply?${params.toString()}`)
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Failed to fetch'); setLoading(false); return }
      setApps(data.applications || [])
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [filterStatus, search])

  useEffect(() => {
    const timer = setTimeout(fetchApps, 300)
    return () => clearTimeout(timer)
  }, [fetchApps])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch('/api/teacher-apply', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteTarget.id }),
      })
      if (!res.ok) { toast.error('Failed to delete'); return }
      toast.success(`${deleteTarget.full_name}'s application deleted`)
      setDeleteTarget(null)
      fetchApps()
    } catch {
      toast.error('Network error.')
    } finally {
      setDeleting(false)
    }
  }

  const handleExport = () => {
    const headers = ['Full Name', 'Email', 'WhatsApp', 'Country/City', 'Teaching Mode',
      'Subjects', 'Experience', 'Qualifications', 'Ijazah', 'Engagement Type',
      'Teaching Availability', 'Taught Females Before', 'Status', 'Submitted At']
    const rows = apps.map(a => [
      a.full_name, a.email, a.whatsapp, a.country_city, a.teaching_mode,
      a.subjects, a.years_experience, a.qualifications, a.has_ijazah, a.engagement_type,
      a.teaching_availability, a.taught_females_before, a.status,
      new Date(a.submitted_at).toLocaleDateString('en-GB')
    ].map(v => `"${(v || '').toString().replace(/"/g, '""')}"`))
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `teacher-applications-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV exported!')
  }

  const counts = {
    all:      apps.length,
    pending:  apps.filter(a => a.status === 'pending').length,
    reviewed: apps.filter(a => a.status === 'reviewed').length,
    accepted: apps.filter(a => a.status === 'accepted').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  }

  return (
    <div className="p-7 pb-16 max-w-7xl mx-auto">

      {selected && (
        <DetailModal app={selected} onClose={() => setSelected(null)} onUpdate={fetchApps} />
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Application?</h3>
            <p className="text-sm text-stone-400 mb-6">
              This will permanently delete <strong>{deleteTarget.full_name}</strong>&apos;s application.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 border border-stone-200 rounded-lg text-sm font-semibold text-stone-500 hover:bg-stone-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-60">
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">Teacher Applications</h1>
          <p className="text-sm text-stone-400 mt-1">Applications from teachers interested in joining the institute</p>
        </div>
        <button onClick={fetchApps}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-500 hover:bg-stone-50 transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(['all', 'pending', 'reviewed', 'accepted', 'rejected'] as const).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3.5 py-1 rounded-full border text-xs font-semibold capitalize transition-colors
              ${filterStatus === s ? 'bg-green-700 text-white border-green-700' : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'}`}>
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      {/* Search + export */}
      <div className="flex gap-2.5 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" placeholder="Search by name or email…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200" />
        </div>
        <button onClick={handleExport}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-500 hover:bg-stone-50 transition-colors">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-400 text-sm">Loading applications…</div>
        ) : apps.length === 0 ? (
          <div className="p-12 text-center text-stone-400 text-sm">No applications found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider hidden md:table-cell">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider hidden lg:table-cell">Mode</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider hidden lg:table-cell">Engagement</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {apps.map(app => (
                <tr key={app.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{app.full_name}</p>
                    <p className="text-xs text-stone-400">{app.country_city || '—'}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-slate-600">{app.email}</p>
                    <p className="text-xs text-stone-400">{app.whatsapp}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-600">{app.teaching_mode || '—'}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-600 text-xs">{app.engagement_type || '—'}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-xs text-stone-400">
                    {new Date(app.submitted_at).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(app)}
                        className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-stone-400 hover:text-slate-600">
                        <Eye size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(app)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-stone-400 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="px-4 py-2.5 border-t border-stone-100 text-xs text-stone-400">
          {apps.length} application{apps.length !== 1 ? 's' : ''} · Live from Supabase
        </div>
      </div>
    </div>
  )
}