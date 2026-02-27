'use client'

import Link from 'next/link'
import { useState } from 'react'
import Registerbtn from '@/components/registration'

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-35 text-center min-h-[400px] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-5">Sponsor a Student</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-white/80">
          Give a child the gift of Quranic education. Your generosity can change a life forever.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/sponsor-details"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Sponsor a Student
          </Link>
          <Registerbtn />
        </div>
      </div>
    </section>
  )
}