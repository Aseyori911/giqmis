import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-orange-500 text-white text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-4">
          Every Child Deserves to Learn
        </h3>
        <p className="mb-8 max-w-2xl mx-auto">
          Join our growing family of sponsors and be part of a legacy that
          outlasts this world.
        </p>
        <Link
          href="#sponsor-form"
          className="inline-block px-8 py-3 bg-white text-orange-500 font-bold rounded-lg hover:bg-orange-50 transition-colors"
        >
          Become a Sponsor Today
        </Link>
      </div>
    </section>
  );
}
