import fs from "fs";
import path from "path";

export type BlogPost = {
  title: string;
  slug: string;
  category: string;
  description: string;
  date?: string;
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

    posts.push({
      title: frontmatter.title,
      slug: frontmatter.slug || entry.name,
      category: frontmatter.category || "General",
      description: frontmatter.description,
      date: frontmatter.date,
    });
  }

  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}