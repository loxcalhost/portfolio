import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

const prettyCodeOptions = {
  // Single theme works for both modes because our <pre> is always
  // black in the site design — shiki tokens are tuned for dark bgs.
  theme: 'github-dark-default',
  keepBackground: false,
  defaultLang: 'plaintext',
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
  },
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)