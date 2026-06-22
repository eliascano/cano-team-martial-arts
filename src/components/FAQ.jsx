import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaWhatsapp } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    question: "¿Puedo tomar una clase de prueba?",
    answer:
      "Sí. Podés escribirnos por WhatsApp para coordinar una clase de prueba y ver qué disciplina se adapta mejor a vos.",
  },
  {
    question: "¿Necesito experiencia previa?",
    answer:
      "No. Las clases están pensadas para acompañar a personas con distintos niveles, desde quienes empiezan de cero hasta alumnos con experiencia.",
  },
  {
    question: "¿Qué tengo que llevar la primera vez?",
    answer:
      "Vení con ropa cómoda, botella de agua y ganas de entrenar. Si necesitás indumentaria específica, te orientamos según la disciplina.",
  },
  {
    question: "¿Hay clases para niños, jóvenes y adultos?",
    answer:
      "Sí. Trabajamos con diferentes edades y grupos para que cada alumno entrene en un entorno adecuado a su etapa y objetivos.",
  },
  {
    question: "¿Qué disciplina me conviene elegir?",
    answer:
      "Taekwon-Do ITF es ideal para disciplina, técnica y defensa personal; Brazilian Jiu-Jitsu para control y lucha en el suelo; MMA para un entrenamiento integral.",
  },
  {
    question: "¿Dónde queda la academia?",
    answer:
      "Estamos en San Juan 918, San Francisco, Córdoba. En la sección de contacto tenés el mapa y los accesos directos para escribirnos.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="preguntas" className="section bg-surface">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Primera clase"
          title="Preguntas frecuentes"
          subtitle="Lo esencial para animarte a empezar sin vueltas."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-border bg-background"
        >
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="border-b border-border last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand sm:px-6"
                >
                  <span className="font-semibold text-foreground">
                    {item.question}
                  </span>
                  <FaChevronDown
                    aria-hidden="true"
                    className={`shrink-0 text-brand transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://wa.me/543564657525?text=Hola%20Pablo!%20Quiero%20reservar%20una%20clase%20de%20prueba.%20%C2%BFMe%20pas%C3%A1s%20informaci%C3%B3n%3F"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <FaWhatsapp aria-hidden="true" />
            Reservar clase de prueba
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
