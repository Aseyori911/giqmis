import MultiCourseDetails from "@/components/programbtnbig";
import MultiCourseDetailsSmallDevice from "@/components/programbtn";
import HeroBanner from "./heroBanner";
import ProgramsSlider from "./programsSlider";
import CurriculumSection from "./curriculumSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import ScrollToTop from "../scrollToTop";

export default function ProgramPage() {
  return (
    <div className="bg-white dark:bg-stone-900 transition-colors">
      <HeroBanner />
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

      <FAQSection />
      <CTASection />
      <ScrollToTop />
    </div>
  )
}