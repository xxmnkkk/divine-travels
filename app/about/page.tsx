import type { Metadata } from 'next';
import { PageIntro } from '@/components/content/PageIntro';
import { PageCTA } from '@/components/content/PageCTA';
import { DestinationArt } from '@/components/content/DestinationArt';
import { site, siteCopy } from '@/content/site';
import { createMetadata } from '@/lib/seo';

const copy = siteCopy.aboutPage;
export const metadata: Metadata = createMetadata({ title: 'About us', description: copy.intro, path: '/about' });

export default function AboutPage() {
  return <main id="main-content"><PageIntro eyebrow={copy.eyebrow} title={copy.title} description={copy.intro} /><section className="section-space"><div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-24"><div className="relative"><DestinationArt motif="maldives" className="aspect-square w-full rounded-[2rem] border border-beige" /><div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-ivory/70 bg-ivory/80 p-6 backdrop-blur-md"><p className="font-display text-3xl italic leading-tight text-ink">“{copy.quote}”</p><p className="eyebrow mt-4">{site.name}</p></div></div><div><p className="body-copy">{copy.story}</p><p className="body-copy mt-6">{copy.secondStory}</p><div className="my-8 h-px w-16 bg-gold" /><p className="text-xs leading-6 text-ink-soft">{copy.note}</p></div></div></section><section className="section-space bg-sand/40"><div className="container-shell"><p className="eyebrow">{copy.valuesEyebrow}</p><h2 className="section-heading mt-4">{copy.valuesTitle}</h2><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{site.values.map((value, index) => <article key={value.title} className="rounded-3xl border border-beige bg-ivory p-7"><span className="font-display text-4xl italic text-sea-ink">0{index + 1}</span><h3 className="mt-6 font-display text-3xl leading-tight">{value.title}</h3><p className="mt-4 text-sm leading-7 text-ink-soft">{value.description}</p></article>)}</div></div></section><PageCTA title={copy.ctaTitle} label={copy.cta} /></main>;
}
