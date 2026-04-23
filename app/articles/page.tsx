import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArticlesList } from "@/components/articles-list";
import { getAllBlogPosts, getUniqueTags } from "@/lib/blog";

export const metadata = {
  title: "All Writeups | loxcalhost",
  description:
    "A comprehensive collection of security articles covering CTF, penetration testing, reverse engineering, and more.",
};

export default function ArticlesPage() {
  const articles = getAllBlogPosts();
  const uniqueTags = getUniqueTags();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="py-12 md:py-20 border-t border-border">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <Link
              href="/#writing"
              className="inline-flex items-center gap-2 text-foreground hover:underline text-sm mb-6 md:mb-8"
            >
              ← Back to Home
            </Link>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-6 md:mb-8">
              All Writeups
            </h1>

            <ArticlesList initialArticles={articles} initialTags={uniqueTags} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
