import { ImageIcon, Newspaper, Mail, BellRing } from 'lucide-react'
import { TabType } from './types'

export default function AnnouncementsTabs({ tab, setTab, unreadCount, waitlistCount }: {
  tab: TabType
  setTab: (t: TabType) => void
  unreadCount: number
  waitlistCount: number
}) {
  const tabs: { key: TabType; label: string; icon: React.ReactNode; badge?: number; badgeColor?: string }[] = [
    { key: 'gallery',   label: 'Gallery Media', icon: <ImageIcon size={15} /> },
    { key: 'news',      label: 'News Posts',    icon: <Newspaper size={15} /> },
    { key: 'messages',  label: 'Messages',      icon: <Mail size={15} />, badge: unreadCount, badgeColor: 'bg-red-500' },
    { key: 'waitlist',  label: 'Waitlist',      icon: <BellRing size={15} />, badge: waitlistCount, badgeColor: 'bg-amber-500' },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-200">
      {tabs.map(t => (
        <button key={t.key} onClick={() => setTab(t.key)}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px
            ${tab === t.key ? 'border-green-600 text-green-700' : 'border-transparent text-stone-400 hover:text-stone-600'}`}>
          {t.icon} {t.label}
          {t.badge != null && t.badge > 0 && (
            <span className={`${t.badgeColor} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none`}>
              {t.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}