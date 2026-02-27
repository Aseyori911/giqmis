import { Globe } from 'lucide-react'
import Toggle from './toggle'
import Section from './section'

const inputCls = 'w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200'
const labelCls = 'block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5'

export default function EnrollmentSection({ enrollOpen, setEnrollOpen, deadline, setDeadline, maxPerClass, setMaxPerClass }: {
  enrollOpen: boolean
  setEnrollOpen: (v: boolean) => void
  deadline: string
  setDeadline: (v: string) => void
  maxPerClass: string
  setMaxPerClass: (v: string) => void
}) {
  return (
    <Section title="Enrollment" icon={<Globe size={15} className="text-green-700" />}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Application Deadline</label>
          <input type="date" className={inputCls} value={deadline} onChange={e => setDeadline(e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Max Students per Class</label>
          <input type="number" className={inputCls} value={maxPerClass} onChange={e => setMaxPerClass(e.target.value)} />
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Enrollment Status</label>
          <div className="flex items-center gap-3">
            <Toggle value={enrollOpen} onChange={setEnrollOpen} />
            <span className="text-sm text-stone-600">
              {enrollOpen ? '✅ Accepting Applications' : '🔒 Enrollment Closed'}
            </span>
          </div>
          {!enrollOpen && (
            <p className="mt-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
              ⚠ The Apply Now form on your website will show an enrollment closed message when this is off.
            </p>
          )}
        </div>
      </div>
    </Section>
  )
}