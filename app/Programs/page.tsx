import Image from "next/image";
import Sliding from "@/components/slider";
import Link from "next/link";
import { ChevronUp } from "lucide-react";


export default function Program() {
  return (
    <div>
      <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-20 text-center min-h-[400px] flex items-center justify-center">
        <div className="container mx-auto px-4 ">
          <h2 className="text-4xl mb-5">Our Arabic Programs</h2>
          <ul className="flex justify-center list-none">
            <li className="mx-1">
              {/* <a href="/" className="text-orange-500 no-underline">
                Home
              </a> */}
              <Link href="/" className="text-orange-500 no-underline">Home</Link>

            </li>
            <li className="mx-1">Programs</li>
          </ul>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-[32px] text-gray-800 mb-[10px]">
            Comprehensive Arabic Education
            </h3>
            <p className="text-gray-600 max-w-[700px] mx-auto">We offer a variety of programs designed to meet the needs of students of all ages and proficiency levels.
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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-slate-800 mb-4">Our Curriculum</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We follow a comprehensive, structured curriculum based on modern
              language teaching methodologies.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-[80%] mx-auto">
            <div>
              <h3 className="text-3xl text-slate-800 mb-5">Comprehensive Learning Approach</h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                Our curriculum integrates the four essential language
                skills—reading, writing, listening, and speaking—with cultural
                understanding to provide a holistic Arabic language education.
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                Each level builds progressively on previous learning, ensuring
                students develop strong foundations before advancing to more
                complex language concepts.
              </p>
              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-orange-500 text-lg flex justify-center">
                    ✓
                  </div>
                  <div>
                    <strong>Communicative Method</strong> - Learn through
                    real-life situations and conversations
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-orange-500 text-lg flex justify-center">
                    ✓
                  </div>
                  <div>
                    <strong>Cultural Integration</strong> - Connect language
                    learning with cultural context
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-orange-500 text-lg flex justify-center">
                    ✓
                  </div>
                  <div>
                    <strong>Modern Materials</strong> - Up-to-date textbooks and
                    digital resources
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-orange-500 text-lg flex justify-center">
                    ✓
                  </div>
                  <div>
                    <strong>Regular Assessment</strong> - Track progress with
                    constructive feedback
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://plus.unsplash.com/premium_photo-1679065960816-77d101ec25f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXJhYmljJTIwc2Nob29sfGVufDB8fDB8fHww"
                alt="Students learning Arabic"
                width={500}
                height={500}
                className="w-full md:h-[750px] sm:hidden block "
              />
              <Image
                src="https://plus.unsplash.com/premium_photo-1679065960816-77d101ec25f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXJhYmljJTIwc2Nob29sfGVufDB8fDB8fHww"
                alt="Students learning Arabic"
                width={500}
                height={500}
                className="w-full sm:h[50px] hidden sm:block"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-slate-800 mb-4">Special Programs</h3>
            <p className="text-slate-500 max-w-[80%] mx-auto">
              Beyond our regular courses, we offer specialized programs to meet
              diverse learning needs and interests.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  w-[80%] mx-auto">
            <div className="bg-white rounded-lg overflow-hidden flex shadow-sm">
              <div className="w-48 bg-gray-200 "></div>
              <div className="flex-1 p-6">
                <h4 className="text-xl mb-2 text-slate-800">Summer Intensive Course</h4>
                <p className="text-slate-500 mb-5 leading-relaxed">
                  Accelerate your Arabic learning with our 4-week intensive
                  summer program. Perfect for those who want to make rapid
                  progress in a short time frame.
                </p>
                <a href="#" className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
                  View Details
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden flex shadow-sm">
              <div className="w-48 bg-gray-200"></div>
              <div className="flex-1 p-6">
                <h4 className="text-xl mb-2 text-slate-800">Arabic Conversation Club</h4>
                <p className="text-slate-500 mb-5 leading-relaxed">
                  Practice speaking Arabic in a relaxed, social environment. Our
                  weekly conversation clubs are facilitated by native speakers
                  and are free for enrolled students.
                </p>
                <a href="#" className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
                  View Details
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden flex shadow-sm">
              <div className="w-48 bg-gray-200"></div>
              <div className="flex-1 p-6">
                <h4 className="text-xl mb-2 text-slate-800">Private Tutoring</h4>
                <p className="text-slate-500 mb-5 leading-relaxed">
                  Personalized one-on-one instruction tailored to your specific
                  learning goals, schedule, and pace. Ideal for students who
                  need targeted help or have unique objectives.
                </p>
                <a href="#" className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
                  View Details
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden flex shadow-sm">
              <div className="w-48 bg-gray-200"></div>
              <div className="flex-1 p-6">
                <h4 className="text-xl mb-2 text-slate-800">Arabic for Professionals</h4>
                <p className="text-slate-500 mb-5 leading-relaxed">
                  Specialized courses for business professionals, healthcare
                  workers, diplomats, and others who need Arabic language skills
                  for their career.
                </p>
                <a href="#" className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50 md:hidden block">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-slate-800 mb-4">fake Special Programs</h3>
            <p className="text-slate-500 max-w-[80%] mx-auto">
              Beyond our regular courses, we offer specialized programs to meet
              diverse learning needs and interests.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  w-[80%] mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="w-full bg-gray-200 h-60"></div>
              <div className="flex-1 p-6">
                <h4 className="text-xl mb-2 text-slate-800">Summer Intensive Course</h4>
                <p className="text-slate-500 mb-5 leading-relaxed">
                  Accelerate your Arabic learning with our 4-week intensive
                  summer program. Perfect for those who want to make rapid
                  progress in a short time frame.
                </p>
                <a href="#" className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
                  View Details
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="w-full bg-gray-200 h-60"></div>
              <div className="flex-1 p-6">
                <h4 className="text-xl mb-2 text-slate-800">Arabic Conversation Club</h4>
                <p className="text-slate-500 mb-5 leading-relaxed">
                  Practice speaking Arabic in a relaxed, social environment. Our
                  weekly conversation clubs are facilitated by native speakers
                  and are free for enrolled students.
                </p>
                <a href="#" className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
                  View Details
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="w-full bg-gray-200 h-60"></div>
              <div className="flex-1 p-6">
                <h4 className="text-xl mb-2 text-slate-800">Private Tutoring</h4>
                <p className="text-slate-500 mb-5 leading-relaxed">
                  Personalized one-on-one instruction tailored to your specific
                  learning goals, schedule, and pace. Ideal for students who
                  need targeted help or have unique objectives.
                </p>
                <a href="#" className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
                  View Details
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="w-full bg-gray-200 h-60"></div>
              <div className="flex-1 p-6">
                <h4 className="text-xl mb-2 text-slate-800">Arabic for Professionals</h4>
                <p className="text-slate-500 mb-5 leading-relaxed">
                  Specialized courses for business professionals, healthcare
                  workers, diplomats, and others who need Arabic language skills
                  for their career.
                </p>
                <a href="#" className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-slate-800 mb-4">Frequently Asked Questions</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Find answers to common questions about our Arabic language
              programs.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {/* <!-- FAQ Item 1 --> */}
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
              <input
                type="checkbox"
                id="faq-1"
                className="absolute opacity-0 -z-10 peer"
              />
              <label htmlFor="faq-1" className="flex justify-between p-5 bg-gray-50 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45">
                <h4 className="text-slate-800 text-lg m-0">What age groups do you accept for enrollment?</h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">+</div>
              </label>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-white peer-checked:max-h-48">
                <p className="p-5 leading-relaxed text-slate-500">
                  We accept students of all ages! Our programs are designed for
                  different age groups: children (ages 5-12), teens (ages
                  13-17), and adults. Each program is specifically tailored to
                  meet the learning needs and interests of that particular age
                  group.
                </p>
              </div>
            </div>

            {/* <!-- FAQ Item 2 --> */}
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
              <input
                type="checkbox"
                id="faq-2"
                className="absolute opacity-0 -z-10 peer"
              />
              <label htmlFor="faq-2" className="flex justify-between p-5 bg-gray-50 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45">
                <h4 className="text-slate-800 text-lg m-0">Do I need any prior knowledge of Arabic to enroll?</h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">+</div>
              </label>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-white peer-checked:max-h-48">
                <p className="p-5 leading-relaxed text-slate-500">
                  Not at all! We welcome students of all levels, from complete
                  beginners to advanced learners. Our placement assessment will
                  help determine the right level for you or your child to ensure
                  the most effective learning experience.
                </p>
              </div>
            </div>

            {/* <!-- FAQ Item 3 --> */}
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
              <input
                type="checkbox"
                id="faq-3"
                className="absolute opacity-0 -z-10 peer"
              />
              <label htmlFor="faq-3" className="flex justify-between p-5 bg-gray-50 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45">
                <h4 className="text-slate-800 text-lg m-0">What is your teaching approach?</h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">+</div>
              </label>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-white peer-checked:max-h-48">
                <p className="p-5 leading-relaxed text-slate-500">
                  We use a communicative, interactive approach that focuses on
                  practical language skills. Our curriculum balances reading,
                  writing, speaking, and listening while incorporating cultural
                  elements to provide a comprehensive Arabic language education.
                </p>
              </div>
            </div>

            {/* <!-- FAQ Item 4 --> */}
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
              <input
                type="checkbox"
                id="faq-4"
                className="absolute opacity-0 -z-10 peer"
              />
              <label htmlFor="faq-4" className="flex justify-between p-5 bg-gray-50 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45">
                <h4 className="text-slate-800 text-lg m-0">Do you offer online classes?</h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">+</div>
              </label>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-white peer-checked:max-h-48">
                <p className="p-5 leading-relaxed text-slate-500">
                  Yes, we offer both in-person and online classes to accommodate
                  different scheduling needs and preferences. Our online classes
                  use interactive tools and resources to create an engaging
                  virtual learning environment.
                </p>
              </div>
            </div>

            {/* <!-- FAQ Item 5 --> */}
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
              <input
                type="checkbox"
                id="faq-5"
                className="absolute opacity-0 -z-10 peer"
              />
              <label htmlFor="faq-5" className="flex justify-between p-5 bg-gray-50 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45">
                <h4 className="text-slate-800 text-lg m-0">How can I register for classes?</h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">+</div>
              </label>
              <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-white peer-checked:max-h-48">
                <p className="p-5 leading-relaxed text-slate-500">
                  Registration can be completed online through our website, by
                  phone, or in person at our school. We recommend scheduling an
                  initial consultation to discuss your learning goals and
                  determine the best program for you or your child.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl mb-4">Begin Your Arabic Learning Journey Today</h3>
          <p className="mb-8 max-w-2xl mx-auto">
            Join Al-Noor Arabic School and discover the beauty and richness of
            the Arabic language and culture. Our expert teachers and proven
            curriculum are ready to guide you towards Arabic fluency.
          </p>
          <a href="Contact" className="inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </a>
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
