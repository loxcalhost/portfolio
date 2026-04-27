"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { label: "Writing", href: "/#writing" },
  { label: "Projects", href: "/#projects" },
  { label: "Certs", href: "/#certifications" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-foreground hover:underline md:hidden"
        >
          loxcalhost
        </Link>
        <div className="hidden md:flex flex-1"></div>

        <div className="hidden md:flex gap-6 justify-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex flex-1 justify-end">
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="p-2 -mr-2 text-foreground hover:bg-secondary/30 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-border bg-background transition-[max-height,opacity,border-top-width] duration-300 ease-out ${
          open
            ? "max-h-96 opacity-100 border-t"
            : "max-h-0 opacity-0 border-t-0"
        }`}
        aria-hidden={!open}
      >
        <div className="max-w-2xl mx-auto px-4 py-2 flex flex-col">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              style={{
                transitionDelay: open ? `${60 + i * 30}ms` : "0ms",
              }}
              className={`py-3 text-sm text-muted-foreground hover:text-foreground border-b border-border/60 last:border-b-0 transition-[color,opacity,transform] duration-200 ease-out ${
                open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
