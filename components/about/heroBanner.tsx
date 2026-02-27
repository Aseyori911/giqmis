import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-35 text-center min-h-[400px] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-5">About Our School</h2>
        <ul className="flex justify-center list-none">
          <li className="mx-1">
            <Link href="/" className="text-orange-500 no-underline">Home</Link>
          </li>
          <li className="mx-1">About</li>
        </ul>
      </div>
    </section>
  )
}