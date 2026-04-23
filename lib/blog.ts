import fs from "fs";
import path from "path";

export type BlogPost = {
  title: string;
  slug: string;
  category: string;
  description: string;
  date?: string;
  tags?: string[];
};

function parseFrontmatter(content: string): Record<string, string> {
  const start = content.indexOf("export const frontmatter = {");
  if (start === -1) return {};

  const openBrace = content.indexOf("{", start);
  let depth = 0;
  let end = -1;

  for (let i = openBrace; i < content.length; i++) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }

  if (end === -1) return {};

  const body = content.slice(openBrace + 1, end);
  const frontmatter: Record<string, string> = {};

  // Match key: "value" or key:\n  "value" (multiline from prettier)
  const keyValueRegex = /(\w+)\s*:\s*["'`]([\s\S]*?)["'`]\s*,?/g;
  let match;

  while ((match = keyValueRegex.exec(body)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    if (key) frontmatter[key] = value;
  }

  return frontmatter;
}

export function getAllBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), "app", "blog");

  if (!fs.existsSync(blogDir)) return [];

  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const posts: BlogPost[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const mdxPath = path.join(blogDir, entry.name, "page.mdx");
    if (!fs.existsSync(mdxPath)) continue;

    const content = fs.readFileSync(mdxPath, "utf-8");
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter.title || !frontmatter.description) continue;

    const tags = frontmatter.tags
      ? frontmatter.tags.split(",").map((tag) => tag.trim())
      : [];

    posts.push({
      title: frontmatter.title,
      slug: frontmatter.slug || entry.name,
      category: frontmatter.category || "General",
      description: frontmatter.description,
      date: frontmatter.date,
      tags,
    });
  }

  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getUniqueTags(): string[] {
  const posts = getAllBlogPosts();
  const tags = new Set<string>();
  
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

export function filterBlogPosts(
  posts: BlogPost[],
  options: { tag?: string; search?: string } = {}
): BlogPost[] {
  return posts.filter((post) => {
    // Filter by tag
    if (options.tag && !post.tags?.includes(options.tag)) {
      return false;
    }

    // Filter by search query
    if (options.search) {
      const query = options.search.toLowerCase();
      const matchesTitle = post.title.toLowerCase().includes(query);
      const matchesDescription = post.description.toLowerCase().includes(query);
      const matchesTags = post.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      if (!matchesTitle && !matchesDescription && !matchesTags) {
        return false;
      }
    }

    return true;
  });
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const currentPost = allPosts.find((post) => post.slug === currentSlug);

  if (!currentPost || !currentPost.tags?.length) {
    return allPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
  }

  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      matchCount: post.tags?.filter((tag) =>
        currentPost.tags?.includes(tag)
      ).length || 0,
    }))
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map((item) => item.post);

  // If less than limit, fill with other posts
  if (relatedPosts.length < limit) {
    const otherPosts = allPosts
      .filter(
        (post) =>
          post.slug !== currentSlug &&
          !relatedPosts.some((rp) => rp.slug === post.slug)
      )
      .slice(0, limit - relatedPosts.length);

    relatedPosts.push(...otherPosts);
  }

  return relatedPosts;
}
