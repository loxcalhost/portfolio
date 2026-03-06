export function Certifications() {
  const certs = [
    {
      name: "eLearnSecurity Junior Penetration Tester (eJPT)",
      issuer: "eLearnSecurity",
      year: "Upcoming",
      credential: "#",
    },
  ];

  return (
    <section id="certifications" className="py-20 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          Certifications
        </h2>

        <div className="space-y-4">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 border border-border hover:border-foreground/50 hover:bg-secondary/10 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} • {cert.year}
                  </p>
                </div>
                <a
                  href={cert.credential}
                  className="text-xs px-3 py-1 border border-foreground/30 text-foreground hover:bg-foreground/10 transition-colors hover:cursor-not-allowed"
                >
                  Verify
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
