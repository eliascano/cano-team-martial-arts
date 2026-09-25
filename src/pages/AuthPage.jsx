import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheckCircle, FaEnvelope, FaExclamationCircle, FaGoogle, FaLock, FaUser } from "react-icons/fa";
import { requestPasswordReset, signIn, signInWithGoogle, signUp, updatePassword } from "../services/auth";
import { useAuth } from "../hooks/useAuth";

const fieldClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function AuthPage({ mode = "login" }) {
  const { user } = useAuth();
  const [view, setView] = useState(mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async (fn, successMessage) => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const result = await fn();
      if (result?.error) throw result.error;
      setMessage(view === "register" && result?.data?.session ? "Tu cuenta está lista; ya podés ingresar." : successMessage);
    } catch (reason) {
      setError(reason.message || "No se pudo completar la solicitud.");
    } finally {
      setBusy(false);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (view === "register") {
      void run(() => signUp(email, password, name), "Te enviamos un correo para confirmar tu cuenta.");
    } else if (view === "reset") {
      void run(() => requestPasswordReset(email), "Te enviamos un enlace para restablecer tu contraseña.");
    } else if (view === "reset-password") {
      void run(() => updatePassword(password), "Tu contraseña se actualizó correctamente.");
    } else {
      void run(() => signIn(email, password), "Sesión iniciada.");
    }
  };

  const googleSignIn = async () => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const result = await signInWithGoogle();
      if (result?.error) throw result.error;
      // Supabase redirects to Google here; no email confirmation message applies to OAuth.
    } catch (reason) {
      setError(reason.message || "No se pudo iniciar sesión con Google.");
      setBusy(false);
    }
  };

  const changeView = (next) => {
    setView(next);
    setMessage("");
    setError("");
  };

  if (user && view !== "reset-password") {
    return <main className="flex min-h-screen items-center justify-center bg-background px-5 py-24 text-center text-foreground">
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-2xl shadow-black/20">
        <FaCheckCircle aria-hidden="true" className="mx-auto text-3xl text-brand" />
        <p className="display mt-4 text-2xl font-bold">Sesión iniciada</p>
        <a href="/" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-strong">Volver al inicio</a>
      </motion.section>
    </main>;
  }

  const heading = view === "register" ? "Crear cuenta" : view === "reset" ? "Recuperar contraseña" : view === "reset-password" ? "Nueva contraseña" : "Iniciar sesión";

  return <main className="flex min-h-screen items-center justify-center bg-background px-4 py-24 text-foreground sm:px-6">
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/25">
      <div className="h-1 bg-brand" />
      <div className="p-6 sm:p-9">
        <a href="/" className="inline-flex min-h-9 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"><FaArrowLeft aria-hidden="true" /> Cano Team</a>
        <p className="eyebrow mt-7">Área de alumnos</p>
        <h1 className="display mt-2 text-3xl font-bold sm:text-4xl">{heading}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">Accedé a tus datos, disciplinas y membresías de Cano Team.</p>

        <form className="mt-7 space-y-4" onSubmit={submit}>
          {view === "register" && <label className="block text-sm font-medium">Nombre completo<span className="relative mt-2 block"><FaUser aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" /><input autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" className={`${fieldClass} pl-10`} /></span></label>}
          {view !== "reset-password" && <label className="block text-sm font-medium">Email<span className="relative mt-2 block"><FaEnvelope aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" /><input autoComplete="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nombre@correo.com" className={`${fieldClass} pl-10`} /></span></label>}
          {view !== "reset" && <label className="block text-sm font-medium">{view === "reset-password" ? "Nueva contraseña" : "Contraseña"}<span className="relative mt-2 block"><FaLock aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" /><input autoComplete={view === "register" ? "new-password" : "current-password"} type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Al menos 8 caracteres" className={`${fieldClass} pl-10`} /></span></label>}
          <button disabled={busy} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-60">{busy ? "Procesando…" : view === "register" ? "Crear cuenta" : view === "reset" ? "Enviar enlace" : view === "reset-password" ? "Guardar contraseña" : "Ingresar"}</button>
        </form>

        {view === "login" && <button type="button" disabled={busy} onClick={() => void googleSignIn()} className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-border-strong hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-60"><FaGoogle aria-hidden="true" className="text-base text-[#4285F4]" />{busy ? "Conectando…" : "Continuar con Google"}</button>}

        {message && <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} role="status" className="mt-4 flex items-start gap-2 rounded-xl border border-green-900/60 bg-green-950/20 p-3 text-sm text-green-300"><FaCheckCircle aria-hidden="true" className="mt-0.5 shrink-0" />{message}</motion.p>}
        {error && <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-red-900/60 bg-red-950/20 p-3 text-sm text-red-300"><FaExclamationCircle aria-hidden="true" className="mt-0.5 shrink-0" />{error}</motion.p>}

        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-sm text-brand">
          {view === "login" ? <><button type="button" onClick={() => changeView("register")} className="transition-colors hover:text-foreground">Crear cuenta</button><button type="button" onClick={() => changeView("reset")} className="transition-colors hover:text-foreground">Olvidé mi contraseña</button></> : <button type="button" onClick={() => changeView("login")} className="transition-colors hover:text-foreground">Volver al inicio de sesión</button>}
        </div>
      </div>
    </motion.section>
  </main>;
}
