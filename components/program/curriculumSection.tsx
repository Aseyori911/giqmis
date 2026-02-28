'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { curriculumPoints } from './data'

export default function CurriculumSection() {
  const t = useTranslations('programs_page')

  return (
    <section className="py-20 bg-white dark:bg-stone-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">{t('curriculumTitle')}</h3>
          <p className="text-slate-500 dark:text-stone-400 max-w-2xl mx-auto">{t('curriculumSubtitle')}</p>
          <div className="bg-orange-500 border border-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-[80%] mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mb-5">{t('curriculumHeading')}</h3>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed mb-4">{t('curriculumP1')}</p>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed mb-4">{t('curriculumP2')}</p>
            <div className="mt-8">
              {curriculumPoints.map(({ title, desc }) => (
                <div key={title} className="flex items-center mb-4 text-slate-700 dark:text-stone-300">
                  <div className="mr-4 text-orange-500 text-lg">✓</div>
                  <div><strong className="text-slate-800 dark:text-stone-100">{title}</strong> - {desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://plus.unsplash.com/premium_photo-1679065960816-77d101ec25f4?w=500&auto=format&fit=crop&q=60"
              alt="Students learning" width={500} height={500}
              className="w-full md:h-[750px] sm:hidden block" />
            <Image
              src="https://plus.unsplash.com/premium_photo-1679065960816-77d101ec25f4?w=500&auto=format&fit=crop&q=60"
              alt="Students learning" width={500} height={500}
              className="w-full hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  )
}