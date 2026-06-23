import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { disciplines } from "../data/disciplines";
import SectionHeading from "./SectionHeading";

const getDisciplineSlug = (name) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function Disciplines() {
  const navigateToSchedule = (event, disciplineName) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    const slug = getDisciplineSlug(disciplineName);
    window.history.pushState(null, "", `#horarios-${slug}`);
    window.dispatchEvent(
      new CustomEvent("schedule:navigate", {
        detail: { discipline: disciplineName },
      })
    );
  };

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
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-2 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-brand/10"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={discipline.image}
                  alt={discipline.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="display text-2xl font-bold text-brand">
                  {discipline.name}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">
                  {discipline.description}
                </p>

                <a
                  href={`#horarios-${getDisciplineSlug(discipline.name)}`}
                  onClick={(event) => navigateToSchedule(event, discipline.name)}
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-border-strong px-4 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand hover:bg-brand-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
                >
                  <FaCalendarAlt aria-hidden="true" />
                  Ver horarios
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Disciplines;
