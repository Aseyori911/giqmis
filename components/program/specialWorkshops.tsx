'use client'

import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, X, Target } from 'lucide-react'
import { SPECIAL_WORKSHOPS } from './data'
import SpecialCourse from '../specialCourses'

type Workshop = typeof SPECIAL_WORKSHOPS.workshops[number]

function WorkshopModal({ workshop, onClose, onEnroll }: {
  workshop: Workshop
  onClose: () => void
  onEnroll: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">

        <div className="flex items-start justify-between px-6 py-5 border-b border-stone-100 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-900 z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{workshop.emoji}</span>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-stone-100 leading-tight">{workshop.title}</h2>
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Special Course</span>
            </div>
          </div>
          <button onClick={onClose}
            className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors text-stone-400 hover:text-slate-600 flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <div>
            <p className="text-slate-600 dark:text-stone-400 leading-relaxed text-sm">{workshop.description}</p>
            {workshop.fullDescription && (
              <p className="text-slate-500 dark:text-stone-500 leading-relaxed text-sm mt-3">{workshop.fullDescription}</p>
            )}
          </div>

          {workshop.keyLearning && workshop.keyLearning.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-700 dark:text-stone-200 uppercase tracking-wider mb-3 pb-1.5 border-b border-stone-100 dark:border-stone-800">
                Key Learning Areas
              </h3>
              <ul className="space-y-2">
                {workshop.keyLearning.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-stone-400">
                    <ChevronRight size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {workshop.goal && (
            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target size={14} className="text-orange-500 flex-shrink-0" />
                <h4 className="text-sm font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Course Goal</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed">{workshop.goal}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-stone-100 dark:border-stone-800 flex gap-4">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 text-sm font-semibold rounded-lg transition-colors">
            Close
          </button>
          {/* <button onClick={() => { onClose(); onEnroll() }}
            className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
            Enroll Now <ArrowRight size={15} />
          </button> */}
            <SpecialCourse />
        </div>
      </div>
    </div>
  )
}

function WorkshopCard({ workshop, onClick }: { workshop: Workshop; onClick: () => void }) {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl border border-gray-200 dark:border-stone-700 p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-stone-100 flex items-center gap-2">
          <span>{workshop.emoji}</span>
          {workshop.title}
        </h4>
        <p className="text-slate-500 dark:text-stone-400 leading-relaxed text-sm">{workshop.description}</p>
      </div>
      <div className="mt-5">
        <button onClick={onClick}
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm">
          View Details <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}

export default function SpecialWorkshops({ onEnroll }: { onEnroll: () => void }) {
  const w = SPECIAL_WORKSHOPS
  const workshops = w.workshops

  const [page, setPage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selected, setSelected] = useState<Workshop | null>(null)
  const [perPage, setPerPage] = useState(2)

  const totalPages = Math.ceil(workshops.length / perPage)

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 640 ? 1 : 2)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => { setPage(0) }, [perPage])

  const go = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setPage((index + totalPages) % totalPages)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating, totalPages])

  useEffect(() => {
    const timer = setInterval(() => go(page + 1), 5000)
    return () => clearInterval(timer)
  }, [page, go])

  const visibleWorkshops = workshops.slice(page * perPage, page * perPage + perPage)

  return (
    <section className="py-10 bg-gray-50 dark:bg-stone-950 transition-colors">
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

        {/* Carousel — 2 cards per page */}
        <div className="relative mb-8 px-6">
          <div className={`grid gap-4 transition-opacity duration-400 ${perPage === 1 ? 'grid-cols-1' : 'grid-cols-2'}
            ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {visibleWorkshops.map((ws, i) => (
              <WorkshopCard key={page * perPage + i} workshop={ws} onClick={() => setSelected(ws)} />
            ))}
          </div>

          {/* Prev / Next */}
          <button onClick={() => go(page - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-white dark:bg-stone-700 border border-gray-200 dark:border-stone-600 rounded-full shadow-md flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 transition-colors z-10">
            <ChevronLeft size={18} className="text-slate-600 dark:text-stone-300" />
          </button>
          <button onClick={() => go(page + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-white dark:bg-stone-700 border border-gray-200 dark:border-stone-600 rounded-full shadow-md flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 transition-colors z-10">
            <ChevronRight size={18} className="text-slate-600 dark:text-stone-300" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className={`rounded-full transition-all duration-300
                ${i === page
                  ? 'bg-orange-500 w-6 h-2.5'
                  : 'bg-gray-300 dark:bg-stone-600 w-2.5 h-2.5 hover:bg-orange-300'}`}
            />
          ))}
        </div>

        {/* Enroll options */}
        {/* <div className="bg-white dark:bg-stone-800 rounded-2xl border border-gray-200 dark:border-stone-700 p-8 mb-10">
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
              <p className="text-sm font-bold text-slate-700 dark:text-stone-200 mb-1">🎁 Want Access to Everything?</p>
              <p className="text-xs text-slate-500 dark:text-stone-400 mb-3">
                Enroll once and gain full access to all special workshops.
              </p>
              <button onClick={onEnroll}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition-colors">
                🌟 Enroll in Full Bundle <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div> */}

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

      {selected && (
        <WorkshopModal workshop={selected} onClose={() => setSelected(null)} onEnroll={onEnroll} />
      )}
    </section>
  )
}