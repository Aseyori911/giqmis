export default function Section({ title, icon, children }: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm mb-4 overflow-hidden">
      <div className="px-5 py-3 border-b border-stone-100 bg-stone-50 flex items-center gap-2">
        {icon}
        <h2 className="text-sm font-bold text-stone-800">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}