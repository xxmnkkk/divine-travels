import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Brand } from "./Brand";
import { layout } from "@/content/layout";

const copy = layout.footer;

export function Footer() {
  return <footer className="bg-sand">
    <svg aria-hidden="true" className="footer-wave text-ivory" viewBox="0 0 1440 60" preserveAspectRatio="none"><path fill="currentColor" d="M0 0h1440v16c-160 60-360 24-550 16S350 82 0 17Z"/></svg>
    <div className="container-shell pb-7 pt-14">
      <div className="grid gap-10 border-b border-beige pb-14 md:grid-cols-2 lg:grid-cols-[1.25fr_.7fr_1fr] lg:gap-16">
        <div className="md:col-span-2 lg:col-span-1"><Brand variant="footer"/><p className="body-copy mt-5 max-w-[280px] text-[13px]">{copy.introduction[0]}<br/>{copy.introduction[1]}</p><Link href={copy.about.href} prefetch={false} className="text-link mt-5">{copy.about.label} <ArrowUpRight size={13} aria-hidden="true"/></Link></div>
        <div><p className="eyebrow mb-5">{copy.exploreHeading}</p><nav aria-label={copy.exploreLabel} className="flex flex-col items-start gap-3 text-xs text-ink-soft">{copy.exploreLinks.map((link) => <Link key={link.href} prefetch={false} className="hover:text-ink" href={link.href}>{link.label}</Link>)}</nav></div>
        <div>
          <p className="eyebrow mb-5">{copy.contactHeading}</p>
          <div className="space-y-5">
            <a href={copy.emailHref} className="group flex w-fit items-center gap-3 rounded-lg text-ink">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-beige text-sea-ink"><Mail size={16} strokeWidth={1.5} aria-hidden="true"/></span>
              <span><span className="block text-[10px] text-ink-soft">{copy.emailLabel}</span><span className="mt-1 block text-xs group-hover:underline group-hover:underline-offset-4">{copy.email}</span></span>
            </a>
            <a href={copy.phoneHref} className="group flex w-fit items-center gap-3 rounded-lg text-ink">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-beige text-sea-ink"><Phone size={16} strokeWidth={1.5} aria-hidden="true"/></span>
              <span><span className="block text-[10px] text-ink-soft">{copy.phoneLabel}</span><span className="mt-1 block whitespace-nowrap text-xs group-hover:underline group-hover:underline-offset-4">{copy.phone}</span></span>
            </a>
          </div>
          <Link href="/contact" prefetch={false} className="text-link mt-6">{copy.contactLink} <ArrowUpRight size={13} aria-hidden="true"/></Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-6 text-[10px] text-ink-soft sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {copy.copyright}</p><nav aria-label={copy.legalLabel} className="flex flex-wrap gap-x-5 gap-y-3">{copy.legalLinks.map((link) => <Link key={link.href} prefetch={false} href={link.href}>{link.label}</Link>)}<span>{copy.note}</span></nav></div>
    </div>
  </footer>;
}
