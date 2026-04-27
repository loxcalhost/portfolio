export function Hero() {
  const tags = [
    "HackTheBox",
    "OverTheWire",
    "Web Exploitation",
    "Reverse Engineering",
    "CTF",
  ];

  return (
    <section className="min-h-screen flex items-center pt-24 sm:pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
        <div className="font-mono text-xs sm:text-sm text-[#05df6f] mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#05df6f] rounded-full animate-pulse" />
          available for opportunities
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-4 leading-[1.05] tracking-tight">
          Security Researcher
          <span className="block text-muted-foreground">& Ethical Hacker</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg">
          I break things for a living — responsibly. I document what I learn in
          detailed writeups so the next person doesn&apos;t have to rediscover
          the same tricks.
        </p>

        <div className="flex flex-wrap gap-2 mb-8 max-w-lg">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          <a
            href="#writing"
            className="inline-block px-5 sm:px-6 py-3 bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors duration-200 text-sm sm:text-base"
          >
            Read writeups →
          </a>

          <a
            href="#contact"
            className="inline-block px-5 sm:px-6 py-3 border border-foreground text-foreground hover:bg-foreground/10 transition-colors duration-200 text-sm sm:text-base"
          >
            Get in touch
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-5 sm:px-6 py-3 border border-foreground text-foreground hover:bg-foreground/10 transition-colors duration-200 text-sm sm:text-base"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
