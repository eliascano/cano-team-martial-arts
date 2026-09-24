import { useEffect, useState } from "react";
import { onAuthStateChange, getSession } from "../services/auth";
import { getProfile } from "../services/profiles";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const loadUser = async (current) => {
      setSession(current);
      if (!current?.user) { setProfile(null); setLoading(false); return; }
      try { const row = await getProfile(current.user.id); if (active) setProfile(row); }
      catch { if (active) setProfile(null); }
      finally { if (active) setLoading(false); }
    };
    getSession().then(({ data }) => loadUser(data.session)).catch(() => setLoading(false));
    const { data: listener } = onAuthStateChange((_event, next) => { void loadUser(next); });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);
  return <AuthContext.Provider value={{ session, user: session?.user ?? null, profile, loading, refreshProfile: async () => { if (session?.user) setProfile(await getProfile(session.user.id)); } }}>{children}</AuthContext.Provider>;
}
