import { useState } from 'react'
import { Plus, X, Trash2, Newspaper, Image as ImageIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { NewsPost } from './types'
import UploadProgress from './uploadProgress'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function uploadToSupabase(file: File, filename: string, onProgress: (p: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
    })
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve(`${SUPABASE_URL}/storage/v1/object/public/gallery/${filename}`)
      else reject(new Error(`Upload failed: ${xhr.responseText}`))
    })
    xhr.addEventListener('error', () => reject(new Error('Network error during upload')))
    xhr.open('POST', `${SUPABASE_URL}/storage/v1/object/gallery/${filename}`)
    xhr.setRequestHeader('Authorization', `Bearer ${SUPABASE_ANON_KEY}`)
    xhr.setRequestHeader('x-upsert', 'false')
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.send(file)
  })
}

export default function NewsTab({ posts, loading, onRefresh }: {
  posts: NewsPost[]
  loading: boolean
  onRefresh: () => void
}) {
  const [newsTitle, setNewsTitle] = useState('')
  const [newsBody, setNewsBody] = useState('')
  const [newsFile, setNewsFile] = useState<File | null>(null)
  const [newsPreview, setNewsPreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsTitle || !newsBody) { toast.error('Title and body required'); return }
    setUploading(true); setProgress(0)
    try {
      let imageUrl = ''
      if (newsFile) {
        const ext = newsFile.name.split('.').pop()
        const filename = `news-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        imageUrl = await uploadToSupabase(newsFile, filename, setProgress)
      }
      const res = await fetch('/api/admin/galleryNews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newsTitle, body: newsBody, image_url: imageUrl }),
      })
      if (!res.ok) { toast.error('Failed to post news'); return }
      toast.success('News post published!')
      setNewsTitle(''); setNewsBody(''); setNewsFile(null); setNewsPreview(''); setProgress(0)
      onRefresh()
    } catch { toast.error('Upload failed. Please try again.') }
    finally { setUploading(false) }
  }

  const deletePost = async (id: string) => {
    await fetch('/api/admin/galleryNews', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    toast.success('Post deleted')
    onRefresh()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2"><Plus size={15} /> Create News Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <input type="file" className="hidden" accept="image/*"
              onChange={e => { const f = e.target.files?.[0]; if (f) { setNewsFile(f); setNewsPreview(URL.createObjectURL(f)) } }} />
          </label>

          {uploading && newsFile && <UploadProgress progress={progress} label={progress < 100 ? 'Uploading image…' : 'Publishing…'} />}

          <button type="submit" disabled={uploading}
            className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            <Newspaper size={15} />
            {uploading ? (progress < 100 ? `Uploading ${progress}%` : 'Publishing…') : 'Publish News Post'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-stone-700 mb-4">Published Posts ({posts.length})</h2>
        {loading ? <p className="text-center text-stone-400 text-sm py-8">Loading…</p>
          : posts.length === 0 ? <p className="text-center text-stone-400 text-sm py-8">No posts yet.</p>
          : (
            <div className="space-y-3 max-h-125 overflow-y-auto pr-1">
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
                    <button onClick={() => deletePost(post.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}