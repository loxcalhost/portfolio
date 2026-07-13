"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X, Tag as TagIcon } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/blog";

type Props = {
  articles: BlogPost[];
  tags: string[];
};

const ALL_TAGS = "__all__";

export function ArticlesList({ articles, tags }: Props) {
  const [query, setQuery] = useState("");
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read active tag from URL query parameters (e.g. ?tag=foothold)
  const tag = searchParams?.get("tag") || ALL_TAGS;

  const setTag = (newTag: string) => {
    if (newTag === ALL_TAGS) {
      router.push("/articles");
    } else {
      router.push(`/articles?tag=${encodeURIComponent(newTag)}`);
    }
  };

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
    <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 border-t border-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link
          href="/#writing"
          className="inline-flex items-center gap-2 text-foreground hover:underline text-sm mb-6 font-medium"
        >
          ← Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 sm:mb-8">
          All Writeups
        </h1>

        {/* Search Input & Tags Navigation Button */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search writeups by title, description, or tags..."
              aria-label="Search articles"
              className="w-full pl-9 pr-9 py-2.5 bg-secondary/15 border border-border rounded-none text-foreground placeholder-muted-foreground focus:border-foreground outline-none transition-all text-sm shadow-inner focus:ring-1 focus:ring-foreground/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-none hover:bg-secondary/30 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <Link
            href="/tags"
            className="px-4 py-2.5 bg-secondary/20 border border-border text-foreground hover:bg-secondary/35 hover:border-foreground/45 transition-all duration-200 text-sm font-semibold flex items-center gap-1.5 rounded-none group select-none"
          >
            <TagIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
            <span>Tags</span>
          </Link>
        </div>

        {/* Active Filter Indicator */}
        {tag !== ALL_TAGS && (
          <div className="flex items-center gap-2 mb-6 p-3 bg-secondary/10 border border-border rounded-none select-none">
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Active tag:</span>
            <span className="text-xs font-mono bg-foreground text-background px-2.5 py-0.5 font-medium border border-foreground">
              #{tag}
            </span>
            <button
              onClick={() => setTag(ALL_TAGS)}
              className="ml-auto text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline cursor-pointer flex items-center gap-1"
            >
              Clear filter <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

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
            <div className="p-6 border border-border rounded-none text-sm text-muted-foreground bg-secondary/5">
              No articles match your filters.{" "}
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTag(ALL_TAGS);
                }}
                className="text-foreground font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
          {filtered.map((article) => {
            const isPdf = !!article.pdfUrl;
            const customTags = article.tags.filter((t) => t !== article.category);

            return (
              <Link
                key={article.slug}
                href={article.pdfUrl || `/blog/${article.slug}`}
                target={isPdf ? "_blank" : undefined}
                rel={isPdf ? "noopener noreferrer" : undefined}
                className="block group p-5 sm:p-6 border border-border rounded-none hover:border-foreground/45 hover:bg-secondary/5 transition-all duration-250 hover:shadow-sm"
              >
                <div className="flex flex-wrap justify-between items-start gap-3 mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:underline break-words min-w-0 flex-1 leading-snug">
                    {article.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setTag(article.category);
                    }}
                    className={`text-[11px] font-semibold px-2.5 py-0.5 border rounded-none cursor-pointer transition-all duration-200 ${
                      tag === article.category
                        ? "bg-foreground text-background border-foreground"
                        : "bg-secondary/25 text-muted-foreground hover:text-foreground hover:bg-secondary/55 border-transparent"
                    }`}
                  >
                    {article.category}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-4">
                  {article.description}
                </p>
                {customTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {customTags.map((t) => {
                      const isTagActive = tag === t;
                      return (
                        <button
                          key={t}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setTag(t);
                          }}
                          className={`text-[11px] px-2 py-0.5 border rounded-none transition-all duration-200 cursor-pointer font-mono ${
                            isTagActive
                              ? "bg-foreground text-background border-foreground"
                              : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/70 border-transparent"
                          }`}
                        >
                          #{t}
                        </button>
                      );
                    })}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
