'use client'

import { useTranslations } from 'next-intl'

export default function CTASection() {
  const t = useTranslations('programs_page')

  return (
    <section className="py-20 bg-orange-500 text-white text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h3>
        <p className="mb-8 max-w-2xl mx-auto">{t('ctaSubtitle')}</p>
        <a href="Contact" className="inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          {t('ctaBtn')}
        </a>
      </div>
    </section>
  )
}