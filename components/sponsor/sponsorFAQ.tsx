'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function SponsorFAQ() {
  const t = useTranslations('sponsor')
  const faqs = t.raw('faqs') as { question: string; answer: string }[]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white dark:bg-stone-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">{t('faqTitle')}</h3>
          <div className="bg-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map(({ question, answer }, i) => (
            <div key={i} className="border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-slate-800 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                {question}
                <span className="text-orange-500 text-xl">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-slate-500 dark:text-stone-400 text-sm leading-relaxed border-t border-stone-100 dark:border-stone-700 pt-3">
                  {answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}