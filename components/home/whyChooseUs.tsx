import { features } from './data'

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-[50px]">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-stone-100 mb-[15px]">
            Why Choose GIQMIS?
          </h3>
          <p className="text-gray-600 dark:text-stone-400 max-w-[700px] mx-auto">
            We provide comprehensive Islamic education focusing on Qur&apos;an memorization, tajweed, tafsir, and other essential Islamic sciences.
          </p>
          <div className="bg-orange-500 border border-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] w-[90%] mx-auto">
          {features.map(({ emoji, title, description }) => (
            <div key={title}
              className="bg-[#ECECE8] dark:bg-stone-800 p-[30px] rounded-lg text-center hover:-translate-y-[10px] transition-transform">
              <div className="text-[40px] text-orange-500 mb-5">{emoji}</div>
              <h4 className="text-xl text-gray-800 dark:text-stone-100 mb-[15px]">{title}</h4>
              <p className="text-gray-600 dark:text-stone-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}