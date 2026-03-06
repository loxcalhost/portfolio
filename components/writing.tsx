"use client";

import Link from "next/link";

export function Writing() {
  const articles = [
    {
      title: "Hack The Box Meow Machine Writeup",
      slug: "hack-the-box-meow-machine-writeup",
      category: "HTB",
      description:
        "Complete Hack The Box Meow writeup for beginners. Learn how to perform Nmap enumeration, and Telnet misconfigurations",
    },
    {
      title: "OverTheWire Bandit Level 5 → 6 Walkthrough",
      slug: "overthewire-bandit-level-5-to-6-walkthrough",
      category: "Linux",
      description:
        "Complete walkthrough for OverTheWire Bandit Level 5 → 6 Walkthrough.",
    },
  ];

  const topArticles = articles.slice(0, 5);

  return (
    <section id="writing" className="py-20 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          Writing
        </h2>

        <div className="space-y-6 mb-8">
          {topArticles.map((article, idx) => (
            <Link
              key={idx}
              href={`/blog/${article.slug}`}
              className="block group p-6 border border-border hover:border-foreground/50 hover:bg-secondary/10 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:underline max-w-xs">
                  {article.title}
                </h3>
                <span className="text-xs px-3 py-1 bg-secondary/20 text-muted-foreground rounded">
                  {article.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {article.description}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-foreground hover:underline text-sm font-semibold"
        >
          Show All Articles →
        </Link>
      </div>
    </section>
  );
}
