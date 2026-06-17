import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

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

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-red-900">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <img
          src="/images/logo-cano-team.png"
          alt="Cano Team Martial Arts"
          className="h-14"
        />

        <div className="hidden md:flex gap-8">
          {links.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="hover:text-red-500 transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

      </nav>

      {open && (
        <div className="md:hidden bg-black border-t border-red-900">
          {links.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="block px-6 py-4 border-b border-zinc-800"
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