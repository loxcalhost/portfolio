import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export function Writing() {
  const recentArticles = getAllBlogPosts().slice(0, 2);

  return (
    <section id="writing" className="py-16 sm:py-20 border-t border-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          Writing
        </h2>

        {recentArticles.length === 0 ? (
          <p className="text-muted-foreground text-sm mb-8">
            No articles yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-6 mb-8">
            {recentArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="block group p-5 sm:p-6 border border-border hover:border-foreground/50 hover:bg-secondary/10 transition-all duration-200"
              >
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:underline break-words min-w-0 flex-1">
                    {article.title}
                  </h3>
                  <span className="text-xs px-3 py-1 bg-secondary/20 text-muted-foreground rounded whitespace-nowrap">
                    {article.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        )}

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
