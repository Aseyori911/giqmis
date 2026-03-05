'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function OnsitePage() {
  return (
    <div className="bg-white dark:bg-stone-900 min-h-screen transition-colors">

      {/* Hero — matches site style */}
      <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-20 text-center min-h-[350px] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-5xl mb-4">🏫</div>
          <h1 className="text-4xl font-bold mb-3">Onsite Program</h1>
          <p className="text-orange-400 font-semibold text-lg mb-3">Ibadan Madrasah</p>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
            A structured full curriculum with supervised classes on weekdays and weekends. Hostel accommodation is available for eligible students.
          </p>
          <ul className="flex justify-center gap-2 mt-5 text-sm">
            <li><Link href="/" className="text-orange-400 hover:underline">Home</Link></li>
            <li className="text-white/50">/</li>
            <li><Link href="/Programs" className="text-orange-400 hover:underline">Programs</Link></li>
            <li className="text-white/50">/</li>
            <li className="text-white">Onsite</li>
          </ul>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">

        {/* Back */}
        <Link href="/en/Programs"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 transition-colors">
          <ArrowLeft size={16} /> Back to Programs
        </Link>

        {/* About */}
        <div className="bg-gray-50 dark:bg-stone-800 rounded-2xl border border-gray-200 dark:border-stone-700 p-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mb-2">
            About the Onsite Program
          </h2>
          <div className="bg-orange-500 w-12 h-1 mb-5" />
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
              <div key={i} className="flex items-start gap-3 bg-white dark:bg-stone-900 rounded-xl p-4 border border-gray-100 dark:border-stone-700">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-sm text-slate-800 dark:text-stone-100">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-stone-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA — matches site orange CTA style */}
        <div className="text-center bg-orange-500 rounded-2xl p-10 text-white">
          <h3 className="text-2xl font-bold mb-3">Ready to Join Our Madrasah?</h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            For onsite enrollment, hostel availability, and scheduling — contact us directly via WhatsApp or visit us in Ibadan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/Contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-500 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
              Contact Us <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/2348071032546"  target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
              📱 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}