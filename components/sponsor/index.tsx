import HeroBanner from "./heroBanner";
import WhySponsored from "./whySponsored";
import SponsorTiers from "./sponsorTiers";
import SponsorForm from "./sponsorForm";
import SponsorFAQ from "./sponsorFAQ";
import CTASection from "./CTASection";
import ScrollToTop from "../scrollToTop";

export default function SponsorPage() {
  return (
    <div>
      <HeroBanner />
      <WhySponsored />
      <SponsorTiers />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <SponsorForm />
        </div>
      </section>

      <SponsorFAQ />
      <CTASection />

      <ScrollToTop />
    </div>
  );
}
