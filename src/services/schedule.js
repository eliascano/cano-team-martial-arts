import { supabase } from "./supabase";

export async function getSchedules() {
  try {
    const { data, error } = await supabase
      .from("schedules")
      .select("*");

    console.log("Query result:", data);

    if (error) {
      throw new Error("Error al obtener horarios: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}