import Image from 'next/image'
import { NewsPost } from './types'

type Props = {
  posts: NewsPost[]
  title: string
}

export default function NewsSection({ posts, title }: Props) {
  if (posts.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-stone-100 mb-8 text-center relative inline-block">
        {title}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-orange-500 rounded-full" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id}
            className="bg-white dark:bg-stone-800 rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition-all duration-300">
            {post.image_url && (
              <div className="relative h-48">
                <Image src={post.image_url} alt={post.title} fill
                  className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            )}
            <div className="p-5">
              <p className="text-xs text-orange-500 font-semibold mb-1">
                {new Date(post.published_at).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </p>
              <h3 className="text-lg font-bold text-gray-800 dark:text-stone-100 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-stone-400 leading-relaxed">{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}