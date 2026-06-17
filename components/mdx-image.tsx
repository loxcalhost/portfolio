"use client";

import NextImage from "next/image";
import { usePathname } from "next/navigation";

export function MDXImage({ src, alt, width, height, ...rest }: any) {
  const pathname = usePathname();

  let resolvedSrc = src;

  // Handle relative image paths like "./images/pic.png" or "images/pic.png"
  if (typeof src === "string" && (src.startsWith("./images/") || src.startsWith("images/"))) {
    const filename = src.split("/").pop();
    if (pathname && filename) {
      // Extract the slug from the pathname (e.g. "/blog/slug-name" -> "slug-name")
      const slug = pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
      resolvedSrc = `/api/blog-image/${slug}/${filename}`;
    }
  }

  const isStatic = typeof resolvedSrc === "object";

  return (
    <NextImage
      src={resolvedSrc}
      alt={alt ?? ""}
      width={isStatic ? undefined : (width ?? 1200)}
      height={isStatic ? undefined : (height ?? 800)}
      sizes="(max-width: 768px) 100vw, 768px"
      className="rounded border border-border"
      {...rest}
    />
  );
}
