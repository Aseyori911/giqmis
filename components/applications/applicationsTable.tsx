import { Eye, Trash2 } from 'lucide-react'
import { Application } from './types'
import Badge from './badge'
// import Badge from './Badge'

export default function ApplicationsTable({ apps, loading, search, filterStatus, onView, onDelete }: {
  apps: Application[]
  loading: boolean
  search: string
  filterStatus: string
  onView: (app: Application) => void
  onDelete: (app: Application) => void
}) {
  if (loading) return <p className="text-center text-stone-400 text-sm py-16">Loading applications…</p>

  if (apps.length === 0) return (
    <p className="text-center text-stone-400 text-sm py-16">
      {search || filterStatus !== 'all' ? 'No applications match your search.' : 'No applications yet.'}
    </p>
  )

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-stone-100 bg-stone-50">
            {['Student', 'Contact', 'Courses', 'Education Level', 'Class Time', 'Submitted', 'Status', ''].map(h => (
              <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apps.map(app => {
            const courses = app.selected_courses
              ? app.selected_courses.split(',').map(c => c.trim()).filter(Boolean)
              : []
            return (
              <tr key={app.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-semibold text-stone-800">{app.student_name}</p>
                  <p className="text-xs text-stone-400">{app.nationality || '—'}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-xs text-stone-600">{app.email}</p>
                  <p className="text-xs text-stone-400">{app.phone}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1 max-w-50">
                    {courses.length > 0 ? (
                      <>
                        {courses.slice(0, 2).map((c, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded border border-emerald-100">
                            {c}
                          </span>
                        ))}
                        {courses.length > 2 && (
                          <span className="px-1.5 py-0.5 bg-stone-100 text-stone-500 text-[10px] font-semibold rounded">
                            +{courses.length - 2} more
                          </span>
                        )}
                      </>
                    ) : <span className="text-xs text-stone-400">—</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-stone-600">
                  {app.western_education_level || app.grade || '—'}
                </td>
                <td className="px-4 py-3 text-xs text-stone-500 whitespace-nowrap">
                  {app.class_time ? (app.class_time.length > 20 ? app.class_time.substring(0, 20) + '…' : app.class_time) : '—'}
                </td>
                <td className="px-4 py-3 text-xs text-stone-400 whitespace-nowrap">
                  {new Date(app.submitted_at).toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-3"><Badge status={app.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onView(app)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-stone-200 rounded-md text-xs text-stone-500 hover:bg-stone-50 transition-colors">
                      <Eye size={12} /> View
                    </button>
                    {app.status !== 'accepted' && (
                      <button onClick={() => onDelete(app)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 border border-red-200 rounded-md text-xs text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 size={12} /> Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}