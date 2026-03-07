import { CheckCircle } from 'lucide-react'
import { STEP_LABELS } from './data'

type Props = {
  step: number
  totalSteps: number
}

export default function ProgressBar({ step, totalSteps }: Props) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-col items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-colors
              ${i + 1 < step ? 'bg-orange-600 text-white' :
                i + 1 === step ? 'bg-orange-600 text-white ring-4 ring-orange-100' :
                'bg-gray-100 text-gray-400'}`}>
              {i + 1 < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-[10px] text-center hidden sm:block ${i + 1 === step ? 'text-orange-600 font-semibold' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div className="bg-orange-600 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} />
      </div>
    </div>
  )
}