import fs from "fs";
import path from "path";

export type BlogPost = {
  title: string;
  slug: string;
  category: string;
  description: string;
  date?: string;
  tags: string[];
  readingTimeMinutes: number;
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
      if (depth === 0) {
        end = i;
        break;
      }
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

function estimateReadingTime(raw: string): number {
  // Strip the frontmatter + metadata exports, then count words.
  const withoutFrontmatter = raw.replace(
    /export const (?:frontmatter|metadata)\s*=\s*\{[\s\S]*?\};?/g,
    "",
  );
  // Remove code fences, imports, MDX tags — rough but good enough.
  const stripped = withoutFrontmatter
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/^import .*$/gm, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_\-[\]()!]/g, " ");
  const words = stripped.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function parseTags(frontmatter: Record<string, string>): string[] {
  const raw = frontmatter.tags;
  if (raw) {
    return raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return frontmatter.category ? [frontmatter.category] : [];
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

    posts.push({
      title: frontmatter.title,
      slug: frontmatter.slug || entry.name,
      category: frontmatter.category || "General",
      description: frontmatter.description,
      date: frontmatter.date,
      tags: parseTags(frontmatter),
      readingTimeMinutes: estimateReadingTime(content),
    });
  }

  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getAllTags(posts: BlogPost[]): string[] {
  const set = new Set<string>();
  for (const p of posts) for (const t of p.tags) set.add(t);
  return Array.from(set).sort();
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllBlogPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  // `posts` is newest first. "prev" = older, "next" = newer.
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}

export function formatDate(date?: string): string | null {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}