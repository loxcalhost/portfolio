import createMDX from '@next/mdx'

const prettyCodeOptions = {
  // Single theme works for both modes because our <pre> is always
  // black in the site design — shiki tokens are tuned for dark bgs.
  theme: 'github-dark-default',
  keepBackground: false,
  defaultLang: 'plaintext',
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    // Strings instead of imported plugins so Turbopack can serialize the loader options.
    rehypePlugins: [['rehype-pretty-code', prettyCodeOptions]],
  },
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)