'use client'

import Registerbtn from '@/components/registration'
import { useTranslations } from 'next-intl'

export default function CTASection() {
  const t = useTranslations('cta')

  return (
    <section className="py-20 bg-orange-500 text-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-5">{t('title')}</h3>
        <p className="max-w-[600px] mx-auto mb-[30px] leading-relaxed">{t('subtitle')}</p>
        <Registerbtn />
      </div>
    </section>
  )
}