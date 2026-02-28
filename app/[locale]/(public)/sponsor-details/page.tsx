import SupportDetails from '@/components/sponsor/supportDetails'
import SponsorForm from '@/components/sponsor/sponsorForm'

export default function SponsorDetailsPage() {
  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-stone-950 transition-colors">
      <div className="container mx-auto px-4 max-w-4xl">
        <SupportDetails />
        <div className="mt-12">
          <SponsorForm />
        </div>
      </div>
    </div>
  )
}