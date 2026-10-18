import type { Metadata } from 'next';
import { PageIntro } from '@/components/content/PageIntro';
import { PageCTA } from '@/components/content/PageCTA';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { siteCopy } from '@/content/site';
import { createMetadata } from '@/lib/seo';

const copy = siteCopy.howPage;
export const metadata: Metadata = createMetadata({ title: 'How it works', description: copy.description, path: '/how-it-works' });

export default function HowItWorksPage() {
  return <main id="main-content"><PageIntro {...copy} /><section className="section-space"><div className="container-shell"><ProcessSteps /></div></section><section className="section-space bg-sand/40"><div className="container-shell grid gap-10 lg:grid-cols-2 lg:gap-24"><div><p className="eyebrow">{siteCopy.process.eyebrow}</p><h2 className="section-heading mt-4">{copy.detailTitle}</h2><p className="body-copy mt-6 max-w-lg">{copy.detailDescription}</p></div><ul className="divide-y divide-beige self-center border-y border-beige">{copy.promises.map((promise, index) => <li key={promise} className="flex items-center gap-5 py-6"><span className="font-display text-3xl italic text-sea-ink">0{index + 1}</span><span className="text-sm leading-6 text-ink-soft">{promise}</span></li>)}</ul></div></section><PageCTA title={copy.ctaTitle} label={copy.cta} /></main>;
}
