import { Trash2, Mail } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { ContactMessage } from './types'

export default function MessagesTab({ messages, loading, unreadCount, onRefresh }: {
  messages: ContactMessage[]
  loading: boolean
  unreadCount: number
  onRefresh: () => void
}) {
  const markRead = async (id: string) => {
    await fetch('/api/admin/messages', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    onRefresh()
  }

  const deleteMessage = async (id: string) => {
    await fetch('/api/admin/messages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    toast.success('Message deleted')
    onRefresh()
  }

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
      <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
        <h2 className="text-sm font-bold text-stone-700">Contact Messages ({messages.length})</h2>
        <span className="text-xs text-stone-400">{unreadCount} unread</span>
      </div>
      {loading ? <p className="text-center text-stone-400 text-sm py-12">Loading…</p>
        : messages.length === 0 ? (
          <div className="text-center py-16">
            <Mail size={32} className="mx-auto text-stone-200 mb-3" />
            <p className="text-stone-400 text-sm">No messages yet.</p>
            <p className="text-stone-300 text-xs mt-1">Messages from the contact form will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-50">
            {messages.map(msg => (
              <div key={msg.id} className={`p-5 hover:bg-stone-50 transition-colors ${!msg.read ? 'bg-blue-50/40 border-l-4 border-l-blue-400' : ''}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-sm font-bold text-stone-800">{msg.name}</p>
                      {!msg.read && <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>}
                    </div>
                    <div className="flex flex-wrap gap-3 mb-2">
                      <a href={`mailto:${msg.email}`} className="text-xs text-orange-500 hover:underline flex items-center gap-1">
                        <Mail size={11} /> {msg.email}
                      </a>
                      {msg.phone && (
                        <a href={`https://wa.me/${msg.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline">
                          📱 {msg.phone}
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed bg-stone-50 rounded-lg px-3 py-2">{msg.message}</p>
                    <p className="text-xs text-stone-400 mt-2">
                      {new Date(msg.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {!msg.read && (
                      <button onClick={() => markRead(msg.id)} className="px-3 py-1.5 border border-stone-200 rounded-lg text-xs text-stone-500 hover:bg-stone-100 transition-colors whitespace-nowrap">
                        Mark Read
                      </button>
                    )}
                    <button onClick={() => deleteMessage(msg.id)} className="p-1.5 border border-red-200 rounded-lg text-red-400 hover:bg-red-50 transition-colors flex items-center justify-center">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}