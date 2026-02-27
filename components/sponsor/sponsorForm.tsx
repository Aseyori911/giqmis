'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Mail } from 'lucide-react'

const inputCls = 'block w-full px-4 py-3 text-base text-gray-700 dark:text-stone-300 bg-white dark:bg-stone-900 border border-gray-300 dark:border-stone-700 rounded transition-colors focus:border-orange-500 focus:outline-none'

export default function SponsorForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', tier: '', anonymous: false, message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) { toast.error('Failed to submit. Please try again.'); return }
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', tier: '', anonymous: false, message: '' })
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-10 text-center">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-green-600" />
      </div>
      <h4 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">Thank You!</h4>
      <p className="text-green-600 dark:text-green-500 mb-4">We've received your sponsorship interest. Our team will contact you within 24 hours with payment details.</p>
      <button onClick={() => setSubmitted(false)}
        className="px-6 py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition-colors">
        Submit Another
      </button>
    </div>
  )

  return (
    <form id="sponsor-form" onSubmit={handleSubmit}
      className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm p-8">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mb-6 relative pb-4">
        Sponsorship Interest Form
        <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500"></span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <input type="text" placeholder="Your Full Name *" required value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
        <input type="email" placeholder="Your Email *" required value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <input type="tel" placeholder="WhatsApp Number *" required value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputCls} />
        <select required value={formData.tier}
          onChange={e => setFormData({ ...formData, tier: e.target.value })}
          className={`${inputCls} dark:bg-stone-900`}>
          <option value="">Select Sponsorship Level *</option>
          <option value="seed">🌱 Seed Sponsor — ₦10,000/month</option>
          <option value="full">⭐ Full Sponsor — ₦25,000/month</option>
          <option value="legacy">👑 Legacy Sponsor — ₦50,000/month</option>
          <option value="custom">💛 Custom Amount</option>
        </select>
      </div>

      <div className="mb-5">
        <textarea placeholder="Any message or special request? (optional)" rows={4} value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          className={`${inputCls} resize-y`} />
      </div>

      <div className="mb-6 flex items-center gap-3">
        <input type="checkbox" id="anonymous" checked={formData.anonymous}
          onChange={e => setFormData({ ...formData, anonymous: e.target.checked })}
          className="w-4 h-4 accent-orange-500" />
        <label htmlFor="anonymous" className="text-sm text-slate-600 dark:text-stone-400">
          I would like to sponsor anonymously
        </label>
      </div>

      <button type="submit" disabled={submitting}
        className="px-8 py-3 bg-orange-500 text-white rounded font-bold transition-colors hover:bg-orange-600 disabled:opacity-50">
        {submitting ? 'Submitting…' : 'Submit Sponsorship Interest'}
      </button>
    </form>
  )
}