'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { PROGRAM_TYPES } from './data'

export default function ProgramIntro() {
  return (
    <section className="py-20 bg-white dark:bg-stone-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4">

        {/* Intro text */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">
            Our Programs
          </h2>
          <div className="bg-orange-500 w-16 h-1 mx-auto mb-6" />
          <p className="text-slate-600 dark:text-stone-400 max-w-3xl mx-auto leading-relaxed text-lg">
            Gladtidings Institute for Qur&apos;an Memorization and Islamic Studies for Females is
            dedicated to teaching the Qur&apos;an and authentic Islamic knowledge exclusively to females.
          </p>
        </div>

        {/* Two program cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAM_TYPES.map(program => (
            <div
              key={program.key}
              className="rounded-2xl border border-gray-200 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Image on top */}
              <div className="w-full overflow-hidden bg-stone-100 dark:bg-stone-700">
                <Image
                  src={program.image}
                  alt={program.title}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              {/* Card body */}
              <div className="p-6">
                {/* Title block */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-stone-100 flex items-center gap-2">
                    <span>{program.emoji}</span>{program.title}
                  </h3>
                  <p className="text-orange-500 text-sm font-semibold mt-0.5 ml-8">{program.subtitle}</p>
                </div>
                <p className="text-slate-600 dark:text-stone-400 leading-relaxed mb-5">
                  {program.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {program.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-700 dark:text-stone-300">
                      <span className="text-orange-500 font-bold mt-0.5">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={program.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors"
                >
                  Explore {program.title} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}