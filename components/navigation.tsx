"use client";

import { ThemeToggle } from "./theme-toggle"; // <-- Import the toggle component

export function Navigation() {
  const navItems = [
    { label: "Writing", href: "/#writing" },
    { label: "Projects", href: "/#projects" },
    { label: "Certs", href: "/#certifications" },
    { label: "Education", href: "/#education" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left spacer to perfectly center the middle links */}
        <div className="flex-1"></div>

        {/* Center links */}
        <div className="flex gap-6 justify-center">
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

        {/* Right side: Theme Toggle */}
        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
