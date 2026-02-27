import Link from "next/link";
import { ChevronUp } from "lucide-react";
import HeroBanner from "./heroBanner";
import AboutStory from "./aboutStory";
import MissionVision from "./missionVision";
import CoreValues from "./coreValues";
import TeamSection from "./teamSection";
import JourneyTimeline from "./journeyTimeline";
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
      <CTASection />

      <ScrollToTop />
    </div>
  );
}
