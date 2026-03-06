import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "All Writeups | loxcalhost",
  description:
    "A comprehensive collection of security articles covering CTF, penetration testing, reverse engineering, and more.",
};

export default function ArticlesPage() {
  const articles = getAllBlogPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="py-20 border-t border-border">
          <div className="max-w-2xl mx-auto px-6">
            <Link
              href="/#writing"
              className="inline-flex items-center gap-2 text-foreground hover:underline text-sm mb-6"
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              All Writeups
            </h1>
            <div className="space-y-6">
              {articles.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  No articles yet.
                </p>
              )}
              {articles.map((article, idx) => (
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
