import Image from "next/image";

export default function Gallery() {
  return (
    <div>
      <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white py-35 text-center min-h-[400px] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Our Gallery</h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Explore memorable moments from our classes, events, and cultural
            celebrations at Al-Noor Arabic School. Discover the vibrant
            community and rich learning experiences we offer.
          </p>
        </div>
      </section>

      <section className="bg-white py-8 mb-10 text-center border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-6">
            <i className="fa fa-search text-gray-400 mr-2"></i>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium shadow-lg shadow-orange-500/30 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/40">
              All
            </button>
            <button className="px-6 py-2 bg-gray-100 rounded-full font-medium transition-all duration-300 hover:bg-gray-200 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10">
              Classroom Activities
            </button>
            <button className="px-6 py-2 bg-gray-100 rounded-full font-medium transition-all duration-300 hover:bg-gray-200 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10">
              Graduation
            </button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="classroom"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Classroom
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>Sept 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">
                  Learning Arabic Alphabet
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Children in our beginner&apos;s class practicing Arabic letters
                  through interactive activities.
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="cultural"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Cultural
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>July 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">Eid Celebration</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Students and families gathering to celebrate Eid with
                  traditional foods and activities.
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="projects"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Projects
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>Oct 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">
                  Calligraphy Exhibition
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Student artwork showcasing beautiful Arabic calligraphy styles
                  and techniques.
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="fieldtrip"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Field Trip
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>Aug 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">
                  Islamic Art Museum Visit
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Our students exploring the rich history of Islamic art and
                  architecture at the city museum.
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="classroom"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Classroom
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>Sept 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">
                  Arabic Reading Circle
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Intermediate students practicing reading and discussing Arabic
                  literature together.
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="graduation"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Graduation
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>June 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">
                  End of Year Ceremony
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Celebrating our students&apos; achievements at our annual
                  graduation and certificate ceremony.
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="cultural"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Cultural
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>Oct 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">Arabic Cuisine Day</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Students learning about Middle Eastern cuisine and enjoying
                  traditional dishes together.
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="projects"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Projects
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>Aug 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">Poetry Competition</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Students reciting classic and contemporary Arabic poetry at
                  our annual competition.
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="classroom"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Classroom
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>Sept 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">
                  Conversation Practice
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Adult learners enhancing their speaking skills through guided
                  conversations and role-play.
                </p>
              </div>
            </div>
          </div>

          {/* Masonry Grid (hidden by default) */}
          <div className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="classroom"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Classroom
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>Sept 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">
                  Learning Arabic Alphabet
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Children in our beginner&apos;s class practicing Arabic letters
                  through interactive activities.
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="cultural"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Cultural
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>July 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">Eid Celebration</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Students and families gathering to celebrate Eid with
                  traditional foods and activities.
                </p>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl bg-white"
              data-category="projects"
            >
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                Projects
              </div>
              <div className="absolute top-5 left-5 bg-black/60 text-white px-4 py-2 rounded-full text-xs z-10">
                <i className="fa fa-calendar mr-2"></i>Oct 2024
              </div>
              <Image
                src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
                alt="Children learning Arabic letters"
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 pt-8 transform translate-y-3/4 transition-transform duration-400 hover:translate-y-0">
                <h4 className="text-xl mb-3 text-shadow">
                  Calligraphy Exhibition
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Student artwork showcasing beautiful Arabic calligraphy styles
                  and techniques.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-20">
            <button className="inline-block px-10 py-4 bg-orange-500 text-white rounded-full font-bold text-lg transition-all duration-300 border-none cursor-pointer shadow-lg shadow-orange-500/30 relative overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/40 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
              Load More <i className="fa fa-refresh ml-2"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 text-center mb-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-3xl font-bold text-gray-800 relative inline-block">
            What Our Students Say
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange-500"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-left transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
              <p className="text-lg leading-relaxed text-gray-600 mb-5 relative">
                <span className="absolute -top-5 -left-4 text-8xl text-orange-500 opacity-10 z-10">
                &quot;
                </span>
                The gallery events at Al-Noor have been a wonderful way to
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
              <p className="text-lg leading-relaxed text-gray-600 mb-5 relative">
                <span className="absolute -top-5 -left-4 text-8xl text-orange-500 opacity-10 z-10">
                &quot;
                </span>
                I&apos;ve been studying Arabic at Al-Noor for two years now. The
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
              <p className="text-lg leading-relaxed text-gray-600 mb-5 relative">
                <span className="absolute -top-5 -left-4 text-8xl text-orange-500 opacity-10 z-10">
                &quot;
                </span>
                The graduation ceremony at Al-Noor was one of my proudest
                moments. The school&apos;s commitment to celebrating achievements
                really motivates students to excel.
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
    </div>
  );
}
