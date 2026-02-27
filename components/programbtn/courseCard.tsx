import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

type Props = {
  courseKey: string
  title: string
  description: string
  image: string
  onClick: (courseKey: string) => void
}

export default function CourseCard({ courseKey, title, description, image, onClick }: Props) {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-lg overflow-hidden shadow-sm mb-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row">

      {/* Image */}
      <div className="relative w-full sm:w-[240px] h-[220px] sm:h-auto flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 240px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-semibold mb-2 text-slate-800 dark:text-stone-100">{title}</h4>
          <p className="text-slate-600 dark:text-stone-400 mb-5 leading-relaxed">{description}</p>
        </div>
        <button onClick={() => onClick(courseKey)}
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium w-fit">
          View Details
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}