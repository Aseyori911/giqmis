'use client'

import { useTranslations } from 'next-intl'

export default function HeroBanner() {
  const t = useTranslations('contact')

  return (
    <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-35 text-center min-h-[400px] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">{t('pageTitle')}</h2>
        <p className="text-lg text-white max-w-3xl mx-auto">{t('pageSubtitle')}</p>
      </div>
    </section>
  )
}