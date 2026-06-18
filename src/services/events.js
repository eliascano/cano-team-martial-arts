import { supabase } from "./supabase";

export async function getEvents() {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      throw new Error("Error al obtener eventos: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}