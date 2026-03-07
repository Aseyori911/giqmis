'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { SPECIAL_WORKSHOPS } from '../program/data'
import { courseData, COURSE_CARDS } from './data'

type Props = {
  onSelect: (courseKey: string) => void
}

export default function CourseList({ onSelect }: Props) {
  const w = SPECIAL_WORKSHOPS
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const total = COURSE_CARDS.length

  const go = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((index + total) % total)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating, total])

  const prev = () => go(current - 1)
  const next = () => go(current + 1)

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => go(current + 1), 5000)
    return () => clearInterval(timer)
  }, [current, go])

  const course = COURSE_CARDS[current]
  const courseDetail = courseData[course.courseKey]

  return (
    <div className="p-8 bg-gray-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-7">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Our Courses
          </span>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">
            Explore Our Programs
          </h2>
          <div className="bg-orange-500 w-16 h-1 mx-auto mb-5" />
          <p className="text-slate-500 dark:text-stone-400 max-w-2xl mx-auto">
            {w.intro}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-10">

          {/* Card */}
          <div
            className={`bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-md flex flex-col sm:flex-row transition-opacity duration-400
              ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>

            {/* Image */}
            <div className="relative w-full sm:w-[260px] h-[220px] sm:h-auto flex-shrink-0">
              <Image
                src={courseDetail.image}
                alt={course.title}
                fill
                sizes="(max-width: 640px) 100vw, 260px"
                className="object-cover"
              />
              {/* Slide counter badge */}
              <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {current + 1} / {total}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                {/* Rating */}
                {/* <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < Math.floor(courseDetail.rating) ? 'text-orange-400' : 'text-gray-300'}`}>★</span>
                  ))}
                  <span className="text-xs text-slate-500 dark:text-stone-400 ml-1">
                    {courseDetail.rating} ({courseDetail.reviews} reviews)
                  </span>
                </div> */}

                <h4 className="text-xl font-bold mb-2 text-slate-800 dark:text-stone-100">
                  {course.title}
                </h4>
                <p className="text-slate-600 dark:text-stone-400 mb-5 leading-relaxed text-sm">
                  {course.description}
                </p>

                {/* Features preview */}
                <div className="grid grid-cols-2 gap-1.5 mb-5">
                  {courseDetail.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-stone-400">
                      <span className="text-orange-500">✓</span>
                      {f.text}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelect(course.courseKey)}
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors font-medium w-fit text-sm">
                View Details <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 bg-white dark:bg-stone-700 border border-gray-200 dark:border-stone-600 rounded-full shadow-md flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 transition-colors">
            <ChevronLeft size={18} className="text-slate-600 dark:text-stone-300" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 bg-white dark:bg-stone-700 border border-gray-200 dark:border-stone-600 rounded-full shadow-md flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 transition-colors">
            <ChevronRight size={18} className="text-slate-600 dark:text-stone-300" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {COURSE_CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300
                ${i === current
                  ? 'bg-orange-500 w-6 h-2.5'
                  : 'bg-gray-300 dark:bg-stone-600 w-2.5 h-2.5 hover:bg-orange-300'}`}
            />
          ))}
        </div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-4 gap-2 mb-12">
          {COURSE_CARDS.map((c, i) => (
            <button
              key={c.courseKey}
              onClick={() => go(i)}
              className={`relative rounded-xl overflow-hidden h-16 border-2 transition-all duration-200
                ${i === current
                  ? 'border-orange-500 opacity-100 shadow-md'
                  : 'border-transparent opacity-50 hover:opacity-80'}`}>
              <Image
                src={courseData[c.courseKey].image}
                alt={c.title}
                fill
                sizes="100px"
                className="object-cover"
              />
              {i === current && (
                <div className="absolute inset-0 bg-orange-500/20" />
              )}
            </button>
          ))}
        </div>

        {/* Workshop Benefits */}
        <div className="bg-white dark:bg-stone-800 rounded-xl border border-gray-200 dark:border-stone-700 p-6">
          <h3 className="font-bold text-slate-800 dark:text-stone-100 mb-4">
            Workshop Benefits
          </h3>
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
    </div>
  )
}