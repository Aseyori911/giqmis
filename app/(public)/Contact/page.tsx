// import Image from "next/image";

import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { MapPin, Phone, Mail, Clock} from 'lucide-react';

export default function Gallery() {
  return (
    <div>
      <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-35 text-center min-h-[400px] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Have questions about our programs or want to schedule a visit? We&apos;re
            here to help.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4  mx-auto W-[80%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="contact-info   container mx-auto w-[80%]">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 relative pb-4">
                Get in Touch
                <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500"></span>
              </h3>
              <p className="mb-5 leading-relaxed text-slate-500">
                We welcome your inquiries and look forward to helping you
                discover the Arabic language and culture. Please feel free to
                contact us using any of the methods below.
              </p>

              <div className="mt-8">
                <div className="flex items-center mb-5">
                  <div className="min-w-[50px] h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 text-orange-500 text-xl">
                  <MapPin />
                  </div>
                  <div className="contact-text">
                    <h4 className="text-lg font-semibold mb-1 text-slate-800">
                      Our Location
                    </h4>
                    <p className="mb-0 text-slate-500">
                      123 Education Street, City, State, 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-5">
                  <div className="min-w-[50px] h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 text-orange-500 text-xl">
                  <Phone />
                  </div>
                  <div className="contact-text">
                    <h4 className="text-lg font-semibold mb-1 text-slate-800">
                      Phone Number
                    </h4>
                    <p className="mb-0 text-slate-500">(123) 456-7890</p>
                  </div>
                </div>

                <div className="flex items-center mb-5">
                  <div className="min-w-[50px] h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 text-orange-500 text-xl">
                  <Mail />
                  </div>
                  <div className="contact-text">
                    <h4 className="text-lg font-semibold mb-1 text-slate-800">
                      Email Address
                    </h4>
                    <p className="mb-0 text-slate-500">info@alnoorarabic.com</p>
                  </div>
                </div>

                <div className="flex items-center mb-5">
                  <div className="min-w-[50px] h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 text-orange-500 text-xl">
                  <Clock />
                  </div>
                  <div className="contact-text">
                    <h4 className="text-lg font-semibold mb-1 text-slate-800">
                      Office Hours
                    </h4>
                    <p className="mb-0 text-slate-500">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="mb-0 text-slate-500">
                      Saturday: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-slate-800">Connect With Us</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-slate-500 text-lg transition-all duration-300 hover:bg-orange-500 hover:text-white">📘</a>
            <a href="#" aria-label="Twitter" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-slate-500 text-lg transition-all duration-300 hover:bg-orange-500 hover:text-white">📱</a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-slate-500 text-lg transition-all duration-300 hover:bg-orange-500 hover:text-white">📷</a>
            <a href="#" aria-label="YouTube" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-slate-500 text-lg transition-all duration-300 hover:bg-orange-500 hover:text-white">📹</a>
          </div>
        </div> */}
            </div>

            <div className="contact-form  container mx-auto w-[80%]">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 relative pb-4">
                Send Us a Message
                <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500"></span>
              </h3>
              <form action="#" method="POST">
                <div className="mb-5">
                  <input
                    type="text"
                    className="block w-full px-4 py-3 text-base leading-6 text-gray-700 bg-white border border-gray-300 rounded transition-colors duration-300 focus:border-orange-500 focus:outline-none"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="email"
                    className="block w-full px-4 py-3 text-base leading-6 text-gray-700 bg-white border border-gray-300 rounded transition-colors duration-300 focus:border-orange-500 focus:outline-none"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="tel"
                    className="block w-full px-4 py-3 text-base leading-6 text-gray-700 bg-white border border-gray-300 rounded transition-colors duration-300 focus:border-orange-500 focus:outline-none"
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div className="mb-5">
                  <textarea
                    className="block w-full px-4 py-3 text-base leading-6 text-gray-700 bg-white border border-gray-300 rounded min-h-[150px] resize-y transition-colors duration-300 focus:border-orange-500 focus:outline-none"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-block px-8 py-3 bg-orange-500 text-white rounded font-bold transition-colors duration-300 hover:bg-orange-600 border-none cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="pb-20">
        <div className="container mx-auto px-4 w-[60%]">
          <div className="h-[450px] bg-gray-200 rounded-lg overflow-hidden ">
            <div className=" W-[60%] mx-auto h-[450px] bg-gray-100 flex items-center justify-center text-xl text-slate-500">
              Interactive Map Would Be Displayed Here
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Find answers to common questions about our Arabic language
              programs.
            </p>
            <div className=" bg-orange-500 border border-orange-500  w-[10%] mx-auto mt-3 h-1"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            {/* <!-- FAQ Item 1 --> */}
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
              <input
                type="checkbox"
                id="faq-1"
                className="absolute opacity-0 -z-10 peer"
              />
              <label
                htmlFor="faq-1"
                className="flex justify-between p-5 bg-gray-50 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45"
              >
                <h4 className="text-slate-800 text-lg m-0">
                  What age groups do you accept for enrollment?
                </h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">
                  +
                </div>
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
              <label
                htmlFor="faq-2"
                className="flex justify-between p-5 bg-gray-50 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45"
              >
                <h4 className="text-slate-800 text-lg m-0">
                  Do I need any prior knowledge of Arabic to enroll?
                </h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">
                  +
                </div>
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
              <label
                htmlFor="faq-3"
                className="flex justify-between p-5 bg-gray-50 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45"
              >
                <h4 className="text-slate-800 text-lg m-0">
                  What is your teaching approach?
                </h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">
                  +
                </div>
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
              <label
                htmlFor="faq-4"
                className="flex justify-between p-5 bg-gray-50 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45"
              >
                <h4 className="text-slate-800 text-lg m-0">
                  Do you offer online classes?
                </h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">
                  +
                </div>
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
              <label
                htmlFor="faq-5"
                className="flex justify-between p-5 bg-gray-50 cursor-pointer items-center peer-checked:[&>.accordion-icon]:rotate-45"
              >
                <h4 className="text-slate-800 text-lg m-0">
                  How can I register for classes?
                </h4>
                <div className="accordion-icon text-orange-500 text-xl transition-transform duration-300 ease-in-out">
                  +
                </div>
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

      <div className="fixed bottom-5 right-5 z-50">
        <Link
          className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl hover:bg-orange-200 transition-colors"
          href="/Contact"
        >
          <ChevronUp />
        </Link>
      </div>
    </div>

    // </div>
  );
}
