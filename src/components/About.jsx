import { useState } from "react";
import { motion } from "framer-motion";
import { FaAward, FaChevronDown } from "react-icons/fa";

const pillars = [
  { title: "Disciplina", text: "Constancia y hábitos que trascienden el tatami." },
  { title: "Respeto", text: "Valores que formamos dentro y fuera de la academia." },
  { title: "Comunidad", text: "Niños, adolescentes y adultos entrenando juntos." },
];

function About() {
  const [showTrajectory, setShowTrajectory] = useState(false);

  return (
    <section id="nosotros" className="section bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="eyebrow mb-3">Nosotros</p>

            <h2 className="display text-4xl font-bold text-balance md:text-5xl">
              Sobre Cano Team
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
              <p>
                En Cano Team Martial Arts creemos que las artes marciales son una
                herramienta para el crecimiento físico y personal.
              </p>
              <p>
                Nuestro objetivo es formar personas disciplinadas, respetuosas y
                perseverantes a través del Taekwon-Do ITF, Brazilian Jiu-Jitsu y
                MMA.
              </p>
              <p>
                Trabajamos con niños, adolescentes y adultos, acompañando a cada
                alumno según sus objetivos.
              </p>
            </div>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="border-l-2 border-brand pl-4"
                >
                  <dt className="display text-lg font-semibold text-foreground">
                    {pillar.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-subtle">
                    {pillar.text}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
            id="instructor"
          >
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-brand-soft blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/30">
              <div className="relative">
                <img
                  src="/images/pablo-cano.png"
                  alt="Pablo Cano, instructor de Cano Team"
                  className="h-[420px] w-full object-cover md:h-[500px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5 pt-20">
                  <p className="eyebrow mb-2">Instructor</p>
                  <h3 className="display text-2xl font-bold text-foreground">
                    Pablo Cano
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowTrajectory((current) => !current)}
                    aria-expanded={showTrajectory}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface/80 px-4 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-brand hover:bg-brand-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <FaAward aria-hidden="true" />
                    Ver trayectoria
                    <FaChevronDown
                      aria-hidden="true"
                      className={`text-xs transition-transform duration-300 ${
                        showTrajectory ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {showTrajectory && (
                <div className="border-t border-border p-5 sm:p-6">
                  <p className="text-sm leading-relaxed text-muted">
                    Dirección técnica y acompañamiento cercano para formar
                    alumnos con disciplina, respeto y constancia. La enseñanza
                    integra Taekwon-Do ITF, Brazilian Jiu-Jitsu y MMA con foco
                    en objetivos reales: aprender, mejorar y pertenecer a una
                    comunidad de entrenamiento.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {["Formación técnica", "Trabajo por objetivos", "Comunidad"].map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-border bg-background/50 p-4"
                        >
                          <p className="display text-sm font-semibold text-brand">
                            {item}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
