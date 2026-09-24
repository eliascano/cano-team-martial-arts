import { supabase } from "./supabase";
export async function getProfile(id) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}
export async function ensureCurrentProfile() {
  const { data, error } = await supabase.rpc("ensure_current_profile");
  if (error) throw error;
  return data;
}
export async function updateProfile(id, values) {
  const { data, error } = await supabase.from("profiles").update(values).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
export async function listProfiles() {
  const { data, error } = await supabase.from("profiles").select("*").order("full_name");
  if (error) throw error;
  return data ?? [];
}

export async function getAdminProfileEmails(profileIds) {
  const emails = {};
  for (let offset = 0; offset < profileIds.length; offset += 100) {
    const { data, error } = await supabase.functions.invoke("admin-profile-emails", {
      body: { profile_ids: profileIds.slice(offset, offset + 100) },
    });
    if (error) throw error;
    Object.assign(emails, data?.emails ?? {});
  }
  return emails;
}
