import Link from "next/link";
import Image from "next/image";
import { layout } from "@/content/layout";

export function Brand({ variant = "navigation" }: { variant?: "navigation" | "footer" }) {
  const footer = variant === "footer";
  return (
    <Link href="/" aria-label={layout.brand.homeLabel} className="inline-flex shrink-0 items-center gap-3 text-ink">
      <span aria-hidden="true" className={`relative block shrink-0 overflow-hidden bg-[#020b19] ${footer ? "h-[122px] w-[168px] rounded-2xl" : "h-[58px] w-[80px] rounded-xl"}`}>
        <Image src="/images/brand/divines-travels.png" alt="" width={1254} height={1254} sizes={footer ? "200px" : "94px"} loading={footer ? "lazy" : "eager"} className={`absolute max-w-none ${footer ? "-left-[16px] -top-[36px] h-[200px] w-[200px]" : "-left-[7px] -top-[15px] h-[94px] w-[94px]"}`} />
      </span>
      {!footer && <span className="font-display text-[23px] leading-none tracking-[-.035em] md:text-[26px]">{layout.brand.firstWord} <span className="italic">{layout.brand.secondWord}</span></span>}
    </Link>
  );
}
