import type { Metadata } from "next";

export const SITE = {
  name: "loxcalhost",
  author: "Vinod Vyavhare",
  description:
    "Security researcher and ethical hacker. CTF player writing about penetration testing, web security, and reverse engineering.",
  url: "https://loxcalhost.netlify.",
  twitter: "@loxcalhost",
} as const;

type BuildMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  ogTitle?: string;
  ogSubtitle?: string;
  ogKind?: "page" | "article";
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    description = SITE.description,
    path = "/",
    ogTitle = title,
    ogSubtitle,
    ogKind = "page",
    type = "website",
    publishedTime,
    tags,
  } = input;

  const url = `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
  const ogParams = new URLSearchParams({
    title: ogTitle,
    kind: ogKind,
  });
  if (ogSubtitle) ogParams.set("subtitle", ogSubtitle);
  const ogImage = `${SITE.url}/og?${ogParams.toString()}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE.name,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags ? { tags } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

export function articleMetadata(input: {
  title: string;
  description: string;
  slug: string;
  category?: string;
  date?: string;
  tags?: string[];
}): Metadata {
  return buildMetadata({
    title: `${input.title} | ${SITE.name}`,
    description: input.description,
    path: `/blog/${input.slug}`,
    ogTitle: input.title,
    ogSubtitle: input.category,
    ogKind: "article",
    type: "article",
    publishedTime: input.date,
    tags: input.tags,
  });
}