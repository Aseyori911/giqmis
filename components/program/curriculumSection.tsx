import Image from 'next/image'
import { curriculumPoints } from './data'

export default function CurriculumSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">Our Curriculum</h3>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We follow a comprehensive, structured curriculum based on modern language teaching methodologies.
          </p>
          <div className="bg-orange-500 border border-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-[80%] mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-5">Comprehensive Learning Approach</h3>
            <p className="text-slate-500 leading-relaxed mb-4">
              Our curriculum integrates the four essential language skills—reading, writing, listening, and speaking—with
              cultural understanding to provide a holistic Arabic language education.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              Each level builds progressively on previous learning, ensuring students develop strong foundations before
              advancing to more complex language concepts.
            </p>
            <div className="mt-8">
              {curriculumPoints.map(({ title, desc }) => (
                <div key={title} className="flex items-center mb-4">
                  <div className="mr-4 text-orange-500 text-lg">✓</div>
                  <div><strong>{title}</strong> - {desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://plus.unsplash.com/premium_photo-1679065960816-77d101ec25f4?w=500&auto=format&fit=crop&q=60"
              alt="Students learning Arabic"
              width={500} height={500}
              className="w-full md:h-[750px] sm:hidden block"
            />
            <Image
              src="https://plus.unsplash.com/premium_photo-1679065960816-77d101ec25f4?w=500&auto=format&fit=crop&q=60"
              alt="Students learning Arabic"
              width={500} height={500}
              className="w-full hidden sm:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}