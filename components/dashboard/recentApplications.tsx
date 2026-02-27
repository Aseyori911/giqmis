import { Application, statusColors } from './types'

export default function RecentApplications({ apps, loading }: { apps: Application[]; loading: boolean }) {
  const recent = apps.slice(0, 4)

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm">
      <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
        <h2 className="text-sm font-bold text-stone-800">Recent Applications</h2>
        <a href="/admin/applications" className="text-xs text-green-700 font-semibold hover:underline">
          View all →
        </a>
      </div>

      {loading ? (
        <p className="text-center text-stone-400 text-sm py-12">Loading…</p>
      ) : recent.length === 0 ? (
        <p className="text-center text-stone-400 text-sm py-12">No applications yet.</p>
      ) : (
        recent.map(app => (
          <div key={app.id}
            className="px-6 py-4 border-b border-stone-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 last:border-0">
            <div>
              <p className="text-sm font-semibold text-stone-800">{app.student_name}</p>
              <p className="text-xs text-stone-500">{app.program} · {app.grade}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${statusColors[app.status] || 'bg-stone-100 text-stone-600'}`}>
                {app.status}
              </span>
              <p className="text-xs text-stone-400 mt-1">
                {new Date(app.submitted_at).toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}