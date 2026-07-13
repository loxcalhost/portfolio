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
  pdfUrl?: string;
};

function parseFrontmatter(content: string): Record<string, string> {
  const parseBlock = (blockName: string): Record<string, string> => {
    const data: Record<string, string> = {};
    const start = content.indexOf(`export const ${blockName} = {`);
    if (start === -1) return data;

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

    if (end === -1) return data;

    const body = content.slice(openBrace + 1, end);
    // Match key: "value", key: 'value', key: `value`, or key: ["value1", "value2"]
    const keyValueRegex = /(\w+)\s*:\s*(?:["'`]([\s\S]*?)["'`]|\[([\s\S]*?)\])\s*,?/g;
    let match;

    while ((match = keyValueRegex.exec(body)) !== null) {
      const key = match[1].trim();
      if (match[2] !== undefined) {
        data[key] = match[2].trim();
      } else if (match[3] !== undefined) {
        const arrayElements = match[3]
          .split(",")
          .map((el) => el.replace(/["'`]/g, "").trim())
          .filter(Boolean)
          .join(", ");
        data[key] = arrayElements;
      }
    }
    return data;
  };

  const metadataObj = parseBlock("metadata");
  const frontmatterObj = parseBlock("frontmatter");

  return {
    ...metadataObj,
    ...frontmatterObj,
  };
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
  const tagsSet = new Set<string>();

  if (frontmatter.category) {
    tagsSet.add(frontmatter.category.trim());
  }

  const raw = frontmatter.tags;
  if (raw) {
    raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => tagsSet.add(t));
  }

  if (tagsSet.size === 0) {
    tagsSet.add("General");
  }

  return Array.from(tagsSet);
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
      pdfUrl: frontmatter.pdfUrl
        ? (frontmatter.pdfUrl.startsWith("/") ? frontmatter.pdfUrl : `/blog/${entry.name}/pdf/${frontmatter.pdfUrl}`)
        : undefined,
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
