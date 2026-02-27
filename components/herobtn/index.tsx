'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import ApplyModal from './applyModal'
import ReadMoreModal from './readMoreModal'
import { FormData, WaitlistData } from './types'
import { INITIAL_FORM_DATA, ALL_COURSES } from './data'

const TOTAL_STEPS = 4

export default function ArabicSchoolModals() {
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [showReadMoreModal, setShowReadMoreModal] = useState(false)
  const [enrollmentOpen, setEnrollmentOpen] = useState(true)
  const [activeCourses, setActiveCourses] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isWaitlistSubmitted, setIsWaitlistSubmitted] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [waitlistData, setWaitlistData] = useState<WaitlistData>({ name: '', phone: '', email: '' })

  useEffect(() => {
    if (!showApplyModal) return
    fetch('/api/admin/settings').then(r => r.json()).then(data => {
      const s = data.settings || {}
      setEnrollmentOpen(s.enrollment_open !== 'false')
      // Filter courses to only those toggled ON in settings
      const active = ALL_COURSES
        .filter(c => s[c.id] === 'true')
        .map(c => c.label)
      setActiveCourses(active)
    }).catch(() => {})
  }, [showApplyModal])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateStep = () => {
    if (step === 1) {
      if (!formData.studentName) { toast.error("Student name is required"); return false }
      if (!formData.parentName) { toast.error("Parent/Guardian name is required"); return false }
      if (!formData.email) { toast.error("Email is required"); return false }
      if (!formData.phone) { toast.error("Phone number is required"); return false }
      if (!formData.studentAge) { toast.error("Age group is required"); return false }
      if (!formData.westernEducationLevel) { toast.error("Western Education Level is required"); return false }
      if (!formData.lastSchoolAttended) { toast.error("Last school attended is required"); return false }
      if (!formData.nationality) { toast.error("Nationality is required"); return false }
    }
    if (step === 2) {
      if (!formData.studiedQuranBefore) { toast.error("Please answer the Quran question"); return false }
      if (!formData.levelOfStudyInterested) { toast.error("Level of study is required"); return false }
    }
    if (step === 3) {
      if (formData.selectedCourses.length < 2) { toast.error("Please select at least 2 courses"); return false }
    }
    if (step === 4) {
      if (!formData.preferredLearningStyle) { toast.error("Preferred learning style is required"); return false }
      if (!formData.goals) { toast.error("Goals are required"); return false }
      if (!formData.classTime) { toast.error("Please select a class time"); return false }
      if (formData.classTime === "Other" && !formData.otherClassTime) { toast.error("Please specify your preferred class time"); return false }
      if (!formData.agreeToTerms) { toast.error("Please respond to the terms and conditions"); return false }
      if (formData.agreeToTerms === "No") { toast.error("You must agree to the terms to enroll"); return false }
    }
    return true
  }

  const resetForm = () => { setFormData(INITIAL_FORM_DATA); setStep(1) }

  const handleNext = () => { if (validateStep()) setStep(s => s + 1) }
  const handleBack = () => setStep(s => s - 1)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateStep() || !enrollmentOpen) return
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedCourses: formData.selectedCourses.join(', '),
          program: formData.selectedCourses.join(', '),
          grade: formData.westernEducationLevel,
        }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Something went wrong.'); return }
      toast.success('Application submitted successfully 🎉')
      setIsSubmitted(true)
      setTimeout(() => { setIsSubmitted(false); setShowApplyModal(false); resetForm() }, 3000)
    } catch { toast.error('Network error. Please check your connection and try again.') }
  }

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(waitlistData),
      })
      if (!res.ok) { toast.error('Failed to save. Please try again.'); return }
      setIsWaitlistSubmitted(true)
    } catch { toast.error('Network error. Please try again.') }
  }

  const closeApplyModal = () => {
    setShowApplyModal(false)
    setIsWaitlistSubmitted(false)
    setWaitlistData({ name: '', phone: '', email: '' })
    resetForm()
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover text-white py-[100px] text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[42px] mb-5">Nurturing Knowledge and Faith</h2>
          <p className="text-lg max-w-[700px] mx-auto mb-[30px] leading-relaxed">
            GLADTIDINGS INSTITUTE provides quality Qur&apos;an memorization and Islamic studies education for females in a supportive and enriching environment.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => setShowApplyModal(true)}
              className="bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Apply Now
            </button>
            <button onClick={() => setShowReadMoreModal(true)}
              className="bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Read More
            </button>
          </div>
        </div>
      </section>

      <ApplyModal
        isOpen={showApplyModal}
        onClose={closeApplyModal}
        enrollmentOpen={enrollmentOpen}
        activeCourses={activeCourses}
        isSubmitted={isSubmitted}
        isWaitlistSubmitted={isWaitlistSubmitted}
        step={step}
        totalSteps={TOTAL_STEPS}
        formData={formData}
        waitlistData={waitlistData}
        onInputChange={handleInputChange}
        setFormData={setFormData}
        setWaitlistData={setWaitlistData}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
        onWaitlistSubmit={handleWaitlistSubmit}
      />

      <ReadMoreModal
        isOpen={showReadMoreModal}
        onClose={() => setShowReadMoreModal(false)}
        onEnrollNow={() => { setShowReadMoreModal(false); setShowApplyModal(true) }}
      />
    </div>
  )
}