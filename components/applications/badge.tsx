import { Clock, Eye, CheckCircle, XCircle } from 'lucide-react'
import { Application } from './types'

const statusBadge = {
  pending:  { bg: 'bg-yellow-100', color: 'text-yellow-800', icon: <Clock size={11} /> },
  reviewed: { bg: 'bg-blue-100',   color: 'text-blue-800',   icon: <Eye size={11} /> },
  accepted: { bg: 'bg-green-100',  color: 'text-green-900',  icon: <CheckCircle size={11} /> },
  rejected: { bg: 'bg-red-100',    color: 'text-red-900',    icon: <XCircle size={11} /> },
}

export default function Badge({ status }: { status: Application['status'] }) {
  const s = statusBadge[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${s.bg} ${s.color}`}>
      {s.icon} {status}
    </span>
  )
}