"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { BlogPost } from "@/lib/blog";

interface ArticlesListProps {
  initialArticles: BlogPost[];
  initialTags: string[];
}

export function ArticlesList({
  initialArticles,
  initialTags,
}: ArticlesListProps) {
  const searchParams = useSearchParams();
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Get tag from query params if available
    const tagParam = searchParams.get("tag");
    if (tagParam) {
      setSelectedTag(tagParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const filtered = initialArticles.filter((post) => {
      // Filter by tag
      if (selectedTag && !post.tags?.includes(selectedTag)) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
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

    setFilteredArticles(filtered);
  }, [selectedTag, searchQuery, initialArticles]);

  return (
    <div className="space-y-0">
      {/* Filters Section */}
      <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 md:px-4 py-2 text-sm md:text-base bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />

        {/* Tag Filter */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base bg-background border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 cursor-pointer"
          >
            <option value="">All Tags</option>
            {initialTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          {/* Clear Filters Button */}
          {(selectedTag || searchQuery) && (
            <button
              onClick={() => {
                setSelectedTag("");
                setSearchQuery("");
              }}
              className="px-4 md:px-6 py-2 text-sm md:text-base bg-foreground/10 text-foreground rounded hover:bg-foreground/20 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        {initialArticles.length > 0 && (
          <p className="text-xs md:text-sm text-muted-foreground">
            Showing {filteredArticles.length} of {initialArticles.length}{" "}
            articles
          </p>
        )}
      </div>

      {/* Articles List */}
      <div className="space-y-4 md:space-y-6">
        {filteredArticles.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">
            {initialArticles.length === 0
              ? "No articles yet."
              : "No articles match your filters. Try adjusting your search or filters."}
          </p>
        ) : (
          filteredArticles.map((article, idx) => (
            <Link
              key={idx}
              href={`/blog/${article.slug}`}
              className="block group p-4 md:p-6 border border-border hover:border-foreground/50 hover:bg-secondary/10 transition-all duration-200 rounded"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-2 mb-2">
                <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:underline">
                  {article.title}
                </h3>
                <span className="text-xs px-2 md:px-3 py-1 bg-secondary/20 text-muted-foreground rounded whitespace-nowrap">
                  {article.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {article.description}
              </p>
              {article.date && (
                <p className="text-xs text-muted-foreground mb-2">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-foreground/10 text-foreground/70 rounded cursor-pointer hover:bg-foreground/20 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTag(tag);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
