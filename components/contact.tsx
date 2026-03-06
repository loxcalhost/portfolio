"use client";

import { useState } from "react";

export function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget; // store it in a variable

    try {
      const formData = new FormData(form);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset(); // use the stored variable
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
          Contact
        </h2>

        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          Have a security question? Want to collaborate on a project? Or just
          want to chat about cybersecurity? Feel free to reach out through the
          form below or connect with me on social media.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mb-12">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-4 py-3 bg-secondary/20 border border-border text-foreground placeholder-muted-foreground focus:border-foreground outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-3 bg-secondary/20 border border-border text-foreground placeholder-muted-foreground focus:border-foreground outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              className="w-full px-4 py-3 bg-secondary/20 border border-border text-foreground placeholder-muted-foreground focus:border-foreground outline-none transition-colors"
              placeholder="What is this about?"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={6}
              className="w-full px-4 py-3 bg-secondary/20 border border-border text-foreground placeholder-muted-foreground focus:border-foreground outline-none transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-foreground hover:cursor-pointer text-background font-semibold hover:bg-foreground/90 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>

          {submitted && (
            <p className="text-sm text-green-600 bg-green-500/10 border border-green-500/20 px-4 py-3">
              Thanks for reaching out! I'll get back to you soon.
            </p>
          )}
        </form>

        <div className="pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Other ways to connect
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Email:{" "}
              <a
                href="mailto:loxcalhost@protonmail.com"
                className="text-foreground hover:underline"
              >
                loxcalhost@protonmail.com
                {/* vinod@protonmail.com */}
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/loxcalhost"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                github.com/loxcalhost
                {/* github.com/vinod */}
              </a>
            </p>
            <p>
              Telegram:{" "}
              <a
                href="https://t.me/loxcalhost"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                @@loxcalhost_contact_bot
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
