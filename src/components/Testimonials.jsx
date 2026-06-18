import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { getTestimonials } from "../services/testimonials";
import SectionHeading from "./SectionHeading"; 

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await getTestimonials();
        setTestimonials(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonios" className="section bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen nuestros alumnos"
          subtitle="Experiencias reales de quienes entrenan y crecen junto a Cano Team."
        />

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl border border-border bg-surface-2"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, i) => (
              <motion.article
                key={testimonial.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className="flex flex-col rounded-2xl border border-border bg-surface-2 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand"
              >
                <FaQuoteLeft
                  aria-hidden="true"
                  className="text-2xl text-brand"
                />

                <p className="mt-4 flex-1 leading-relaxed text-muted">
                  {testimonial.comment}
                </p>

                <h3 className="display mt-6 text-lg font-semibold text-foreground">
                  {testimonial.name}
                </h3>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;