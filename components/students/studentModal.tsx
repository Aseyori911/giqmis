import { Mail, X, CheckCircle } from 'lucide-react'
import { Student } from './types'
import { initials, parseCourses } from './utils'

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

function FullField({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="col-span-2 bg-stone-50 rounded-lg p-3 mb-2">
      <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm text-stone-700 leading-relaxed">{value}</p>
    </div>
  )
}

export default function StudentModal({ student, onClose }: { student: Student; onClose: () => void }) {
  const courses = parseCourses(student.selected_courses)

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-5 border-b border-stone-100 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-green-300 shrink-0"
              style={{ background: 'linear-gradient(135deg,#0f2419,#15803d)' }}>
              {initials(student.student_name)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-serif">{student.student_name}</h2>
              <p className="text-xs text-stone-400 mt-0.5">
                {student.nationality || '—'} · Age {student.student_age || '—'} · Accepted {new Date(student.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full uppercase tracking-wide">
                ✓ Accepted Student
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
            <X size={18} className="text-stone-400" />
          </button>
        </div>

        <div className="px-6 py-5">
          <Section title="👤 Personal Information">
            <Field label="Student Name" value={student.student_name} />
            <Field label="Parent / Guardian" value={student.parent_name} />
            <Field label="Email" value={student.email} />
            <Field label="Phone / WhatsApp" value={student.phone} />
            <Field label="Age Group" value={student.student_age} />
            <Field label="Nationality" value={student.nationality} />
            <Field label="Education Level" value={student.western_education_level || student.grade} />
            <Field label="Last School Attended" value={student.last_school_attended} />
            <Field label="Parent / Guardian Contact" value={student.parent_guardian_contact} />
            <Field label="Next of Kin Contact" value={student.next_of_kin_contact} />
          </Section>

          <Section title="📖 Quran & Study Background">
            <Field label="Studied Quran Before?" value={student.studied_quran_before} />
            <Field label="Previous Quran Level" value={student.previous_quran_level} />
            <Field label="Needs Quran Reading Help?" value={student.needs_quran_reading_help} />
            <Field label="Level of Study Interested" value={student.level_of_study_interested} />
          </Section>

          <div className="mb-5">
            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-stone-100">
              📚 Enrolled Courses
            </h3>
            {courses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {courses.map((course, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full">
                    <CheckCircle size={11} /> {course}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-400">No courses on record</p>
            )}
          </div>

          <Section title="⚙️ Preferences & Schedule">
            <Field label="Preferred Learning Style" value={student.preferred_learning_style} />
            <Field label="Class Time" value={student.class_time} />
            <Field label="Agreed to Terms?" value={student.agree_to_terms} />
          </Section>

          <div className="grid grid-cols-2 gap-3">
            <FullField label="Learning Goals" value={student.goals} />
            <FullField label="Why Interested in School" value={student.why_interested} />
          </div>

          <div className="flex gap-2 pt-4 border-t border-stone-100 mt-4">
            <a href={`mailto:${student.email}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-stone-200 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors">
              <Mail size={14} /> Email Student
            </a>
            {student.phone && (
              <a href={`https://wa.me/${student.phone.replace(/\D/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors">
                📱 WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}