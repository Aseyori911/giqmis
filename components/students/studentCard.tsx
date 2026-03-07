import { Mail, Phone, User, Clock, Globe, GraduationCap } from 'lucide-react'
import { Student } from './types'
import { initials, parseCourses } from './utils'

export default function StudentCard({ student, onView }: { student: Student; onView: () => void }) {
  const courses = parseCourses(student.selected_courses)

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 hover:border-stone-300 hover:shadow-md transition-all">

      <div className="flex items-start gap-3 mb-3.5">
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-green-300 shrink-0"
          style={{ background: 'linear-gradient(135deg,#0f2419,#15803d)' }}>
          {initials(student.student_name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-stone-800 truncate">{student.student_name}</p>
          <p className="text-xs text-stone-500">{student.western_education_level || student.grade || '—'} · {student.student_age || '—'}</p>
          {student.nationality && (
            <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
              <Globe size={10} /> {student.nationality}
            </p>
          )}
        </div>
      </div>

      {courses.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {courses.slice(0, 2).map((c, i) => (
            <span key={i} className="px-2 py-0.5 bg-orange-50 border border-orange-100 text-orange-700 text-[10px] font-semibold rounded-full">{c}</span>
          ))}
          {courses.length > 2 && (
            <span className="px-2 py-0.5 bg-stone-100 text-stone-500 text-[10px] font-semibold rounded-full">+{courses.length - 2}</span>
          )}
        </div>
      )}

      <div className="space-y-1 mb-3.5 border-t border-stone-50 pt-3">
        <p className="text-xs text-stone-600 flex items-center gap-1.5"><User size={11} className="text-stone-400" /> {student.parent_name}</p>
        <p className="text-xs text-stone-600 flex items-center gap-1.5 truncate"><Mail size={11} className="text-stone-400 shrink-0" /> {student.email}</p>
        <p className="text-xs text-stone-600 flex items-center gap-1.5"><Phone size={11} className="text-stone-400" /> {student.phone}</p>
        {student.class_time && (
          <p className="text-xs text-stone-500 flex items-center gap-1.5">
            <Clock size={11} className="text-stone-400" />
            {student.class_time.length > 30 ? student.class_time.substring(0, 30) + '…' : student.class_time}
          </p>
        )}
        {student.level_of_study_interested && (
          <p className="text-xs text-stone-500 flex items-center gap-1.5">
            <GraduationCap size={11} className="text-stone-400" /> {student.level_of_study_interested} level
          </p>
        )}
        <p className="text-[11px] text-stone-400 pt-0.5">Accepted {new Date(student.submitted_at).toLocaleDateString('en-GB')}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={onView}
          className="flex-1 py-1.5 border border-stone-200 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors text-center">
          View Profile
        </button>
        <a href={`mailto:${student.email}`}
          className="px-2.5 py-1.5 border border-stone-200 rounded-lg text-stone-500 hover:bg-stone-50 transition-colors flex items-center">
          <Mail size={13} />
        </a>
        {student.phone && (
          <a href={`https://wa.me/${student.phone.replace(/\D/g, '')}`}
            target="_blank" rel="noopener noreferrer"
            className="px-2.5 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors flex items-center text-xs">
            📱
          </a>
        )}
      </div>
    </div>
  )
}