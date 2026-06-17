import { motion } from "framer-motion";

function About() {
  return (
    <section
      id="nosotros"
      className="py-22 bg-black"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Sobre Cano Team
            </h2>

            <p className="text-zinc-400 mb-4">
              En Cano Team Martial Arts creemos que las artes marciales
              son una herramienta para el crecimiento físico y personal.
            </p>

            <p className="text-zinc-400 mb-4">
              Nuestro objetivo es formar personas disciplinadas,
              respetuosas y perseverantes a través del Taekwondo ITF,
              Brazilian Jiu-Jitsu y MMA.
            </p>

            <p className="text-zinc-400">
              Trabajamos con niños, adolescentes y adultos,
              acompañando a cada alumno según sus objetivos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
              alt="Cano Team"
              className="
                w-full
                h-[350px]
                object-cover
                rounded-xl
                shadow-2xl
              "
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default About;