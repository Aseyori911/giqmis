'use client'

import { useTranslations } from 'next-intl'

export default function MissionVision() {
  const t = useTranslations('about')

  return (
    <section className="py-20 bg-gray-50 dark:bg-stone-950 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-[80%] mx-auto">
          <div className="bg-white dark:bg-stone-800 p-10 rounded-lg shadow-sm h-full">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-5 flex items-center">
              <span className="text-3xl mr-4 text-orange-500">🎯</span> {t('missionTitle')}
            </h3>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed">{t('mission')}</p>
          </div>
          <div className="bg-white dark:bg-stone-800 p-10 rounded-lg shadow-sm h-full">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-5 flex items-center">
              <span className="text-3xl mr-4 text-orange-500">👁️</span> {t('visionTitle')}
            </h3>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed">{t('vision')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}