import Image from 'next/image'
import { GalleryItem } from './types'

type Props = {
  items: GalleryItem[]
  loading: boolean
}

export default function GalleryGrid({ items, loading }: Props) {
  if (loading) return <p className="text-center text-gray-400 dark:text-stone-500 py-20">Loading gallery…</p>
  if (items.length === 0) return <p className="text-center text-gray-400 dark:text-stone-500 py-20">No items in this category yet.</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {items.map((item) => (
        <div key={item.id}
          className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:shadow-xl bg-white dark:bg-stone-800 group">
          <div className="absolute top-5 right-5 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium z-10 shadow capitalize">
            {item.category}
          </div>
          {item.date_label && (
            <div className="absolute top-5 left-5 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs z-10">
              {item.date_label}
            </div>
          )}

          {item.media_type === 'video' ? (
            <video src={item.media_url}
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              controls />
          ) : (
            <div className="relative h-72 overflow-hidden">
              <Image src={item.media_url} alt={item.title} fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 translate-y-3/4 group-hover:translate-y-0 transition-transform duration-300">
            <h4 className="text-xl mb-2">{item.title}</h4>
            {item.description && (
              <p className="text-sm opacity-90 leading-relaxed">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}