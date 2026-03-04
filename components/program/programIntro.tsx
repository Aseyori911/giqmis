'use client'

import Link from 'next/link'
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
            Gladtidings Institute for Qur&apos;an Memorization and Islamic Studies for Females is dedicated to teaching the Qur&apos;an and authentic Islamic knowledge exclusively to females.
          </p>
        </div>

        {/* Two program cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAM_TYPES.map(program => (
            <div key={program.key}
              className={`rounded-2xl border-2 ${program.border} bg-white dark:bg-stone-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group`}>

              {/* Card header */}
              <div className={`bg-gradient-to-r ${program.color} p-6 text-white`}>
                <div className="text-4xl mb-2">{program.emoji}</div>
                <h3 className="text-2xl font-bold">{program.title}</h3>
                <p className="text-white/80 text-sm mt-1">{program.subtitle}</p>
              </div>

              {/* Card body */}
              <div className="p-6">
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
                <Link href={program.href}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r ${program.color} hover:opacity-90 transition-opacity`}>
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