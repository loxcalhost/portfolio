import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "404 — Not Found | loxcalhost",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="font-mono text-sm text-muted-foreground mb-4">
            <span className="text-[#05df6f]">$</span> curl -I
            <span className="text-foreground"> loxcalhost</span>
            <span className="text-muted-foreground">/this-page</span>
          </div>
          <div className="font-mono text-sm mb-10">
            <span className="text-destructive">HTTP/1.1 404 Not Found</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Page not found
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            The resource you requested does not exist — it may have moved, been
            renamed, or never existed in the first place.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-block px-5 py-3 bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors text-sm"
            >
              ← Back home
            </Link>
            <Link
              href="/articles"
              className="inline-block px-5 py-3 border border-foreground text-foreground hover:bg-foreground/10 transition-colors text-sm"
            >
              Browse writeups
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
