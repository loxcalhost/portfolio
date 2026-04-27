"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog";

type Props = {
  posts: BlogPost[];
  children: React.ReactNode;
};

function formatDate(date?: string): string | null {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ArticleChrome({ posts, children }: Props) {
  const pathname = usePathname();
  const slug = pathname?.replace(/^\/blog\//, "").replace(/\/$/, "") ?? "";

  const post = useMemo(
    () => posts.find((p) => p.slug === slug) ?? null,
    [posts, slug],
  );

  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  const dateLabel = formatDate(post?.date);

  return (
    <>
      {post && (
        <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 not-prose">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs px-3 py-1 bg-secondary/20 text-muted-foreground rounded">
              {post.category}
            </span>
            {post.tags
              .filter((t) => t !== post.category)
              .map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 bg-secondary/30 text-muted-foreground rounded"
                >
                  #{t}
                </span>
              ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
            {dateLabel && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {dateLabel}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.readingTimeMinutes} min
              read
            </span>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              aria-label="Copy link to this article"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied!
                </>
              ) : (
                <>
                  <LinkIcon className="w-3.5 h-3.5" /> Copy link
                </>
              )}
            </button>
          </div>
        </header>
      )}

      {children}
    </>
  );
}
