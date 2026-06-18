import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

// Full list of sections (used in the mobile menu)
const allLinks = [
  { label: "Inicio", id: "inicio" },
  { label: "Nosotros", id: "nosotros" },
  { label: "Disciplinas", id: "disciplinas" },
  { label: "Horarios", id: "horarios" },
  { label: "Galería", id: "galeria" },
  { label: "Eventos", id: "eventos" },
  { label: "Testimonios", id: "testimonios" },
  { label: "Contacto", id: "contacto" },
];

// Curated primary links shown on desktop to reduce visual noise
const primaryLinks = [
  { label: "Nosotros", id: "nosotros" },
  { label: "Disciplinas", id: "disciplinas" },
  { label: "Horarios", id: "horarios" },
  { label: "Galería", id: "galeria" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the section currently in view
  useEffect(() => {
    const sections = allLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-background/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#inicio" aria-label="Cano Team Martial Arts - inicio">
          <img
            src="/images/logo-cano-team.png"
            alt="Cano Team Martial Arts"
            className="h-11 md:h-12"
          />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {primaryLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}

          <a
            href="#contacto"
            className="ml-4 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm shadow-brand/20 transition-all duration-300 hover:bg-brand-strong hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
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
          {allLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              className={`block border-b border-border px-6 py-4 text-sm font-medium transition-colors ${
                active === link.id
                  ? "border-l-2 border-l-brand bg-surface text-foreground"
                  : "text-muted hover:bg-surface hover:text-foreground"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="p-4">
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-brand px-5 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-brand-strong"
            >
              Empezar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
