import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllBlogPosts();

  const blogUrls = posts.map((post) => ({
    url: `${SITE.url}${post.pdfUrl || `/blog/${post.slug}`}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const routes = ["", "/articles", "/projects"].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...routes, ...blogUrls];
}
