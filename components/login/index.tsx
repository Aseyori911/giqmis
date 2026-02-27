'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PasswordInput from './passwordInput'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Login failed.'); setLoading(false); return }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#1c1917_0%,#111827_60%,#0f172a_100%)] font-serif p-4 relative">
      <div className="fixed inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.15),transparent_60%)]" />

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] p-10">

        {/* Logo */}
        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-[0_6px_20px_rgba(249,115,22,0.35)] overflow-hidden">
          <Image src="/Gladtidings_LOGO.JPG" alt="Glad Tidings Logo" fill
            className="object-contain p-2" sizes="56px" priority />
        </div>

        <form onSubmit={handleSubmit}>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={error}
          />
          <button type="submit" disabled={loading || !password}
            className={`w-full py-2.5 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200
              ${loading || !password ? 'bg-orange-200 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.98]'}`}>
            {loading ? 'Verifying…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-stone-400">
          Only authorized staff should access this URL.
        </p>
      </div>
    </div>
  )
}