import { motion } from "framer-motion";
import { disciplines } from "../data/disciplines";
import SectionHeading from "./SectionHeading";

function Disciplines() {
  return (
    <section id="disciplinas" className="section bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Entrenamiento"
          title="Nuestras Disciplinas"
          subtitle="Programas para todas las edades y niveles, guiados por instructores con experiencia."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {disciplines.map((discipline, i) => (
            <motion.article
              key={discipline.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group overflow-hidden rounded-2xl border border-border bg-surface-2 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-brand/10"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={discipline.image}
                  alt={discipline.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="display text-2xl font-bold text-brand">
                  {discipline.name}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {discipline.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Disciplines;
