import Link from "next/link";
import Image from "next/image";
import { layout } from "@/content/layout";

export function Brand({ variant = "navigation" }: { variant?: "navigation" | "footer" }) {
  const footer = variant === "footer";
  return (
    <Link href="/" aria-label={layout.brand.homeLabel} className={`relative block shrink-0 ${footer ? "h-[122px] w-[168px]" : "h-20 w-28"}`}>
      <Image src="/images/brand/divines-travels-transparent.png" alt="" fill sizes={footer ? "168px" : "112px"} loading={footer ? "lazy" : "eager"} className="object-contain" />
    </Link>
  );
}
