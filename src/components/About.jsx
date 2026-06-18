import { motion } from "framer-motion";

const pillars = [
  { title: "Disciplina", text: "Constancia y hábitos que trascienden el tatami." },
  { title: "Respeto", text: "Valores que formamos dentro y fuera de la academia." },
  { title: "Comunidad", text: "Niños, adolescentes y adultos entrenando juntos." },
];

function About() {
  return (
    <section id="nosotros" className="section bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
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
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-brand-soft blur-2xl" />
            <img
              src="/images/pablo-cano.png"
              alt="Entrenamiento en Cano Team"
              className="h-[420px] w-full rounded-2xl object-cover shadow-2xl ring-1 ring-border md:h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
