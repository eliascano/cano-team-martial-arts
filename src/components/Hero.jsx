import { motion } from "framer-motion";

const stats = [
  { value: "3", label: "Disciplinas" },
  { value: "+10", label: "Años de experiencia" },
  { value: "Todas", label: "Las edades" },
];

function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <img
        src="/images/academia-frente.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "50% 80px" }}
      />

      {/* Layered overlays for depth and legibility */}
      <div className="absolute inset-0 bg-background/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
        }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          className="eyebrow inline-block"
        >
          Academia de Artes Marciales
        </motion.span>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0 },
          }}
          className="display mt-5 text-6xl font-bold text-foreground sm:text-7xl md:text-8xl"
        >
          Cano Team
        </motion.h1>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0 },
          }}
          className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-brand sm:text-xl md:text-2xl text-balance"
        >
          Brazilian Jiu-Jitsu &bull; MMA &bull; Taekwon-Do ITF
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg text-pretty"
        >
          Formando atletas y personas a través de la disciplina, el respeto y el
          entrenamiento constante.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contacto"
            className="rounded-lg bg-brand px-8 py-4 font-semibold text-foreground shadow-lg shadow-brand/20 transition-all duration-300 hover:bg-brand-strong hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Empezar Ahora
          </a>

          <a
            href="#disciplinas"
            className="rounded-lg border border-border-strong bg-surface/40 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-foreground hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Ver Disciplinas
          </a>
        </motion.div>

        <motion.dl
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="display text-3xl font-bold text-foreground md:text-4xl">
                {stat.value}
              </dd>
              <p className="mt-1 text-xs uppercase tracking-wider text-subtle">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue — minimal, tucked into the bottom-right corner so it never overlaps content */}
      <motion.a
        href="#nosotros"
        aria-label="Desplazar a la siguiente sección"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="group absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="[writing-mode:vertical-rl] text-[0.7rem] font-medium uppercase tracking-[0.25em] text-subtle transition-colors group-hover:text-foreground">
          Desliza
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-border-strong">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-brand"
          />
        </span>
      </motion.a>
    </section>
  );
}

export default Hero;
