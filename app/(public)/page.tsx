// import Image from "next/image";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import Sliding from "@/components/slider";
import ArabicSchoolModals from "@/components/herobtn";
import Registerbtn from "@/components/registerbtn";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <ArabicSchoolModals />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-[50px]">
            <h3 className="text-3xl font-bold text-gray-800 mb-[15px]">
              Why Choose GIQMIS?
            </h3>
            <p className="text-gray-600 max-w-[700px] mx-auto">
              We provide comprehensive Islamic education focusing on Qur&apos;an
              memorization, tajweed, tafsir, and other essential Islamic
              sciences.
            </p>
            <div className=" bg-orange-500 border border-orange-500  w-[10%] mx-auto mt-3 h-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] w-[90%] mx-auto">
            <div className="bg-[#ECECE8] p-[30px] rounded-lg text-center hover:-translate-y-[10px] transition-transform">
              <div className="text-[40px] text-orange-500 mb-5">📖</div>
              <h4 className="text-xl text-gray-800 mb-[15px]">
                Qur&apos;an Memorization
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Our structured program helps students memorize the Qur&apos;an
                with proper tajweed and understanding of the meanings.
              </p>
            </div>
            <div className="bg-[#ECECE8] p-[30px] rounded-lg text-center hover:-translate-y-[10px] transition-transform">
              <div className="text-[40px] text-orange-500 mb-5">👩‍🏫</div>
              <h4 className="text-xl text-gray-800 mb-[15px]">
                Qualified Teachers
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Learn from certified female instructors with extensive knowledge
                in Qur&apos;anic sciences and Islamic studies.
              </p>
            </div>
            <div className="bg-[#ECECE8] p-[30px] rounded-lg text-center hover:-translate-y-[10px] transition-transform">
              <div className="text-[40px] text-orange-500 mb-5">🌟</div>
              <h4 className="text-xl text-gray-800 mb-[15px]">
                Character Development
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We focus on nurturing not just knowledge but also moral
                character and ethical values based on Islamic principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-[10px]">
              Our Programs
            </h3>
            <p className="text-gray-600 max-w-[700px] mx-auto">
              We offer various programs tailored to different age groups and
              educational needs.
            </p>
            <div className=" bg-orange-500 border border-orange-500  w-[10%] mx-auto mt-3 h-1"></div>
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

      <section className="py-20 bg-orange-500 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold mb-5">
            Begin Your Journey to Qur&apos;anic Excellence
          </h3>
          <p className="max-w-[600px] mx-auto mb-[30px] leading-relaxed">
            Enrollment for our next term is now open! Join our community of
            dedicated learners today.
          </p>
          <Registerbtn />
        </div>
      </section>

      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-[15px]">
              What Our Students Say
            </h3>
            <p className="text-gray-600 max-w-[700px] mx-auto">
              Hear from our community of students and parents about their
              experience at GLADTIDINGS INSTITUTE.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            <div className="bg-gray-100 p-[30px] rounded-lg hover:-translate-y-[10px] transition-transform shadow-xl">
              <p className="italic text-gray-600 mb-5 leading-relaxed">
              &quot;The dedication of the teachers at GIQMIS has helped my daughter
                develop a deep love for the Qur&apos;an. Her recitation has improved
                tremendously, and she&apos;s learning to apply Islamic values in her
                daily life.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-[50px] h-[50px] rounded-full bg-gray-300 mr-[15px]"></div>
                <div>
                  <h5 className="text-base text-gray-800 mb-[5px]">
                    Aminah Hassan
                  </h5>
                  <p className="text-sm text-gray-600">Parent of a student</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-[30px] rounded-lg hover:-translate-y-[10px] transition-transform shadow-xl">
              <p className="italic text-gray-600 mb-5 leading-relaxed">
              &quot;As an adult learner who started memorizing Qur&apos;an later in
                life, I found the supportive environment at GIQMIS exactly what
                I needed. The structured program and patient teachers have made
                this journey deeply rewarding.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-[50px] h-[50px] rounded-full bg-gray-300 mr-[15px]"></div>
                <div>
                  <h5 className="text-base text-gray-800 mb-[5px]">
                    Fatima Ibrahim
                  </h5>
                  <p className="text-sm text-gray-600">Adult Program Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-20 text-center mb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-10 text-3xl font-bold text-gray-800 relative inline-block">
              What Our Students Say
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange-500"></span>
            </h2>
            <p className="text-gray-600 max-w-[700px] mx-auto">
              Hear from our community of students and parents about their
              experience at GLADTIDINGS INSTITUTE.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-left transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
              <p className="text-md leading-relaxed text-gray-600 mb-5 relative">
                <span className="absolute -top-5 -left-4 text-8xl text-orange-500 opacity-10 z-10">
                  &quot;
                </span>
                The gallery events at GIQMIS have been a wonderful way to
                connect with Arabic culture. My children love showcasing their
                artwork and calligraphy projects!
              </p>
              <div className="flex items-center">
                <Image
                  src="/api/placeholder/60/60"
                  alt="Sarah M."
                  width={500}
                  height={500}
                  className="w-15 h-15 rounded-full object-cover mr-4 border-4 border-gray-100"
                />
                <div className="author-info">
                  <h4 className="text-lg font-semibold mb-1 text-gray-800">
                    Sarah M.
                  </h4>
                  <p className="text-sm text-gray-500">
                    Parent of two students
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl text-left transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
              <p className="text-md leading-relaxed text-gray-600 mb-5 relative">
                <span className="absolute top-5 left-4 text-8xl text-orange-500 opacity-10 z-10">
                  &quot;
                </span>
                I&apos;ve been studying Arabic at GIQMIS for two years now. The
                cultural events and field trips have truly enhanced my
                understanding of the language and culture.
              </p>
              <div className="flex items-center">
                <Image
                  src="/api/placeholder/60/60"
                  alt="David L."
                  className="w-15 h-15 rounded-full object-cover mr-4 border-4 border-gray-100"
                  width={500}
                  height={500}
                />
                <div className="author-info">
                  <h4 className="text-lg font-semibold mb-1 text-gray-800">
                    David L.
                  </h4>
                  <p className="text-sm text-gray-500">Adult Program Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl text-left transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
              <p className="text-md leading-relaxed text-gray-600 mb-5 relative">
                <span className="absolute -top-5 -left-4 text-8xl text-orange-500 opacity-10 z-10">
                  &quot;
                </span>
                The graduation ceremony at GIQMIS was one of my proudest
                moments. The school&apos;s commitment to celebrating
                achievements really motivates students to excel.
              </p>
              <div className="flex items-center">
                <Image
                  src="/api/placeholder/60/60"
                  alt="Layla K."
                  width={500}
                  height={500}
                  className="w-15 h-15 rounded-full object-cover mr-4 border-4 border-gray-100"
                />
                <div className="author-info">
                  <h4 className="text-lg font-semibold mb-1 text-gray-800">
                    Layla K.
                  </h4>
                  <p className="text-sm text-gray-500">Graduate Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 right-5 z-50">
        <Link
          className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl hover:bg-orange-200 transition-colors"
          href="/"
        >
          <ChevronUp />
        </Link>
      </div>
    </div>
  );
}
