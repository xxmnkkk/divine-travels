import type { MetadataRoute } from "next";
import { absoluteUrl, isPreviewSite, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPreviewSite ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
