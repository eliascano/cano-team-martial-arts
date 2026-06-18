function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <img
            src="/images/logo-cano-team.png"
            alt="Cano Team"
            className="h-16"
          />

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
