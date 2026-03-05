'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { ONLINE_AGE_GROUPS } from '@/components/program/data'

export default function OnlinePage() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [showEnrollModal, setShowEnrollModal] = useState(false)

  const selected = ONLINE_AGE_GROUPS.find(g => g.key === selectedGroup)

  return (
    <div className="bg-white dark:bg-stone-900 min-h-screen transition-colors">

      {/* Hero */}
      <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-20 text-center min-h-[350px] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-5xl mb-4">💻</div>
          <h1 className="text-4xl font-bold mb-3">Online Program</h1>
          <p className="text-orange-400 font-semibold text-lg mb-3">Learn From Anywhere</p>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
            Flexible, well-organized learning with full programs or individual subjects, live and pre-recorded lessons, one-on-one interaction, and continuous assessments.
          </p>
          <ul className="flex justify-center gap-2 mt-5 text-sm">
            <li><Link href="/" className="text-orange-400 hover:underline">Home</Link></li>
            <li className="text-white/50">/</li>
            <li><Link href="/Programs" className="text-orange-400 hover:underline">Programs</Link></li>
            <li className="text-white/50">/</li>
            <li className="text-white">Online</li>
          </ul>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* Back */}
        <Link href="/Programs"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 transition-colors">
          <ArrowLeft size={16} /> 
        </Link>

        {/* Age Groups */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mb-2">
              Choose Your Age Group
            </h2>
            <div className="bg-orange-500 w-12 h-1 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-stone-400 text-sm">
              Click on any group to view subjects and enrollment options
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ONLINE_AGE_GROUPS.map(group => (
              <button key={group.key}
                onClick={() => setSelectedGroup(group.key === selectedGroup ? null : group.key)}
                className={`text-left rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-md
                  ${selectedGroup === group.key
                    ? 'border-orange-400 bg-orange-50 dark:bg-stone-800 shadow-md'
                    : 'border-gray-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-orange-300'}`}>
                <div className="text-3xl mb-2">{group.emoji}</div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-bold text-slate-800 dark:text-stone-100">{group.label}</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                    Ages {group.ages}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-stone-400 leading-relaxed mb-3">
                  {group.intro}
                </p>
                <span className="text-xs font-semibold text-orange-500 flex items-center gap-1">
                  {selectedGroup === group.key ? 'Hide details ↑' : 'View details & enroll →'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Expanded group detail */}
        {selected && (
          <div className="bg-gray-50 dark:bg-stone-800 rounded-2xl border border-gray-200 dark:border-stone-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{selected.emoji}</span>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-stone-100">
                  {selected.label} Program
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                  Ages {selected.ages}
                </span>
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-6">
              <h4 className="font-bold text-slate-700 dark:text-stone-200 mb-3">📚 Subjects</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selected.subjects.map((s, i) => (
                  <div key={i} className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-gray-100 dark:border-stone-700">
                    <p className="font-semibold text-sm text-slate-800 dark:text-stone-100">{s.name}</p>
                    <p className="text-xs text-slate-500 dark:text-stone-400 mt-0.5">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="mb-6">
              <h4 className="font-bold text-slate-700 dark:text-stone-200 mb-3">🎯 Enrollment Options</h4>
              <div className="space-y-2">
                {selected.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-stone-400">
                    <span className="text-orange-500 font-bold">•</span> {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Format */}
            <div className="mb-8">
              <h4 className="font-bold text-slate-700 dark:text-stone-200 mb-3">📋 Class Format</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selected.format.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-stone-400">
                    <span className="text-orange-500 font-bold mt-0.5">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setShowEnrollModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition-colors">
              Enroll Now <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Enroll modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative">
            <button onClick={() => setShowEnrollModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-stone-800 rounded-lg">
              <X className="w-5 h-5 text-slate-500" />
            </button>
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-stone-100 mb-2">Ready to Enroll?</h3>
            <p className="text-slate-500 dark:text-stone-400 text-sm mb-6">
              Complete the enrollment form on our homepage to register. Our team will contact you within 24–48 hours to confirm your spot.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/"
                className="inline-flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition-colors">
                Go to Enrollment Form <ArrowRight size={16} />
              </Link>
              <button onClick={() => setShowEnrollModal(false)}
                className="py-3 border border-gray-200 text-slate-600 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}