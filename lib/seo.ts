import type { Metadata } from "next";
import { site } from "@/content/site";

function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  const url = new URL(configured);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute http or https URL.");
  }
  return url.origin;
}

/** The single origin used by canonical URLs, social metadata, JSON-LD and crawlers. */
export const siteUrl = resolveSiteUrl();
export const isPreviewSite = new URL(siteUrl).hostname.endsWith(".example") || process.env.VERCEL_ENV === "preview";

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export function createMetadata({ title, description, path = "/", noIndex = false }: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const socialTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const images = [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: `${site.name} — Journeys, beautifully planned.` }];
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title: socialTitle,
      description,
      url: absoluteUrl(path),
      images,
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images },
    robots: { index: !(noIndex || isPreviewSite), follow: !(noIndex || isPreviewSite) },
  };
}
