import Blog, { frontmatter } from "./page.mdx";

export const metadata = {
  title: frontmatter.title,
  description: frontmatter.description,
};

export default function Page() {
  return <Blog />;
}
