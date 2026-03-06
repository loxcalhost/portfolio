import { getAllBlogPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllBlogPosts();
  return Response.json(posts);
}