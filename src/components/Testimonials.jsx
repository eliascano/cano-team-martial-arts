import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "../services/testimonials";
import SectionHeading from "./SectionHeading";

function Testimonials() {
  return (
    <section id="testimonios" className="section bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen nuestros alumnos"
          subtitle="Experiencias reales de quienes entrenan y crecen junto a Cano Team."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col rounded-2xl border border-border bg-surface-2 p-8 transition-colors duration-300 hover:border-border-strong"
            >
              <FaQuoteLeft
                aria-hidden="true"
                className="text-2xl text-brand"
              />
              <p className="mt-4 flex-1 leading-relaxed text-muted">
                {testimonial.text}
              </p>
              <h3 className="display mt-6 text-lg font-semibold text-foreground">
                {testimonial.name}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
