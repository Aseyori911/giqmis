import { Bell } from 'lucide-react'
import { Notifs } from './types'
import Toggle from './toggle'
import Section from './section'

const NOTIF_LABELS: [keyof Notifs, string][] = [
  ['notif_new_app',    'Email on new application submission'],
  ['notif_weekly',     'Weekly enrollment summary report'],
  ['notif_attendance', 'Alert when attendance drops below 75%'],
  ['notif_messages',   'Notify me of new parent messages'],
]

export default function NotificationsSection({ notifs, setNotifs }: {
  notifs: Notifs
  setNotifs: React.Dispatch<React.SetStateAction<Notifs>>
}) {
  return (
    <Section title="Notifications" icon={<Bell size={15} className="text-green-700" />}>
      <p className="text-sm text-stone-500 mb-3">
        Note: Email notifications require an email service like Resend or SendGrid to be connected.
      </p>
      <div className="flex flex-col gap-2">
        {NOTIF_LABELS.map(([k, l]) => (
          <div key={k} className="flex items-center justify-between px-4 py-2.5 bg-stone-50 rounded-lg border border-stone-100">
            <span className="text-sm text-stone-700">{l}</span>
            <Toggle value={notifs[k]} onChange={v => setNotifs({ ...notifs, [k]: v })} />
          </div>
        ))}
      </div>
    </Section>
  )
}