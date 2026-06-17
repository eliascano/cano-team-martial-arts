import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

import "swiper/css";
import "swiper/css/pagination";

const images = [
  "/images/evento-tae-0.jpg",
  "/images/evento-tae-1.jpg",
  "/images/fight-night-0.jpg",
  "/images/fight-night-1.jpg",
  "/images/fight-night-2.jpg",
  "/images/fight-night-3.jpg",
];

function Gallery() {
  return (
    <section id="galeria" className="section bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Momentos"
          title="Galería"
          subtitle="Competencias, exámenes y entrenamientos que reflejan el espíritu de Cano Team."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            className="!pb-12"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="group overflow-hidden rounded-2xl border border-border ring-1 ring-transparent transition-all duration-300 hover:ring-brand">
                  <img
                    src={image}
                    alt={`Galería Cano Team ${index + 1}`}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

export default Gallery;
