import { FormData } from './types'

type Props = {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const btnClass = (active: boolean) =>
  `flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-colors
  ${active ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`

const labelClass = "block text-sm font-semibold text-gray-700 mb-1"

export default function StepTwo({ formData, setFormData }: Props) {
  const toggle = (key: keyof FormData, val: string) =>
    setFormData(p => ({ ...p, [key]: val }))

  return (
    <div className="space-y-5">
      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
        <p className="text-sm text-orange-800"><strong>Step 2 of 4 — Quran & Study Background</strong></p>
      </div>

      <div>
        <label className={labelClass}>Have you studied Quran before? *</label>
        <div className="flex gap-3">
          {["Yes", "No"].map(opt => (
            <button key={opt} type="button" onClick={() => toggle('studiedQuranBefore', opt)}
              className={btnClass(formData.studiedQuranBefore === opt)}>{opt}</button>
          ))}
        </div>
      </div>

      {formData.studiedQuranBefore === "Yes" && (
        <div>
          <label className={labelClass}>If yes, what was your previous level of study?</label>
          <div className="flex gap-3">
            {["Beginner", "Intermediate", "Advanced"].map(opt => (
              <button key={opt} type="button" onClick={() => toggle('previousQuranLevel', opt)}
                className={btnClass(formData.previousQuranLevel === opt)}>{opt}</button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className={labelClass}>Do you need help with Quran reading?</label>
        <div className="flex gap-3">
          {["Yes", "No"].map(opt => (
            <button key={opt} type="button" onClick={() => toggle('needsQuranReadingHelp', opt)}
              className={btnClass(formData.needsQuranReadingHelp === opt)}>{opt}</button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>What level of study are you interested in? *</label>
        <div className="flex gap-3">
          {["Beginner", "Intermediate", "Advanced"].map(opt => (
            <button key={opt} type="button" onClick={() => toggle('levelOfStudyInterested', opt)}
              className={btnClass(formData.levelOfStudyInterested === opt)}>{opt}</button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>How would you like to attend? *</label>
        <div className="flex flex-col sm:flex-row gap-3">
          {[
            "Online (Remote Learning)",
            "Day (Attend in Person)",
            "Boarding (Stay with Host)",
          ].map(opt => (
            <button key={opt} type="button" onClick={() => toggle('attendanceMode', opt)}
              className={btnClass(formData.attendanceMode === opt)}>{opt}</button>
          ))}
        </div>
      </div>

    </div>
  )
}