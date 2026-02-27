import { BookOpen } from 'lucide-react'
import { Program } from './types'
import Toggle from './toggle'
import Section from './section'

export default function ProgramsSection({ programs, setPrograms }: {
  programs: Program[]
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>
}) {
  return (
    <Section title="Active Programs" icon={<BookOpen size={15} className="text-green-700" />}>
      <p className="text-sm text-stone-500 mb-3">Only active programs will appear in the Apply Now form dropdown.</p>
      <div className="flex flex-col gap-2">
        {programs.map(p => (
          <div key={p.id} className="flex items-center justify-between px-4 py-2.5 bg-stone-50 rounded-lg border border-stone-100">
            <span className="text-sm text-stone-700">{p.label}</span>
            <Toggle value={p.active} onChange={() =>
              setPrograms(prev => prev.map(x => x.id === p.id ? { ...x, active: !x.active } : x))
            } />
          </div>
        ))}
      </div>
    </Section>
  )
}