import type { Metadata, Viewport } from "next";
import * as React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider"; // <-- Import the provider
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "vinod",
  // title: "vinod vyavhare | localhost",
  description:
    "Security researcher, ethical hacker, and CTF player. Exploring cybersecurity, penetration testing, and reverse engineering.",
  openGraph: {
    title: "Security Researcher & Ethical Hacker",
    description:
      "Exploring cybersecurity, penetration testing, and reverse engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Researcher & Ethical Hacker",
    description:
      "Exploring cybersecurity, penetration testing, and reverse engineering.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed the hardcoded "dark" class here
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
