import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Writing } from "@/components/writing";
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Writing />
      <Projects />
      <Certifications />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
