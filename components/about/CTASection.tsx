import Registerbtn from '@/components/registration'

export default function CTASection() {
  return (
    <section className="py-20 bg-orange-500 text-white text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-4">Join Our Arabic Learning Community</h3>
        <p className="mb-8 max-w-2xl mx-auto">
          Experience the rich tradition of Arabic language and culture in our supportive learning environment.
        </p>
        <Registerbtn />
      </div>
    </section>
  )
}