import { CheckSquare } from 'lucide-react'
import { FormData } from './types'
import { toast } from 'react-hot-toast'

type Props = {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  activeCourses: string[]
  min?: number        // default 2
  max?: number        // default 3, pass Infinity for no limit
}

const labelClass = "block text-sm font-semibold text-gray-700 mb-1"

export default function StepThree({ formData, setFormData, activeCourses, min = 2, max = 3 }: Props) {
  const handleCourseToggle = (course: string) => {
    setFormData(prev => {
      const already = prev.selectedCourses.includes(course)
      if (already) return { ...prev, selectedCourses: prev.selectedCourses.filter(c => c !== course) }
      if (prev.selectedCourses.length >= max) {
        toast.error(`You can select a maximum of ${max} courses.`)
        return prev
      }
      return { ...prev, selectedCourses: [...prev.selectedCourses, course] }
    })
  }

  const count = formData.selectedCourses.length

  const statusMsg =
    count === 0
      ? min === 1
        ? 'Select at least 1 course'
        : `Select minimum ${min} course${min > 1 ? 's' : ''}`
      : count < min
      ? `Select ${min - count} more course${min - count > 1 ? 's' : ''} (minimum ${min} required)`
      : max === Infinity
      ? `${count} course${count > 1 ? 's' : ''} selected ✓`
      : count === max
      ? `${count} courses selected — maximum reached`
      : `${count} course${count > 1 ? 's' : ''} selected ✓ (you may select ${max - count} more)`

  const statusClass =
    count < min
      ? 'bg-amber-50 text-amber-700'
      : count === max
      ? 'bg-blue-50 text-blue-700'
      : 'bg-orange-50 text-orange-700'

  return (
    <div className="space-y-5">
      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
        <p className="text-sm text-orange-800"><strong>Step 3 of 4 — Course Selection</strong></p>
      </div>

      <div>
        <label className={labelClass}>Which course(s) would you like to enroll in? *</label>

        {activeCourses.length === 0 ? (
          <div className="text-center py-8 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-sm font-semibold text-amber-700">No courses are currently active.</p>
            <p className="text-xs text-amber-600 mt-1">Please contact the school directly to enroll.</p>
          </div>
        ) : (
          <>
            <div className={`text-xs font-semibold mb-3 px-3 py-2 rounded-lg ${statusClass}`}>
              {statusMsg}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeCourses.map(course => {
                const selected = formData.selectedCourses.includes(course)
                const maxReached = max !== Infinity && count >= max && !selected
                return (
                  <button key={course} type="button" onClick={() => handleCourseToggle(course)} disabled={maxReached}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-sm font-medium text-left transition-colors
                      ${selected ? 'border-orange-500 bg-orange-50 text-orange-700' :
                        maxReached ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed' :
                        'border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50/50'}`}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors
                      ${selected ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                      {selected && <CheckSquare className="w-3 h-3 text-white" />}
                    </div>
                    {course}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}