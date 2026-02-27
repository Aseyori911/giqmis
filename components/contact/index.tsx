import Link from 'next/link'
import { ChevronUp } from 'lucide-react'
import HeroBanner from './heroBanner'
import ContactInfo from './contactInfo'
import ContactForm from './contactForm'

export default function ContactPage() {
  return (
    <div>
      <HeroBanner />

      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <div className="container mx-auto w-[80%]">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 relative pb-4">
                Send Us a Message
                <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500"></span>
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 right-5 z-50">
        <Link href="#"
          className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl hover:bg-orange-200 transition-colors">
          <ChevronUp />
        </Link>
      </div>
    </div>
  )
}