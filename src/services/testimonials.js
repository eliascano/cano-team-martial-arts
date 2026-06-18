import { supabase } from "./supabase";

export async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*");

    if (error) {
      throw new Error("Error al obtener testimonios: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}