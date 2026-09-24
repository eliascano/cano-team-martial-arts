import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import { getEvents } from "../services/events";
import SectionHeading from "./SectionHeading";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        setEvents(data || []);
      } catch (error) {
        setError(error.message || "No se pudieron cargar los eventos.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <section id="eventos" className="section bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Agenda"
          title="Próximos Eventos"
          subtitle="Torneos, exámenes, seminarios y actividades de Cano Team."
        />

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl border border-border bg-surface"
              />
            ))}
          </div>
        ) : error ? (
          <div role="alert" className="rounded-2xl border border-red-900 bg-red-950/20 px-6 py-10 text-center text-red-300">{error}</div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center text-muted">No hay eventos próximos publicados.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => {
              const isBanner = events.length === 1 || event.important === true;
              const imageSrc =
                isBanner && event.image_url_banner
                  ? event.image_url_banner
                  : event.image_url;

              return (
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
                  className={`group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-brand/10 ${
                    isBanner
                      ? "md:col-span-2 md:grid md:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] lg:col-span-3"
                      : ""
                  }`}
                >
                  {(imageSrc || event.video_url) && (
                    <div
                      className={`relative overflow-hidden ${
                        isBanner ? "h-60 sm:h-72 md:h-full md:min-h-80" : "h-72 sm:h-80"
                      }`}
                    >
                      {event.video_url ? <video src={event.video_url} controls playsInline preload="metadata" poster={imageSrc || undefined} aria-label={event.title} className="h-full w-full bg-black object-cover" /> : <img
                        src={imageSrc}
                        alt={event.title}
                        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          isBanner ? "object-center" : "object-top"
                        }`}
                      />}

                      <div
                        className={`absolute ${
                          isBanner
                            ? "inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-1/3 md:bg-gradient-to-l"
                            : "inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent"
                        }`}
                      />
                    </div>
                  )}

                  <div
                    className={`p-6 ${
                      isBanner ? "flex flex-col justify-center md:p-8" : ""
                    }`}
                  >
                    <h3
                      className={`display font-bold text-foreground ${
                        isBanner ? "text-2xl sm:text-3xl" : "text-xl"
                      }`}
                    >
                      {event.title}
                    </h3>

                    {event.subtitle && (
                      <p
                        className={`mt-2 leading-relaxed text-muted ${
                          isBanner ? "text-base" : "text-sm"
                        }`}
                      >
                        {event.subtitle}
                      </p>
                    )}

                    <div className="mt-5 flex flex-col gap-3">
                      {event.event_date && (
                        <div className="flex items-center gap-3 text-sm">
                          <FaRegCalendarAlt className="text-brand" />
                          <span>{event.event_date}</span>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center gap-3 text-sm">
                          <FaMapMarkerAlt className="text-brand" />
                          <span>{event.location}</span>
                        </div>
                      )}

                      {event.time && (
                        <div className="flex items-center gap-3 text-sm">
                          <FaClock className="text-brand" />
                          <span>{event.time}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Events;
