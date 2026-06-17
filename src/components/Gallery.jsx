import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const images = [
  "/images/evento-tae-0.jpg",
  "/images/evento-tae-1.jpg",
  "/images/fight-night-0.jpg",
  "/images/fight-night-1.jpg",
  "/images/fight-night-2.jpg",
  "/images/fight-night-3.jpg"
];

function Gallery() {
  return (
    <section
      id="galeria"
      className="py-22 bg-zinc-950"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Galería
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          breakpoints={{
            768: {
              slidesPerView: 2
            },
            1024: {
              slidesPerView: 3
            }
          }}
          loop={true}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Galería ${index + 1}`}
                className="
                  h-72
                  w-full
                  object-cover
                  rounded-xl
                  shadow-xl
                "
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default Gallery;