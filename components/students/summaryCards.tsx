import { User, BookOpen, Globe, Clock } from 'lucide-react'
import { Student } from './types'

export default function SummaryCards({ students, loading }: { students: Student[]; loading: boolean }) {
  const totalCourseEnrollments = students.reduce((acc, s) =>
    acc + (s.selected_courses ? s.selected_courses.split(',').filter(Boolean).length : 0), 0)

  const cards = [
    {
      label: 'Total Students',
      value: loading ? '…' : students.length,
      sub: 'Enrolled students',
      icon: <User size={16} className="text-green-600" />,
      color: 'bg-green-50',
    },
    {
      label: 'Course Enrollments',
      value: loading ? '…' : totalCourseEnrollments,
      sub: 'Across all students',
      icon: <BookOpen size={16} className="text-blue-600" />,
      color: 'bg-blue-50',
    },
    {
      label: 'Nationalities',
      value: loading ? '…' : new Set(students.map(s => s.nationality).filter(Boolean)).size,
      sub: 'Distinct nationalities',
      icon: <Globe size={16} className="text-purple-600" />,
      color: 'bg-purple-50',
    },
    {
      label: 'Latest Intake',
      value: loading || students.length === 0
        ? '—'
        : new Date(students[0].submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      sub: 'Most recent acceptance',
      icon: <Clock size={16} className="text-orange-600" />,
      color: 'bg-orange-50',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-5">
      {cards.map(({ label, value, sub, icon, color }) => (
        <div key={label} className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
          <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center mb-3`}>{icon}</div>
          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold text-stone-800 font-serif mt-1 leading-none">{value}</p>
          <p className="text-xs text-stone-400 mt-1">{sub}</p>
        </div>
      ))}
    </div>
  )
}