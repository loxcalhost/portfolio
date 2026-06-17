import type { MDXComponents } from "mdx/types";
import { MDXImage } from "@/components/mdx-image";

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
  };
}
