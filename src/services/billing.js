import { supabase } from "./supabase";

export async function listRows(table, options = {}) {
  let query = supabase.from(table).select(options.select || "*");
  if (options.order) query = query.order(options.order, { ascending: options.ascending ?? true });
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
export async function saveRow(table, values, id) {
  const query = id ? supabase.from(table).update(values).eq("id", id) : supabase.from(table).insert(values);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data;
}
export async function deleteRow(table, id) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}
export async function getMyAccount(userId) {
  const [profile, memberships, invoices, payments] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("memberships").select("*, disciplines(name), fee_plans(name, amount, currency, billing_period)").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("membership_invoices").select("*").eq("user_id", userId).order("period_year", { ascending: false }).order("period_month", { ascending: false }),
    supabase.from("payments").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
  ]);
  for (const result of [profile, memberships, invoices, payments]) if (result.error) throw result.error;
  return { profile: profile.data, memberships: memberships.data ?? [], invoices: invoices.data ?? [], payments: payments.data ?? [] };
}

export async function getMembershipSummary(userId) {
  const { data, error } = await supabase
    .from("memberships")
    .select("id,status,disciplines(name),fee_plans(name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getStudentDetails(userId) {
  const results = await Promise.all([
    supabase.from("memberships").select("*, disciplines(name), fee_plans(name, amount, currency)").eq("user_id", userId),
    supabase.from("membership_invoices").select("id, period_year, period_month, status, amount, currency, due_date").eq("user_id", userId).order("period_year", { ascending: false }).order("period_month", { ascending: false }),
    supabase.from("payments").select("id, status, amount, currency, provider, provider_reference, paid_at, created_at").eq("user_id", userId).order("created_at", { ascending: false }),
  ]);
  for (const result of results) if (result.error) throw result.error;
  return { memberships: results[0].data ?? [], invoices: results[1].data ?? [], payments: results[2].data ?? [] };
}

export async function getAdminDashboard() {
  const count = async (table, column, value) => {
    let query = supabase.from(table).select("id", { count: "exact", head: true });
    if (column) query = query.eq(column, value);
    const { count: total, error } = await query;
    if (error) throw error;
    return total ?? 0;
  };
  const [students, activeMemberships, pendingInvoices, overdueInvoices, approvedPayments, gallery, events] = await Promise.all([
    count("profiles", "role", "user"), count("memberships", "status", "active"), count("membership_invoices", "status", "pending"),
    count("membership_invoices", "status", "overdue"), count("payments", "status", "approved"), count("gallery"),
    supabase.from("events").select("id,title,event_date").eq("active", true).gte("event_date", new Date().toISOString().slice(0, 10)).order("event_date").limit(5),
  ]);
  if (events.error) throw events.error;
  return { students, activeMemberships, pendingInvoices, overdueInvoices, approvedPayments, gallery, events: events.data ?? [] };
}
