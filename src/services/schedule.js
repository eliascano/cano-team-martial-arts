import { supabase } from "./supabase";

export async function getSchedules() {
  const { data, error } = await supabase.from("schedules").select("*").order("discipline").order("days");
  if (error) throw error;
  return data ?? [];
}
export async function saveSchedule(values, id) {
  const query = id ? supabase.from("schedules").update(values).eq("id", id) : supabase.from("schedules").insert(values);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data;
}
export async function deleteSchedule(id) {
  const { error } = await supabase.from("schedules").delete().eq("id", id);
  if (error) throw error;
}
