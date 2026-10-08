export function Achievements() {
  const achievements = [
    {
      name: "HackTheBox Season 11",
      description: "Ranked 2,191 out of 12,396 players.",
      credential: "https://labs.hackthebox.com/achievement/season/3080599/15",
    },
    {
      name: "Null Origin CTF",
      description: "Ranked 56th as a team.",
      credential: "https://creds.cyberhx.com/verify?id=NO-2026-A2E5AB",
    },
    {
      name: "Hackwithindia CTF",
      description: "Ranked 72nd and won a Caido voucher.",
      credential: "https://hackwithindia.com/leaderboard",
    },
    {
      name: "HTB Cyber Apocalypse CTF 2026",
      description: "Ranked 516th as a team.",
      credential: "https://res.cloudinary.com/dbe72hpba/image/upload/v1791468549/certificate_page-1_xxrt9m.png",
    },
  ];

  return (
    <section
      id="achievements"
      className="py-16 sm:py-20 border-t border-border"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          Achievements & CTFs
        </h2>

        <div className="space-y-4">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 border border-border hover:border-foreground/50 hover:bg-secondary/10 transition-all"
            >
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <a
                  href={item.credential}
                  className="text-xs px-3 py-1 border border-foreground/30 text-foreground hover:bg-foreground/10 transition-colors"
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
