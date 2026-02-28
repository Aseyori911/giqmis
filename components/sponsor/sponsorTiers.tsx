'use client'

import { useTranslations } from 'next-intl'

export default function StudentTestimonials() {
  const t = useTranslations('sponsor')
  const students = t.raw('students') as { initials: string; name: string; program: string; year: string; color: string; quote: string }[]

  return (
    <section className="py-20 bg-gray-50 dark:bg-stone-950 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">{t('livesTitle')}</h3>
          <p className="text-slate-500 dark:text-stone-400 max-w-2xl mx-auto">{t('livesSubtitle')}</p>
          <div className="bg-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {students.map(({ initials, name, program, year, color, quote }) => (
            <div key={name}
              className="bg-white dark:bg-stone-800 rounded-2xl shadow-sm p-8 flex flex-col gap-4 hover:-translate-y-2 transition-transform">
              <div className="text-4xl text-orange-200 dark:text-orange-900 font-serif leading-none">&ldquo;</div>
              <p className="text-slate-600 dark:text-stone-400 text-sm leading-relaxed -mt-4">{quote}</p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-stone-700">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-stone-100 text-sm">{name}</p>
                  <p className="text-xs text-slate-400 dark:text-stone-500">{program} · {t('classOf')} {year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}