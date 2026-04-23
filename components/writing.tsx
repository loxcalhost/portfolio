import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export async function Writing() {
  const posts = getAllBlogPosts();
  const articles = posts.slice(0, 2);

  return (
    <section id="writing" className="py-12 md:py-20 border-t border-border">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-6 md:mb-8">
          Writing
        </h2>

        <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
          {articles.map((article, idx) => (
              <Link
                key={idx}
                href={`/blog/${article.slug}`}
                className="block group p-4 md:p-6 border border-border hover:border-foreground/50 hover:bg-secondary/10 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-2 mb-2">
                  <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:underline">
                    {article.title}
                  </h3>
                  <span className="text-xs px-2 md:px-3 py-1 bg-secondary/20 text-muted-foreground rounded whitespace-nowrap">
                    {article.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {article.description}
                </p>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-foreground/10 text-foreground/70 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
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
