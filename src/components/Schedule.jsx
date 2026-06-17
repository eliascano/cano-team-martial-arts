import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSchedules } from "../services/schedule";

const DISCIPLINE_ORDER = ["MMA", "Brazilian Jiu-Jitsu", "Taekwondo ITF"];

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
    <section id="horarios" className="py-20 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Horarios
        </motion.h2>

        {loading ? (
          <p className="text-center text-zinc-400">Cargando horarios...</p>
        ) : (
          <div className="flex flex-col gap-8">
            {disciplines.map((discipline, i) => (
              <motion.div
                key={discipline}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-zinc-800 overflow-hidden"
              >
                <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
                  <h3 className="text-red-500 font-bold text-lg">{discipline}</h3>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="text-zinc-500 text-xs uppercase">
                      <th className="px-6 py-3 text-left w-2/5">Grupo</th>
                      <th className="px-6 py-3 text-left w-2/5">Días</th>
                      <th className="px-6 py-3 text-left w-1/5">Horario</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(grouped[discipline]).map(([groupName, slots]) =>
                      slots.map((slot, i) => (
                        <tr
                          key={slot.id}
                          className="border-t border-zinc-800 hover:bg-zinc-900 transition"
                        >
                          <td className="px-6 py-4">
                            {i === 0 && (
                              <span className="text-sm font-semibold text-white">
                                {groupName}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-zinc-400 text-sm">{slot.days}</td>
                          <td className="px-6 py-4 text-white font-semibold">{slot.time}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Schedule;