export default function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div onClick={() => onChange(!value)}
      className={`w-10 h-5 rounded-full relative cursor-pointer shrink-0 transition-colors duration-200 ${value ? 'bg-green-600' : 'bg-stone-300'}`}>
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${value ? 'left-5' : 'left-0.5'}`} />
    </div>
  )
}