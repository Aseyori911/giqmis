'use client'

import Link from "next/link";
import { useTranslations } from 'next-intl'

export default function CTASection() {
  const t = useTranslations('sponsor')

  return (
    <section className="py-20 bg-orange-500 text-white text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h3>
        <p className="mb-8 max-w-2xl mx-auto">{t('ctaSubtitle')}</p>
        <Link
          href="#sponsor-form"
          className="inline-block px-8 py-3 bg-white text-orange-500 font-bold rounded-lg hover:bg-orange-50 transition-colors">
          {t('ctaBtn')}
        </Link>
      </div>
    </section>
  )
}