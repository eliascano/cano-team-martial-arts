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

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:justify-start">
            <img
              src="/logo-cano-team_4x4.png"
              alt="Cano Team"
              className="h-20 w-auto sm:h-24"
            />

            <div className="flex items-center justify-center gap-6 border-t border-border/70 pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
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

          <ul className="flex flex-col items-center gap-2 text-sm text-muted md:items-end">
            <li>Taekwon-Do ITF</li>
            <li>Brazilian Jiu-Jitsu</li>
            <li>MMA</li>
          </ul>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-subtle">
          &copy; 2026 Cano Team Martial Arts
        </div>
      </div>
    </footer>
  );
}

export default Footer;
