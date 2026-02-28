'use client'

import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import HeroBanner from "./heroBanner"
import ContactInfo from "./contactInfo"
import ContactForm from "./contactForm"
import ScrollToTop from "../scrollToTop"

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <div className="bg-white dark:bg-stone-900 transition-colors">
      <HeroBanner />
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <div className="container mx-auto w-[80%]">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mb-6 relative pb-4">
                {t('sendMessage')}
                <span className={`absolute bottom-0 w-12 h-1 bg-orange-500 ${isArabic ? 'right-0' : 'left-0'}`}></span>
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  )
}