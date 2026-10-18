import Link from "next/link";
import { layout } from "@/content/layout";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label={layout.brand.homeLabel} className={`inline-flex shrink-0 items-center gap-2.5 ${light ? "text-ivory" : "text-ink"}`}>
      <svg width="34" height="38" viewBox="0 0 34 38" fill="none" aria-hidden="true">
        <path d="M4 24a13 13 0 1 1 26 0M8 24a9 9 0 0 1 18 0M17 1v4M3 8l3 3M31 8l-3 3" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
        <path d="M2 27c5-4 9 4 15 0s9 4 15 0M5 32c4-3 8 3 12 0s8 3 12 0M11 36c4-2 7 2 12 0" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[26px] leading-none tracking-[-.035em]">{layout.brand.firstWord} <span className="italic">{layout.brand.secondWord}</span></span>
    </Link>
  );
}
