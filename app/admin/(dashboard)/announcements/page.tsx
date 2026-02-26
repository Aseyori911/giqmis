'use client'
import { useState, useEffect, useCallback } from 'react'
import { Trash2, Upload, Plus, X, Image as ImageIcon, Newspaper } from 'lucide-react'
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

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function AnnouncementsPage() {
  const [tab, setTab] = useState<'gallery' | 'news'>('gallery')
  const [items, setItems] = useState<GalleryItem[]>([])
  const [posts, setPosts] = useState<NewsPost[]>([])
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
    const [gRes, nRes] = await Promise.all([
      fetch('/api/admin/gallery'),
      fetch('/api/admin/galleryNews'),
    ])
    const gData = await gRes.json()
    const nData = await nRes.json()
    setItems(gData.items || [])
    setPosts(nData.posts || [])
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

  // Upload file directly to Supabase using XHR for progress tracking
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

  return (
    <div className="p-7 pb-16 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 font-serif">Announcements</h1>
        <p className="text-sm text-stone-400 mt-1">Manage gallery media and news posts for the public site</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-stone-200">
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

              {/* Progress bar */}
              {uploading && (
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-stone-500 font-medium">
                      {uploadProgress < 100 ? 'Uploading file…' : 'Saving to database…'}
                    </span>
                    <span className="text-xs font-bold text-green-700">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
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
                {uploading
                  ? (uploadProgress < 100 ? `Uploading ${uploadProgress}%` : 'Saving…')
                  : 'Add to Gallery'}
              </button>
            </form>
          </div>

          {/* Existing items */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-stone-700 mb-4">
              Gallery Items ({items.length})
            </h2>
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

              {/* Progress bar for news image */}
              {uploading && newsFile && (
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-stone-500 font-medium">
                      {uploadProgress < 100 ? 'Uploading image…' : 'Publishing…'}
                    </span>
                    <span className="text-xs font-bold text-green-700">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
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

          {/* Existing posts */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-stone-700 mb-4">
              Published Posts ({posts.length})
            </h2>
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
    </div>
  )
}