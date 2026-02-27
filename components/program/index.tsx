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

      <ScrollToTop />
    </div>
  );
}
