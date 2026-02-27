import { FileText, Users, Clock } from 'lucide-react'
import { Application } from './types'

export default function StatCards({ apps, loading }: { apps: Application[]; loading: boolean }) {
  const pending  = apps.filter(a => a.status === 'pending').length
  const accepted = apps.filter(a => a.status === 'accepted').length

  const stats = [
    {
      label: 'Total Applications',
      value: loading ? '…' : apps.length,
      sub: 'All time',
      accent: 'border-green-500',
      icon: FileText,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Pending Review',
      value: loading ? '…' : pending,
      sub: 'Awaiting action',
      accent: 'border-amber-500',
      icon: Clock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      label: 'Accepted Students',
      value: loading ? '…' : accepted,
      sub: 'Accepted this term',
      accent: 'border-blue-500',
      icon: Users,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
  ]

  return (
    <div className="grid gap-5 mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(({ label, value, sub, accent, icon: Icon, iconBg, iconColor }) => (
        <div key={label} className={`bg-white rounded-2xl border border-stone-200 shadow-sm p-6 border-l-4 ${accent}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">{label}</p>
              <p className="text-3xl font-bold text-stone-800 font-serif mt-2 leading-none">{value}</p>
              <p className="text-xs text-stone-400 mt-2">{sub}</p>
            </div>
            <div className={`p-3 rounded-xl ${iconBg}`}>
              <Icon size={18} className={iconColor} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}