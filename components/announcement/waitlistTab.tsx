import { Trash2, BellRing } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { WaitlistEntry } from './types'

export default function WaitlistTab({ waitlist, loading, onRefresh }: {
  waitlist: WaitlistEntry[]
  loading: boolean
  onRefresh: () => void
}) {
  const deleteEntry = async (id: string) => {
    await fetch('/api/admin/waitlist', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    toast.success('Entry removed')
    onRefresh()
  }

  const waitlistCSV = `data:text/csv;charset=utf-8,Name,Phone,Email,Date\n${waitlist.map(w =>
    `${w.name},${w.phone},${w.email || ''},${new Date(w.submitted_at).toLocaleDateString('en-GB')}`
  ).join('\n')}`

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
      <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-stone-700">Enrollment Waitlist ({waitlist.length})</h2>
          <p className="text-xs text-stone-400 mt-0.5">People who signed up to be notified when enrollment opens</p>
        </div>
        {waitlist.length > 0 && (
          <a href={waitlistCSV} download="waitlist.csv" className="text-xs text-green-700 font-semibold hover:underline flex items-center gap-1">
            Export CSV ↓
          </a>
        )}
      </div>
      {loading ? <p className="text-center text-stone-400 text-sm py-12">Loading…</p>
        : waitlist.length === 0 ? (
          <div className="text-center py-16">
            <BellRing size={32} className="mx-auto text-stone-200 mb-3" />
            <p className="text-stone-400 text-sm">No one on the waitlist yet.</p>
            <p className="text-stone-300 text-xs mt-1">People who sign up when enrollment is closed will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-50">
            {waitlist.map((entry, index) => (
              <div key={entry.id} className="px-6 py-4 flex items-center gap-4 hover:bg-stone-50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-stone-800">{entry.name}</p>
                  <div className="flex flex-wrap gap-3 mt-0.5">
                    <a href={`https://wa.me/${entry.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline">
                      📱 {entry.phone}
                    </a>
                    {entry.email && (
                      <a href={`mailto:${entry.email}`} className="text-xs text-orange-500 hover:underline">✉ {entry.email}</a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-stone-400 shrink-0">
                  {new Date(entry.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <button onClick={() => deleteEntry(entry.id)} className="p-1.5 border border-red-200 rounded-lg text-red-400 hover:bg-red-50 transition-colors shrink-0">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}