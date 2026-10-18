import type { MetadataRoute } from "next";
import { destinations } from "@/content/destinations";
import { journeys } from "@/content/journeys";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/destinations", "/journeys", "/how-it-works", "/about", "/stories", "/contact"];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path), changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.8 })),
    ...destinations.map(({ slug }) => ({ url: absoluteUrl(`/destinations/${slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...journeys.map(({ slug }) => ({ url: absoluteUrl(`/journeys/${slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
