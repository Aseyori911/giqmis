import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Passwords } from './types'
import Section from './section'

const inputCls = 'w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200'
const labelCls = 'block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5'

export default function PasswordSection() {
  const [passwords, setPasswords] = useState<Passwords>({ current: '', newPass: '', confirm: '' })
  const [passError, setPassError] = useState('')
  const [passSaved, setPassSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePasswordChange = async () => {
    setPassError('')

    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      setPassError('Please fill in all password fields.'); return
    }
    if (passwords.newPass !== passwords.confirm) {
      setPassError('New passwords do not match.'); return
    }
    if (passwords.newPass.length < 8) {
      setPassError('Password must be at least 8 characters.'); return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current: passwords.current,
          newPassword: passwords.newPass,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setPassError(data.error || 'Failed to update password.')
        return
      }

      setPassSaved(true)
      setPasswords({ current: '', newPass: '', confirm: '' })
      setTimeout(() => setPassSaved(false), 2500)
    } catch {
      setPassError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section title="Change Password" icon={<Lock size={15} className="text-green-700" />}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelCls}>Current Password</label>
          <input type="password" className={inputCls} placeholder="••••••••"
            value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} />
        </div>
        <div>
          <label className={labelCls}>New Password</label>
          <input type="password" className={inputCls} placeholder="••••••••"
            value={passwords.newPass} onChange={e => setPasswords({ ...passwords, newPass: e.target.value })} />
        </div>
        <div>
          <label className={labelCls}>Confirm New Password</label>
          <input type="password" className={inputCls} placeholder="••••••••"
            value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
        </div>
      </div>

      {passError && <p className="mt-3 text-sm text-red-600">⚠ {passError}</p>}

      <div className="flex items-center gap-3 mt-4">
        <button onClick={handlePasswordChange} disabled={loading}
          className="flex items-center gap-1.5 px-5 py-2 bg-stone-800 hover:bg-stone-900 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors">
          <Lock size={14} /> {loading ? 'Updating…' : 'Update Password'}
        </button>
        {passSaved && <span className="text-sm text-green-700 font-semibold">✓ Password updated!</span>}
      </div>
    </Section>
  )
}