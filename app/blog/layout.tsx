import { Navigation } from "@/components/navigation";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <article
        className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 py-16 mt-16
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
        prose-pre:border-zinc-800"
      >
        {children}
      </article>
    </div>
  );
}
