import { Lock, Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({ password, setPassword, showPassword, setShowPassword, error }: {
  password: string
  setPassword: (v: string) => void
  showPassword: boolean
  setShowPassword: (v: boolean) => void
  error: string
}) {
  return (
    <div className="mb-6">
      <label className="block text-xs font-bold text-stone-600 mb-2 uppercase tracking-wider">
        Admin Password
      </label>
      <div className="relative">
        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter admin password"
          required
          className={`w-full py-2.5 pl-10 pr-10 rounded-lg text-sm bg-white outline-none border transition-all
            ${error
              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
            }`}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-orange-500 transition">
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">⚠ {error}</p>}
    </div>
  )
}