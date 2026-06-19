import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const whatsappNumber = "543564657525";

const disciplines = [
  {
    name: "Taekwon-Do ITF",
    message:
      "Hola Pablo! Quiero aprender Taekwon-Do ITF. ¿Podrías pasarme información?",
  },
  {
    name: "Brazilian Jiu-Jitsu",
    message:
      "Hola Pablo! Quiero aprender Brazilian Jiu-Jitsu. ¿Podrías pasarme información?",
  },
  {
    name: "MMA",
    message: "Hola Pablo! Quiero aprender MMA. ¿Podrías pasarme información?",
  },
];

function Contact() {
  return (
    <section id="contacto" className="section bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Sumate"
          title="Contacto"
          subtitle="Escribinos por WhatsApp y empezá a entrenar. Elegí tu disciplina para iniciar la conversación."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="display text-2xl font-bold text-foreground">
              Elegí una disciplina
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {disciplines.map((discipline) => (
                <a
                  key={discipline.name}
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    discipline.message
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl bg-[#16a34a] px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#15803d] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
                >
                  <span className="flex items-center gap-3">
                    <FaWhatsapp className="text-xl" aria-hidden="true" />
                    {discipline.name}
                  </span>
                  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    &rarr;
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm text-subtle">Seguinos</span>
              <a
                href="https://www.instagram.com/cano_team_martial_arts_19/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-lg border border-border p-3 text-xl text-muted transition-colors hover:border-brand hover:text-brand"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/p/Cano-Team-Martial-Arts-100063626314525/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-lg border border-border p-3 text-xl text-muted transition-colors hover:border-brand hover:text-brand"
              >
                <FaFacebook />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl border border-border"
          >
            <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-6 py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <FaMapMarkerAlt aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-subtle">
                  Dirección
                </p>
                <p className="font-semibold text-foreground">
                  San Juan 918, San Francisco, Córdoba
                </p>
              </div>
            </div>

            <iframe
              title="Mapa Cano Team"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.7207926137885!2d-62.08131732476506!3d-31.421817874259283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cb2937a08c3f7d%3A0xa2a0c4983b37b730!2sCano%20Team%20Martial%20Arts!5e0!3m2!1ses!2sar!4v1781097715119!5m2!1ses!2sar"
              width="100%"
              height="100%"
              className="min-h-[420px]"
              loading="lazy"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
