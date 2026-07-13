import React from "react";
import type { MDXComponents } from "mdx/types";
import { MDXImage } from "@/components/mdx-image";
import { MdxPre } from "@/components/mdx-pre";

const createHeading = (level: number) => {
  const Tag = `h${level}`;
  return ({ children, id, ...props }: any) => {
    // If no id, just render normally (rehype-slug generates id for headings)
    if (!id) return React.createElement(Tag, props, children);
    return React.createElement(
      Tag,
      { id, className: "group relative scroll-mt-24", ...props },
      React.createElement(
        "a",
        {
          key: "anchor",
          href: `#${id}`,
          className: "absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground/40 hover:text-foreground pr-2 font-normal select-none",
          "aria-label": `Link to section: ${children}`,
        },
        "#"
      ),
      children
    );
  };
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: (props: any) => (
      <MDXImage
        src={props.src}
        alt={props.alt ?? ""}
        width={typeof props.src === "object" ? undefined : 1200}
        height={typeof props.src === "object" ? undefined : 800}
      />
    ),
    Image: MDXImage,
    pre: (props: any) => <MdxPre {...props} />,
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    table: (props: any) => (
      <div className="overflow-x-auto my-6 border border-border rounded-lg max-w-full bg-secondary/5 shadow-sm">
        <table className="min-w-full divide-y divide-border text-sm m-0!" {...props} />
      </div>
    ),
  };
}
