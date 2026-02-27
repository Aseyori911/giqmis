'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import SlideCard from './slideCard'
import { slides } from './data'

export default function Sliding() {
  return (
    <Swiper
      spaceBetween={20}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={true}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <SlideCard {...slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}