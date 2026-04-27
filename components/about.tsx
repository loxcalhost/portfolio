export function About() {
  const skillGroups: { label: string; items: string[] }[] = [
    {
      label: "Languages",
      items: ["Python", "Bash", "JavaScript/TypeScript", "C"],
    },
    {
      label: "Offensive",
      items: ["Burp Suite", "Metasploit", "Nmap", "Hashcat", "gobuster"],
    },
    {
      label: "Analysis",
      items: ["Wireshark", "Ghidra", "strace/ltrace", "gdb-peda"],
    },
    {
      label: "Domains",
      items: [
        "Web Security",
        "Network Analysis",
        "Reverse Engineering",
        "Penetration Testing",
        "Linux Internals",
        "CTF",
      ],
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 border-t border-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* <div className="font-mono text-xs text-muted-foreground mb-3"> */}
        {/* <span className="text-[#05df6f]">#</span> about */}
        {/* </div> */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          Curious, methodical, a little paranoid
        </h2>

        <div className="space-y-5 text-muted-foreground leading-relaxed mb-12">
          <p>
            I&apos;m a security researcher and ethical hacker who likes to
            understand systems by taking them apart. Most of my free time goes
            into <strong className="text-foreground">HackTheBox</strong>,
            <strong className="text-foreground"> OverTheWire</strong>, and
            assorted CTFs — with a bias toward web, network, and Linux
            challenges.
          </p>
          <p>
            I come from a software-engineering background, which means I think
            about security the way a builder does: what could I have done to
            prevent this, and how do I explain it to the team that shipped it?
            The writeups on this site reflect that — step-by-step, with the
            reasoning included, not just the commands.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-5">Stack</h3>
          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-secondary/20 border border-border rounded text-sm text-foreground hover:bg-secondary/40 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
