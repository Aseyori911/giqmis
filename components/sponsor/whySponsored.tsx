'use client'

import { useTranslations } from 'next-intl'

export default function WhySponsored() {
  const t = useTranslations('sponsor')
  const reasons = t.raw('whyReasons') as { emoji: string; title: string; description: string }[]

  return (
    <section className="py-20 bg-white dark:bg-stone-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">{t('whyTitle')}</h3>
          <p className="text-slate-500 dark:text-stone-400 max-w-2xl mx-auto">{t('whySubtitle')}</p>
          <div className="bg-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-[80%] mx-auto">
          {reasons.map(({ emoji, title, description }) => (
            <div key={title} className="text-center p-6">
              <div className="w-16 h-16 bg-orange-50 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                {emoji}
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-stone-100 mb-2">{title}</h4>
              <p className="text-slate-500 dark:text-stone-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}