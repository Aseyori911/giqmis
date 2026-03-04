'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function OnsitePage() {
  return (
    <div className="bg-white dark:bg-stone-900 min-h-screen transition-colors">

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-5xl mb-4">🏫</div>
          <h1 className="text-4xl font-bold mb-4">Onsite Program</h1>
          <p className="text-emerald-200 text-lg mb-2">Ibadan Madrasah</p>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
            A structured full curriculum with supervised classes on weekdays and weekends. Hostel accommodation is available for eligible students.
          </p>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <Link href="/Programs"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors">
          <ArrowLeft size={16} /> Back to Programs
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">

        <div className="bg-emerald-50 dark:bg-stone-800 rounded-2xl border border-emerald-200 dark:border-stone-700 p-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mb-4">
            About the Onsite Program
          </h2>
          <p className="text-slate-600 dark:text-stone-400 leading-relaxed mb-6">
            Our Ibadan Madrasah offers a fully supervised learning environment with a structured curriculum covering Qur&apos;an memorization, Tajweed, Arabic language, and Islamic studies. Students benefit from in-person interaction with qualified teachers, a disciplined schedule, and a community of fellow learners.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { emoji: '📅', title: 'Weekday & Weekend Classes', detail: 'Structured daily schedule' },
              { emoji: '🏠', title: 'Hostel Accommodation', detail: 'Available for eligible students' },
              { emoji: '👩‍🏫', title: 'Qualified Teachers', detail: 'Certified female instructors' },
              { emoji: '📋', title: 'Full Curriculum', detail: 'Comprehensive Islamic education' },
              { emoji: '🤝', title: 'In-Person Interaction', detail: 'Direct teacher-student engagement' },
              { emoji: '📊', title: 'Regular Assessments', detail: 'Track and improve progress' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-100 dark:border-stone-700">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-sm text-slate-800 dark:text-stone-100">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-stone-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact to enroll */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-10 text-white">
          <h3 className="text-2xl font-bold mb-3">Ready to Join Our Madrasah?</h3>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
            For onsite enrollment, hostel availability, and scheduling — contact us directly via WhatsApp or visit us in Ibadan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/Contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors">
              Contact Us
            </Link>
            <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
              📱 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}