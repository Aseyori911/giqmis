import { journeyMilestones } from './data'

export default function JourneyTimeline() {
  return (
    <>
      {/* Desktop */}
      <section className="py-20 sm:block hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Our Journey</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">The growth and milestones of GIQMIS over the years.</p>
            <div className="bg-orange-500 border border-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute w-0.5 bg-orange-500 top-0 bottom-0 left-1/2 transform -translate-x-px"></div>
            {journeyMilestones.map(({ year, title, description }, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={i} className={`relative w-1/2 mb-10 ${isLeft ? 'pr-10' : 'pl-10 ml-auto'}`}>
                  <div className={`absolute w-5 h-5 bg-white border-4 border-orange-500 rounded-full top-5 z-10 ${isLeft ? '-right-2.5' : '-left-2.5'}`}></div>
                  <div className="p-5 bg-gray-50 rounded-lg shadow-sm">
                    <h4 className="text-lg text-orange-500 mb-2">{year}</h4>
                    <h3 className="text-xl text-slate-800 mb-2">{title}</h3>
                    <p className="text-slate-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="sm:hidden block py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Our Journey</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">The growth and milestones of GIQMIS over the years.</p>
            <div className="bg-orange-500 border border-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute w-0.5 bg-orange-500 top-0 bottom-0 transform -translate-x-px"></div>
            {journeyMilestones.map(({ year, title, description }, i) => (
              <div key={i} className="relative w-9/10 pl-10 mb-10">
                <div className="absolute w-5 h-5 bg-white border-4 border-orange-500 rounded-full top-5 -left-2.5 z-10"></div>
                <div className="p-5 bg-gray-50 rounded-lg shadow-sm">
                  <h4 className="text-lg text-orange-500 mb-2">{year}</h4>
                  <h3 className="text-xl text-slate-800 mb-2">{title}</h3>
                  <p className="text-slate-500 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}