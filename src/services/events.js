import { supabase } from "./supabase";

export async function getEvents() {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      throw new Error("Error al obtener eventos: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}