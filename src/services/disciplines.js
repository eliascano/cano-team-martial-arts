import { supabase } from "./supabase";

export async function getDisciplines() {
  const { data, error } = await supabase.from("disciplines").select("id,name,description,active").eq("active", true);
  if (error) throw error;
  return data ?? [];
}
