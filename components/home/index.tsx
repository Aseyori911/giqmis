import Link from 'next/link'
import { ChevronUp } from 'lucide-react'
import ArabicSchoolModals from '@/components/herobtn'
import WhyChooseUs from './whyChooseUs'
import ProgramsSlider from './programsSlider'
import CTASection from './CTASection'
import Testimonials from './testimonials'

export default function HomePage() {
  return (
    <div>
      <ArabicSchoolModals />
      <WhyChooseUs />
      <ProgramsSlider />
      <CTASection />
      <Testimonials />

      <div className="fixed bottom-5 right-5 z-50">
        <Link
          href="/"
          className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl hover:bg-orange-200 transition-colors"
        >
          <ChevronUp />
        </Link>
      </div>
    </div>
  )
}