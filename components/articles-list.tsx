"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

type Props = {
  articles: BlogPost[];
  tags: string[];
};

const ALL_TAGS = "__all__";

export function ArticlesList({ articles, tags }: Props) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>(ALL_TAGS);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesTag = tag === ALL_TAGS || a.tags.includes(tag);
      if (!matchesTag) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [articles, query, tag]);

  return (
    <section className="py-16 sm:py-20 border-t border-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link
          href="/#writing"
          className="inline-flex items-center gap-2 text-foreground hover:underline text-sm mb-6"
        >
          ← Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 sm:mb-8">
          All Writeups
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="w-full pl-9 pr-9 py-2.5 bg-secondary/20 border border-border text-foreground placeholder-muted-foreground focus:border-foreground outline-none transition-colors text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            aria-label="Filter by tag"
            className="w-full sm:w-48 px-3 py-2.5 bg-secondary/20 border border-border text-foreground focus:border-foreground outline-none transition-colors text-sm"
          >
            <option value={ALL_TAGS}>All tags</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <p className="text-xs text-muted-foreground mb-4" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          {tag !== ALL_TAGS && ` tagged "${tag}"`}
          {query && ` matching "${query}"`}
        </p>

        <div className="space-y-6">
          {articles.length === 0 && (
            <p className="text-muted-foreground text-sm">No articles yet.</p>
          )}
          {articles.length > 0 && filtered.length === 0 && (
            <div className="p-6 border border-border text-sm text-muted-foreground">
              No articles match your filters.{" "}
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTag(ALL_TAGS);
                }}
                className="text-foreground hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
          {filtered.map((article) => (
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
              <p className="text-sm text-muted-foreground mb-3">
                {article.description}
              </p>
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 bg-secondary/30 text-muted-foreground rounded"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
