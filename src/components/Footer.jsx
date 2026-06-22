function Footer() {
  const affiliateLogos = [
    {
      src: "/logo-taekwondo-itf.png",
      alt: "Taekwon-Do ITF",
      className: "h-16 sm:h-18",
    },
    {
      src: "/logo-ralph-gracie.png",
      alt: "Ralph Gracie",
      className: "h-16 sm:h-18",
    },
  ];

  const quickLinks = [
    { label: "Disciplinas", href: "#disciplinas" },
    { label: "Horarios", href: "#horarios" },
    { label: "Eventos", href: "#eventos" },
    { label: "Preguntas frecuentes", href: "#preguntas" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-nowrap sm:justify-start sm:gap-8">
              <img
                src="/logo-cano-team_4x4.png"
                alt="Cano Team"
                className="h-20 w-auto shrink-0 sm:h-24"
              />

              <div className="flex items-center justify-center gap-5 sm:gap-6">
                {affiliateLogos.map((logo) => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.className} w-auto object-contain opacity-90`}
                  />
                ))}
              </div>
            </div>

            <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-muted sm:text-left">
              Academia de artes marciales en San Francisco, Córdoba. Taekwon-Do
              ITF, Brazilian Jiu-Jitsu y MMA para distintas edades y objetivos.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="display text-lg font-semibold text-foreground">
              Dirección
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              San Juan 918
              <br />
              San Francisco, Córdoba
            </p>
            <a
              href="#contacto"
              className="mt-4 inline-flex text-sm font-semibold text-brand transition-colors hover:text-foreground"
            >
              Cómo llegar
            </a>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="display text-lg font-semibold text-foreground">
              Contacto
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted">
              <a
                href="https://wa.me/543564657525"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brand"
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/cano_team_martial_arts_19/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brand"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/p/Cano-Team-Martial-Arts-100063626314525/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-brand"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="display text-lg font-semibold text-foreground">
              Links
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-subtle">
          &copy; 2026 Cano Team Martial Arts
        </div>
      </div>
    </footer>
  );
}

export default Footer;
