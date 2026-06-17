import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      id="inicio"
      className="h-[95vh] flex items-center justify-center relative overflow-hidden"
    >
      <img
        src="/images/academia-frente.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "50% 80px" }}
      />

      <div className="absolute inset-0 bg-black/75" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center max-w-4xl px-6"
      >
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          CANO TEAM
        </h1>

        <h2 className="text-red-500 text-2xl md:text-4xl font-bold mb-8">
          Brazilian JiuJitsu • MMA • Taekwondo ITF
        </h2>

        <p className="text-zinc-300 text-lg md:text-xl mb-10">
          Formando atletas y personas a través de la disciplina,
          el respeto y el entrenamiento constante.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">

          <a
            href="#contacto"
            className="bg-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Empezar Ahora
          </a>

          <a
            href="#disciplinas"
            className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition"
          >
            Ver Disciplinas
          </a>

        </div>
      </motion.div>
    </section>
  );
}

export default Hero;