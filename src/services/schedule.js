import { supabase } from "./supabase";

export async function getSchedules() {
  const { data, error } = await supabase
    .from("schedules")
    .select("*, discipline:disciplines!schedules_discipline_id_fkey(id,name,active)")
    .order("discipline_id")
    .order("days");
  if (error) throw error;
  return data ?? [];
}
export async function saveSchedule(values, id) {
  const { data: linkedDiscipline, error: disciplineError } = await supabase
    .from("disciplines")
    .select("name")
    .eq("id", values.discipline_id)
    .single();
  if (disciplineError) throw disciplineError;

  // Keep the legacy text column in sync for old consumers; all app reads and
  // relationships use discipline_id and the joined discipline record.
  const payload = { ...values, discipline: linkedDiscipline.name };
  const query = id ? supabase.from("schedules").update(payload).eq("id", id) : supabase.from("schedules").insert(payload);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data;
}
export async function deleteSchedule(id) {
  const { error } = await supabase.from("schedules").delete().eq("id", id);
  if (error) throw error;
}
