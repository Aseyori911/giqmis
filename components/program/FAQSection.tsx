'use client'

import { useTranslations } from 'next-intl'
import { faqs } from './data'

export default function FAQSection() {
  const t = useTranslations('programs_page')

  return (
    <section className="py-20 bg-white dark:bg-stone-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">{t('faqTitle')}</h3>
          <p className="text-slate-500 dark:text-stone-400 max-w-2xl mx-auto">{t('faqSubtitle')}</p>
          <div className="bg-orange-500 border border-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqs.map(({ id, question, answer }) => (
            <div key={id} className="mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-stone-700">
              <input type="checkbox" id={id} className="absolute opacity-0 -z-10 peer" />
              <label htmlFor={id}
                className="flex justify-between p-5 bg-gray-50 dark:bg-stone-800 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45">
                <h4 className="text-slate-800 dark:text-stone-100 text-lg m-0">{question}</h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">+</div>
              </label>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-stone-900 peer-checked:max-h-48">
                <p className="p-5 leading-relaxed text-slate-500 dark:text-stone-400">{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}