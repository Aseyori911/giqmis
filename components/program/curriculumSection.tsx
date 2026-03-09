'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { curriculumPoints } from './data'

const methodologyFeatures = [
  { emoji: '🎯', title: 'Learning Approach', desc: "Qur'an-centered, step-by-step progression, active engagement, reflection, and discussion" },
  { emoji: '🗣️', title: 'Communication Method', desc: 'Supportive, interactive instruction; questions and discussions encouraged' },
  { emoji: '💡', title: 'Modern Materials', desc: 'Classical texts combined with interactive digital resources for clear, engaging learning' },
  { emoji: '🧪', title: 'Assessment & Evaluation', desc: 'Regular memorization and comprehension tests, with certificates awarded upon completion' },
  { emoji: '📜', title: 'Rooted in Aqeedah', desc: "All teaching follows the Qur'an and authentic Sunnah, strengthening correct belief and spiritual growth" },
]

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start w-[90%] lg:w-[80%] mx-auto">
          <div>
            {/* We focus on */}
            <h3 className="text-xl font-bold text-slate-800 dark:text-stone-100 mb-4">We Focus On</h3>
            <div className="mb-8">
              {curriculumPoints.map(({ title, desc }) => (
                <div key={title} className="flex items-start mb-4 text-slate-700 dark:text-stone-300">
                  <div className="mr-3 text-orange-500 text-lg mt-0.5">✓</div>
                  <div><strong className="text-slate-800 dark:text-stone-100">{title}</strong> — {desc}</div>
                </div>
              ))}
            </div>

            {/* Methodology */}
            <h3 className="text-xl font-bold text-slate-800 dark:text-stone-100 mb-2">{t('curriculumHeading')}</h3>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed mb-5">{t('curriculumP1')}</p>

            <div className="space-y-3 mb-6">
              {methodologyFeatures.map(({ emoji, title, desc }) => (
                <div key={title} className="flex items-start gap-3 bg-stone-50 dark:bg-stone-800 rounded-lg px-4 py-3 border border-stone-100 dark:border-stone-700">
                  <span className="text-xl flex-shrink-0">{emoji}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-stone-200">{title}</p>
                    <p className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Outcome */}
            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl px-5 py-4">
              <p className="text-sm font-bold text-orange-700 dark:text-orange-400 mb-1">✅ Outcome</p>
              <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed">{t('curriculumP2')}</p>
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