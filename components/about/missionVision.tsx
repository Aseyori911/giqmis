export default function MissionVision() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-[80%] mx-auto">
          <div className="bg-white p-10 rounded-lg shadow-sm h-full">
            <h3 className="text-3xl font-bold text-slate-800 mb-5 flex items-center">
              <span className="text-3xl mr-4 text-orange-500">🎯</span> Our Mission
            </h3>
            <p className="text-slate-500 leading-relaxed">
              Our mission is to focus on reforming especially perverted souls through constant reflection and pondering over the meanings of the Qur&apos;an and to ultimately restore the missing spiritual sanity back to the land.
            </p>
          </div>
          <div className="bg-white p-10 rounded-lg shadow-sm h-full">
            <h3 className="text-3xl font-bold text-slate-800 mb-5 flex items-center">
              <span className="text-3xl mr-4 text-orange-500">👁️</span> Our Vision
            </h3>
            <p className="text-slate-500 leading-relaxed">
              Our vision is to establish a morally sane society in which the free-mixing of the opposite sex is avoided and also correct the minds of pessimists who think Qur&apos;an memorisation is an unrealistic feat.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}