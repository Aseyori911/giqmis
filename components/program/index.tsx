'use client'

import HeroBanner from './heroBanner'
import ProgramIntro from './programIntro'
import TeachingMethod from './teachingMethod'
// import ProgramsSlider from './programsSlider'
import CurriculumSection from './curriculumSection'
import ArabicOnlineCourse from './arabicOnlineCourse'
// import SpecialWorkshops from './specialWorkshops'
import FAQSection from './FAQSection'
import CTASection from './CTASection'
import TeacherApply from './teacherApply'
import ScrollToTop from '../scrollToTop'
import MultiCourseDetails from '@/components/programbtnbig'
import MultiCourseDetailsSmallDevice from '@/components/programbtn'

export default function ProgramPage() {
  return (
    <div className="bg-white dark:bg-stone-900 transition-colors">
      <HeroBanner />
      <ProgramIntro />
      <TeachingMethod />
      {/* <ProgramsSlider /> */}
      <CurriculumSection />

      <section className="py-5 bg-gray-50 dark:bg-stone-950 hidden md:block transition-colors">
        <div className="container mx-auto px-4">
          <MultiCourseDetails />
        </div>
      </section>
      <section className="py-5 bg-gray-50 dark:bg-stone-950 md:hidden block transition-colors">
        <div className="container mx-auto px-4">
          <MultiCourseDetailsSmallDevice />
        </div>
      </section>

      <ArabicOnlineCourse />
      {/* <SpecialWorkshops onEnroll={() => {}} /> */}
      <TeacherApply />
      <FAQSection />
      <CTASection />
      <ScrollToTop />
    </div>
  )
}