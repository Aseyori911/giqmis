import Registerbtn from '@/components/registration'

export default function CTASection() {
  return (
    <section className="py-20 bg-orange-500 text-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-5">
          Begin Your Journey to Qur&apos;anic Excellence
        </h3>
        <p className="max-w-[600px] mx-auto mb-[30px] leading-relaxed">
          Enrollment for our next term is now open! Join our community of dedicated learners today.
        </p>
        <Registerbtn />
      </div>
    </section>
  )
}