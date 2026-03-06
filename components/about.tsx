export function About() {
  const skills = [
    'Python',
    'Bash',
    'JavaScript/TypeScript',
    'Wireshark',
    'Burp Suite',
    'Metasploit',
    'Linux',
    'Network Analysis',
    'Reverse Engineering',
    'Web Security',
    'Penetration Testing',
    'CTF Competitions',
  ]

  return (
    <section id="about" className="py-20 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">About</h2>
        
        <div className="space-y-6 text-muted-foreground leading-relaxed mb-12">
          <p>
            I'm a security researcher and ethical hacker with a passion for understanding how systems work and finding vulnerabilities responsibly. With extensive experience in penetration testing and CTF competitions, I focus on making cybersecurity knowledge accessible to everyone.
          </p>
          <p>
            My background includes software development and security analysis, which gives me a unique perspective on building secure systems. I believe in the importance of defensive security and helping organizations protect their digital assets.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Skills & Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-4 py-2 bg-secondary/20 border border-border rounded text-sm text-foreground hover:bg-secondary/40 transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
