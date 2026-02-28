import ArabicSchoolModals from "@/components/herobtn";
import WhyChooseUs from "./whyChooseUs";
import ProgramsSlider from "./programsSlider";
import CTASection from "./CTASection";
import Testimonials from "./testimonials";
import ScrollToTop from "../scrollToTop";

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-stone-900 transition-colors">
      <ArabicSchoolModals />
      <WhyChooseUs />
      <ProgramsSlider />
      <CTASection />
      <Testimonials />
      <ScrollToTop />
    </div>
  );
}