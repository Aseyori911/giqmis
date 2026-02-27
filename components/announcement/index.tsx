'use client'

import { useState, useEffect, useCallback } from 'react'
import { GalleryItem, NewsPost, ContactMessage, WaitlistEntry, SponsorEntry, TabType } from './types'
import AnnouncementsTabs from './announcementsTabs'
import GalleryTab from './galleryTab'
import NewsTab from './newsTab'
import MessagesTab from './messagesTab'
import WaitlistTab from './waitlistTab'
import SponsorsTab from './sponsorsTab'

export default function AnnouncementsPage() {
  const [tab, setTab] = useState<TabType>('gallery')
  const [items, setItems] = useState<GalleryItem[]>([])
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [sponsors, setSponsors] = useState<SponsorEntry[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [gRes, nRes, mRes, wRes, sRes] = await Promise.all([
      fetch('/api/admin/gallery'),
      fetch('/api/admin/galleryNews'),
      fetch('/api/admin/messages'),
      fetch('/api/admin/waitlist'),
      fetch('/api/admin/sponsors'),
    ])
    const [gData, nData, mData, wData, sData] = await Promise.all([
      gRes.json(), nRes.json(), mRes.json(), wRes.json(), sRes.json(),
    ])
    setItems(gData.items || [])
    setPosts(nData.posts || [])
    setMessages(mData.messages || [])
    setWaitlist(wData.waitlist || [])
    setSponsors(sData.sponsors || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="p-7 pb-16 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 font-serif">Announcements</h1>
        <p className="text-sm text-stone-400 mt-1">Manage gallery media, news posts, contact messages, waitlist and sponsors</p>
      </div>

      <AnnouncementsTabs
        tab={tab}
        setTab={setTab}
        unreadCount={unreadCount}
        waitlistCount={waitlist.length}
        sponsorsCount={sponsors.length}
      />

      {tab === 'gallery'  && <GalleryTab  items={items}       loading={loading} onRefresh={fetchAll} />}
      {tab === 'news'     && <NewsTab     posts={posts}       loading={loading} onRefresh={fetchAll} />}
      {tab === 'messages' && <MessagesTab messages={messages} loading={loading} unreadCount={unreadCount} onRefresh={fetchAll} />}
      {tab === 'waitlist' && <WaitlistTab waitlist={waitlist} loading={loading} onRefresh={fetchAll} />}
      {tab === 'sponsors' && <SponsorsTab sponsors={sponsors} loading={loading} onRefresh={fetchAll} />}
    </div>
  )
}