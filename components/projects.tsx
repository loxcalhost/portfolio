"use client";

import Link from "next/link";

export function Projects() {
  const projects = [
    {
      title: "Subdomain Takeover Scanner",
      description:
        "An automated Python utility designed to identify dangling DNS records and misconfigured subdomains vulnerable to takeover attacks.",
      tags: ["Python", "Security", "DNS"],
      github: "#",
    },
  ];

  const topProjects = projects.slice(0, 5);

  return (
    <section
      id="projects"
      className="py-20 border-t border-border hover:cursor-not-allowed"
    >
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          Projects
        </h2>

        <div className="grid gap-6 mb-8">
          {topProjects.map((project, idx) => (
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
                className="text-sm text-foreground hover:underline inline-flex items-center gap-2 hover:cursor-not-allowed"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>

        <Link
          // href="/projects"
          href="#"
          className="inline-flex items-center gap-2 text-foreground hover:underline text-sm font-semibold hover:cursor-not-allowed"
        >
          Show All Projects →
        </Link>
      </div>
    </section>
  );
}
