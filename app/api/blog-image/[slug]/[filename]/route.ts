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
  let filePath = path.join(process.cwd(), "app", "blog", slug, "images", filename);

  if (!fs.existsSync(filePath)) {
    // Fallback 1: Try serving long.png if it exists in the folder
    const fallbackLong = path.join(process.cwd(), "app", "blog", slug, "images", "long.png");
    if (fs.existsSync(fallbackLong)) {
      filePath = fallbackLong;
    } else {
      // Fallback 2: Try serving any other image file in the same images directory
      const dirPath = path.join(process.cwd(), "app", "blog", slug, "images");
      if (fs.existsSync(dirPath)) {
        try {
          const files = fs.readdirSync(dirPath);
          const firstImage = files.find(file => {
            const ext = path.extname(file).toLowerCase();
            return [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"].includes(ext);
          });
          if (firstImage) {
            filePath = path.join(dirPath, firstImage);
          } else {
            const placeholderPath = path.join(process.cwd(), "public", "placeholder.jpg");
            if (fs.existsSync(placeholderPath)) {
              try {
                const fileBuffer = fs.readFileSync(placeholderPath);
                return new NextResponse(fileBuffer, {
                  headers: {
                    "Content-Type": "image/jpeg",
                    "Cache-Control": "public, max-age=60",
                  },
                });
              } catch (error) {}
            }
            return new NextResponse("Image not found", { status: 404 });
          }
        } catch {
          const placeholderPath = path.join(process.cwd(), "public", "placeholder.jpg");
          if (fs.existsSync(placeholderPath)) {
            try {
              const fileBuffer = fs.readFileSync(placeholderPath);
              return new NextResponse(fileBuffer, {
                headers: {
                  "Content-Type": "image/jpeg",
                  "Cache-Control": "public, max-age=60",
                },
              });
            } catch (error) {}
          }
          return new NextResponse("Image not found", { status: 404 });
        }
      } else {
        const placeholderPath = path.join(process.cwd(), "public", "placeholder.jpg");
        if (fs.existsSync(placeholderPath)) {
          try {
            const fileBuffer = fs.readFileSync(placeholderPath);
            return new NextResponse(fileBuffer, {
              headers: {
                "Content-Type": "image/jpeg",
                "Cache-Control": "public, max-age=60",
              },
            });
          } catch (error) {}
        }
        return new NextResponse("Image not found", { status: 404 });
      }
    }
  }

  // Determine content type based on the resolved file extension
  const ext = path.extname(filePath).toLowerCase();
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
