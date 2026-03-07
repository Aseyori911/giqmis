import { User, Users, Mail, Phone, Calendar, GraduationCap, School, Globe } from 'lucide-react'
import { FormData } from './types'

type Props = {
  formData: FormData
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

const inputClass = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
const selectClass = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white text-gray-700"
const labelClass = "block text-sm font-semibold text-gray-700 mb-1"

export default function StepOne({ formData, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
        <p className="text-sm text-orange-800"><strong>Step 1 of 4 — Personal Information</strong></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Student Full Name / اسم الطالب *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" name="studentName" value={formData.studentName} onChange={onChange}
              placeholder="Enter student's full name" className={inputClass} required />
          </div>
        </div>
        <div>
          <label className={labelClass}>Parent/Guardian Name *</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" name="parentName" value={formData.parentName} onChange={onChange}
              placeholder="Parent or guardian full name" className={inputClass} required />
          </div>
        </div>
        <div>
          <label className={labelClass}>Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="email" name="email" value={formData.email} onChange={onChange}
              placeholder="your.email@example.com" className={inputClass} required />
          </div>
        </div>
        <div>
          <label className={labelClass}>Phone/WhatsApp Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="tel" name="phone" value={formData.phone} onChange={onChange}
              placeholder="+234 xxx xxx xxxx" className={inputClass} required />
          </div>
        </div>
        <div>
          <label className={labelClass}>Student Age Group *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select name="studentAge" value={formData.studentAge} onChange={onChange} className={selectClass} required>
              <option value="">Select age</option>
              <option value="6-12">Children (6-12 years)</option>
              <option value="13-18">Teens (13-18 years)</option>
              <option value="19-30">Young Adults (19-30 years)</option>
              <option value="31-50">Adults (31-50 years)</option>
              <option value="51+">Elderly Women (51 years and above)</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Western Education Level *</label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select name="westernEducationLevel" value={formData.westernEducationLevel} onChange={onChange} className={selectClass} required>
              <option value="">Select level</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Tertiary">Tertiary</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <label className={labelClass}>Last School Attended *</label>
        <div className="relative">
          <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" name="lastSchoolAttended" value={formData.lastSchoolAttended} onChange={onChange}
            placeholder="Enter your last school name" className={inputClass} required />
        </div>
      </div>
      <div>
        <label className={labelClass}>Nationality *</label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" name="nationality" value={formData.nationality} onChange={onChange}
            placeholder="e.g. Nigerian" className={inputClass} required />
        </div>
      </div>
      <div>
        <label className={labelClass}>Parent/Guardian Contact <span className="text-gray-400 font-normal">(Required for children & teens)</span></label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="tel" name="parentGuardianContact" value={formData.parentGuardianContact} onChange={onChange}
            placeholder="+234 xxx xxx xxxx" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Next of Kin Contact <span className="text-gray-400 font-normal">(Required for young adults/adults/elderly women)</span></label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="tel" name="nextOfKinContact" value={formData.nextOfKinContact} onChange={onChange}
            placeholder="+234 xxx xxx xxxx" className={inputClass} />
        </div>
      </div>
    </div>
  )
}