import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";

const whatsappNumber = "543564657525";

const disciplines = [
    {
        name: "Taekwondo ITF",
        message:
            "Hola Pablo! Quiero aprender Taekwondo ITF. ¿Podrías pasarme información?"
    },
    {
        name: "Brazilian Jiu-Jitsu",
        message:
            "Hola Pablo! Quiero aprender Brazilian Jiu-Jitsu. ¿Podrías pasarme información?"
    },
    {
        name: "MMA",
        message:
            "Hola Pablo! Quiero aprender MMA. ¿Podrías pasarme información?"
    }
];

function Contact() {
    return (
        <section
            id="contacto"
            className="py-10 bg-zinc-950"
        >
            <div className="max-w-7xl mx-auto px-6">

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-center mb-12"
                >
                    Contacto
                </motion.h2>

                <div className="grid lg:grid-cols-2 gap-12">

                    <div>
                        <h3 className="text-2xl font-bold mb-6">
                            Elegí una disciplina
                        </h3>

                        <div className="flex flex-col gap-4">

                            {disciplines.map((discipline) => (
                                <a
                                    key={discipline.name}
                                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                                        discipline.message
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                    flex items-center gap-3
                    bg-green-600
                    hover:bg-green-700
                    transition
                    px-6 py-4 rounded-xl
                    font-semibold
                  "
                                >
                                    <FaWhatsapp />
                                    {discipline.name}
                                </a>
                            ))}

                        </div>

                        <div className="flex gap-6 mt-8 text-3xl">

                            <a
                                href="https://www.instagram.com/cano_team_martial_arts_19/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-red-500"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://www.facebook.com/p/Cano-Team-Martial-Arts-100063626314525/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-red-500"
                            >
                                <FaFacebook />
                            </a>

                        </div>

                    </div>

                    <div className="rounded-xl overflow-hidden border border-zinc-800">

                        <iframe
                            title="Mapa Cano Team"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.7207926137885!2d-62.08131732476506!3d-31.421817874259283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cb2937a08c3f7d%3A0xa2a0c4983b37b730!2sCano%20Team%20Martial%20Arts!5e0!3m2!1ses!2sar!4v1781097715119!5m2!1ses!2sar"
                            width="100%"
                            height="450"
                            loading="lazy"
                            allowFullScreen
                        />

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Contact;