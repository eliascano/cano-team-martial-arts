import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });

  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return Response.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !anonKey || !serviceKey) return Response.json({ error: "Function secrets are not configured" }, { status: 500, headers: corsHeaders });

  const userClient = createClient(url, anonKey, { global: { headers: { Authorization: authorization } }, auth: { persistSession: false } });
  const { data: { user }, error: authError } = await userClient.auth.getUser();
  if (authError || !user) return Response.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
  const { data: profile, error: profileError } = await userClient.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profileError || profile?.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403, headers: corsHeaders });

  let body: { profile_ids?: unknown };
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON body" }, { status: 400, headers: corsHeaders }); }
  if (!Array.isArray(body.profile_ids) || body.profile_ids.length > 100 || body.profile_ids.some((id) => typeof id !== "string" || id.length > 80)) {
    return Response.json({ error: "profile_ids must contain at most 100 profile IDs" }, { status: 400, headers: corsHeaders });
  }

  const adminClient = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const pairs = await Promise.all(body.profile_ids.map(async (id) => {
    const { data, error } = await adminClient.auth.admin.getUserById(id);
    if (error) return [id, null] as const;
    return [id, data.user?.email ?? null] as const;
  }));
  const emails = Object.fromEntries(pairs.filter(([, email]) => email));
  return Response.json({ emails }, { headers: { ...corsHeaders, "Cache-Control": "no-store" } });
});
