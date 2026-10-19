import { ImageResponse } from "next/og";
import { brandImageData } from "@/lib/brand-image";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await brandImageData();
  return new ImageResponse(
    <div style={{ display: "flex", width: 64, height: 64, alignItems: "center" }}>
      <div style={{ display: "flex", position: "relative", width: 64, height: 47, overflow: "hidden" }}>
        {/* The favicon focuses on the supplied emblem, without redrawing it. */}
        <img src={logo} alt="" width={100} height={75} style={{ position: "absolute", left: -25, top: -1 }} />
      </div>
    </div>, size,
  );
}
