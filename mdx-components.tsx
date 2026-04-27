import type { MDXComponents } from "mdx/types";
import NextImage, { type ImageProps } from "next/image";

function MDXImage({ src, alt, width, height, ...rest }: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt ?? ""}
      width={width ?? 1200}
      height={height ?? 800}
      sizes="(max-width: 768px) 100vw, 768px"
      className="rounded border border-border"
      {...rest}
    />
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <MDXImage
        src={(props.src as string) ?? ""}
        alt={props.alt ?? ""}
        width={1200}
        height={800}
      />
    ),
    Image: MDXImage,
  };
}
