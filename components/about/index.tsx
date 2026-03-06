import HeroBanner from "./heroBanner";
import AboutStory from "./aboutStory";
import MissionVision from "./missionVision";
import CoreValues from "./coreValues";
import TeamSection from "./teamSection";
import JourneyTimeline from "./journeyTimeline";
import LegalStatus from "./legalStatus";
import CTASection from "./CTASection";
import ScrollToTop from "../scrollToTop";

export default function AboutPage() {
  return (
    <div>
      <HeroBanner />
      <AboutStory />
      <MissionVision />
      <CoreValues />
      <TeamSection />
      <JourneyTimeline />
      <LegalStatus />
      <CTASection />
      <ScrollToTop />
    </div>
  );
}