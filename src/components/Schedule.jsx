import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSchedules } from "../services/schedule";
import SectionHeading from "./SectionHeading";

const DISCIPLINE_ORDER = ["MMA", "Brazilian Jiu-Jitsu", "Taekwon-Do ITF"];

function groupSchedules(schedules) {
  const map = {};
  for (const s of schedules) {
    if (!map[s.discipline]) map[s.discipline] = {};
    if (!map[s.discipline][s.group_name]) map[s.discipline][s.group_name] = [];
    map[s.discipline][s.group_name].push({ days: s.days, time: s.time, id: s.id });
  }
  return map;
}

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

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
                <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-6 py-4">
                  <span className="h-5 w-1 rounded-full bg-brand" />
                  <h3 className="display text-lg font-bold text-foreground">
                    {discipline}
                  </h3>
                </div>

                <div className="overflow-x-auto">
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Schedule;
