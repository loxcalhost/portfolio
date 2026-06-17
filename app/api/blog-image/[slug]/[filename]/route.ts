import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; filename: string }> }
) {
  const { slug, filename } = await params;

  // Validate parameters to prevent directory traversal
  if (
    !slug ||
    slug.includes("..") ||
    path.isAbsolute(slug) ||
    !filename ||
    filename.includes("..") ||
    path.isAbsolute(filename)
  ) {
    return new NextResponse("Invalid request parameters", { status: 400 });
  }

  // Path to the image: app/blog/[slug]/images/[filename]
  const filePath = path.join(process.cwd(), "app", "blog", slug, "images", filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Image not found", { status: 404 });
  }

  // Determine content type based on file extension
  const ext = path.extname(filename).toLowerCase();
  let contentType = "image/png"; // fallback

  const contentTypeMap: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".avif": "image/avif",
  };

  if (contentTypeMap[ext]) {
    contentType = contentTypeMap[ext];
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new NextResponse("Error reading image file", { status: 500 });
  }
}
