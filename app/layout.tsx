import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://divinetravels.example"),
  title: { default: "Divine Travels — Journeys, beautifully planned.", template: "%s | Divine Travels" },
  description: "Thoughtfully crafted journeys, planned around you. Discover bespoke travel with a dedicated consultant, local insight, and room to explore.",
  openGraph: { type: "website", locale: "en_US", siteName: "Divine Travels", title: "Divine Travels — Journeys, beautifully planned.", description: "A world of possibilities. A journey that’s entirely yours." },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${body.variable}`}><body className="font-sans antialiased"><a href="#main-content" className="sr-only fixed left-6 top-6 z-[80] rounded-full bg-ivory px-6 py-3 text-ink focus:not-sr-only">Skip to content</a><SmoothScroll/><Navbar/>{children}<Footer/></body></html>;
}
