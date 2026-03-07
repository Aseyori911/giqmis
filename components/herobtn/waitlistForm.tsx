import { User, Phone, Mail, BellRing } from 'lucide-react'
import { WaitlistData } from './types'

type Props = {
  waitlistData: WaitlistData
  onChange: (data: WaitlistData) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel: () => void
  isSubmitted: boolean
  onClose: () => void
}

const inputClass = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
const labelClass = "block text-sm font-semibold text-gray-700 mb-1"

export default function WaitlistForm({ waitlistData, onChange, onSubmit, onCancel, isSubmitted, onClose }: Props) {
  if (isSubmitted) return (
    <div className="text-center py-12">
      <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <BellRing className="w-10 h-10 text-orange-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">You&apos;re on the list!</h3>
      <p className="text-gray-500 text-sm max-w-sm mx-auto">
        We have saved your details. We will contact you on WhatsApp or email as soon as enrollment opens again.
      </p>
      <button onClick={onClose}
        className="mt-6 px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm">
        Close
      </button>
    </div>
  )

  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <p className="text-sm font-bold text-amber-800 mb-1">Enrollment is Currently Closed</p>
        <p className="text-sm text-amber-700 leading-relaxed">
          We are not accepting new applications at this time. Leave your contact details and we will reach out on WhatsApp as soon as enrollment opens.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Your full name" value={waitlistData.name}
              onChange={e => onChange({ ...waitlistData, name: e.target.value })}
              className={inputClass} required />
          </div>
        </div>
        <div>
          <label className={labelClass}>WhatsApp Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="tel" placeholder="+234 xxx xxx xxxx" value={waitlistData.phone}
              onChange={e => onChange({ ...waitlistData, phone: e.target.value })}
              className={inputClass} required />
          </div>
        </div>
        <div>
          <label className={labelClass}>Email Address <span className="text-gray-400 font-normal">(optional)</span></label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="email" placeholder="your@email.com" value={waitlistData.email}
              onChange={e => onChange({ ...waitlistData, email: e.target.value })}
              className={inputClass} />
          </div>
        </div>
        <div className="flex gap-4 pt-2">
          <button type="button" onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
            Cancel
          </button>
          <button type="submit"
            className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
            <BellRing className="w-4 h-4" /> Notify Me When Open
          </button>
        </div>
        <p className="text-xs text-center text-gray-400">We will only contact you when enrollment is open. No spam.</p>
      </form>
    </>
  )
}