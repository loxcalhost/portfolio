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

  // Path: app/blog/[slug]/pdf/[filename]
  const filePath = path.join(process.cwd(), "app", "blog", slug, "pdf", filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    return new NextResponse("Error reading file", { status: 500 });
  }
}
