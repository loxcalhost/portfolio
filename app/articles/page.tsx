import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArticlesList } from "@/components/articles-list";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All Writeups | loxcalhost",
  description:
    "A comprehensive collection of security articles covering CTF, penetration testing, reverse engineering, and more.",
  path: "/articles",
  ogTitle: "All Writeups",
  ogSubtitle: "CTF · Pentesting · Reverse engineering",
});

export default function ArticlesPage() {
  const articles = getAllBlogPosts();
  const tags = getAllTags(articles);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <ArticlesList articles={articles} tags={tags} />
      </main>
      <Footer />
    </div>
  );
}
