import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import { getGallery } from "../services/gallery";
import SectionHeading from "./SectionHeading";

import "swiper/css";
import "swiper/css/pagination";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await getGallery();
        setImages(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

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
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl border border-border bg-surface-2"
                />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              loop={images.length > 3}
              className="!pb-12"
            >
              {images.map((image) => (
                <SwiperSlide key={image.id}>
                  <div className="group overflow-hidden rounded-2xl border border-border ring-1 ring-transparent transition-all duration-300 hover:ring-brand">
                    <img
                      src={image.image_url}
                      alt="Galería Cano Team"
                      className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Gallery;