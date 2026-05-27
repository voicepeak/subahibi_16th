import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SubaHibi 16th Anniversary — The Sky Archive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #f7faff 0%, #dceeff 50%, #6fa9d8 100%)",
          fontFamily: '"Noto Serif SC", serif',
          color: "#101217",
          padding: 60,
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "rgba(16,18,23,0.5)", marginBottom: 20 }}>
          Non-official fan anniversary project
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 300, letterSpacing: "0.02em", marginBottom: 10 }}>
          SubaHibi 16th Anniversary
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "rgba(16,18,23,0.6)", marginBottom: 40 }}>
          The Sky Archive / 终末天空档案馆
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 16,
            color: "rgba(16,18,23,0.4)",
            borderTop: "1px solid rgba(16,18,23,0.14)",
            paddingTop: 20,
          }}
        >
          sky / mail / bulletin / 7.20 / tsui no sora / wonderful everyday
        </div>
      </div>
    ),
    { ...size }
  );
}
