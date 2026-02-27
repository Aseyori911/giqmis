import { useState } from 'react'
import { Upload, Plus, X, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { GalleryItem } from './types'
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
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(`${SUPABASE_URL}/storage/v1/object/public/gallery/${filename}`)
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

export default function GalleryTab({ items, loading, onRefresh }: {
  items: GalleryItem[]
  loading: boolean
  onRefresh: () => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('classroom')
  const [dateLabel, setDateLabel] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f); setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) { toast.error('Please select a file and enter a title'); return }
    setUploading(true); setProgress(0)
    try {
      const ext = file.name.split('.').pop()
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const publicUrl = await uploadToSupabase(file, filename, setProgress)
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category, media_url: publicUrl, media_type: file.type.startsWith('video/') ? 'video' : 'image', date_label: dateLabel }),
      })
      if (!res.ok) { toast.error('Failed to save to database'); return }
      toast.success('Uploaded to gallery!')
      setFile(null); setPreview(''); setTitle(''); setDescription(''); setDateLabel(''); setProgress(0)
      onRefresh()
    } catch { toast.error('Upload failed. Please try again.') }
    finally { setUploading(false) }
  }

  const deleteItem = async (id: string) => {
    await fetch('/api/admin/gallery', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    toast.success('Deleted')
    onRefresh()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2"><Upload size={15} /> Upload New Media</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
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

          {uploading && <UploadProgress progress={progress} label={progress < 100 ? 'Uploading file…' : 'Saving to database…'} />}

          <button type="submit" disabled={uploading}
            className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            <Plus size={15} />
            {uploading ? (progress < 100 ? `Uploading ${progress}%` : 'Saving…') : 'Add to Gallery'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-stone-700 mb-4">Gallery Items ({items.length})</h2>
        {loading ? <p className="text-center text-stone-400 text-sm py-8">Loading…</p>
          : items.length === 0 ? <p className="text-center text-stone-400 text-sm py-8">No items yet.</p>
          : (
            <div className="space-y-3 max-h-125 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 border border-stone-100 rounded-lg hover:bg-stone-50">
                  {item.media_type === 'video'
                    ? <video src={item.media_url} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                    : <img src={item.media_url} alt={item.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-800 truncate">{item.title}</p>
                    <p className="text-xs text-stone-400">{item.category} · {item.date_label}</p>
                  </div>
                  <button onClick={() => deleteItem(item.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}