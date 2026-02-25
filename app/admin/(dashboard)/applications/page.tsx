'use client'
// app/admin/applications/page.tsx

import { useState, useEffect, useCallback } from 'react'
import { Search, Download, Eye, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'
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
  pending:  { bg: '#fef9c3', color: '#854d0e', icon: <Clock size={11} /> },
  reviewed: { bg: '#dbeafe', color: '#1e40af', icon: <Eye size={11} /> },
  accepted: { bg: '#dcfce7', color: '#14532d', icon: <CheckCircle size={11} /> },
  rejected: { bg: '#fee2e2', color: '#7f1d1d', icon: <XCircle size={11} /> },
}

function Badge({ status }: { status: Application['status'] }) {
  const s = statusBadge[status]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', background: s.bg, color: s.color }}>
      {s.icon} {status}
    </span>
  )
}

function DetailModal({ app, onClose, onUpdate }: { app: Application; onClose: () => void; onUpdate: () => void }) {
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
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(3px)' }}>
      <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 25px 50px rgba(0,0,0,0.25)', maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0ede6', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1c1917', fontFamily: 'Georgia,serif' }}>{app.student_name}</h2>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#78716c' }}>Submitted {new Date(app.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#78716c' }}>✕</button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[['Student', app.student_name], ['Parent/Guardian', app.parent_name], ['Email', app.email], ['Phone', app.phone], ['Age Group', app.student_age], ['Grade', app.grade], ['Program', app.program]].map(([l, v]) => v ? (
              <div key={l}>
                <p style={{ margin: 0, fontSize: 11, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700 }}>{l}</p>
                <p style={{ margin: '3px 0 0', fontSize: 14, color: '#1c1917' }}>{v}</p>
              </div>
            ) : null)}
          </div>
          {app.previous_experience && (
            <div style={{ background: '#faf8f4', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700 }}>Previous Experience</p>
              <p style={{ margin: 0, fontSize: 14, color: '#1c1917', lineHeight: 1.6 }}>{app.previous_experience}</p>
            </div>
          )}
          {app.goals && (
            <div style={{ background: '#faf8f4', borderRadius: 8, padding: 12, marginBottom: 14 }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700 }}>Learning Goals</p>
              <p style={{ margin: 0, fontSize: 14, color: '#1c1917', lineHeight: 1.6 }}>{app.goals}</p>
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Admin Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Add internal notes…" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d6cfc4', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: 8, borderTop: '1px solid #f0ede6', paddingTop: 14 }}>
            <button disabled={updating} onClick={() => updateStatus('accepted')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', background: '#15803d', color: 'white', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              <CheckCircle size={14} /> Accept
            </button>
            <button disabled={updating} onClick={() => updateStatus('reviewed')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', background: 'transparent', color: '#57534e', border: '1px solid #d6cfc4', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              <Eye size={14} /> Mark Reviewed
            </button>
            <button disabled={updating} onClick={() => updateStatus('rejected')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 12px', background: 'transparent', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              <XCircle size={14} /> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function () {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState<Application | null>(null)

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
      console.error("API returned non-JSON response:", text)
      toast.error("Server returned invalid response")
      setLoading(false)
      return
    }

    if (!res.ok) {
      toast.error(data.error || "Failed to fetch applications")
      setLoading(false)
      return
    }

    setApps(data.applications || [])
  } catch (err) {
    toast.error("Network error. Please try again.")
  } finally {
    setLoading(false)
  }
}, [filterStatus, search])





  useEffect(() => {
    const timer = setTimeout(fetchApps, 300)
    return () => clearTimeout(timer)
  }, [fetchApps])

  const counts = {
    all: apps.length,
    pending: apps.filter(a => a.status === 'pending').length,
    reviewed: apps.filter(a => a.status === 'reviewed').length,
    accepted: apps.filter(a => a.status === 'accepted').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  }

  return (
    <div style={{ padding: '28px 28px 48px', fontFamily: 'Georgia, serif' }}>
      {selected && <DetailModal app={selected} onClose={() => setSelected(null)} onUpdate={fetchApps} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#1c1917' }}>Applications</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: '#78716c' }}>Live data — updates instantly when students apply</p>
        </div>
        <button onClick={fetchApps} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'transparent', border: '1px solid #d6cfc4', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: '#57534e' }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {(['all', 'pending', 'reviewed', 'accepted', 'rejected'] as const).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '5px 14px', borderRadius: 999, border: '1px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize', background: filterStatus === s ? '#15803d' : 'white', color: filterStatus === s ? 'white' : '#57534e', borderColor: filterStatus === s ? '#15803d' : '#d6cfc4' }}>
            {s} ({counts[s]})
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
          <input type="text" placeholder="Search by name, parent, or email…" value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1px solid #d6cfc4', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'transparent', border: '1px solid #d6cfc4', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: '#57534e' }}>
          <Download size={14} /> Export
        </button>
      </div>
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e7e0d4', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#a8a29e', fontSize: 14 }}>Loading applications…</div>
        ) : apps.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#a8a29e', fontSize: 14 }}>
            {search || filterStatus !== 'all' ? 'No applications match your search.' : 'No applications yet. They will appear here when students apply.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0ede6', background: '#faf8f4' }}>
                  {['Student', 'Parent', 'Program', 'Grade', 'Submitted', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apps.map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #f5f1ec' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1c1917' }}>{app.student_name}</p>
                      <p style={{ margin: 0, fontSize: 11, color: '#a8a29e' }}>{app.email}</p>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#57534e' }}>{app.parent_name}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#57534e' }}>{app.program || '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#57534e' }}>{app.grade || '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: '#78716c', whiteSpace: 'nowrap' }}>{new Date(app.submitted_at).toLocaleDateString('en-GB')}</td>
                    <td style={{ padding: '12px 16px' }}><Badge status={app.status} /></td>
                    <td style={{ padding: '12px 16px' }}>
                      <button onClick={() => setSelected(app)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'transparent', border: '1px solid #d6cfc4', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: '#57534e' }}>
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ padding: '10px 16px', borderTop: '1px solid #f0ede6', fontSize: 12, color: '#a8a29e' }}>
          {apps.length} application{apps.length !== 1 ? 's' : ''} · Live from Supabase
        </div>
      </div>
    </div>
  )
}