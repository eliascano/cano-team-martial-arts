import { useState } from "react";
import { requestPasswordReset, signIn, signInWithGoogle, signUp, updatePassword } from "../services/auth";
import { useAuth } from "../hooks/useAuth";

const fieldClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-brand";
export default function AuthPage({ mode = "login" }) {
  const { user } = useAuth();
  const [view, setView] = useState(mode);
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [name, setName] = useState("");
  const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const run = async (fn) => { setBusy(true); setError(""); setMessage(""); try { const result = await fn(); if (result?.error) throw result.error; if (view === "register") setMessage("Revisá tu correo para confirmar la cuenta. El perfil se crea automáticamente en Supabase al confirmar el registro."); else setMessage("Listo. Revisá tu correo si la acción requiere confirmación."); } catch (e) { setError(e.message); } finally { setBusy(false); } };
  if (user && view !== "reset-password") return <main className="min-h-screen bg-background px-6 pt-32 text-center text-foreground"><p>Ya iniciaste sesión.</p><a href="/mi-cuenta" className="mt-4 inline-block text-brand">Ir a mi cuenta</a></main>;
  return <main className="min-h-screen bg-background px-5 pb-16 pt-28 text-foreground"><div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-7 shadow-xl sm:p-9">
    <a href="/" className="text-sm text-muted">← Cano Team</a><h1 className="display mt-5 text-3xl font-bold">{view === "register" ? "Crear cuenta" : view === "reset" ? "Recuperar contraseña" : view === "reset-password" ? "Nueva contraseña" : "Iniciar sesión"}</h1>
    <p className="mt-2 text-sm text-muted">Accedé a tus datos y membresías de Cano Team.</p>
    <form className="mt-7 space-y-4" onSubmit={(e) => { e.preventDefault(); if (view === "register") void run(() => signUp(email, password, name)); else if (view === "reset") void run(() => requestPasswordReset(email)); else if (view === "reset-password") void run(() => updatePassword(password)); else void run(() => signIn(email, password)); }}>
      {view === "register" && <label className="block text-sm">Nombre completo<input required value={name} onChange={(e) => setName(e.target.value)} className={`${fieldClass} mt-2`} /></label>}
      {view !== "reset-password" && <label className="block text-sm">Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${fieldClass} mt-2`} /></label>}
      {!(["reset"].includes(view)) && <label className="block text-sm">{view === "reset-password" ? "Nueva contraseña" : "Contraseña"}<input type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} className={`${fieldClass} mt-2`} /></label>}
      <button disabled={busy} className="w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Procesando…" : view === "register" ? "Crear cuenta" : view === "reset" ? "Enviar enlace" : view === "reset-password" ? "Guardar contraseña" : "Ingresar"}</button>
    </form>
    {view === "login" && <button onClick={() => void run(signInWithGoogle)} className="mt-3 w-full rounded-xl border border-border px-4 py-3 font-medium">Continuar con Google</button>}
    {message && <p role="status" className="mt-4 rounded-lg bg-green-900/20 p-3 text-sm text-green-300">{message}</p>}{error && <p role="alert" className="mt-4 rounded-lg bg-red-900/20 p-3 text-sm text-red-300">{error}</p>}
    <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm text-brand">{view === "login" ? <><button onClick={() => setView("register")}>Crear cuenta</button><button onClick={() => setView("reset")}>Olvidé mi contraseña</button></> : <button onClick={() => setView("login")}>Volver al inicio de sesión</button>}</div>
  </div></main>;
}
