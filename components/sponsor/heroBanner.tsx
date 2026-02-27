import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-35 text-center min-h-[400px] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-5">Sponsor a Student</h2>
        <p className="text-lg max-w-2xl mx-auto mb-4 text-white/80">
          Give a child the gift of Quranic education. Your generosity can change a life forever.
        </p>
        <ul className="flex justify-center list-none gap-2">
          <li><Link href="/" className="text-orange-500">Home</Link></li>
          <li>/</li>
          <li>Sponsor a Student</li>
        </ul>
      </div>
    </section>
  )
}