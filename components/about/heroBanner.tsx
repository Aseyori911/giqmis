'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function HeroBanner() {
  const t = useTranslations('about')
  const nav = useTranslations('nav')
  const locale = useLocale()

  return (
    <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-35 text-center min-h-[400px] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-5">{t('pageTitle')}</h2>
        <ul className="flex justify-center list-none">
          <li className="mx-1">
            <Link href={`/${locale}`} className="text-orange-500 no-underline">
              {nav('home')}
            </Link>
          </li>
          <li className="mx-1">{t('pageTitle')}</li>
        </ul>
      </div>
    </section>
  )
}