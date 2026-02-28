'use client'

import Link from "next/link";
import Registerbtn from "@/components/registration";
import { useTranslations, useLocale } from 'next-intl'

export default function HeroBanner() {
  const t = useTranslations('sponsor')
  const locale = useLocale()

  return (
    <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-35 text-center min-h-[400px] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-5">{t('pageTitle')}</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-white/80">
          {t('pageSubtitle')}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href={`/${locale}/sponsor-details`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 rounded-full font-semibold transition-colors">
            {t('pageTitle')}
          </Link>
          <div className="rounded-full bg-white px-8 py-3 hover:bg-gray-100 font-semibold transition-colors">
            <Registerbtn />
          </div>
        </div>
      </div>
    </section>
  )
}