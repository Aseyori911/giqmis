import Link from 'next/link'
import { ChevronUp } from 'lucide-react'
import MultiCourseDetails from '@/components/programbtnbig'
import MultiCourseDetailsSmallDevice from '@/components/programbtn'
import HeroBanner from './heroBanner'
import ProgramsSlider from './programsSlider'
import CurriculumSection from './curriculumSection'
import FAQSection from './FAQSection'
import CTASection from './CTASection'

export default function ProgramPage() {
  return (
    <div>
      <HeroBanner />
      <ProgramsSlider />
      <CurriculumSection />

      <section className="py-20 bg-gray-50 hidden md:block">
        <div className="container mx-auto px-4">
          <MultiCourseDetails />
        </div>
      </section>
      <section className="py-20 bg-gray-50 md:hidden block">
        <div className="container mx-auto px-4">
          <MultiCourseDetailsSmallDevice />
        </div>
      </section>

      <FAQSection />
      <CTASection />

      <div className="fixed bottom-5 right-5 z-50">
        <Link href="/" className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl hover:bg-orange-200 transition-colors">
          <ChevronUp />
        </Link>
      </div>
    </div>
  )
}