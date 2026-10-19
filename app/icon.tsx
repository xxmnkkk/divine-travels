import { ImageResponse } from "next/og";
import { brandImageData } from "@/lib/brand-image";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await brandImageData();
  return new ImageResponse(
    <div style={{ display: "flex", width: 64, height: 64, alignItems: "center", background: "#020b19", borderRadius: 12 }}>
      <div style={{ display: "flex", position: "relative", width: 64, height: 48, overflow: "hidden" }}>
        {/* The favicon focuses on the supplied emblem, without redrawing it. */}
        <img src={logo} alt="" width={119} height={119} style={{ position: "absolute", left: -33, top: -18 }} />
      </div>
    </div>, size,
  );
}
