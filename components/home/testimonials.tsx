import Image from 'next/image'
import { testimonials } from './data'

export default function Testimonials() {
  return (
    <section className="py-20 text-center mb-20 bg-white dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-10 text-3xl font-bold text-gray-800 dark:text-stone-100 relative inline-block">
            What Our Students Say
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange-500"></span>
          </h2>
          <p className="text-gray-600 dark:text-stone-400 max-w-[700px] mx-auto">
            Hear from our community of students and parents about their experience at GLADTIDINGS INSTITUTE.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(({ quote, name, role, avatar }) => (
            <div key={name}
              className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-2xl text-left transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
              <p className="text-md leading-relaxed text-gray-600 dark:text-stone-400 mb-5 relative">
                <span className="absolute -top-5 -left-4 text-8xl text-orange-500 opacity-10 z-10">&quot;</span>
                {quote}
              </p>
              <div className="flex items-center">
                <Image
                  src={avatar} alt={name} width={60} height={60}
                  className="rounded-full object-cover mr-4 border-4 border-gray-100 dark:border-stone-700"
                />
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-gray-800 dark:text-stone-100">{name}</h4>
                  <p className="text-sm text-gray-500 dark:text-stone-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}