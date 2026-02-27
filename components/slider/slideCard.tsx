import Image from 'next/image'

type Props = {
  image: string
  alt: string
  badge: string
  title: string
  description: string
  tags: string[]
}

export default function SlideCard({ image, alt, badge, title, description, tags }: Props) {
  return (
    <div className="flex-shrink-0 w-full p-[15px]">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:-translate-y-[10px] transition-transform flex flex-col h-full">
        <div className="relative h-[200px] overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-5 right-5 bg-orange-500 text-white px-[15px] py-[5px] rounded-full text-sm font-medium shadow">
            {badge}
          </div>
        </div>
        <div className="p-[25px] flex flex-col flex-grow">
          <h4 className="text-xl text-gray-800 mb-[10px]">{title}</h4>
          <p className="text-gray-600 mb-5 leading-relaxed">{description}</p>
          <div className="flex justify-start gap-[15px] pt-[15px] mt-auto border-t border-gray-100">
            {tags.map((tag) => (
              <div key={tag} className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}