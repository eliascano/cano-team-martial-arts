import { supabase } from "./supabase";

export async function getGallery() {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("id");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
} 