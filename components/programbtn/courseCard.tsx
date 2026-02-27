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
    <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-4 hover:shadow-md transition-shadow">
      <div className="w-full h-[200px]">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          sizes="68px"
          className="w-full h-full bg-cover bg-center rounded object-contain"
        />
      </div>
      <div className="flex-1 p-6">
        <h4 className="text-xl font-semibold mb-2 text-slate-800">{title}</h4>
        <p className="text-slate-600 mb-5 leading-relaxed">{description}</p>
        <button
          onClick={() => onClick(courseKey)}
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          View Details
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}