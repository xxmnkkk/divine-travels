import Link from "next/link";
import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { Brand } from "./Brand";
import { Newsletter } from "./Newsletter";
import { layout } from "@/content/layout";

const copy = layout.footer;

export function Footer() {
  return <footer className="bg-sand">
    <svg aria-hidden="true" className="footer-wave text-ivory" viewBox="0 0 1440 60" preserveAspectRatio="none"><path fill="currentColor" d="M0 0h1440v16c-160 60-360 24-550 16S350 82 0 17Z"/></svg>
    <div className="container-shell pb-7 pt-14">
      <div className="grid gap-12 border-b border-beige pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_.8fr_1.1fr] lg:gap-12">
        <div><Brand/><p className="body-copy mt-5 max-w-[260px] text-[13px]">{copy.introduction[0]}<br/>{copy.introduction[1]}</p><Link href={copy.about.href} className="text-link mt-5">{copy.about.label} <ArrowUpRight size={13}/></Link></div>
        <div><p className="eyebrow mb-5">{copy.exploreHeading}</p><nav aria-label={copy.exploreLabel} className="flex flex-col items-start gap-3 text-xs text-ink-soft">{copy.exploreLinks.map((link) => <Link key={link.href} className="hover:text-ink" href={link.href}>{link.label}</Link>)}</nav></div>
        <div><p className="eyebrow mb-5">{copy.contactHeading}</p><Link href="/contact" className="inline-flex items-center gap-2 text-xs">{copy.contactLink} <ArrowUpRight size={13}/></Link><p className="mt-3 text-xs text-ink-soft">{copy.email}</p><p className="mt-2 text-[10px] text-ink-soft">{copy.contactNote}</p><div className="mt-5 flex gap-3"><Link href="/contact" aria-label={copy.contactLabel} className="rounded-full border border-beige p-2.5"><Mail size={14}/></Link><Link href="/stories" aria-label={copy.storiesLabel} className="rounded-full border border-beige p-2.5"><Instagram size={14}/></Link></div></div>
        <div><p className="eyebrow mb-5">{copy.newsletterEyebrow}</p><p className="font-display text-2xl">{copy.newsletterHeading}</p><Newsletter/></div>
      </div>
      <div className="flex flex-col gap-4 pt-6 text-[10px] text-ink-soft sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {copy.copyright}</p><p className="flex gap-5">{copy.legalLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}<span>{copy.note}</span></p></div>
    </div>
  </footer>;
}
