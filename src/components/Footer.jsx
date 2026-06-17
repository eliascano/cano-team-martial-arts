function Footer() {
  return (
    <footer className="bg-black border-t border-red-900">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          <img
            src="/images/logo-cano-team.png"
            alt="Cano Team"
            className="h-16"
          />

          <div className="text-center md:text-right">

            <p>Taekwondo ITF</p>
            <p>Brazilian Jiu-Jitsu</p>
            <p>MMA</p>

          </div>

        </div>

        <div className="mt-8 text-center text-zinc-500">
          © 2026 Cano Team Martial Arts
        </div>

      </div>
    </footer>
  );
}

export default Footer;