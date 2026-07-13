import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "All Tags | loxcalhost",
  description: "Explore security writeups filtered by tags and categories.",
  path: "/tags",
  ogTitle: "All Tags",
  ogSubtitle: "Filter writeups by tags",
});

export default function TagsPage() {
  const articles = getAllBlogPosts();
  const tags = getAllTags(articles);

  // Count articles per tag
  const tagCounts: Record<string, number> = {};
  for (const a of articles) {
    for (const t of a.tags) {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-foreground hover:underline text-sm mb-6 font-medium"
          >
            ← Back to Writeups
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Explore Tags
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Select a tag below to view all corresponding writeups.
          </p>

          <div className="flex flex-wrap gap-2.5">
            {tags.map((t) => {
              const count = tagCounts[t] || 0;
              return (
                <Link
                  key={t}
                  href={`/articles?tag=${encodeURIComponent(t)}`}
                  className="text-sm px-4 py-2 border border-border bg-secondary/15 hover:bg-secondary/40 text-foreground transition-all duration-200 rounded-none flex items-center gap-2 hover:border-foreground/45 select-none"
                >
                  <span className="font-mono">#{t}</span>
                  <span className="text-xs px-1.5 py-0.5 bg-secondary/35 text-muted-foreground border border-border/40 font-mono">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
