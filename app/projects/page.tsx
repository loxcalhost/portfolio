import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All Projects | loxcalhost",
  description:
    "A comprehensive collection of security projects including vulnerability scanners, CTF solutions, and reverse engineering tools.",
  path: "/projects",
  ogTitle: "All Projects",
  ogSubtitle: "Security tools · Scripts · Research",
});

export default function ProjectsPage() {
  const projects = [
    {
      title: "Subdomain Takeover Scanner",
      description:
        "An automated Python utility designed to identify dangling DNS records and misconfigured subdomains vulnerable to takeover attacks.",
      tags: ["Python", "Security", "DNS"],
      github: "#",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="py-20 border-t border-border">
          <div className="max-w-2xl mx-auto px-6">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-foreground hover:underline text-sm mb-6"
            >
              ← Back to Home
            </Link>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              All Projects
            </h1>

            <div className="grid gap-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-border hover:border-foreground/50 hover:bg-secondary/10 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-secondary/30 text-muted-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    className="text-sm text-foreground hover:underline inline-flex items-center gap-2"
                  >
                    View on GitHub →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
