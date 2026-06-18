import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegCalendarAlt } from "react-icons/fa";
import { getEvents } from "../services/event";
import SectionHeading from "./SectionHeading";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        setEvents(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="eventos" className="section bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Agenda"
          title="Próximos Eventos"
          subtitle="Torneos, exámenes y seminarios para poner a prueba lo entrenado."
        />

        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl border border-border bg-surface"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {events.map((event, i) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-brand/10"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="display text-xl font-bold text-foreground">
                    {event.title}
                  </h3>

                  <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    <FaRegCalendarAlt aria-hidden="true" />
                    {formatDate(event.date)}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Events;