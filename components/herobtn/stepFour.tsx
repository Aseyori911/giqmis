import { Heart, BookOpen, Clock } from 'lucide-react'
import { LEARNING_STYLES, CLASS_TIMES } from './data'
import { FormData } from './types'

type Props = {
  formData: FormData
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const labelClass = "block text-sm font-semibold text-gray-700 mb-1"

export default function StepFour({ formData, onChange, setFormData }: Props) {
  const set = (key: keyof FormData, val: string) => setFormData(p => ({ ...p, [key]: val }))

  return (
    <div className="space-y-5">
      <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
        <p className="text-sm text-emerald-800"><strong>Step 4 of 4 — Preferences & Agreement</strong></p>
      </div>
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
      <div>
        <label className={labelClass}>Why are you interested in joining this online Quran school?</label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea name="whyInterestedInSchool" value={formData.whyInterestedInSchool} onChange={onChange} rows={3}
            placeholder="Tell us why you want to join..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none text-gray-700 placeholder-gray-400" />
        </div>
      </div>
      <div>
        <label className={labelClass}>General Class Time *</label>
        <div className="space-y-2">
          {CLASS_TIMES.map(opt => (
            <button key={opt} type="button" onClick={() => set('classTime', opt)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-sm font-medium text-left transition-colors
                ${formData.classTime === opt
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 text-gray-600 hover:border-emerald-300'}`}>
              <Clock className="w-4 h-4 flex-shrink-0" /> {opt}
            </button>
          ))}
        </div>
        {formData.classTime === "Other" && (
          <div className="mt-3">
            <input type="text" name="otherClassTime" value={formData.otherClassTime} onChange={onChange}
              placeholder="Please specify your preferred time (for private students)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
              required />
          </div>
        )}
      </div>
      <div>
        <label className={labelClass}>Do you agree to the school&apos;s terms and conditions? *</label>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
          <p className="text-sm text-blue-800 leading-relaxed">
            📢 <strong>Please note:</strong> The primary communication platform for announcements will be <strong>Telegram</strong>, in shaa Allaah.
          </p>
        </div>
        <div className="flex gap-3">
          {["Yes", "No"].map(opt => (
            <button key={opt} type="button" onClick={() => set('agreeToTerms', opt)}
              className={`flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-colors
                ${formData.agreeToTerms === opt
                  ? opt === "Yes" ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-red-400 bg-red-50 text-red-600'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
              {opt}
            </button>
          ))}
        </div>
        {formData.agreeToTerms === "No" && (
          <p className="text-xs text-red-500 mt-2">You must agree to the terms and conditions to complete your enrollment.</p>
        )}
      </div>
    </div>
  )
}