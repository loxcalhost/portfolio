# Setup Guide - Security Researcher Portfolio

## Quick Start

### 1. Local Development

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### 2. Enable Telegram Bot Integration

**Step A: Create a Telegram Bot**

1. Open Telegram and search for `@BotFather`
2. Start a conversation and use `/newbot`
3. Follow the prompts to create a new bot
4. Copy the **Bot Token** (looks like: `123456789:ABCDefGhIjKlMnOpQrStUvWxYz`)

**Step B: Get Your Chat ID**

1. Start a new chat with your bot
2. Send a test message
3. Visit: `https://api.telegram.org/bot{YOUR_BOT_TOKEN}/getUpdates`
4. Look for `"chat":{"id": ...}` - that's your **Chat ID**

**Step C: Add Environment Variables**

Create `.env.local` in project root:

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

Or in Vercel dashboard:

- Settings → Environment Variables
- Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`

### 3. Update Content

#### Update Projects

Edit `components/projects.tsx`:

- Modify the `projects` array with your actual projects
- Update GitHub links
- Change descriptions and tags

#### Update Articles

Edit `components/writing.tsx`:

- Update the `articles` array
- Blog posts automatically link to `/blog/[slug]`

#### Add Blog Posts

Create new MDX files in `/app/blog/[your-slug]/page.mdx`:

```mdx
export const metadata = {
  title: "Your Title",
  description: "Your description",
};

# Your Title

Your content here...
```

Update the articles list in `components/writing.tsx` to include your new blog post.

#### Update Footer Text

Edit `components/footer.tsx`:

```tsx
<p className="text-sm text-muted-foreground text-center">
  © 2026 Your Name. Built with Next.js and deployed on Vercel.
</p>
```

### 4. Customize Colors (Optional)

Edit `app/globals.css` to change the color theme:

- `.dark` section contains dark mode colors
- Use OKLCH color format
- All colors use CSS custom properties

### 5. Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Update portfolio"
git push origin main

# Deploy
# Option 1: Vercel CLI
vercel

# Option 2: GitHub integration
# Already connected? Push to main and Vercel auto-deploys
```

After deploying:

1. Add environment variables in Vercel dashboard
2. Redeploy for changes to take effect

---

## File Locations

| What             | Where                       |
| ---------------- | --------------------------- |
| Main page        | `app/page.tsx`              |
| Blog posts       | `app/blog/[slug]/page.mdx`  |
| Projects listing | `components/projects.tsx`   |
| Articles listing | `components/writing.tsx`    |
| Contact form API | `app/api/contact/route.ts`  |
| Styling          | `app/globals.css`           |
| Navigation       | `components/navigation.tsx` |
| Footer           | `components/footer.tsx`     |

---

## Folder Structure for Blog

```
app/blog/
├── layout.tsx                              # Shared blog layout
├── understanding-common-ctf-challenges/
│   └── page.mdx                            # Blog post 1
├── penetration-testing-methodology/
│   └── page.mdx                            # Blog post 2
├── reverse-engineering-basics/
│   └── page.mdx                            # Blog post 3
├── web-application-security-best-practices/
│   └── page.mdx                            # Blog post 4
├── network-traffic-analysis-with-wireshark/
│   └── page.mdx                            # Blog post 5
└── secure-coding-principles/
    └── page.mdx                            # Blog post 6
```

---

## MDX Features Available

In your blog posts, you can use:

- Headings: `# H1`, `## H2`, `### H3`
- Lists: `- item` for bullets, `1. item` for numbered
- Code blocks:
  ````markdown
  ```javascript
  // Your code
  ```
  ````
- Links: `[text](url)`
- Bold/Italic: `**bold**`, `*italic*`
- Tables, blockquotes, inline code

---

## Troubleshooting

### Telegram bot not receiving messages

1. Verify `TELEGRAM_BOT_TOKEN` is correct
2. Verify `TELEGRAM_CHAT_ID` is correct
3. Test bot token: `https://api.telegram.org/botYOUR_TOKEN/getMe`
4. Check server logs for errors

### Blog posts not showing

1. Verify MDX file is in `/app/blog/[slug]/page.mdx`
2. Add blog post slug to `components/writing.tsx` articles array
3. Rebuild with `npm run build`

### Styles not applying

1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check theme is set to dark in `layout.tsx`

### Build errors

1. Run `npm run build` locally to test
2. Check for TypeScript errors: `npm run lint`
3. Ensure all dependencies installed: `npm install`

---

## Security Reminders

- ✅ Never commit `.env.local` to GitHub
- ✅ Telegram bot token stays server-side only
- ✅ Always use HTTPS in production
- ✅ Validate all form inputs (already done)
- ✅ Rate limiting enabled (5 requests/hour per IP)

---

## Performance Tips

- Blog posts are statically generated
- Images are optimized with Next.js
- CSS is minified in production
- Use Vercel Analytics to monitor performance

---

## Need Help?

- Check `IMPLEMENTATION_SUMMARY.md` for technical details
- Review blog posts for content examples
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
