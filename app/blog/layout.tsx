import { Navigation } from "@/components/navigation";
import { ArticleChrome } from "@/components/article-chrome";
import { getAllBlogPosts } from "@/lib/blog";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ArticleChrome posts={posts}>
        <article
          className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12
          prose-headings:text-foreground prose-headings:scroll-mt-24 prose-headings:font-semibold
          prose-h1:text-3xl sm:prose-h1:text-4xl
          prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl sm:prose-h3:text-2xl
          prose-p:text-foreground prose-p:leading-7
          prose-li:text-foreground prose-li:marker:text-muted-foreground
          prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-a:decoration-muted-foreground/60 hover:prose-a:decoration-foreground prose-a:break-words
          prose-strong:text-foreground
          prose-code:bg-[#e3e3e3]
          prose-code:text-black
          dark:prose-code:bg-[#3d3d3d]
          dark:prose-code:text-[#05df6f]
          prose-code:px-1.5
          prose-code:py-0.5
          prose-code:rounded
          prose-code:text-[0.9em]
          prose-code:font-medium
          prose-code:break-words
          prose-code:before:content-none
          prose-code:after:content-none
          prose-pre:!bg-black
          prose-pre:text-white
          dark:prose-pre:text-[#05df6f]
          prose-pre:border-0
          prose-pre:rounded-md
          prose-pre:overflow-x-auto
          prose-pre:text-sm
          prose-pre:shadow-none
          [&_pre_code]:!bg-transparent
          [&_pre_code]:!text-inherit
          [&_pre_code]:!p-0
          [&_pre_code]:!font-normal
          [&_pre_code]:!shadow-none
          [&_pre_code::before]:!content-none
          [&_pre_code::after]:!content-none
          prose-blockquote:border-l-4
          prose-blockquote:border-foreground/30
          prose-blockquote:bg-secondary/40
          dark:prose-blockquote:bg-secondary/20
          prose-blockquote:text-foreground/90
          prose-blockquote:not-italic
          prose-blockquote:px-4
          prose-blockquote:py-2
          prose-blockquote:rounded-r
          prose-blockquote:my-5
          prose-hr:border-border
          prose-img:rounded
          prose-img:w-full
          prose-img:h-auto"
        >
          {children}
        </article>
      </ArticleChrome>
    </div>
  );
}
