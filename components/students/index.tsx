'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, RefreshCw } from 'lucide-react'
import { Student } from './types'
import StudentModal from './studentModal'
import StudentCard from './studentCard'
import SummaryCards from './summaryCards'

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterAge, setFilterAge] = useState('all')
  const [selected, setSelected] = useState<Student | null>(null)

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/applications?status=accepted')
    const data = await res.json()
    setStudents(data.applications || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchStudents() }, [fetchStudents])

  const ageGroups = ['all', ...Array.from(new Set(students.map(s => s.student_age).filter(Boolean)))]

  const filtered = students.filter(s => {
    const q = search.toLowerCase()
    const matchSearch =
      s.student_name.toLowerCase().includes(q) ||
      s.parent_name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.nationality || '').toLowerCase().includes(q) ||
      (s.selected_courses || '').toLowerCase().includes(q)
    return matchSearch && (filterAge === 'all' || s.student_age === filterAge)
  })

  return (
    <div className="p-7 pb-16">
      {selected && <StudentModal student={selected} onClose={() => setSelected(null)} />}

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-2xl font-bold text-stone-800 font-serif">Students</h1>
          <p className="text-sm text-stone-500 mt-1">
            {loading ? 'Loading…' : `${students.length} accepted student${students.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button onClick={fetchStudents}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-600 hover:bg-stone-50 transition-colors">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <SummaryCards students={students} loading={loading} />

      <div className="flex gap-2.5 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-52">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" placeholder="Search by name, email, nationality, or course…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {ageGroups.map(g => (
            <button key={g} onClick={() => setFilterAge(g)}
              className={`px-3 py-1 rounded-full text-xs font-bold border capitalize transition-colors
                ${filterAge === g ? 'bg-green-700 text-white border-green-700' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'}`}>
              {g === 'all' ? 'All Ages' : g}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-stone-400 text-sm py-16">Loading students…</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-16 text-center">
          <p className="text-stone-400 text-sm">
            {students.length === 0 ? 'No accepted students yet. Accept applications to see them here.' : 'No students match your search.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
          {filtered.map(student => (
            <StudentCard key={student.id} student={student} onView={() => setSelected(student)} />
          ))}
        </div>
      )}
    </div>
  )
}