import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { NotFoundShip } from "@/components/seo/NotFoundShip";
import { notFoundContent as copy } from "@/content/legal";

export const metadata = { title: "A little off the chart", robots: { index: false, follow: false } };

export default function NotFound() {
  return <main id="main-content" className="flex min-h-[85svh] items-center bg-sand/25 pb-20 pt-36 md:pt-44"><div className="container-shell text-center"><NotFoundShip /><p className="eyebrow mt-7">{copy.eyebrow}</p><h1 className="mt-5 font-display text-5xl leading-tight tracking-[-.035em] md:text-7xl">{copy.title}</h1><p className="body-copy mx-auto mt-5 max-w-md">{copy.description}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className="button-primary"><ArrowLeft size={15} aria-hidden="true" />{copy.home}</Link><Link href="/destinations" className="button-secondary">{copy.destinations}<ArrowUpRight size={15} aria-hidden="true" /></Link></div></div></main>;
}
