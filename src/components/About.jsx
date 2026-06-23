import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAward, FaChevronDown } from "react-icons/fa";

const pillars = [
  { title: "Disciplina", text: "Constancia y hábitos que trascienden el tatami." },
  { title: "Respeto", text: "Valores que formamos dentro y fuera de la academia." },
  { title: "Comunidad", text: "Niños, adolescentes y adultos entrenando juntos." },
];

const credentials = [
  { title: "4 Dan", text: "Taekwon-Do ITF" },
  { title: "Cinturón negro", text: "Brazilian Jiu-Jitsu" },
  { title: "MMA", text: "Entrenamiento integral" },
  { title: "Dirección técnica", text: "Cano Team Martial Arts" },
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
                    className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface/80 px-4 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-brand hover:bg-brand-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
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

                <AnimatePresence>
                  {showTrajectory && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute inset-0 z-10 bg-background/94 p-4 backdrop-blur-sm sm:p-6"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="flex h-full flex-col justify-between"
                      >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="eyebrow mb-2">Trayectoria</p>
                          <h4 className="display text-xl font-bold text-foreground sm:text-2xl">
                            Pablo Cano
                          </h4>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowTrajectory(false)}
                          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-muted transition-colors hover:border-brand hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                          Cerrar
                        </button>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-muted sm:mt-5">
                        Dirección técnica con foco en disciplina, progreso y
                        acompañamiento cercano para niños, jóvenes y adultos.
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
                        {credentials.map((item) => (
                          <div
                            key={item.title}
                            className="rounded-xl border border-border bg-surface/80 p-3 sm:p-4"
                          >
                            <p className="display text-sm font-semibold text-brand sm:text-base">
                              {item.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
