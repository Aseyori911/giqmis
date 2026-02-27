export default function UploadProgress({ progress, label }: { progress: number; label: string }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-stone-500 font-medium">{label}</span>
        <span className="text-xs font-bold text-green-700">{progress}%</span>
      </div>
      <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
        <div className="bg-green-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      {progress < 100 && (
        <p className="text-xs text-stone-400 mt-1.5 text-center animate-pulse">Please do not close this page</p>
      )}
    </div>
  )
}