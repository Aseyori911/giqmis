'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { ArrowLeft, ArrowRight, CheckCircle, GraduationCap, X } from 'lucide-react'

const TOTAL_STEPS = 4

type FormData = {
  fullName: string
  gender: string
  countryCity: string
  email: string
  whatsapp: string
  teachingMode: string
  subjects: string
  yearsExperience: string
  qualifications: string
  hasIjazah: string
  ijazahDetails: string
  islamicMethodology: string
  scholarsFollow: string
  engagementType: string
  teachingAvailability: string
  weeklyAvailability: string
  taughtFemalesBefore: string
  whyTeachHere: string
}

const INITIAL: FormData = {
  fullName: '', gender: '', countryCity: '', email: '', whatsapp: '',
  teachingMode: '', subjects: '', yearsExperience: '', qualifications: '',
  hasIjazah: '', ijazahDetails: '', islamicMethodology: '', scholarsFollow: '',
  engagementType: '', teachingAvailability: '', weeklyAvailability: '',
  taughtFemalesBefore: '', whyTeachHere: '',
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 transition-all
            ${i + 1 < step ? 'bg-orange-600 border-orange-600 text-white'
              : i + 1 === step ? 'bg-white border-orange-600 text-orange-600'
              : 'bg-white border-stone-200 text-stone-300'}`}>
            {i + 1 < step ? '✓' : i + 1}
          </div>
        ))}
      </div>
      <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-600 rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / (total - 1)) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        {['Basic Info', 'Teaching Info', 'Availability', 'Review & Submit'].map((label, i) => (
          <span key={i} className={`text-[10px] font-medium ${i + 1 === step ? 'text-orange-600' : 'text-stone-300'}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass = "w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 bg-white text-slate-800 transition-colors"
const textareaClass = `${inputClass} resize-none`

function RadioGroup({ name, options, value, onChange }: {
  name: string; options: string[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <label key={opt} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm cursor-pointer transition-colors
          ${value === opt
            ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold'
            : 'border-stone-200 text-slate-600 hover:border-orange-300'}`}>
          <input type="radio" name={name} value={opt} checked={value === opt}
            onChange={() => onChange(opt)} className="sr-only" />
          {opt}
        </label>
      ))}
    </div>
  )
}

function TeacherModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData(prev => ({ ...prev, [field]: e.target.value }))

  const setRadio = (field: keyof FormData) => (v: string) =>
    setFormData(prev => ({ ...prev, [field]: v }))

  const validateStep = () => {
    if (step === 1) {
      if (!formData.fullName) { toast.error('Full name is required'); return false }
      if (!formData.gender) { toast.error('Please select your gender'); return false }
      if (!formData.email) { toast.error('Email is required'); return false }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { toast.error('Enter a valid email'); return false }
      if (!formData.whatsapp) { toast.error('WhatsApp number is required'); return false }
    }
    if (step === 2) {
      if (!formData.teachingMode) { toast.error('Please select a teaching mode'); return false }
      if (!formData.subjects) { toast.error('Please list subjects you can teach'); return false }
      if (!formData.yearsExperience) { toast.error('Years of experience is required'); return false }
      if (!formData.qualifications) { toast.error('Please state your qualifications'); return false }
      if (!formData.hasIjazah) { toast.error('Please answer the Ijazah question'); return false }
      if (!formData.islamicMethodology) { toast.error('Please briefly state your Islamic methodology'); return false }
    }
    if (step === 3) {
      if (!formData.engagementType) { toast.error('Please select your engagement preference'); return false }
      if (!formData.teachingAvailability) { toast.error('Please select your teaching availability'); return false }
      if (!formData.taughtFemalesBefore) { toast.error('Please answer if you have taught female students'); return false }
      if (!formData.whyTeachHere) { toast.error('Please share why you would like to teach here'); return false }
    }
    return true
  }

  const handleNext = () => { if (validateStep()) setStep(s => s + 1) }
  const handleBack = () => setStep(s => s - 1)

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/teacher-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Something went wrong.'); return }
      setIsSubmitted(true)
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 sticky top-0 bg-white z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Teacher Application</h2>
              <p className="text-xs text-stone-400">Gladtidings Institute</p>
            </div>
          </div>
          <button onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-lg transition-colors text-stone-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Application Received</h3>
              <p className="text-slate-500 text-sm mb-1">
                Jazākillāhu khayran for your interest in teaching at Gladtidings Institute.
              </p>
              <p className="text-slate-400 text-xs mb-6 max-w-sm mx-auto leading-relaxed">
                We will carefully review your application and may reach out for further discussion.
                May Allah reward your intention.
              </p>
              <button onClick={onClose}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-colors">
                Close
              </button>
            </div>
          ) : (
            <>
              <ProgressBar step={step} total={TOTAL_STEPS} />

              {/* Step 1 — Basic Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800 mb-4">Basic Information</h3>
                  <Field label="Full Name" required>
                    <input className={inputClass} placeholder="Your full name"
                      value={formData.fullName} onChange={set('fullName')} />
                  </Field>
                  <Field label="Gender" required>
                    <RadioGroup name="gender"
                      options={['Female', 'Male']}
                      value={formData.gender}
                      onChange={setRadio('gender')} />
                  </Field>
                  <Field label="Country / City of Residence">
                    <input className={inputClass} placeholder="e.g. Lagos, Nigeria"
                      value={formData.countryCity} onChange={set('countryCity')} />
                  </Field>
                  <Field label="Email Address" required>
                    <input className={inputClass} type="email" placeholder="your@email.com"
                      value={formData.email} onChange={set('email')} />
                  </Field>
                  <Field label="WhatsApp Number" required>
                    <input className={inputClass} placeholder="+234 000 000 0000"
                      value={formData.whatsapp} onChange={set('whatsapp')} />
                  </Field>
                </div>
              )}

              {/* Step 2 — Teaching Info */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800 mb-4">Teaching Information</h3>
                  <Field label="Preferred Teaching Mode" required>
                    <RadioGroup name="teachingMode"
                      options={['Online', 'Onsite', 'Both']}
                      value={formData.teachingMode}
                      onChange={setRadio('teachingMode')} />
                  </Field>
                  <Field label="Subjects You Can Teach" required>
                    <textarea className={textareaClass} rows={3}
                      placeholder="e.g. Qur'an memorization, Tajweed, Qur'an recitation, Islamic studies, Arabic reading and writing"
                      value={formData.subjects} onChange={set('subjects')} />
                  </Field>
                  <Field label="Years of Teaching Experience" required>
                    <select className={inputClass} value={formData.yearsExperience} onChange={set('yearsExperience')}>
                      <option value="">Select…</option>
                      <option>Less than 1 year</option>
                      <option>1–2 years</option>
                      <option>3–5 years</option>
                      <option>6–10 years</option>
                      <option>More than 10 years</option>
                    </select>
                  </Field>
                  <Field label="Qualifications in Qur'an or Islamic Studies" required>
                    <textarea className={textareaClass} rows={3}
                      placeholder="Please describe your qualifications and certifications"
                      value={formData.qualifications} onChange={set('qualifications')} />
                  </Field>
                  <Field label="Do you hold an Ijazah in Qur'an recitation or memorization?" required>
                    <RadioGroup name="hasIjazah"
                      options={['Yes', 'No']}
                      value={formData.hasIjazah}
                      onChange={setRadio('hasIjazah')} />
                  </Field>
                  {formData.hasIjazah === 'Yes' && (
                    <Field label="Please specify your Ijazah">
                      <textarea className={textareaClass} rows={2}
                        placeholder="e.g. Ijazah in Hafs 'an 'Asim from Sheikh…"
                        value={formData.ijazahDetails} onChange={set('ijazahDetails')} />
                    </Field>
                  )}
                  <Field label="Islamic Creed / Methodology" required>
                    <textarea className={textareaClass} rows={3}
                      placeholder="Our institute follows the Qur'an and Sunnah upon the understanding of the righteous predecessors (السلف الصالح). Please briefly state your Islamic creed or methodology."
                      value={formData.islamicMethodology} onChange={set('islamicMethodology')} />
                  </Field>
                  <Field label="Scholars or Teachers You Benefit From">
                    <textarea className={textareaClass} rows={2}
                      placeholder="List some scholars or teachers you benefit from"
                      value={formData.scholarsFollow} onChange={set('scholarsFollow')} />
                  </Field>
                </div>
              )}

              {/* Step 3 — Availability */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800 mb-4">Availability & Engagement</h3>
                  <Field label="Nature of Engagement" required>
                    <RadioGroup name="engagementType"
                      options={['Volunteer for the sake of Allah', 'Paid position', 'Open to either']}
                      value={formData.engagementType}
                      onChange={setRadio('engagementType')} />
                  </Field>
                  <Field label="Teaching Availability" required>
                    <RadioGroup name="teachingAvailability"
                      options={['Full-time', 'Part-time', 'Flexible / Occasional']}
                      value={formData.teachingAvailability}
                      onChange={setRadio('teachingAvailability')} />
                  </Field>
                  <Field label="Weekly Availability">
                    <textarea className={textareaClass} rows={2}
                      placeholder="e.g. Monday, Wednesday, Friday — mornings (9am–12pm WAT)"
                      value={formData.weeklyAvailability} onChange={set('weeklyAvailability')} />
                  </Field>
                  <Field label="Have you previously taught female students?" required>
                    <RadioGroup name="taughtFemalesBefore"
                      options={['Yes', 'No']}
                      value={formData.taughtFemalesBefore}
                      onChange={setRadio('taughtFemalesBefore')} />
                  </Field>
                  <Field label="Why would you like to teach at the institute?" required>
                    <textarea className={textareaClass} rows={4}
                      placeholder="Share your motivation for joining our teaching team…"
                      value={formData.whyTeachHere} onChange={set('whyTeachHere')} />
                  </Field>
                </div>
              )}

              {/* Step 4 — Expectations + Submit */}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="text-base font-bold text-slate-800">Expectations & Important Notes</h3>

                  <div className="bg-stone-50 rounded-xl p-5 border border-stone-100">
                    <h4 className="font-semibold text-slate-700 mb-3 text-sm">Expectations from Our Teachers</h4>
                    <ul className="space-y-2">
                      {[
                        'Demonstrate good character and Islamic conduct.',
                        "Show respect, patience, and care when teaching female students.",
                        "Be committed to accurate Qur'an recitation and proper Tajweed.",
                        'Maintain punctuality and consistency in teaching sessions.',
                        "Adhere to the institute's Islamic methodology and guidelines.",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-orange-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                      Our aim is to create a supportive, disciplined, and spiritually enriching learning environment for all students.
                    </p>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                    <h4 className="font-semibold text-amber-700 mb-2 text-sm">📋 Important Note</h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      The institute carefully reviews all applications. Submission does not automatically
                      guarantee a teaching position. Applicants may be required to undergo:
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "A recitation assessment (for Qur'an teachers)",
                        'A short interview or discussion',
                        'Verification of qualifications or ijazah, where applicable',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                          <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs text-slate-400 text-center leading-relaxed">
                    We appreciate your interest in supporting the mission of spreading beneficial knowledge.
                    May Allah reward all those who contribute to the teaching and preservation of the Qur&apos;an.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-6 pt-5 border-t border-stone-100">
                {step > 1 ? (
                  <button onClick={handleBack}
                    className="flex-1 px-5 py-2.5 border border-stone-200 text-slate-600 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors">
                    <ArrowLeft size={15} /> Back
                  </button>
                ) : (
                  <button onClick={onClose}
                    className="flex-1 px-5 py-2.5 border border-stone-200 text-slate-600 rounded-xl font-semibold text-sm hover:bg-stone-50 transition-colors">
                    Cancel
                  </button>
                )}
                {step < TOTAL_STEPS ? (
                  <button onClick={handleNext}
                    className="flex-1 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                    Next <ArrowRight size={15} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={submitting}
                    className="flex-1 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                    {submitting ? 'Submitting…' : <> Submit Application <ArrowRight size={15} /> </>}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TeacherApply() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="py-20 bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-3xl mx-auto px-4 text-center">

        <span className="text-xs font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400 mb-3 block">
          Join Our Team
        </span>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">
          Join Our Teaching Team
        </h2>
        <div className="w-12 h-1 bg-orange-600 mx-auto mb-8" />

        {/* Hadith quote */}
        <div className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-2xl px-8 py-6 mb-8 max-w-xl mx-auto">
          <p className="text-slate-600 dark:text-stone-400 italic text-base leading-relaxed mb-2">
            &ldquo;The best among you are those who learn the Qur&apos;an and teach it.&rdquo;
          </p>
          <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold">
            — Prophet Muhammad ﷺ
          </p>
        </div>

        <p className="text-slate-600 dark:text-stone-400 leading-relaxed max-w-2xl mx-auto mb-3">
          At <span className="font-semibold text-slate-700 dark:text-stone-300">
            Gladtidings Institute for Qur&apos;an Memorization and Islamic Studies for Females
          </span>, we welcome qualified and passionate female teachers who are committed to teaching
          the Qur&apos;an and beneficial Islamic knowledge.
        </p>
        <p className="text-slate-400 dark:text-stone-500 text-sm leading-relaxed max-w-xl mx-auto mb-8">
          Teaching opportunities may be online or onsite. Some roles may be voluntary, while others
          may be part-time or paid, depending on the institute&apos;s capacity and programme structure.
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-sm"
        >
          <GraduationCap size={18} /> Submit Your Application
        </button>
      </div>

      {showModal && <TeacherModal onClose={() => setShowModal(false)} />}
    </section>
  )
}