import { useEffect, useState } from "react"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import { getGallery } from "../services/gallery";
import SectionHeading from "./SectionHeading";

import "swiper/css";
import "swiper/css/pagination";

const gallerySections = [
  { code: "EV", label: "Eventos" },
  { code: "EN", label: "Entrenamientos" },
  { code: "EX", label: "Exámenes y torneos" },
];

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("EV");

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

  const hasSectionData = images.some((image) => Boolean(image.seccion));
  const filteredImages = hasSectionData
    ? images.filter((image) => image.seccion === activeSection)
    : images;

  return (
    <section id="galeria" className="section bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Comunidad"
          title="Galería Cano Team"
          subtitle="Entrenamientos, competencias, exámenes, eventos y momentos compartidos dentro y fuera del tatami."
        />

        <div className="mx-auto mb-8 grid max-w-4xl gap-3 sm:grid-cols-3">
          {gallerySections.map((section) => (
            <button
              key={section.code}
              type="button"
              onClick={() => setActiveSection(section.code)}
              aria-pressed={activeSection === section.code}
              className={`min-h-11 rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                activeSection === section.code
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-background/40 text-muted hover:border-brand hover:text-foreground"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

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
          ) : filteredImages.length === 0 ? (
            <div className="rounded-2xl border border-border bg-background/40 px-6 py-12 text-center">
              <p className="font-semibold text-foreground">
                Todavía no hay imágenes en esta sección.
              </p>
              <p className="mt-2 text-sm text-muted">
                Cuando se carguen en la galería, van a aparecer acá.
              </p>
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
                bulletClass: "ct-bullet",
                bulletActiveClass: "ct-bullet-active",
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              loop={filteredImages.length > 3}
              className="!pb-12"
            >
              {filteredImages.map((image) => (
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
