import type { Metadata } from 'next';
import { PageIntro } from '@/components/content/PageIntro';
import { PageCTA } from '@/components/content/PageCTA';
import { testimonials, testimonialDisclaimer } from '@/content/testimonials';
import { siteCopy } from '@/content/site';
import { createMetadata } from '@/lib/seo';

const copy = siteCopy.storiesPage;
export const metadata: Metadata = createMetadata({ title: 'Illustrative traveler stories', description: copy.description, path: '/stories' });

export default function StoriesPage() {
  return <main id="main-content"><PageIntro {...copy} /><section className="section-space"><div className="container-shell"><p className="mb-8 rounded-2xl border border-beige bg-sand/50 px-5 py-4 text-xs leading-6 text-ink-soft">{testimonialDisclaimer}</p><div className="grid gap-6 md:grid-cols-2">{testimonials.map((story, index) => <figure key={story.name} className={`flex flex-col rounded-3xl border border-beige p-7 md:p-9 ${index === 0 ? 'bg-sand/50 md:col-span-2 md:p-12' : 'bg-ivory'}`}><div className="flex items-center justify-between gap-4"><span className="rounded-full border border-beige px-3 py-1.5 text-[9px] uppercase tracking-[.12em] text-ink-soft">{copy.label}</span><span aria-label={`${story.rating} out of 5 stars`} className="text-sm tracking-[.2em] text-[#8B6F3D]">{'★'.repeat(story.rating)}</span></div><blockquote className={`mt-7 font-display leading-[1.25] tracking-tight text-ink ${index === 0 ? 'max-w-4xl text-4xl md:text-5xl' : 'text-3xl'}`}>“{story.quote}”</blockquote><figcaption className="mt-auto flex items-center gap-4 pt-8"><span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-beige bg-sand text-xs text-ink-soft">{story.initials}</span><span><span className="block text-xs font-medium text-ink">{story.name}</span><span className="mt-1 block text-xs text-ink-soft">{story.trip}</span></span></figcaption></figure>)}</div></div></section><PageCTA title={copy.ctaTitle} label={copy.cta} /></main>;
}
