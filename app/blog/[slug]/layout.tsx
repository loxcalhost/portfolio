import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getAllBlogPosts } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const posts = getAllBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return children;
  }

  // Calculate reading time - rough estimate
  const readingTime = Math.max(1, 5);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <article
          className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16 mt-4 md:mt-8
          prose-headings:text-foreground
          prose-p:text-foreground
          prose-a:text-foreground
          prose-strong:text-foreground
          prose-code:text-green-500
          prose-code:bg-zinc-900
          prose-code:px-1.5
          prose-code:py-0.5
          prose-code:rounded
          prose-code:text-sm
          prose-code:before:content-none
          prose-code:after:content-none
          prose-pre:bg-zinc-900
          prose-pre:border
          prose-pre:border-zinc-800
          prose-h2:text-2xl
          prose-h3:text-xl
          prose-p:text-base
          prose-p:leading-relaxed"
        >
          {/* Article Header with Breadcrumb and Metadata */}
          <div className="-mx-4 md:-mx-6 mb-8 md:mb-12 px-4 md:px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-4 md:mb-6 text-muted-foreground">
              <a href="/" className="hover:underline">
                Home
              </a>
              <span>/</span>
              <a href="/#writing" className="hover:underline">
                Writing
              </a>
              <span>/</span>
              <span className="text-foreground truncate">{post.title}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground mb-6 md:mb-8">
              {post.date && (
                <>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="hidden sm:inline">•</span>
                </>
              )}
              <span>{readingTime} min read</span>
              {post.category && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="px-2 py-1 bg-secondary/20 text-muted-foreground rounded text-xs">
                    {post.category}
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/articles?tag=${encodeURIComponent(tag)}`}
                    className="text-xs px-2 py-1 bg-foreground/10 text-foreground/70 rounded hover:bg-foreground/20 transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Article Content */}
          {children}

          {/* Related Articles */}
          <div className="-mx-4 md:-mx-6 mt-12 md:mt-16 pt-8 md:pt-12 border-t border-border px-4 md:px-6">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 not-prose">
              {posts
                .filter((p) => p.slug !== params.slug)
                .slice(0, 3)
                .map((relatedPost) => (
                  <a
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group p-4 md:p-6 border border-border hover:border-foreground/50 hover:bg-secondary/10 transition-all duration-200 rounded"
                  >
                    <h3 className="font-semibold text-foreground group-hover:underline mb-2 line-clamp-2 text-sm md:text-base">
                      {relatedPost.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.description}
                    </p>
                    {relatedPost.date && (
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(relatedPost.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </a>
                ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
