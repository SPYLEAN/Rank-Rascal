import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Rank Rascal — Roblox Discord Gaming Identity Bot";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rankrascal.com";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#121526",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, #4c1d95 0%, transparent 40%), radial-gradient(circle at 20% 80%, #064e3b 0%, transparent 40%)",
          padding: "60px 70px",
          color: "#f8fafc",
          fontFamily: "sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            maxWidth: "680px",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "50px",
              backgroundColor: "rgba(204, 255, 0, 0.15)",
              border: "1.5px solid #ccff00",
              color: "#ccff00",
              fontSize: "16px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            <span>⚡ RANK RASCAL DISCORD BOT</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1.1,
              textTransform: "uppercase",
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            <span>PLAY GAMES.</span>
            <span style={{ color: "#ccff00" }}>FLEX ACHIEVEMENTS.</span>
            <span style={{ color: "#ff2a85" }}>COLLECT CHAOS.</span>
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            Turn public Roblox stats into verified identity cards, Drip Checks, friendly server rivalries, and collectible badges.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                padding: "8px 16px",
                borderRadius: "14px",
                backgroundColor: "#7c3aed",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 800,
              }}
            >
              Add to Discord (Coming Soon) →
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: "360px",
            height: "440px",
            borderRadius: "32px",
            backgroundColor: "rgba(30, 41, 59, 0.9)",
            border: "3.5px solid #ccff00",
            boxShadow: "0 0 40px rgba(204, 255, 0, 0.3)",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <img
            src={`${siteUrl}/brand/poses/razz-hero-point.png`}
            alt="Razz Mascot"
            style={{
              width: "280px",
              height: "280px",
              objectFit: "contain",
            }}
          />

          <div
            style={{
              marginTop: "16px",
              padding: "10px 18px",
              borderRadius: "16px",
              backgroundColor: "#121526",
              border: "2px solid #ff2a85",
              color: "#ff2a85",
              fontSize: "15px",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            &quot;Certified Server Brain Rot!&quot;
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
