import Image from "next/image";
import Registerbtn from "@/components/registerbtn";
import Link from "next/link";
import { ChevronUp } from "lucide-react";

export default function Home() {
  return (
<div>
      <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-35 text-center min-h-[400px] flex items-center justify-center">
        <div className="container mx-auto px-4 ">
          <h2 className="text-4xl mb-5">About Our School</h2>
          <ul className="flex justify-center list-none">
            <li className="mx-1">
              {/* <a href="/" className="text-orange-500 no-underline">Home</a> */}
              {/* <link rel="stylesheet" href="/"  className="text-orange-500 no-underline hover:text-orange-500" />Home */}
              <Link href="/"  className="text-orange-500 no-underline">Home</Link>

            </li>
            <li className="mx-1">About</li>
          </ul>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-[80%] mx-auto">
            <div>
              <h3 className="text-[28px] text-black font-bold mb-5">
                Welcome to GLADTIDINGS INSTITUTION FOR QUR&apos;AN MEMORIZATION AND
                ISLAMIC STUDIES FOR FEMALES
              </h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                Gladtidings Institute for Qur&apos;an Memorisation and Islamic
                studies was founded on the 4th February, 2019 and has gone
                through some very stormy moments and impacted human lives. In
                the little space of years of existence, we had our first haflah
                on the 23rd December, 2023 and so far has churned out many Hufaadh(graduates).
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                Also, we are registered with the corporate affairs commission
                (RN 3412056) and also leaving no stone unturned to take the
                madrasah to an enviable height Some of the very beautiful
                accomplishments we&apos;ve been able to record over the years are
                those concerning two different student. One of them, Zainab, has
                speech defect and her communication is poor, however, by the
                might of Allah she has memorised up to 4 ajza of the Qur&apos;an.
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                {/* {" "} */}
                Also, alhamdulillah that Balqis has finished 27 ajzaa of the
                whole Qur&apos;an despite her eye challenge as she could not read
                directly from the Qur&apos;an. We&apos;ve had to read the Qur&apos;an
                repeatedly to her until it sticks to her memory. All these being
                made realistic by Allah are accomplishment that gladdens our
                heart.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://plus.unsplash.com/premium_photo-1679065960816-77d101ec25f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXJhYmljJTIwc2Nob29sfGVufDB8fDB8fHww"
                alt=""
                width={500}
                height={500}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-[80%] mx-auto">
            <div className="bg-white p-10 rounded-lg shadow-sm h-full">
              <h3 className="text-2xl text-slate-800 mb-5 flex items-center">
                <span className="text-3xl mr-4 text-orange-500">🎯</span> Our Mission
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Our mission is to focus on reforming especially perverted souls
                through constant reflection and pondering over the meanings of
                the Qur&apos;an and to ultimately restore the missing spiritual
                sanity back to the land.
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-sm h-full">
              <h3 className="text-2xl text-slate-800 mb-5 flex items-center">
                <span className="text-3xl mr-4 text-orange-500">👁️</span> Our Vision
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Our vision is to establish a morally sane society in which the
                free-mixing of the opposite sex is avoided and also correct the
                minds of pessimists who think Qur&apos;an memorisation is an
                unrealistic feat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-slate-800 mb-4">Our Core Values</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              The principles that guide our approach to education and community
              building.
            </p>
            <div className=" bg-orange-500 border border-orange-500  w-[10%] mx-auto mt-3 h-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[80%] mx-auto">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl text-orange-500">🌟</div>
              <h4 className="text-xl text-slate-800 mb-4">Excellence</h4>
              <p className="text-slate-500 leading-relaxed">
                We pursue the highest standards in teaching and learning,
                continuously improving our curriculum and methods to provide the
                best educational experience.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl text-orange-500">🤝</div>
              <h4 className="text-xl text-slate-800 mb-4">Inclusivity</h4>
              <p className="text-slate-500 leading-relaxed">
                We welcome students from all backgrounds, creating a diverse
                community united by a shared interest in Arabic language and
                culture.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl text-orange-500">🌉</div>
              <h4 className="text-xl text-slate-800 mb-4">Cultural Bridge</h4>
              <p className="text-slate-500 leading-relaxed">
                We facilitate cross-cultural understanding by connecting
                students to the rich traditions, literature, and history of the
                Arabic-speaking world.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl text-orange-500">💡</div>
              <h4 className="text-xl text-slate-800 mb-4">Innovation</h4>
              <p className="text-slate-500 leading-relaxed">
                We embrace creative teaching approaches and modern technology to
                make language learning engaging, accessible, and effective.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl text-orange-500">🌱</div>
              <h4 className="text-xl text-slate-800 mb-4">Growth</h4>
              <p className="text-slate-500 leading-relaxed">
                We nurture each student&apos;s potential, fostering not only
                linguistic skills but also personal development, confidence, and
                cultural awareness.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl text-orange-500">🏠</div>
              <h4 className="text-xl text-slate-800 mb-4">Community</h4>
              <p className="text-slate-500 leading-relaxed">
                We create a supportive family-like environment where students,
                parents, and teachers collaborate to achieve educational goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-slate-800 mb-4">Meet Our Team</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Our dedicated faculty brings years of experience and passion to
              Arabic language education.
            </p>
            <div className=" bg-orange-500 border border-orange-500  w-[10%] mx-auto mt-3 h-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-[80%] mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div
                className="h-60"
                style={{ backgroundColor: "#fab1a0" }}
              ></div>
              <div className="p-5 text-center">
                <h4 className="text-lg text-slate-800 mb-1">Sipe Bushroh Olasimbo</h4>
                <p className="text-orange-500 text-sm mb-4">School Director</p>
                <div className="text-sm text-slate-500 leading-relaxed mb-4">
                  With over 20 years of experience in Arabic education, Layla
                  founded GIQMIS with a vision to create an immersive language
                  learning community.
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div
                className="h-60"
                style={{ backgroundColor: "#81ecec" }}
              ></div>
              <div className="p-5 text-center">
                <h4 className="text-lg text-slate-800 mb-1">Ahmed Hassan</h4>
                <p className="text-orange-500 text-sm mb-4">Senior Arabic Instructor</p>
                <div className="text-sm text-slate-500 leading-relaxed mb-4">
                  A native speaker with a Master&apos;s in Arabic Literature, Ahmed
                  specializes in classical Arabic and brings poetry and stories
                  to life.
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div
                className="h-60"
                style={{ backgroundColor: "#74b9ff" }}
              ></div>
              <div className="p-5 text-center">
                <h4 className="text-lg text-slate-800 mb-1">Nadia Ibrahim</h4>
                <p className="text-orange-500 text-sm mb-4">Children&apos;s Program Coordinator</p>
                <div className="text-sm text-slate-500 leading-relaxed mb-4">
                  With a background in early childhood education, Nadia creates
                  fun and engaging Arabic lessons for our youngest learners.
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div
                className="h-60"
                style={{ backgroundColor: "#a29bfe" }}
              ></div>
              <div className="p-5 text-center">
                <h4 className="text-lg text-slate-800 mb-1">Omar Khalid</h4>
                <p className="text-orange-500 text-sm mb-4">Cultural Affairs Coordinator</p>
                <div className="text-sm text-slate-500 leading-relaxed mb-4">
                  Omar organizes cultural events, workshops, and celebrations
                  that bring Arabic traditions and customs to life for our
                  students.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-slate-800 mb-4">Our Journey</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">The growth and milestones of GIQMIS School over the years.</p>
          <div className=" bg-orange-500 border border-orange-500  w-[10%] mx-auto mt-3 h-1"></div>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute w-0.5 bg-orange-500 top-0 bottom-0 left-1/2 transform -translate-x-px"></div>
            
            <div className="relative w-1/2 pr-10 mb-10">
              <div className="absolute w-5 h-5 bg-white border-4 border-orange-500 rounded-full top-5 -right-2.5 z-10"></div>
              <div className="p-5 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg text-orange-500 mb-2">2019</h4>
                <h3 className="text-xl text-slate-800 mb-2">The Beginning</h3>
                <p className="text-slate-500 leading-relaxed">
                  Al-Noor Arabic School was founded with just 15 students and 2
                  teachers, operating on weekends in a community center.
                </p>
              </div>
            </div>
            
            <div className="relative w-1/2 pl-10 mb-10 ml-auto">
              <div className="absolute w-5 h-5 bg-white border-4 border-orange-500 rounded-full top-5 -left-2.5 z-10"></div>
              <div className="p-5 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg text-orange-500 mb-2">2020</h4>
                <h3 className="text-xl text-slate-800 mb-2">First Dedicated Space</h3>
                <p className="text-slate-500 leading-relaxed">
                  With growing enrollment, we moved to our first dedicated
                  facility and expanded to offer weekday evening classes for
                  adults.
                </p>
              </div>
            </div>
            
            <div className="relative w-1/2 pr-10 mb-10">
              <div className="absolute w-5 h-5 bg-white border-4 border-orange-500 rounded-full top-5 -right-2.5 z-10"></div>
              <div className="p-5 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg text-orange-500 mb-2">2021</h4>
                <h3 className="text-xl text-slate-800 mb-2">Curriculum Development</h3>
                <p className="text-slate-500 leading-relaxed">
                  We developed our own comprehensive curriculum for all levels,
                  focusing on practical communication skills and cultural
                  immersion.
                </p>
              </div>
            </div>
            
            <div className="relative w-1/2 pl-10 mb-10 ml-auto">
              <div className="absolute w-5 h-5 bg-white border-4 border-orange-500 rounded-full top-5 -left-2.5 z-10"></div>
              <div className="p-5 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg text-orange-500 mb-2">2025</h4>
                <h3 className="text-xl text-slate-800 mb-2">5th Anniversary & Expansion</h3>
                <p className="text-slate-500 leading-relaxed">
                  Celebrated our 5th anniversary with over 150 students and
                  introduced new programs including specialized courses for
                  professionals.
                </p>
              </div>
            </div>
            
            <div className="relative w-1/2 pr-10 mb-10">
              <div className="absolute w-5 h-5 bg-white border-4 border-orange-500 rounded-full top-5 -right-2.5 z-10"></div>
              <div className="p-5 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg text-orange-500 mb-2">2025</h4>
                <h3 className="text-xl text-slate-800 mb-2">Online Program Launch</h3>
                <p className="text-slate-500 leading-relaxed">
                  Launched our digital platform to reach students beyond our
                  local community, offering virtual classes and resources.
                </p>
              </div>
            </div>
            
            <div className="relative w-1/2 pl-10 mb-10 ml-auto">
              <div className="absolute w-5 h-5 bg-white border-4 border-orange-500 rounded-full top-5 -left-2.5 z-10"></div>
              <div className="p-5 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg text-orange-500 mb-2">Today</h4>
                <h3 className="text-xl text-slate-800 mb-2">Growing Community</h3>
                <p className="text-slate-500 leading-relaxed">
                  Now serving over 300 students with a team of 12 dedicated
                  teachers and staff, continuing our mission of language
                  education and cultural preservation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl mb-4">Join Our Arabic Learning Community</h3>
          <p className="mb-8 max-w-2xl mx-auto">
            Experience the rich tradition of Arabic language and culture in our
            supportive learning environment.
          </p>
          <Registerbtn/>
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
