'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { toast } from 'react-hot-toast'

const inputCls = 'block w-full px-4 py-3 text-base text-gray-700 dark:text-stone-300 bg-white dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded transition-colors focus:border-orange-500 focus:outline-none'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) { toast.error('Failed to send message. Please try again.'); return }
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-green-600" />
      </div>
      <h4 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">Message Sent!</h4>
      <p className="text-green-600 dark:text-green-500 mb-4">We'll get back to you as soon as possible.</p>
      <button onClick={() => setSubmitted(false)}
        className="px-6 py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition-colors">
        Send Another Message
      </button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <input type="text" placeholder="Your Name" required value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
      </div>
      <div className="mb-5">
        <input type="email" placeholder="Your Email" required value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
      </div>
      <div className="mb-5">
        <input type="tel" placeholder="WhatsApp Number" value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputCls} />
      </div>
      <div className="mb-5">
        <textarea placeholder="Your Message" required rows={5} value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          className={`${inputCls} resize-y`} />
      </div>
      <button type="submit" disabled={submitting}
        className="px-8 py-3 bg-orange-500 text-white rounded font-bold transition-colors hover:bg-orange-600 disabled:opacity-50">
        {submitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}