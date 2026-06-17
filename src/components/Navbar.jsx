import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: "Inicio", id: "inicio" },
    { label: "Nosotros", id: "nosotros" },
    { label: "Disciplinas", id: "disciplinas" },
    { label: "Horarios", id: "horarios" },
    { label: "Galería", id: "galeria" },
    { label: "Eventos", id: "eventos" },
    { label: "Testimonios", id: "testimonios" },
    { label: "Contacto", id: "contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#inicio" aria-label="Cano Team Martial Arts - inicio">
          <img
            src="/images/logo-cano-team.png"
            alt="Cano Team Martial Arts"
            className="h-12 md:h-14"
          />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-brand-strong"
          >
            Empezar
          </a>
        </div>

        <button
          className="text-2xl text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="block border-b border-border px-6 py-4 text-muted transition-colors hover:bg-surface hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
