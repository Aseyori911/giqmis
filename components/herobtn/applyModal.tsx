import { X, GraduationCap, BellRing, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import Modal from './modal'
import ProgressBar from './progressBar'
import WaitlistForm from './waitlistForm'
import StepOne from './stepOne'
import StepTwo from './stepTwo'
import StepThree from './stepThree'
import StepFour from './stepFour'
import { FormData, WaitlistData } from './types'

type Props = {
  isOpen: boolean
  onClose: () => void
  enrollmentOpen: boolean
  activeCourses: string[]
  isSubmitted: boolean
  isWaitlistSubmitted: boolean
  step: number
  totalSteps: number
  formData: FormData
  waitlistData: WaitlistData
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  setWaitlistData: React.Dispatch<React.SetStateAction<WaitlistData>>
  onNext: () => void
  onBack: () => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onWaitlistSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function ApplyModal({
  isOpen, onClose, enrollmentOpen, activeCourses, isSubmitted, isWaitlistSubmitted,
  step, totalSteps, formData, waitlistData, onInputChange, setFormData,
  setWaitlistData, onNext, onBack, onSubmit, onWaitlistSubmit,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${enrollmentOpen ? 'bg-emerald-100' : 'bg-amber-100'}`}>
              {enrollmentOpen
                ? <GraduationCap className="w-6 h-6 text-emerald-600" />
                : <BellRing className="w-6 h-6 text-amber-600" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {enrollmentOpen ? 'School Enrollment' : 'Join the Waitlist'}
              </h2>
              <p className="text-sm text-gray-500">
                {enrollmentOpen ? 'تسجيل في المدرسة' : 'Be the first to know when enrollment opens'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Enrollment Closed */}
        {!enrollmentOpen && (
          <WaitlistForm
            waitlistData={waitlistData}
            onChange={setWaitlistData}
            onSubmit={onWaitlistSubmit}
            onCancel={onClose}
            isSubmitted={isWaitlistSubmitted}
            onClose={onClose}
          />
        )}

        {/* Enrollment Open */}
        {enrollmentOpen && (
          <>
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-2">شكراً لتسجيلكم — Thank you for registering</p>
                <p className="text-sm text-gray-500">Our admissions team will contact you within 2-3 business days</p>
              </div>
            ) : (
              <>
                <ProgressBar step={step} totalSteps={totalSteps} />
                <form onSubmit={onSubmit}>
                  {step === 1 && <StepOne formData={formData} onChange={onInputChange} />}
                  {step === 2 && <StepTwo formData={formData} setFormData={setFormData} />}
                  {step === 3 && <StepThree formData={formData} setFormData={setFormData} activeCourses={activeCourses} />}
                  {step === 4 && <StepFour formData={formData} onChange={onInputChange} setFormData={setFormData} />}

                  <div className="flex gap-4 pt-6 mt-2 border-t border-gray-100">
                    {step > 1 ? (
                      <button type="button" onClick={onBack}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                    ) : (
                      <button type="button" onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                        Cancel
                      </button>
                    )}
                    {step < totalSteps ? (
                      <button type="button" onClick={onNext}
                        className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                        Next <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button type="submit"
                        className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                        Submit Application <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  )
}