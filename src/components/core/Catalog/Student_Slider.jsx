import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

function StudentSlider({ students }) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      speed={3000}
      loop={students.length > 3}
      slidesPerView={2}
      spaceBetween={20}
      breakpoints={{
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      className="py-8 px-4"
    >
      {students.map((student, i) => (
        <SwiperSlide key={i}>
          <div
            className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md"
            onMouseEnter={(e) =>
              e.currentTarget.closest(".swiper")?.swiper?.autoplay?.stop()
            }
            onMouseLeave={(e) =>
              e.currentTarget.closest(".swiper")?.swiper?.autoplay?.start()
            }
          >
            <a
              href={student.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-bold">{student.name}</h3>
                <p className="text-sm mb-2">{student.description}</p>
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index}>
                      {index < Math.floor(student.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default StudentSlider
