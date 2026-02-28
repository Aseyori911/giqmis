'use client'

import { useTranslations } from 'next-intl'

export default function HeroBanner() {
  const t = useTranslations('gallery')

  return (
    <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-32 text-center min-h-[400px] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-4">{t('pageTitle')}</h2>
        <p className="text-lg text-white max-w-3xl mx-auto">{t('pageSubtitle')}</p>
      </div>
    </section>
  )
}