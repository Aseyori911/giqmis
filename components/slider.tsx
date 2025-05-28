"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

export default function Sliding() {
  return(
  <Swiper
  spaceBetween={20}
  breakpoints={{
    0: { slidesPerView: 1 },       
    640: { slidesPerView: 1 }, 
    768: { slidesPerView: 2 }, 
    1024: { slidesPerView: 3 },
  }}
  autoplay={{
    delay: 3000, // 3 seconds
    disableOnInteraction: false, // keeps autoplay even when user interacts
    pauseOnMouseEnter: true, // pause autoplay on mouse enter
  }}
    // navigation={true}
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    className=""
    loop={true}
    modules={[Pagination, Navigation, Autoplay]}
  >
    <SwiperSlide>
      {/* {" "} */}
      <div className="flex-shrink-0 w-full p-[15px]">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:-translate-y-[10px] transition-transform">
          <div className="relative h-[200px] overflow-hidden">
            <Image
              src="https://plus.unsplash.com/premium_photo-1661378462458-7240ebe44deb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D"
              alt="Children learning Arabic"
              fill
               sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }} 
              
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-5 right-5 bg-orange-500 text-white px-[15px] py-[5px] rounded-full text-sm font-medium shadow">
              Ages 5-12
            </div>
          </div>
          <div className="p-[25px]">
            <h4 className="text-xl text-gray-800 mb-[10px]">
              Children's Arabic Program
            </h4>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Our Arabic school nurtures children by focusing on Qur'an reading,
              memorization, and understanding, while strengthening Arabic
              language foundations, pronunciation skills, and overall
              comprehension abilities effectively.
            </p>
            <div className="flex justify-start gap-[15px] pt-[15px] border-t border-gray-100">
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                2x Weekly
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                Small Classes
              </div>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      {/* {" "} */}
      <div className="flex-shrink-0 w-full p-[15px]">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:-translate-y-[10px] transition-transform">
          <div className="relative h-[200px] overflow-hidden">
            <Image
              src="https://plus.unsplash.com/premium_photo-1723532432416-9ad01e52c3b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ5fHxJbnRlcm1lZGlhdGUlMjBRdXInYW4lMjAlMjYlMjBGaXFoJTIwZm9yJTIwZmVtYWxlfGVufDB8fDB8fHww"
              alt="Teens learning Arabic"
              fill
              style={{ objectFit: "cover" }} 
               sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-5 right-5 bg-orange-500 text-white px-[15px] py-[5px] rounded-full text-sm font-medium shadow">
              Ages 13-17
            </div>
          </div>
          <div className="p-[25px]">
            <h4 className="text-xl text-gray-800 mb-[10px]">
              Teen Arabic Program
            </h4>
            <p className="text-gray-600 mb-5 leading-relaxed">
              We provide structured Arabic education for teenagers, emphasizing
              Qur'an reading, Tajweed, memorization, grammar skills,
              comprehension improvement, and building a deep, meaningful
              relationship with the Arabic language.
            </p>
            <div className="flex justify-start gap-[15px] pt-[15px] border-t border-gray-100">
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                3x Weekly
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                Progressive Learning
              </div>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      {/* {" "} */}
      <div className="flex-shrink-0 w-full p-[15px]">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:-translate-y-[10px] transition-transform">
          <div className="relative h-[200px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1618371331418-baa506217295?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Adults learning Arabic"
              fill
              style={{ objectFit: "cover" }} 
                sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-5 right-5 bg-orange-500 text-white px-[15px] py-[5px] rounded-full text-sm font-medium shadow">
              Ages 18+
            </div>
          </div>
          <div className="p-[25px]">
            <h4 className="text-xl text-gray-800 mb-[10px]">
              Adult Arabic Program
            </h4>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Our adult Arabic courses focus on Qur'an reading, memorization,
              Arabic grammar mastery, and communication skills, offering
              flexible paths for beginners, intermediate learners, and advanced
              students.
            </p>
            <div className="flex justify-start gap-[15px] pt-[15px] border-t border-gray-100">
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                Evening Classes
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                All Levels
              </div>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      {/* {" "} */}
      <div className="flex-shrink-0 w-full p-[15px]">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:-translate-y-[10px] transition-transform">
          <div className="relative h-[200px] overflow-hidden">
            <Image
              src="https://plus.unsplash.com/premium_photo-1661382504923-8085addc989c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3VtbWVyJTIwSW50ZW5zaXZlJTIwUHJvZ3JhbSUyMGZvciUyMHF1cidhbiUyMHNpc3RlcnN8ZW58MHx8MHx8fDA%3D"
              alt="Summer Arabic program"
              fill
              style={{ objectFit: "cover" }} 
                sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-5 right-5 bg-orange-500 text-white px-[15px] py-[5px] rounded-full text-sm font-medium shadow">
              Summer
            </div>
          </div>
          <div className="p-[25px]">
            <h4 className="text-xl text-gray-800 mb-[10px]">
              Summer Intensive Program
            </h4>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Boost Arabic and Qur'an memorization this summer through daily
              intensive classes focusing on fluent reading, grammar practice,
              vocabulary development, memorization strategies, and comprehensive
              language understanding.
            </p>
            <div className="flex justify-start gap-[15px] pt-[15px] border-t border-gray-100">
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                Daily Classes
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                All Ages
              </div>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      {/* {" "} */}
      <div className="flex-shrink-0 w-full p-[15px]">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:-translate-y-[10px] transition-transform">
          <div className="relative h-[200px] overflow-hidden">
            <Image
              src="https://plus.unsplash.com/premium_photo-1661547803869-35653a2d2e27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b25saW5lJTIwcXVyJ2FuJTIwbGVhcm5pbmd8ZW58MHx8MHx8fDA%3D"
              alt="Online Arabic learning"
              fill
              style={{ objectFit: "cover" }} 
                sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-5 right-5 bg-orange-500 text-white px-[15px] py-[5px] rounded-full text-sm font-medium shadow">
              Online
            </div>
          </div>
          <div className="p-[25px]">
            <h4 className="text-xl text-gray-800 mb-[10px]">Online class</h4>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Attend live, interactive Arabic classes online focused on Qur'an
              reading, Tajweed, memorization, grammar, comprehension
              improvement, and enjoy personalized instruction from experienced
              teachers with flexible scheduling.
            </p>
            <div className="flex justify-start gap-[15px] pt-[15px] border-t border-gray-100">
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                Flexible Hours
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-[5px] rounded">
                Individual Attention
              </div>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>);
}
