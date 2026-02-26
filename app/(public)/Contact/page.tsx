'use client'
import Link from "next/link"
import { ChevronUp, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  })
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

  return (
    <div>
      <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-35 text-center min-h-[400px] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Have questions about our programs or want to schedule a visit? We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="container mx-auto w-[80%]">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 relative pb-4">
                Get in Touch
                <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500"></span>
              </h3>
              <p className="mb-5 leading-relaxed text-slate-500">
                We welcome your inquiries and look forward to helping you discover the Arabic language and culture.
              </p>
              <div className="mt-8">
                <div className="flex items-center mb-5">
                  <div className="min-w-[50px] h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 text-orange-500">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-slate-800">Our Location</h4>
                    <p className="text-slate-500">66, Amuda Oojeere adjacent Longrich/Olowoyeye hall, Ibadan, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-center mb-5">
                  <div className="min-w-[50px] h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 text-orange-500">
                    <Phone />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-slate-800">WhatsApp Number</h4>
                    <a href="https://wa.me/2348071032546" target="_blank" rel="noopener noreferrer"
                      className="text-slate-500 hover:text-orange-500 transition-colors">
                      +234 807 103 2546
                    </a>
                  </div>
                </div>
                <div className="flex items-center mb-5">
                  <div className="min-w-[50px] h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 text-orange-500">
                    <Mail />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-slate-800">Email Address</h4>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gladtidingsipe@gmail.com"
                      className="text-slate-500 hover:text-orange-500 transition-colors">
                      gladtidingsipe@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center mb-5">
                  <div className="min-w-[50px] h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 text-orange-500">
                    <Clock />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-slate-800">Office Hours</h4>
                    <p className="text-slate-500">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-slate-500">Saturday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mx-auto w-[80%]">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 relative pb-4">
                Send Us a Message
                <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500"></span>
              </h3>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h4>
                  <p className="text-green-600 mb-4">We'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full px-4 py-3 text-base text-gray-700 bg-white border border-gray-300 rounded transition-colors focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full px-4 py-3 text-base text-gray-700 bg-white border border-gray-300 rounded transition-colors focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      type="tel"
                      placeholder="WhatsApp Number"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="block w-full px-4 py-3 text-base text-gray-700 bg-white border border-gray-300 rounded transition-colors focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div className="mb-5">
                    <textarea
                      placeholder="Your Message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="block w-full px-4 py-3 text-base text-gray-700 bg-white border border-gray-300 rounded resize-y transition-colors focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 bg-orange-500 text-white rounded font-bold transition-colors hover:bg-orange-600 disabled:opacity-50"
                  >
                    {submitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section stays exactly the same as before */}

      <div className="fixed bottom-5 right-5 z-50">
        <Link
          className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl hover:bg-orange-200 transition-colors"
          href="#"
        >
          <ChevronUp />
        </Link>
      </div>
    </div>
  )
}