'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ShieldCheck, ExternalLink, EyeOff } from 'lucide-react'

export default function LegalStatus() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* Legal Status Section */}
      <section className="py-16 bg-stone-50 dark:bg-stone-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4">

          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mb-1">
              Our Legal Status 📜
            </h2>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">

            {/* Thumbnail */}
            <button
              onClick={() => setShowModal(true)}
              className="relative w-36 h-48 flex-shrink-0 rounded-xl overflow-hidden border-2 border-emerald-200 dark:border-emerald-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 group"
            >
              <Image
                src="/cac-certificate.jpg"
                alt="CAC Certificate"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ExternalLink className="text-white w-6 h-6" />
              </div>
            </button>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">

              <h3 className="text-lg font-bold text-slate-800 dark:text-stone-100 mb-1">
                Gladtidings Institute for Qur'an Memorization and Islamic Studies for Females
              </h3>

              <p className="text-sm text-slate-500 dark:text-stone-400 mb-2" dir="rtl">
                (معهد البشرى لتحفيظ القرآن و الدراسة الاسلامية للبنات)
              </p>

              <p className="text-sm text-orange-500 font-medium mb-3">
                An Initiative of Gladtidings Academy
              </p>

              <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed mb-4">
                is officially registered with the Corporate Affairs Commission (CAC), ensuring
                that our operations are fully recognized and legitimate.
              </p>

              <div className="inline-flex items-center gap-2 bg-stone-100 dark:bg-stone-700 text-slate-500 dark:text-stone-400 px-3 py-1.5 rounded-lg text-xs font-semibold mb-4">
                <EyeOff size={13} /> RN Number Hidden
              </div>

              <div className="mt-1">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <ShieldCheck size={15} /> View Certificate
                </button>
              </div>
            </div>
          </div>

          {/* Note */}
          <p className="text-center text-slate-400 dark:text-stone-500 text-xs mt-4 max-w-xl mx-auto leading-relaxed">
            Note: The thumbnail shows that we are registered with CAC while keeping sensitive
            details like our RN number private. The full certificate can be shared upon request.
          </p>

        </div>
      </section>

      {/* Fullscreen Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-orange-400 transition-colors flex items-center gap-1 text-sm"
            >
              <X size={18} /> Close
            </button>

            <p className="text-center text-white/60 text-xs mb-3">
              Some sensitive information has been redacted for security purposes.
            </p>

            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/cac-certificate.jpg"
                alt="CAC Certificate"
                width={800}
                height={1100}
                className="w-full h-auto"
              />

              {/* Registration Number — "BUSINESS NAME REGISTRATION NO. 3412056" */}
              <div className="absolute backdrop-blur-lg bg-white/20"
                style={{ top: '26%', left: '15%', width: '70%', height: '4%' }} />

              {/* Date — "Given under my hand at Abuja this 2nd day of July, 2021" */}
              <div className="absolute backdrop-blur-lg bg-white/20"
                style={{ top: '66%', left: '10%', width: '80%', height: '4%' }} />

              {/* QR Code — bottom left */}
              <div className="absolute backdrop-blur-lg bg-white/20"
                style={{ top: '74%', left: '8%', width: '28%', height: '18%' }} />

              {/* Signature — bottom right */}
              <div className="absolute backdrop-blur-lg bg-white/20"
                style={{ top: '74%', left: '58%', width: '32%', height: '18%' }} />
            </div>

            <p className="text-center text-white/40 text-xs mt-3">
              © Gladtidings Academy — CAC Registered
            </p>
          </div>
        </div>
      )}
    </>
  )
}