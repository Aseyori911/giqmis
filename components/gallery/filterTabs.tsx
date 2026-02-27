type Props = {
  categories: string[]
  filter: string
  onFilter: (cat: string) => void
}

export default function FilterTabs({ categories, filter, onFilter }: Props) {
  return (
    <section className="bg-white dark:bg-stone-900 py-8 border-b border-gray-200 dark:border-stone-700 shadow-sm text-center transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium capitalize transition-all duration-300 hover:-translate-y-1
                ${filter === cat
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-100 dark:bg-stone-800 text-gray-700 dark:text-stone-300 hover:bg-gray-200 dark:hover:bg-stone-700'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}