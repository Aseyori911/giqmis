'use client'

import { useState } from 'react'
import HeroBanner from './heroBanner'
import ProgramIntro from './programIntro'
import ProgramsSlider from './programsSlider'
import CurriculumSection from './curriculumSection'
import ArabicOnlineCourse from './arabicOnlineCourse'
import SpecialWorkshops from './specialWorkshops'
import FAQSection from './FAQSection'
import CTASection from './CTASection'
import ScrollToTop from '../scrollToTop'
import MultiCourseDetails from '@/components/programbtnbig'
import MultiCourseDetailsSmallDevice from '@/components/programbtn'

export default function ProgramPage() {
  const [showEnrollModal, setShowEnrollModal] = useState(false)

  const handleEnroll = () => setShowEnrollModal(true)

  return (
    <div className="bg-white dark:bg-stone-900 transition-colors">
      <HeroBanner />
      <ProgramIntro />
      <ProgramsSlider />
      <CurriculumSection />

      <section className="py-20 bg-gray-50 dark:bg-stone-950 hidden md:block transition-colors">
        <div className="container mx-auto px-4">
          <MultiCourseDetails />
        </div>
      </section>
      <section className="py-20 bg-gray-50 dark:bg-stone-950 md:hidden block transition-colors">
        <div className="container mx-auto px-4">
          <MultiCourseDetailsSmallDevice />
        </div>
      </section>

      <ArabicOnlineCourse onEnroll={handleEnroll} />
      <SpecialWorkshops onEnroll={handleEnroll} />
      <FAQSection />
      <CTASection />
      <ScrollToTop />

      {/* Enroll modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-stone-100 mb-2">
              Ready to Enroll?
            </h3>
            <p className="text-slate-500 dark:text-stone-400 text-sm mb-6">
              Complete the enrollment form on our homepage to register. Our team will contact you within 24–48 hours.
            </p>
            <div className="flex flex-col gap-3">
              <a href="/"
                className="inline-flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors">
                Go to Enrollment Form
              </a>
              <button onClick={() => setShowEnrollModal(false)}
                className="py-3 border border-stone-200 text-slate-600 rounded-lg font-semibold text-sm hover:bg-stone-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}