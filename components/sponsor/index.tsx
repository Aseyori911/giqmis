import HeroBanner from "./heroBanner";
import WhySponsored from "./whySponsored";
import SponsorTiers from './sponsorTiers'
import SponsorFAQ from "./sponsorFAQ";
import CTASection from "./CTASection";
import ScrollToTop from "../scrollToTop";

export default function SponsorPage() {
  return (
    <div className="bg-white dark:bg-stone-900 transition-colors">
      <HeroBanner />
      <WhySponsored />
      <SponsorTiers />
      <SponsorFAQ />
      <CTASection />
      <ScrollToTop />
    </div>
  );
}