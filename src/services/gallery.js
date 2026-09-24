import { supabase } from "./supabase";

export async function getGallery({ admin = false } = {}) {
  let query = supabase.from("gallery").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
  if (!admin) query = query.eq("active", true);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
export async function saveGalleryItem(values, id) {
  const previous = id ? await supabase.from("gallery").select("storage_path").eq("id", id).single() : null;
  if (previous?.error) throw previous.error;
  const query = id ? supabase.from("gallery").update(values).eq("id", id) : supabase.from("gallery").insert(values);
  const { data, error } = await query.select().single();
  if (error) throw error;
  if (previous?.data?.storage_path && previous.data.storage_path !== data.storage_path) {
    const { error: storageError } = await supabase.storage.from("cano-team").remove([previous.data.storage_path]);
    if (storageError) throw storageError;
  }
  return data;
}
export async function deleteGalleryItem(item) {
  if (item.storage_path) {
    const { error } = await supabase.storage.from("cano-team").remove([item.storage_path]);
    if (error) throw error;
  }
  const { error } = await supabase.from("gallery").delete().eq("id", item.id);
  if (error) throw error;
}
export async function uploadMedia(file, folder, onProgress) {
  if (!(file instanceof File)) throw new Error("Seleccioná un archivo válido.");
  const isVideo = file.type.startsWith("video/");
  const isImage = file.type.startsWith("image/");
  if (!isVideo && !isImage) throw new Error("El archivo debe ser una imagen o un video.");
  if (file.size > (isVideo ? 200 : 15) * 1024 * 1024) throw new Error(`El archivo supera el límite de ${isVideo ? 200 : 15} MB.`);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Iniciá sesión para subir contenido.");
  const safeName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${folder}/${crypto.randomUUID()}-${safeName}`;
  const url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/cano-team/${path.split("/").map(encodeURIComponent).join("/")}`;
  await new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Authorization", `Bearer ${session.access_token}`);
    request.setRequestHeader("apikey", import.meta.env.VITE_SUPABASE_ANON_KEY);
    request.setRequestHeader("Content-Type", file.type);
    request.setRequestHeader("x-upsert", "false");
    request.upload.onprogress = (event) => { if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100)); };
    request.onload = () => request.status >= 200 && request.status < 300 ? resolve() : reject(new Error("No se pudo subir el archivo. Revisá el bucket y sus políticas de Storage."));
    request.onerror = () => reject(new Error("Falló la conexión durante la subida."));
    request.send(file);
  });
  const { data } = supabase.storage.from("cano-team").getPublicUrl(path);
  return { path, url: data.publicUrl, mediaType: isVideo ? "video" : "image", mimeType: file.type };
}
