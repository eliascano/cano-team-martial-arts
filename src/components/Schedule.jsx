import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaWhatsapp } from "react-icons/fa";
import { getSchedules } from "../services/schedule";
import SectionHeading from "./SectionHeading";

const DISCIPLINE_ORDER = ["MMA", "Brazilian Jiu-Jitsu", "Taekwon-Do ITF"];
const WHATSAPP_NUMBER = "543564657525";

function groupSchedules(schedules) {
  const map = {};
  for (const s of schedules) {
    if (!map[s.discipline]) map[s.discipline] = {};
    if (!map[s.discipline][s.group_name]) map[s.discipline][s.group_name] = [];
    map[s.discipline][s.group_name].push({
      days: s.days,
      time: s.time,
      id: s.id,
    });
  }
  return map;
}

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDisciplines, setOpenDisciplines] = useState(["MMA"]);

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const data = await getSchedules();
        setSchedules(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSchedules();
  }, []);

  const grouped = groupSchedules(schedules);
  const disciplines = DISCIPLINE_ORDER.filter((d) => grouped[d]);

  const toggleDiscipline = (discipline) => {
    setOpenDisciplines((current) =>
      current.includes(discipline)
        ? current.filter((item) => item !== discipline)
        : [...current, discipline]
    );
  };

  const getWhatsappHref = (discipline) => {
    const message = `Hola Pablo! Quiero consultar por los horarios de ${discipline}. ¿Me pasás información?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="horarios" className="section bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Planificá tu semana"
          title="Horarios"
          subtitle="Consultá los días y horarios de cada disciplina y elegí el grupo que mejor se adapte a vos."
        />

        {loading ? (
          <div className="flex flex-col gap-4">
            {[0, 1, 2].map((n) => (
              <div
                key={n}
                className="h-32 animate-pulse rounded-2xl border border-border bg-surface"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {disciplines.map((discipline, i) => (
              <motion.div
                key={discipline}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <button
                  type="button"
                  onClick={() => toggleDiscipline(discipline)}
                  aria-expanded={openDisciplines.includes(discipline)}
                  className="flex w-full items-center justify-between gap-4 border-b border-border bg-surface-2 px-5 py-4 text-left transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand sm:px-6"
                >
                  <span className="flex items-center gap-3">
                    <span className="h-5 w-1 rounded-full bg-brand" />
                    <span className="display text-lg font-bold text-foreground">
                      {discipline}
                    </span>
                  </span>
                  <FaChevronDown
                    aria-hidden="true"
                    className={`shrink-0 text-brand transition-transform duration-300 ${
                      openDisciplines.includes(discipline) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDisciplines.includes(discipline) && (
                  <>
                    <div className="divide-y divide-border md:hidden">
                      {Object.entries(grouped[discipline]).map(([groupName, slots]) => (
                        <div key={groupName} className="px-5 py-5">
                          <h4 className="display text-base font-semibold text-foreground">
                            {groupName}
                          </h4>

                          <div className="mt-3 flex flex-col gap-3">
                            {slots.map((slot) => (
                              <div
                                key={slot.id}
                                className="rounded-xl border border-border bg-background/40 p-4"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-subtle">
                                      Días
                                    </p>
                                    <p className="mt-1 text-sm leading-relaxed text-muted">
                                      {slot.days}
                                    </p>
                                  </div>

                                  <div className="shrink-0 text-right">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-subtle">
                                      Horario
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                      {slot.time}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="hidden md:block">
                      <table className="w-full min-w-[420px]">
                        <thead>
                          <tr className="text-xs uppercase tracking-wider text-subtle">
                            <th className="w-2/5 px-6 py-3 text-left font-semibold">
                              Grupo
                            </th>
                            <th className="w-2/5 px-6 py-3 text-left font-semibold">
                              Días
                            </th>
                            <th className="w-1/5 px-6 py-3 text-left font-semibold">
                              Horario
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {Object.entries(grouped[discipline]).map(([groupName, slots]) =>
                            slots.map((slot, idx) => (
                              <tr
                                key={slot.id}
                                className="border-t border-border transition-colors hover:bg-surface-2"
                              >
                                <td className="px-6 py-4">
                                  {idx === 0 && (
                                    <span className="text-sm font-semibold text-foreground">
                                      {groupName}
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-sm text-muted">
                                  {slot.days}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                                  {slot.time}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="border-t border-border px-5 py-4 sm:px-6">
                      <a
                        href={getWhatsappHref(discipline)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
                      >
                        <FaWhatsapp aria-hidden="true" />
                        Consultar esta disciplina
                      </a>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Schedule;
