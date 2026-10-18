import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { layout } from "@/content/layout";

export const alt = `${site.name} — ${home.hero.lineOne} ${home.hero.emphasis}${home.hero.lineTwo}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", flexDirection: "column", background: "#FFFDF8", color: "#2B2A28", padding: "70px 86px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, letterSpacing: -1 }}>
        <svg width="45" height="48" viewBox="0 0 64 64" fill="none"><path d="M13 36a19 19 0 0 1 38 0M20 36a12 12 0 0 1 24 0M32 7v6M10 17l5 5M54 17l-5 5" stroke="#B89F7D" strokeWidth="2" strokeLinecap="round"/><path d="M9 41c8-6 15 6 23 0s15 6 23 0M15 49c6-5 11 5 17 0s11 5 17 0" stroke="#4F8497" strokeWidth="2" strokeLinecap="round"/></svg>
        {site.name}
      </div>
      <div style={{ display: "flex", marginTop: 50, fontSize: 13, letterSpacing: 4, color: "#6B655C" }}>{layout.navigation.mobileNote.toUpperCase()}</div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontSize: 78, lineHeight: 1.08, letterSpacing: -4 }}>
        <div style={{ display: "flex" }}>{home.hero.lineOne}</div>
        <div style={{ display: "flex", color: "#8A775B" }}>{home.hero.emphasis}{home.hero.lineTwo}</div>
      </div>
      <div style={{ display: "flex", marginTop: 28, fontSize: 20, color: "#6B655C" }}>{site.footer.description}</div>
      <svg width="1200" height="220" viewBox="0 0 1200 220" style={{ position: "absolute", bottom: 0, left: 0 }} fill="none">
        <circle cx="1035" cy="48" r="42" fill="#E9B8A0" opacity="0.4"/>
        <path d="M0 97C200 130 340 69 560 100s420-15 640 1v119H0Z" fill="#8FB8C4" opacity="0.22"/>
        <path d="M0 137c220-32 400 37 610 2s400 21 590-2v83H0Z" fill="#8FB8C4" opacity="0.4"/>
        <path d="M0 170c250 20 430-24 650-2s360-14 550 4v48H0Z" fill="#E8D9C0"/>
        <path d="M905 124h165l-20 22H931Z" fill="#FFFDF8" stroke="#B89F7D" strokeWidth="1.5"/>
        <path d="M935 124l14-18h70l24 18" fill="#FFFDF8" stroke="#B89F7D" strokeWidth="1.5"/>
        <path d="M954 112h59l11 8h-75Z" fill="#4F8497" opacity="0.6"/>
      </svg>
    </div>,
    size,
  );
}
