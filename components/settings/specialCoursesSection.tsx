import { useState } from 'react'
import { Star, Plus, Trash2, AlertCircle } from 'lucide-react'
import { Program } from './types'
import Toggle from './toggle'
import Section from './section'

export default function SpecialCoursesSection({ programs, setPrograms }: {
  programs: Program[]
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>
}) {
  const [newLabel, setNewLabel] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  const handleAdd = () => {
    const trimmed = newLabel.trim()
    if (!trimmed) { setError('Please enter a course name.'); return }

    const exists = programs.some(p => p.label.toLowerCase() === trimmed.toLowerCase())
    if (exists) { setError('A course with this name already exists.'); return }

    const id = trimmed.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')

    setPrograms(prev => [...prev, { id, label: trimmed, active: true }])
    setNewLabel('')
    setAdding(false)
    setError('')
  }

  const handleDelete = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAdd() }
    if (e.key === 'Escape') { setAdding(false); setNewLabel(''); setError('') }
  }

  return (
    <Section title="Special Courses" icon={<Star size={15} className="text-blue-600" />}>
      <p className="text-sm text-stone-500 mb-3">
        Special courses appear in the online program enrollment form. Toggle to show or hide each course.
      </p>

      <div className="flex flex-col gap-2 mb-4">
        {programs.map(p => (
          <div key={p.id}
            className="flex items-center justify-between px-4 py-2.5 bg-stone-50 rounded-lg border border-stone-100 group">
            <span className="text-sm text-stone-700 flex-1">{p.label}</span>
            <div className="flex items-center gap-3">
              <Toggle
                value={p.active}
                onChange={() =>
                  setPrograms(prev => prev.map(x => x.id === p.id ? { ...x, active: !x.active } : x))
                }
              />
              <button
                onClick={() => handleDelete(p.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50 text-red-400 hover:text-red-600"
                title="Delete course">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {programs.length === 0 && (
          <div className="text-center py-6 text-stone-400 text-sm border border-dashed border-stone-200 rounded-lg">
            No special courses yet. Add one below.
          </div>
        )}
      </div>

      {adding ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              autoFocus
              value={newLabel}
              onChange={e => { setNewLabel(e.target.value); setError('') }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Hifz Memory Mastery"
              className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
              Add
            </button>
            <button
              onClick={() => { setAdding(false); setNewLabel(''); setError('') }}
              className="px-4 py-2 border border-stone-200 text-stone-500 text-sm font-semibold rounded-lg hover:bg-stone-50 transition-colors">
              Cancel
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle size={12} /> {error}
            </div>
          )}
          <p className="text-xs text-stone-400">Press Enter to add · Escape to cancel</p>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-stone-300 rounded-lg text-sm text-stone-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors w-full justify-center">
          <Plus size={15} /> Add Special Course
        </button>
      )}
    </Section>
  )
}