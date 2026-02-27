import { AlertTriangle, Trash2 } from 'lucide-react'
import { Application } from './types'

export default function DeleteConfirmModal({ app, onCancel, onConfirm, deleting }: {
  app: Application
  onCancel: () => void
  onConfirm: () => void
  deleting: boolean
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-800">Delete Application</h3>
            <p className="text-xs text-stone-400 mt-0.5">This action cannot be undone</p>
          </div>
        </div>
        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          Are you sure you want to delete the application for{' '}
          <span className="font-semibold text-stone-800">{app.student_name}</span>?
          This will permanently remove all their application data.
        </p>
        <div className="flex gap-2">
          <button onClick={onCancel} disabled={deleting}
            className="flex-1 px-4 py-2.5 border border-stone-200 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={deleting}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5">
            <Trash2 size={14} />
            {deleting ? 'Deleting…' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}