import { ImageResponse } from "next/og";
import { getAethyrByName, getAllAethyrs } from "@/lib/aethyrs/aethyr-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllAethyrs().map((a) => ({ name: a.name }));
}

export default async function Image({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const aethyr = getAethyrByName(decodeURIComponent(name));

  const title = aethyr?.name ?? name.toUpperCase();
  const sub = aethyr
    ? `Aethyr ${aethyr.number} of 30 · ${aethyr.governors.length} governors`
    : "The Celestial Archive";
  const governors = aethyr ? aethyr.governors.map((g) => g.name).join(" · ") : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 35%, #1a1410 0%, #080604 70%)",
          color: "#f5e8c0",
          fontFamily: "Georgia, serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            fontSize: 22,
            letterSpacing: 10,
            color: "#7a6230"
          }}
        >
          ENOCHIAN · THE CELESTIAL ARCHIVE
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 340,
            height: 340,
            borderRadius: 999,
            border: "3px solid #c9a84c",
            boxShadow: "0 0 120px rgba(201,168,76,0.35)",
            background: "rgba(201,168,76,0.06)"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 96, letterSpacing: 14, color: "#f5e8c0" }}>{title}</div>
            <div style={{ fontSize: 24, letterSpacing: 4, color: "#c9a84c", marginTop: 8 }}>{sub}</div>
          </div>
        </div>

        {governors ? (
          <div
            style={{
              position: "absolute",
              bottom: 70,
              left: 100,
              right: 100,
              display: "flex",
              justifyContent: "center",
              fontSize: 26,
              color: "#b8a06a",
              textAlign: "center"
            }}
          >
            {governors}
          </div>
        ) : null}

        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            fontSize: 16,
            letterSpacing: 6,
            color: "#5a4a28"
          }}
        >
          ENOCHIA.IO — NOTHING HERE ASKS YOU TO BELIEVE
        </div>
      </div>
    ),
    { ...size }
  );
}
