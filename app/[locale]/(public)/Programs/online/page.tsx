'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ONLINE_AGE_GROUPS } from '@/components/program/data'
import Registerbtn from '@/components/registration'
// import Registerbtn from '@/components/herobtn/registerbtn'

export default function OnlinePage() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const selected = ONLINE_AGE_GROUPS.find(g => g.key === selectedGroup)

  return (
    <div className="bg-white dark:bg-stone-900 min-h-screen transition-colors">

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-5xl mb-4">💻</div>
          <h1 className="text-4xl font-bold mb-4">Online Program</h1>
          <p className="text-orange-300 text-lg mb-2">Learn From Anywhere</p>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
            Flexible, well-organized learning with full programs or individual subjects,
            live and pre-recorded lessons, one-on-one interaction, and continuous assessments.
          </p>
        </div>
      </section>

      {/* Back */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <Link
          href="/en/Programs"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Programs
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* Age Groups */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mb-2">
              Choose Your Age Group
            </h2>
            <p className="text-slate-500 dark:text-stone-400 text-sm">
              Click on any group to view subjects and enrollment options
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ONLINE_AGE_GROUPS.map(group => (
              <button
                key={group.key}
                onClick={() =>
                  setSelectedGroup(group.key === selectedGroup ? null : group.key)
                }
                className={`text-left rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-md
                ${selectedGroup === group.key
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-md'
                    : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-orange-300'
                  }`}
              >
                <div className="text-3xl mb-2">{group.emoji}</div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-slate-800 dark:text-stone-100">
                    {group.label}
                  </h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${group.color}`}>
                    Ages {group.ages}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-stone-400 leading-relaxed mb-3">
                  {group.intro}
                </p>

                <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                  {selectedGroup === group.key
                    ? 'Hide details ↑'
                    : 'View details & enroll →'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Expanded Group */}
        {selected && (
          <div className="bg-orange-50 dark:bg-stone-800 rounded-2xl border border-orange-200 dark:border-stone-700 p-8">

            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{selected.emoji}</span>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-stone-100">
                  {selected.label} Program
                </h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selected.color}`}>
                  Ages {selected.ages}
                </span>
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-6">
              <h4 className="font-bold text-slate-700 dark:text-stone-200 mb-3">
                📚 Subjects
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selected.subjects.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-100 dark:border-stone-700"
                  >
                    <p className="font-semibold text-sm text-slate-800 dark:text-stone-100">
                      {s.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-stone-400 mt-1">
                      {s.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrollment Options */}
            <div className="mb-6">
              <h4 className="font-bold text-slate-700 dark:text-stone-200 mb-3">
                🎯 Enrollment Options
              </h4>
              <div className="space-y-2">
                {selected.options.map((opt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-stone-400"
                  >
                    <span className="text-orange-500 font-bold">•</span>
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Class Format */}
            <div className="mb-6">
              <h4 className="font-bold text-slate-700 dark:text-stone-200 mb-3">
                📋 Class Format
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selected.format.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-stone-400"
                  >
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment */}
            {selected.assessment && selected.assessment.length > 0 && (
              <div className="mb-6">
                <h4 className="font-bold text-slate-700 dark:text-stone-200 mb-3">
                  📊 Assessment & Evaluation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selected.assessment.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-stone-400"
                    >
                      <span className="text-orange-500 font-bold mt-0.5">✓</span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {selected.notes && selected.notes.length > 0 && (
              <div className="mb-8 bg-orange-50 dark:bg-stone-900 border border-orange-200 dark:border-stone-700 rounded-xl p-4">
                <h4 className="font-bold text-slate-700 dark:text-stone-200 mb-3">
                  📌 Additional Notes
                </h4>
                <ul className="space-y-1">
                  {selected.notes.map((n, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-stone-400"
                    >
                      <span className="text-orange-500 font-bold mt-0.5">•</span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Enroll Button */}
            <Registerbtn />

          </div>
        )}
      </div>

    </div>
  )
}