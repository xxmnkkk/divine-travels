import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { legalNavigation, type LegalPageContent } from "@/content/legal";

export function LegalPage({ content, otherPage }: { content: LegalPageContent; otherPage: "privacy" | "terms" }) {
  return <main id="main-content">
    <section className="page-intro"><div className="container-shell"><p className="eyebrow">{content.eyebrow}</p><h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] tracking-[-.04em] md:text-7xl">{content.title}</h1><p className="body-copy mt-6 max-w-xl">{content.description}</p></div></section>
    <section className="section-space"><div className="container-shell grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
      <aside className="self-start rounded-2xl border border-beige bg-sand/40 p-6"><p className="text-xs leading-7 text-ink-soft">{content.notice}</p></aside>
      <div><div className="space-y-10">{content.sections.map((section) => <section key={section.title}><h2 className="font-display text-3xl leading-tight text-ink">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="body-copy mt-4">{paragraph}</p>)}</section>)}</div>
        <nav aria-label="Related information" className="mt-12 flex flex-wrap justify-between gap-5 border-t border-beige pt-7"><Link href="/" className="text-link"><ArrowLeft size={14} aria-hidden="true" />{legalNavigation.home}</Link><Link href={`/${otherPage}`} className="text-link">{legalNavigation[otherPage]}<ArrowUpRight size={14} aria-hidden="true" /></Link></nav>
      </div>
    </div></section>
  </main>;
}
