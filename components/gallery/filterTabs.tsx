type Props = {
  categories: string[]
  filter: string
  onFilter: (cat: string) => void
}

export default function FilterTabs({ categories, filter, onFilter }: Props) {
  return (
    <section className="bg-white py-8 border-b border-gray-200 shadow-sm text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium capitalize transition-all duration-300 hover:-translate-y-1
                ${filter === cat
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-100 hover:bg-gray-200'
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