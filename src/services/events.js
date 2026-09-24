import { supabase } from "./supabase";

const objectPath = (url) => {
  if (!url) return null;
  const marker = "/storage/v1/object/public/cano-team/";
  const index = url.indexOf(marker);
  return index < 0 ? null : url.slice(index + marker.length).split("?")[0].split("/").map(decodeURIComponent).join("/");
};

export async function getEvents({ admin = false } = {}) {
  let query = supabase.from("events").select("*").order("event_date", { ascending: true, nullsFirst: false });
  if (!admin) query = query.eq("active", true);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
export async function saveEvent(values, id) {
  const previous = id ? await supabase.from("events").select("image_url,image_url_banner,video_url,video_storage_path").eq("id", id).single() : null;
  if (previous?.error) throw previous.error;
  const query = id ? supabase.from("events").update(values).eq("id", id) : supabase.from("events").insert(values);
  const { data, error } = await query.select().single();
  if (error) throw error;
  const retained = new Set([data.image_url, data.image_url_banner, data.video_url, data.video_storage_path].filter(Boolean));
  const oldPaths = [previous?.data?.image_url, previous?.data?.image_url_banner, previous?.data?.video_url].map(objectPath).filter((path) => path && !retained.has(path) && ![data.image_url, data.image_url_banner, data.video_url].some((url) => objectPath(url) === path));
  if (previous?.data?.video_storage_path && !retained.has(previous.data.video_storage_path)) oldPaths.push(previous.data.video_storage_path);
  if (oldPaths.length) {
    const { error: storageError } = await supabase.storage.from("cano-team").remove([...new Set(oldPaths)]);
    if (storageError) throw storageError;
  }
  return data;
}
export async function deleteEvent(event) {
  const paths = [event.video_storage_path, objectPath(event.image_url), objectPath(event.image_url_banner), objectPath(event.video_url)].filter(Boolean);
  if (paths.length) {
    const { error } = await supabase.storage.from("cano-team").remove(paths);
    if (error) throw error;
  }
  const { error } = await supabase.from("events").delete().eq("id", event.id);
  if (error) throw error;
}
