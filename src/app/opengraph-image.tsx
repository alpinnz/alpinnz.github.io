import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt =
  "Alfin Noviaji, Full Stack Developer in Malang, Indonesia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 85% 15%, #204962 0, #102b3a 32%, #101820 72%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            color: "#86c9f1",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 8,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #4baeea",
              borderRadius: 16,
              color: "#ffffff",
              letterSpacing: 0,
            }}
          >
            AN
          </div>
          ALPINNZ
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, fontWeight: 700 }}>Alfin Noviaji</div>
          <div style={{ fontSize: 34, color: "#86c9f1" }}>
            Full Stack Developer
          </div>
          <div style={{ fontSize: 25, color: "#d3d3d3" }}>
            Web · Mobile · Product Development
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#bdbdbd" }}>
          alpinnz.github.io
        </div>
      </div>
    ),
    size,
  );
}
