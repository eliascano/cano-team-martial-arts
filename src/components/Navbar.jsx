import { useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaSignOutAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth.js";
import { signOut } from "../services/auth";

const navGroups = [
  {
    label: "Entrenar",
    items: [
      { label: "Disciplinas", id: "disciplinas" },
      { label: "Horarios", id: "horarios" },
      { label: "Preguntas frecuentes", id: "preguntas" },
    ],
  },
  {
    label: "Academia",
    items: [
      { label: "Nosotros", id: "nosotros" },
      { label: "Testimonios", id: "testimonios" },
    ],
  },
  {
    label: "Comunidad",
    items: [
      { label: "Galería", id: "galeria" },
      { label: "Eventos", id: "eventos" },
    ],
  },
];

const allLinks = [
  { label: "Inicio", id: "inicio" },
  ...navGroups.flatMap((group) => group.items),
  { label: "Contacto", id: "contacto" },
];

function Navbar() {
  const { user, profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const [desktopMenu, setDesktopMenu] = useState(null);
  const [accountMenu, setAccountMenu] = useState(false);
  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "Mi cuenta";
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "";
  const initials = displayName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "CT";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const closeMenus = () => {
    setOpen(false);
    setDesktopMenu(null);
    setAccountMenu(false);
  };

  const logout = async () => {
    await signOut();
    closeMenus();
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-background/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <a href="#inicio" aria-label="Cano Team Martial Arts - inicio" onClick={closeMenus}>
          <img
            src="/images/logo-cano-team.png"
            alt="Cano Team Martial Arts"
            className="h-11 md:h-12"
          />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          <a
            href="#inicio"
            onClick={closeMenus}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active === "inicio"
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            Inicio
          </a>

          {navGroups.map((group) => {
            const groupActive = group.items.some((item) => item.id === active);
            const isOpen = desktopMenu === group.label;

            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setDesktopMenu(group.label)}
                onMouseLeave={() => setDesktopMenu(null)}
              >
                <button
                  type="button"
                  onClick={() => setDesktopMenu(isOpen ? null : group.label)}
                  aria-expanded={isOpen}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    groupActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {group.label}
                  <FaChevronDown
                    aria-hidden="true"
                    className={`text-xs transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full w-56 pt-3">
                    <div className="overflow-hidden rounded-xl border border-border bg-background/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                      {group.items.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={closeMenus}
                          aria-current={active === item.id ? "true" : undefined}
                          className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            active === item.id
                              ? "bg-brand-soft text-foreground"
                              : "text-muted hover:bg-surface hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <a
            href="#contacto"
            onClick={closeMenus}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active === "contacto"
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            Contacto
          </a>

          {user ? <div className="relative ml-3">
            <button type="button" aria-expanded={accountMenu} aria-haspopup="menu" onClick={() => setAccountMenu((current) => !current)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface/80 py-1.5 pl-1.5 pr-3 text-sm font-medium text-foreground transition-colors hover:border-brand">
              <UserAvatar url={avatarUrl} initials={initials} />
              <span className="max-w-28 truncate">{displayName}</span>
              <FaChevronDown aria-hidden="true" className={`text-xs text-muted transition-transform ${accountMenu ? "rotate-180" : ""}`} />
            </button>
            {accountMenu && <div role="menu" className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-xl border border-border bg-background/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="border-b border-border px-3 py-2"><p className="truncate text-sm font-semibold text-foreground">{displayName}</p><p className="truncate text-xs text-muted">{user.email}</p></div>
              <a role="menuitem" href="/mi-cuenta" onClick={closeMenus} className="mt-1 flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"><FaUserCircle aria-hidden="true" /> Mi cuenta</a>
              {profile?.role === "admin" && <a role="menuitem" href="/admin" onClick={closeMenus} className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground">Panel administrativo</a>}
              <button role="menuitem" type="button" onClick={() => void logout()} className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"><FaSignOutAlt aria-hidden="true" /> Cerrar sesión</button>
            </div>}
          </div> : <a href="/login" className="ml-3 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-brand hover:text-foreground"><FaUserCircle aria-hidden="true" /> Mi cuenta</a>}
        </div>

        <button
          className="rounded-lg border border-border bg-background/60 p-3 text-xl text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {open && (
        <div className="max-h-[calc(100svh-76px)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <div className="px-5 py-5">
            <a
              href="#inicio"
              onClick={closeMenus}
              className={`block rounded-lg px-4 py-3 text-sm font-semibold ${
                active === "inicio"
                  ? "bg-brand-soft text-foreground"
                  : "text-muted"
              }`}
            >
              Inicio
            </a>

            <div className="mt-3 space-y-5">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="px-4 text-xs font-semibold uppercase tracking-wider text-brand">
                    {group.label}
                  </p>
                  <div className="mt-2 overflow-hidden rounded-xl border border-border bg-surface">
                    {group.items.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={closeMenus}
                        aria-current={active === item.id ? "true" : undefined}
                        className={`block border-b border-border px-4 py-3 text-sm font-medium last:border-b-0 ${
                          active === item.id
                            ? "border-l-2 border-l-brand bg-surface-2 text-foreground"
                            : "text-muted"
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contacto"
              onClick={closeMenus}
              className={`mt-5 block rounded-lg px-4 py-3 text-sm font-semibold ${
                active === "contacto"
                  ? "bg-brand-soft text-foreground"
                  : "text-muted"
              }`}
            >
              Contacto
            </a>

            {user ? <div className="mt-4 rounded-xl border border-border bg-surface p-3">
              <div className="flex items-center gap-3"><UserAvatar url={avatarUrl} initials={initials} size="h-10 w-10" /><div className="min-w-0"><p className="truncate text-sm font-semibold text-foreground">{displayName}</p><p className="truncate text-xs text-muted">{user.email}</p></div></div>
              <a href="/mi-cuenta" onClick={closeMenus} className="mt-3 flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"><FaUserCircle aria-hidden="true" /> Gestionar mi cuenta</a>
              {profile?.role === "admin" && <a href="/admin" onClick={closeMenus} className="flex min-h-10 items-center px-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground">Panel administrativo</a>}
              <button type="button" onClick={() => void logout()} className="flex min-h-10 w-full items-center gap-2 rounded-lg px-2 text-left text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"><FaSignOutAlt aria-hidden="true" /> Cerrar sesión</button>
            </div> : <a href="/login" onClick={closeMenus} className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand"><FaUserCircle aria-hidden="true" /> Mi cuenta</a>}
          </div>
        </div>
      )}
    </header>
  );
}

function UserAvatar({ url, initials, size = "h-8 w-8" }) {
  return <span className={`relative inline-flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand/50 bg-brand-soft text-xs font-bold text-foreground`} aria-hidden="true">
    {initials}
    {url && <img src={url} alt="" referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
  </span>;
}

export default Navbar;
