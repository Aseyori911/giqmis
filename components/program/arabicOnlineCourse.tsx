'use client'

import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { ARABIC_ONLINE_COURSE } from './data'

export default function ArabicOnlineCourse({ onEnroll }: { onEnroll: () => void }) {
  const [showModal, setShowModal] = useState(false)
  const c = ARABIC_ONLINE_COURSE

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-stone-800 dark:to-stone-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Standalone Course
            </span>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-2">
              {c.title}
            </h2>
            <p className="text-orange-500 font-semibold text-lg mb-3">({c.arabicTitle})</p>
            <div className="bg-orange-500 w-16 h-1 mx-auto mb-5" />
            <p className="text-slate-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              {c.tagline}
            </p>
          </div>

          {/* Highlights grid */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {c.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-stone-300">
                  <span className="text-xl flex-shrink-0">{h.emoji}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors">
              View Full Course Description
            </button>
            <button onClick={onEnroll}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors">
              Enroll in Arabic Online <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Full description modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">

              {/* Modal header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-stone-100">
                    {c.title}
                  </h3>
                  <p className="text-orange-500 font-semibold">({c.arabicTitle})</p>
                </div>
                <button onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <p className="text-slate-600 dark:text-stone-400 leading-relaxed mb-6">
                {c.fullDescription}
              </p>

              {/* What You'll Learn */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-slate-800 dark:text-stone-100 mb-3">
                  What You&apos;ll Learn
                </h4>
                <div className="space-y-2">
                  {c.whatYouLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-stone-50 dark:bg-stone-800 rounded-lg px-4 py-3">
                      <span className="text-xl flex-shrink-0">{item.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm text-slate-800 dark:text-stone-100">{item.title}</p>
                        <p className="text-xs text-slate-500 dark:text-stone-400">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Features */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-slate-800 dark:text-stone-100 mb-3">
                  Course Features
                </h4>
                <div className="space-y-2">
                  {c.courseFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">{f.emoji}</span>
                      <div>
                        <span className="font-semibold text-sm text-slate-800 dark:text-stone-100">{f.title}</span>
                        <span className="text-sm text-slate-500 dark:text-stone-400"> – {f.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who It's For */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-slate-800 dark:text-stone-100 mb-3">
                  Who It&apos;s For
                </h4>
                <ul className="space-y-2">
                  {c.whoItsFor.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-stone-400">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enroll button */}
              <button onClick={() => { setShowModal(false); onEnroll() }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                Start Learning Arabic Online <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}