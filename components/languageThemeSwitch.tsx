'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Sun, Moon, Monitor, ChevronDown, Globe } from 'lucide-react'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
]

const themes = [
  { value: 'light',  label: 'Light',  icon: <Sun size={14} /> },
  { value: 'dark',   label: 'Dark',   icon: <Moon size={14} /> },
  { value: 'system', label: 'System', icon: <Monitor size={14} /> },
]

export default function LanguageThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    router.refresh()
    setOpen(false)
  }

  const currentLang = languages.find(l => l.code === locale)

  // Avoid hydration mismatch by not rendering theme icon until mounted
  if (!mounted) return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-gray-600">
      <Globe size={14} className="text-orange-500" />
      <span>{currentLang?.label}</span>
    </div>
  )

  const currentThemeIcon = themes.find(t => t.value === theme)?.icon ?? <Monitor size={14} />

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-gray-600 dark:text-gray-300 hover:border-orange-400 transition-colors">
        <Globe size={14} className="text-orange-500" />
        <span>{currentLang?.label}</span>
        <span className="text-stone-300 dark:text-stone-600">|</span>
        <span className="text-orange-500">{currentThemeIcon}</span>
        <ChevronDown size={13} className={`text-stone-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-700">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Language</p>
            {languages.map(l => (
              <button key={l.code} onClick={() => switchLocale(l.code)}
                className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors flex items-center justify-between
                  ${locale === l.code
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-stone-50 dark:hover:bg-stone-700'}`}>
                {l.label}
                {locale === l.code && <span className="text-orange-500 text-xs">✓</span>}
              </button>
            ))}
          </div>

          <div className="px-3 py-2">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Theme</p>
            {themes.map(t => (
              <button key={t.value} onClick={() => { setTheme(t.value); setOpen(false) }}
                className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2
                  ${theme === t.value
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-stone-50 dark:hover:bg-stone-700'}`}>
                <span className="text-orange-500">{t.icon}</span>
                {t.label}
                {theme === t.value && <span className="ml-auto text-orange-500 text-xs">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}