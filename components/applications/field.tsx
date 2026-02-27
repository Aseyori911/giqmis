export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-stone-100">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  )
}

export function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div>
      <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm text-stone-800 mt-0.5">{value}</p>
    </div>
  )
}

export function FullWidthField({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="col-span-2 bg-stone-50 rounded-lg p-3 mb-2">
      <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm text-stone-800 leading-relaxed">{value}</p>
    </div>
  )
}