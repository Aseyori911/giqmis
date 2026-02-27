import { useState } from 'react'
import { CheckCircle, Eye, XCircle, BookOpen } from 'lucide-react'
import { Application } from './types'
import { Field, FullWidthField, Section } from './field'
import Badge from './badge'
// import Badge from './Badge'
// import { Section, Field, FullWidthField } from './Field'

export default function DetailModal({ app, onClose, onUpdate }: {
  app: Application
  onClose: () => void
  onUpdate: () => void
}) {
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

  const courses = app.selected_courses
    ? app.selected_courses.split(',').map(c => c.trim()).filter(Boolean)
    : []

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-start sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-stone-900 font-serif">{app.student_name}</h2>
              <Badge status={app.status} />
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Submitted {new Date(app.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl leading-none">✕</button>
        </div>

        <div className="px-6 py-5 space-y-1">
          <Section title="👤 Personal Information">
            <Field label="Student Name" value={app.student_name} />
            <Field label="Parent / Guardian" value={app.parent_name} />
            <Field label="Email" value={app.email} />
            <Field label="Phone / WhatsApp" value={app.phone} />
            <Field label="Age Group" value={app.student_age} />
            <Field label="Nationality" value={app.nationality} />
            <Field label="Western Education Level" value={app.western_education_level || app.grade} />
            <Field label="Last School Attended" value={app.last_school_attended} />
            <Field label="Parent / Guardian Contact" value={app.parent_guardian_contact} />
            <Field label="Next of Kin Contact" value={app.next_of_kin_contact} />
          </Section>

          <Section title="📖 Quran & Study Background">
            <Field label="Studied Quran Before?" value={app.studied_quran_before} />
            <Field label="Previous Quran Level" value={app.previous_quran_level} />
            <Field label="Needs Help with Quran Reading?" value={app.needs_quran_reading_help} />
            <Field label="Level of Study Interested" value={app.level_of_study_interested} />
          </Section>

          <div className="mb-5">
            <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-stone-100 flex items-center gap-2">
              <BookOpen size={12} /> Selected Courses
            </h3>
            {courses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {courses.map((course, i) => (
                  <span key={i} className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full">
                    {course}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-400">No courses selected</p>
            )}
          </div>

          <Section title="⚙️ Preferences & Schedule">
            <Field label="Preferred Learning Style" value={app.preferred_learning_style} />
            <Field label="Class Time" value={app.class_time} />
            <Field label="Agreed to Terms?" value={app.agree_to_terms} />
          </Section>

          <div className="space-y-2">
            <FullWidthField label="Learning Goals" value={app.goals} />
            <FullWidthField label="Why Interested in School" value={app.why_interested} />
            <FullWidthField label="Previous Experience" value={app.previous_experience} />
          </div>

          <div className="pt-2">
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">
              Admin Notes
            </label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
              placeholder="Add internal notes…"
              className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm outline-none resize-y focus:border-green-500 focus:ring-1 focus:ring-green-200" />
          </div>

          <div className="flex gap-2 pt-3 border-t border-stone-100">
            <button disabled={updating} onClick={() => updateStatus('accepted')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50">
              <CheckCircle size={14} /> Accept
            </button>
            <button disabled={updating} onClick={() => updateStatus('reviewed')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50">
              <Eye size={14} /> Mark Reviewed
            </button>
            <button disabled={updating} onClick={() => updateStatus('rejected')}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50">
              <XCircle size={14} /> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}