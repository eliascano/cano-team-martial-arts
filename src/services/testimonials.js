import { supabase } from "./supabase";

export async function getTestimonials() {
  const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
export async function saveTestimonial(values, id) {
  const query = id ? supabase.from("testimonials").update(values).eq("id", id) : supabase.from("testimonials").insert(values);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data;
}
export async function deleteTestimonial(id) {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}
