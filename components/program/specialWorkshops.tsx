'use client'

import { ArrowRight } from 'lucide-react'
import { SPECIAL_WORKSHOPS } from './data'

export default function SpecialWorkshops({ onEnroll }: { onEnroll: () => void }) {
  const w = SPECIAL_WORKSHOPS

  return (
    <section className="py-20 bg-gray-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Special Courses & Workshops
          </span>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">
            Special Courses &amp; Workshops
          </h2>
          <div className="bg-orange-500 w-16 h-1 mx-auto mb-5" />
          <p className="text-slate-500 dark:text-stone-400 max-w-2xl mx-auto">{w.intro}</p>
        </div>

        {/* Workshop cards */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-700 dark:text-stone-200 mb-5">📚 Available Workshops</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {w.workshops.map((workshop, i) => (
              <div key={i}
                className="bg-white dark:bg-stone-800 rounded-xl border border-gray-200 dark:border-stone-700 p-5 hover:border-orange-300 hover:shadow-md transition-all duration-200">
                <div className="text-3xl mb-3">{workshop.emoji}</div>
                <h4 className="font-bold text-slate-800 dark:text-stone-100 mb-2">{workshop.title}</h4>
                <p className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed">{workshop.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enroll options */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl border border-gray-200 dark:border-stone-700 p-8 mb-10">
          <p className="text-center text-slate-600 dark:text-stone-400 mb-6 text-sm">
            Choose any one workshop that suits your current needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <button onClick={onEnroll}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition-colors">
              📖 Enroll in One Workshop <ArrowRight size={16} />
            </button>
            <span className="text-slate-400 font-bold">OR</span>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700 dark:text-stone-200 mb-1">
                🎁 Want Access to Everything?
              </p>
              <p className="text-xs text-slate-500 dark:text-stone-400 mb-3">
                Enroll once and gain full access to all special workshops.
              </p>
              <button onClick={onEnroll}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition-colors">
                🌟 Enroll in Full Bundle <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white dark:bg-stone-800 rounded-xl border border-gray-200 dark:border-stone-700 p-6">
          <h3 className="font-bold text-slate-800 dark:text-stone-100 mb-4">Workshop Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {w.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-stone-400">
                <span className="text-xl flex-shrink-0">{b.emoji}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}