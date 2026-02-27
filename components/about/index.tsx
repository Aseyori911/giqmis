import Link from 'next/link'
import { ChevronUp } from 'lucide-react'
import HeroBanner from './heroBanner'
import AboutStory from './aboutStory'
import MissionVision from './missionVision'
import CoreValues from './coreValues'
import TeamSection from './teamSection'
import JourneyTimeline from './journeyTimeline'
import CTASection from './CTASection'

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

      <div className="fixed bottom-5 right-5 z-50">
        <Link href="/" className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl hover:bg-orange-200 transition-colors">
          <ChevronUp />
        </Link>
      </div>
    </div>
  )
}