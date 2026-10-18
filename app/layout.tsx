import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { createMetadata, siteUrl } from "@/lib/seo";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: "variable", style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  ...createMetadata({ title: "Divine Travels — Journeys, beautifully planned.", description: "Thoughtfully crafted journeys, planned around you. Discover bespoke travel with a dedicated consultant, local insight, and room to explore." }),
  metadataBase: new URL(siteUrl),
  title: { default: "Divine Travels — Journeys, beautifully planned.", template: "%s | Divine Travels" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}><body className="font-sans antialiased"><a href="#main-content" className="sr-only fixed left-6 top-6 z-[80] rounded-full bg-ivory px-6 py-3 text-ink focus:not-sr-only">Skip to content</a><SmoothScroll/><Navbar/>{children}<Footer/></body></html>;
}
