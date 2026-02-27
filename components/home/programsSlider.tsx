import Sliding from '@/components/slider'

export default function ProgramsSlider() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-gray-800 mb-[10px]">Our Programs</h3>
          <p className="text-gray-600 max-w-[700px] mx-auto">
            We offer various programs tailored to different age groups and educational needs.
          </p>
          <div className="bg-orange-500 border border-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="relative overflow-hidden max-w-[1200px] mx-auto">
          <div className="flex w-full transition-transform duration-500 ease-in-out animate-[carousel-rotation_15s_infinite_linear] hover:animation-paused">
            <div className="w-full flex justify-center items-center">
              <Sliding />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}