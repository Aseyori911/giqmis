'use client'
import { useState, useEffect, useCallback } from 'react'
import { Trash2, Upload, Plus, X, Image as ImageIcon, Newspaper, Mail, BellRing } from 'lucide-react'
import { toast } from 'react-hot-toast'

type GalleryItem = {
  id: string
  title: string
  description: string
  category: string
  media_url: string
  media_type: string
  date_label: string
  created_at: string
}

type NewsPost = {
  id: string
  title: string
  body: string
  image_url: string
  published_at: string
}

type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  read: boolean
  submitted_at: string
}

type WaitlistEntry = {
  id: string
  name: string
  phone: string
  email: string
  submitted_at: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function AnnouncementsPage() {
  const [tab, setTab] = useState<'gallery' | 'news' | 'messages' | 'waitlist'>('gallery')
  const [items, setItems] = useState<GalleryItem[]>([])
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Gallery form
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('classroom')
  const [dateLabel, setDateLabel] = useState('')

  // News form
  const [newsTitle, setNewsTitle] = useState('')
  const [newsBody, setNewsBody] = useState('')
  const [newsFile, setNewsFile] = useState<File | null>(null)
  const [newsPreview, setNewsPreview] = useState('')

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [gRes, nRes, mRes, wRes] = await Promise.all([
      fetch('/api/admin/gallery'),
      fetch('/api/admin/galleryNews'),
      fetch('/api/admin/messages'),
      fetch('/api/admin/waitlist'),
    ])
    const gData = await gRes.json()
    const nData = await nRes.json()
    const mData = await mRes.json()
    const wData = await wRes.json()
    setItems(gData.items || [])
    setPosts(nData.posts || [])
    setMessages(mData.messages || [])
    setWaitlist(wData.waitlist || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'gallery' | 'news') => {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    if (type === 'gallery') { setFile(f); setPreview(url) }
    else { setNewsFile(f); setNewsPreview(url) }
  }

  const uploadToSupabase = (file: File, filename: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(percent)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/gallery/${filename}`
          resolve(publicUrl)
        } else {
          reject(new Error(`Upload failed: ${xhr.responseText}`))
        }
      })

      xhr.addEventListener('error', () => reject(new Error('Network error during upload')))

      xhr.open('POST', `${SUPABASE_URL}/storage/v1/object/gallery/${filename}`)
      xhr.setRequestHeader('Authorization', `Bearer ${SUPABASE_ANON_KEY}`)
      xhr.setRequestHeader('x-upsert', 'false')
      xhr.setRequestHeader('Content-Type', file.type)
      xhr.send(file)
    })
  }

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) { toast.error('Please select a file and enter a title'); return }
    setUploading(true)
    setUploadProgress(0)
    try {
      const ext = file.name.split('.').pop()
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const publicUrl = await uploadToSupabase(file, filename)
      const isVideo = file.type.startsWith('video/')
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description, category,
          media_url: publicUrl,
          media_type: isVideo ? 'video' : 'image',
          date_label: dateLabel,
        }),
      })
      if (!res.ok) { toast.error('Failed to save to database'); return }
      toast.success('Uploaded to gallery!')
      setFile(null); setPreview(''); setTitle(''); setDescription(''); setDateLabel('')
      setUploadProgress(0)
      fetchAll()
    } catch (err) {
      toast.error('Upload failed. Please try again.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleNewsPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsTitle || !newsBody) { toast.error('Title and body required'); return }
    setUploading(true)
    setUploadProgress(0)
    try {
      let imageUrl = ''
      if (newsFile) {
        const ext = newsFile.name.split('.').pop()
        const filename = `news-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        imageUrl = await uploadToSupabase(newsFile, filename)
      }
      const res = await fetch('/api/admin/galleryNews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newsTitle, body: newsBody, image_url: imageUrl }),
      })
      if (!res.ok) { toast.error('Failed to post news'); return }
      toast.success('News post published!')
      setNewsTitle(''); setNewsBody(''); setNewsFile(null); setNewsPreview('')
      setUploadProgress(0)
      fetchAll()
    } catch (err) {
      toast.error('Upload failed. Please try again.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const deleteItem = async (id: string) => {
    await fetch('/api/admin/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    toast.success('Deleted')
    fetchAll()
  }

  const deletePost = async (id: string) => {
    await fetch('/api/admin/galleryNews', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    toast.success('Post deleted')
    fetchAll()
  }

  const markRead = async (id: string) => {
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchAll()
  }

  const deleteMessage = async (id: string) => {
    await fetch('/api/admin/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    toast.success('Message deleted')
    fetchAll()
  }

  const deleteWaitlistEntry = async (id: string) => {
    await fetch('/api/admin/waitlist', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    toast.success('Entry removed')
    fetchAll()
  }

  const unreadCount = messages.filter(m => !m.read).length

  const waitlistCSV = `data:text/csv;charset=utf-8,Name,Phone,Email,Date\n${waitlist.map(w =>
    `${w.name},${w.phone},${w.email || ''},${new Date(w.submitted_at).toLocaleDateString('en-GB')}`
  ).join('\n')}`

  return (
    <div className="p-7 pb-16 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 font-serif">Announcements</h1>
        <p className="text-sm text-stone-400 mt-1">Manage gallery media, news posts, contact messages and waitlist</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-200">
        <button
          onClick={() => setTab('gallery')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px
            ${tab === 'gallery' ? 'border-green-600 text-green-700' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
        >
          <ImageIcon size={15} /> Gallery Media
        </button>
        <button
          onClick={() => setTab('news')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px
            ${tab === 'news' ? 'border-green-600 text-green-700' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
        >
          <Newspaper size={15} /> News Posts
        </button>
        <button
          onClick={() => setTab('messages')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px
            ${tab === 'messages' ? 'border-green-600 text-green-700' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
        >
          <Mail size={15} /> Messages
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab('waitlist')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px
            ${tab === 'waitlist' ? 'border-green-600 text-green-700' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
        >
          <BellRing size={15} /> Waitlist
          {waitlist.length > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {waitlist.length}
            </span>
          )}
        </button>
      </div>

      {/* ── GALLERY TAB ── */}
      {tab === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2">
              <Upload size={15} /> Upload New Media
            </h2>
            <form onSubmit={handleGalleryUpload} className="space-y-4">
              <label className="block w-full border-2 border-dashed border-stone-200 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 transition-colors">
                {preview ? (
                  <div className="relative">
                    {file?.type.startsWith('video/') ? (
                      <video src={preview} className="w-full h-40 object-cover rounded-lg" controls />
                    ) : (
                      <img src={preview} className="w-full h-40 object-cover rounded-lg" alt="preview" />
                    )}
                    <button type="button" onClick={() => { setFile(null); setPreview('') }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                      <X size={14} className="text-stone-500" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload size={24} className="mx-auto text-stone-300 mb-2" />
                    <p className="text-sm text-stone-400">Click to upload image or video</p>
                    <p className="text-xs text-stone-300 mt-1">JPG, PNG, MP4, MOV supported</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*,video/*" onChange={e => handleFileChange(e, 'gallery')} />
              </label>

              <input type="text" placeholder="Title *" value={title} onChange={e => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500" required />

              <textarea placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)}
                rows={2} className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 resize-none" />

              <div className="grid grid-cols-2 gap-3">
                <select value={category} onChange={e => setCategory(e.target.value)}
                  className="px-3 py-2.5 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 bg-white">
                  <option value="classroom">Classroom</option>
                  <option value="cultural">Cultural</option>
                  <option value="graduation">Graduation</option>
                  <option value="projects">Projects</option>
                  <option value="fieldtrip">Field Trip</option>
                </select>
                <input type="text" placeholder="Date e.g. Sept 2024" value={dateLabel} onChange={e => setDateLabel(e.target.value)}
                  className="px-3 py-2.5 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500" />
              </div>

              {uploading && (
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-stone-500 font-medium">
                      {uploadProgress < 100 ? 'Uploading file…' : 'Saving to database…'}
                    </span>
                    <span className="text-xs font-bold text-green-700">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }} />
                  </div>
                  {uploadProgress < 100 && (
                    <p className="text-xs text-stone-400 mt-1.5 text-center animate-pulse">
                      Please do not close this page
                    </p>
                  )}
                </div>
              )}

              <button type="submit" disabled={uploading}
                className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                <Plus size={15} />
                {uploading ? (uploadProgress < 100 ? `Uploading ${uploadProgress}%` : 'Saving…') : 'Add to Gallery'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-stone-700 mb-4">Gallery Items ({items.length})</h2>
            {loading ? (
              <p className="text-center text-stone-400 text-sm py-8">Loading…</p>
            ) : items.length === 0 ? (
              <p className="text-center text-stone-400 text-sm py-8">No items yet.</p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border border-stone-100 rounded-lg hover:bg-stone-50">
                    {item.media_type === 'video' ? (
                      <video src={item.media_url} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <img src={item.media_url} alt={item.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-stone-800 truncate">{item.title}</p>
                      <p className="text-xs text-stone-400">{item.category} · {item.date_label}</p>
                    </div>
                    <button onClick={() => deleteItem(item.id)}
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── NEWS TAB ── */}
      {tab === 'news' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2">
              <Plus size={15} /> Create News Post
            </h2>
            <form onSubmit={handleNewsPost} className="space-y-4">
              <input type="text" placeholder="News title *" value={newsTitle} onChange={e => setNewsTitle(e.target.value)}
                className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500" required />

              <textarea placeholder="Write your news post here… *" value={newsBody} onChange={e => setNewsBody(e.target.value)}
                rows={5} className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 resize-none" required />

              <label className="block w-full border-2 border-dashed border-stone-200 rounded-xl p-4 text-center cursor-pointer hover:border-green-400 transition-colors">
                {newsPreview ? (
                  <div className="relative">
                    <img src={newsPreview} className="w-full h-32 object-cover rounded-lg" alt="preview" />
                    <button type="button" onClick={() => { setNewsFile(null); setNewsPreview('') }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                      <X size={14} className="text-stone-500" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <ImageIcon size={20} className="mx-auto text-stone-300 mb-1" />
                    <p className="text-xs text-stone-400">Optional: attach an image to this post</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={e => handleFileChange(e, 'news')} />
              </label>

              {uploading && newsFile && (
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-stone-500 font-medium">
                      {uploadProgress < 100 ? 'Uploading image…' : 'Publishing…'}
                    </span>
                    <span className="text-xs font-bold text-green-700">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              <button type="submit" disabled={uploading}
                className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                <Newspaper size={15} />
                {uploading ? (uploadProgress < 100 ? `Uploading ${uploadProgress}%` : 'Publishing…') : 'Publish News Post'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-stone-700 mb-4">Published Posts ({posts.length})</h2>
            {loading ? (
              <p className="text-center text-stone-400 text-sm py-8">Loading…</p>
            ) : posts.length === 0 ? (
              <p className="text-center text-stone-400 text-sm py-8">No posts yet.</p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {posts.map(post => (
                  <div key={post.id} className="p-3 border border-stone-100 rounded-lg hover:bg-stone-50">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-stone-800">{post.title}</p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">{post.body}</p>
                      </div>
                      <button onClick={() => deletePost(post.id)}
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MESSAGES TAB ── */}
      {tab === 'messages' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
          <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
            <h2 className="text-sm font-bold text-stone-700">
              Contact Messages ({messages.length})
            </h2>
            <span className="text-xs text-stone-400">{unreadCount} unread</span>
          </div>

          {loading ? (
            <p className="text-center text-stone-400 text-sm py-12">Loading…</p>
          ) : messages.length === 0 ? (
            <div className="text-center py-16">
              <Mail size={32} className="mx-auto text-stone-200 mb-3" />
              <p className="text-stone-400 text-sm">No messages yet.</p>
              <p className="text-stone-300 text-xs mt-1">Messages from the contact form will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-50">
              {messages.map(msg => (
                <div key={msg.id}
                  className={`p-5 hover:bg-stone-50 transition-colors ${!msg.read ? 'bg-blue-50/40 border-l-4 border-l-blue-400' : ''}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <p className="text-sm font-bold text-stone-800">{msg.name}</p>
                        {!msg.read && (
                          <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 mb-2">
                        <a href={`mailto:${msg.email}`}
                          className="text-xs text-orange-500 hover:underline flex items-center gap-1">
                          <Mail size={11} /> {msg.email}
                        </a>
                        {msg.phone && (
                          <a href={`https://wa.me/${msg.phone.replace(/\D/g, '')}`}
                            target="_blank" rel="noopener noreferrer"
                            className="text-xs text-green-600 hover:underline">
                            📱 {msg.phone}
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed bg-stone-50 rounded-lg px-3 py-2">
                        {msg.message}
                      </p>
                      <p className="text-xs text-stone-400 mt-2">
                        {new Date(msg.submitted_at).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {!msg.read && (
                        <button onClick={() => markRead(msg.id)}
                          className="px-3 py-1.5 border border-stone-200 rounded-lg text-xs text-stone-500 hover:bg-stone-100 transition-colors whitespace-nowrap">
                          Mark Read
                        </button>
                      )}
                      <button onClick={() => deleteMessage(msg.id)}
                        className="p-1.5 border border-red-200 rounded-lg text-red-400 hover:bg-red-50 transition-colors flex items-center justify-center">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── WAITLIST TAB ── */}
      {tab === 'waitlist' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
          <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-stone-700">
                Enrollment Waitlist ({waitlist.length})
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                People who signed up to be notified when enrollment opens
              </p>
            </div>
            {waitlist.length > 0 && (
              <a
                href={waitlistCSV}
                download="waitlist.csv"
                className="text-xs text-green-700 font-semibold hover:underline flex items-center gap-1"
              >
                Export CSV ↓
              </a>
            )}
          </div>

          {loading ? (
            <p className="text-center text-stone-400 text-sm py-12">Loading…</p>
          ) : waitlist.length === 0 ? (
            <div className="text-center py-16">
              <BellRing size={32} className="mx-auto text-stone-200 mb-3" />
              <p className="text-stone-400 text-sm">No one on the waitlist yet.</p>
              <p className="text-stone-300 text-xs mt-1">
                People who sign up when enrollment is closed will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-50">
              {waitlist.map((entry, index) => (
                <div key={entry.id} className="px-6 py-4 flex items-center gap-4 hover:bg-stone-50 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-stone-800">{entry.name}</p>
                    <div className="flex flex-wrap gap-3 mt-0.5">
                      <a
                        href={`https://wa.me/${entry.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-600 hover:underline"
                      >
                        📱 {entry.phone}
                      </a>
                      {entry.email && (
                        <a
                          href={`mailto:${entry.email}`}
                          className="text-xs text-orange-500 hover:underline"
                        >
                          ✉ {entry.email}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-stone-400">
                      {new Date(entry.submitted_at).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteWaitlistEntry(entry.id)}
                    className="p-1.5 border border-red-200 rounded-lg text-red-400 hover:bg-red-50 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}