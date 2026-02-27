import { useState } from 'react'
import { Heart, BookOpen, Clock, Users, User, Plus, Trash2, AlertCircle } from 'lucide-react'
import { LEARNING_STYLES, GENERAL_CLASS_TIMES, DAYS_OF_WEEK } from './data'
import { FormData } from './types'
import { toast } from 'react-hot-toast'

type Props = {
  formData: FormData
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const labelClass = "block text-sm font-semibold text-gray-700 mb-1"

export default function StepFour({ formData, onChange, setFormData }: Props) {
  const set = (key: keyof FormData, val: string) =>
    setFormData(p => ({ ...p, [key]: val }))

  // Temp state for the slot being built
  const [pendingDay, setPendingDay] = useState('')
  const [pendingTime, setPendingTime] = useState('')
  const [slotError, setSlotError] = useState('')

  const addSlot = () => {
    if (!pendingDay) { setSlotError('Please select a day.'); return }
    if (!pendingTime.trim()) { setSlotError('Please enter a time.'); return }

    const alreadyExists = formData.privateClassSlots.some(s => s.day === pendingDay)
    if (alreadyExists) { setSlotError(`You already added ${pendingDay}.`); return }

    if (formData.privateClassSlots.length >= 3) {
      toast.error('You can add at most 3 private class slots.')
      return
    }

    setFormData(prev => ({
      ...prev,
      privateClassSlots: [...prev.privateClassSlots, { day: pendingDay, time: pendingTime.trim() }]
    }))
    setPendingDay('')
    setPendingTime('')
    setSlotError('')
  }

  const removeSlot = (day: string) => {
    setFormData(prev => ({
      ...prev,
      privateClassSlots: prev.privateClassSlots.filter(s => s.day !== day)
    }))
  }

  const slotCount = formData.privateClassSlots.length

  return (
    <div className="space-y-5">
      <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
        <p className="text-sm text-emerald-800">
          <strong>Step 4 of 4 — Preferences & Agreement</strong>
        </p>
      </div>

      {/* Learning Style */}
      <div>
        <label className={labelClass}>What is your preferred learning style? *</label>
        <div className="grid grid-cols-2 gap-2">
          {LEARNING_STYLES.map(opt => (
            <button key={opt} type="button" onClick={() => set('preferredLearningStyle', opt)}
              className={`py-3 px-4 rounded-lg border-2 font-semibold text-sm transition-colors text-left
                ${formData.preferredLearningStyle === opt
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div>
        <label className={labelClass}>What are your goals for this course? *</label>
        <div className="relative">
          <Heart className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea name="goals" value={formData.goals} onChange={onChange} rows={3}
            placeholder="Describe your learning goals..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none text-gray-700 placeholder-gray-400"
            required />
        </div>
      </div>

      {/* Why Interested */}
      <div>
        <label className={labelClass}>Why are you interested in joining this online Quran school?</label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea name="whyInterestedInSchool" value={formData.whyInterestedInSchool}
            onChange={onChange} rows={3} placeholder="Tell us why you want to join..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none text-gray-700 placeholder-gray-400" />
        </div>
      </div>

      {/* Class Type */}
      <div>
        <label className={labelClass}>Class Preference *</label>
        <div className="space-y-2">

          {/* General */}
          <button type="button"
            onClick={() => setFormData(p => ({ ...p, classType: 'general', privateClassSlots: [] }))}
            className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-colors
              ${formData.classType === 'general'
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-300'}`}>
            <div className="flex items-center gap-3 mb-2">
              <Users className={`w-5 h-5 flex-shrink-0 ${formData.classType === 'general' ? 'text-emerald-600' : 'text-gray-400'}`} />
              <span className={`font-semibold text-sm ${formData.classType === 'general' ? 'text-emerald-700' : 'text-gray-700'}`}>
                General Class
              </span>
            </div>
            <div className="ml-8 space-y-1">
              {GENERAL_CLASS_TIMES.map(t => (
                <div key={t} className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <span className="text-xs text-gray-500">{t}</span>
                </div>
              ))}
            </div>
          </button>

          {/* Private */}
          <button type="button"
            onClick={() => setFormData(p => ({ ...p, classType: 'private' }))}
            className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-colors
              ${formData.classType === 'private'
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-300'}`}>
            <div className="flex items-center gap-3">
              <User className={`w-5 h-5 flex-shrink-0 ${formData.classType === 'private' ? 'text-emerald-600' : 'text-gray-400'}`} />
              <div>
                <span className={`font-semibold text-sm ${formData.classType === 'private' ? 'text-emerald-700' : 'text-gray-700'}`}>
                  Private Class
                </span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Can&apos;t make the general schedule? Choose your own days and times.
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Private slot builder */}
        {formData.classType === 'private' && (
          <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">

            {/* Status */}
            <div className={`text-xs font-semibold px-3 py-2 rounded-lg
              ${slotCount < 2 ? 'bg-amber-50 text-amber-700' :
                slotCount === 3 ? 'bg-blue-100 text-blue-700' :
                'bg-emerald-50 text-emerald-700'}`}>
              {slotCount === 0 && "Add at least 2 and at most 3 class slots"}
              {slotCount === 1 && "Add 1 more slot (minimum 2 required)"}
              {slotCount === 2 && `${slotCount} slots added ✓ (you may add 1 more)`}
              {slotCount === 3 && `${slotCount} slots added — maximum reached`}
            </div>

            {/* Added slots */}
            {formData.privateClassSlots.map(slot => (
              <div key={slot.day}
                className="flex items-center justify-between bg-white border border-emerald-200 rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-semibold text-emerald-700">{slot.day}</span>
                  <span className="text-sm text-gray-500">— {slot.time}</span>
                </div>
                <button type="button" onClick={() => removeSlot(slot.day)}
                  className="p-1 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {/* Add new slot */}
            {slotCount < 3 && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={pendingDay}
                    onChange={e => { setPendingDay(e.target.value); setSlotError('') }}
                    className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white text-gray-700">
                    <option value="">Select day</option>
                    {DAYS_OF_WEEK.filter(d => !formData.privateClassSlots.some(s => s.day === d)).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={pendingTime}
                    onChange={e => { setPendingTime(e.target.value); setSlotError('') }}
                    placeholder="e.g. 4:00 PM NGT"
                    className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500 text-gray-700"
                  />
                </div>
                {slotError && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle size={12} /> {slotError}
                  </div>
                )}
                <button type="button" onClick={addSlot}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors">
                  <Plus size={14} /> Add Slot
                </button>
              </div>
            )}

            <p className="text-xs text-blue-600 leading-relaxed">
              📌 Our team will confirm your class schedule after enrollment.
            </p>
          </div>
        )}
      </div>

      {/* Terms */}
      <div>
        <label className={labelClass}>Do you agree to the school&apos;s terms and conditions? *</label>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
          <p className="text-sm text-blue-800 leading-relaxed">
            📢 <strong>Please note:</strong> The primary communication platform for announcements will be{' '}
            <strong>Telegram</strong>, in shaa Allaah.
          </p>
        </div>
        <div className="flex gap-3">
          {["Yes", "No"].map(opt => (
            <button key={opt} type="button" onClick={() => set('agreeToTerms', opt)}
              className={`flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-colors
                ${formData.agreeToTerms === opt
                  ? opt === "Yes"
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-red-400 bg-red-50 text-red-600'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
              {opt}
            </button>
          ))}
        </div>
        {formData.agreeToTerms === "No" && (
          <p className="text-xs text-red-500 mt-2">
            You must agree to the terms and conditions to complete your enrollment.
          </p>
        )}
      </div>
    </div>
  )
}