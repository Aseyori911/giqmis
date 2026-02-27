'use client'

import { useState } from 'react'
import { faqs } from './data'

export default function SponsorFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h3>
          <div className="bg-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map(({ question, answer }, i) => (
            <div key={i} className="border border-stone-200 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-slate-800 hover:bg-stone-50 transition-colors">
                {question}
                <span className="text-orange-500 text-xl">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-slate-500 text-sm leading-relaxed border-t border-stone-100 pt-3">
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