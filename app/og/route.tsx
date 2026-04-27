import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 140) ?? SITE.name;
  const subtitle = searchParams.get("subtitle")?.slice(0, 60) ?? "";
  const kind = searchParams.get("kind") === "article" ? "article" : "page";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "#0a0a0a",
        color: "#ededed",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "22px",
          color: "#05df6f",
          letterSpacing: "0.02em",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "12px",
            height: "12px",
            background: "#05df6f",
            borderRadius: "2px",
          }}
        />
        <div style={{ display: "flex" }}>{SITE.name.toUpperCase()}</div>
        {subtitle ? (
          <>
            <div style={{ display: "flex", color: "#555" }}>/</div>
            <div style={{ display: "flex", color: "#aaa" }}>{subtitle}</div>
          </>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {kind === "article" ? (
          <div
            style={{
              fontSize: "20px",
              color: "#05df6f",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            $ cat writeup.md
          </div>
        ) : null}
        <div
          style={{
            fontSize: title.length > 70 ? "56px" : "72px",
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            display: "flex",
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: "22px",
          color: "#999",
        }}
      >
        <div style={{ display: "flex" }}>{SITE.author}</div>
        <div
          style={{
            display: "flex",
            color: "#05df6f",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {SITE.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
