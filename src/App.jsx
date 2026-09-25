import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Disciplines from "./components/Disciplines";
import Schedule from "./components/Schedule";
import Events from "./components/Events";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { useAuth } from "./hooks/useAuth";
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";

function RouteView() {
  const { user, profile, loading } = useAuth();
  const path = window.location.pathname;
  if (path === "/login" || path === "/registro" || path === "/reset-password") {
    return <AuthPage mode={path === "/registro" ? "register" : path === "/reset-password" ? "reset-password" : "login"} />;
  }
  if (path === "/mi-cuenta" || path === "/admin") {
    if (loading) return <main className="min-h-screen bg-background px-6 pt-32 text-center text-muted">Verificando sesión…</main>;
    if (!user) { window.location.replace("/login"); return null; }
    if (!profile) return <main className="min-h-screen bg-background px-6 pt-32 text-center text-foreground"><h1 className="text-2xl font-bold">Perfil pendiente</h1><p className="mx-auto mt-3 max-w-xl text-muted">No encontramos tu perfil de Cano Team asociado a esta cuenta. La creación automática necesita el trigger de Supabase incluido en la configuración del proyecto.</p><a href="/" className="mt-5 inline-block text-brand">Volver al inicio</a></main>;
    if (path === "/admin") {
      if (profile.role !== "admin") { window.location.replace("/mi-cuenta"); return null; }
      return <AdminPage />;
    }
    return <AccountPage />;
  }
  return <><Navbar /><main><Hero /><About /><Disciplines /><Testimonials /><Gallery /><Events /><Schedule /><FAQ /><Contact /></main><BackToTop /><WhatsAppButton /><Footer /></>;
}

function App() {
  return (
    <AuthProvider><RouteView /></AuthProvider>
  );
}

export default App;
