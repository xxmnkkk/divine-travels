import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DestinationArt } from '@/components/content/DestinationArt';
import { PageCTA } from '@/components/content/PageCTA';
import { journeys } from '@/content/journeys';
import { destinations } from '@/content/destinations';
import { siteCopy } from '@/content/site';
import { createMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return journeys.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const journey = journeys.find((item) => item.slug === slug);
  if (!journey) return { title: 'Journey not found', robots: { index: false, follow: false } };
  return createMetadata({ title: journey.title, description: journey.description, path: `/journeys/${journey.slug}` });
}

export default async function JourneyPage({ params }: Props) {
  const { slug } = await params;
  const journey = journeys.find((item) => item.slug === slug);
  if (!journey) notFound();
  const destination = destinations.find((item) => item.slug === journey.destinationSlug)!;
  const copy = siteCopy.journeyDetail;
  return <main id="main-content">
    <section className="bg-sand/45 pb-16 pt-40 md:pb-24 md:pt-48"><div className="container-shell grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-20"><div><Link href="/journeys" className="text-link text-xs">← {copy.back}</Link><p className="eyebrow mt-8">{copy.eyebrow}</p><h1 className="mt-5 font-display text-5xl leading-[1.03] tracking-[-.04em] md:text-7xl">{journey.title}</h1><p className="body-copy mt-6 max-w-xl">{journey.description}</p><div className="mt-8 flex flex-wrap gap-x-10 gap-y-5"><div><p className="eyebrow">{copy.durationLabel}</p><p className="mt-2 font-display text-3xl">{journey.duration}</p></div><div><p className="eyebrow">{copy.pricePrefix}</p><p className="mt-2 font-display text-3xl">{journey.price}</p><p className="mt-1 text-[11px] text-ink-soft">{copy.priceUnit}</p></div></div><Link href={`/contact?destination=${journey.destinationSlug}&journey=${journey.slug}#plan-your-trip`} className="button-primary mt-8">{copy.cta}<span aria-hidden="true">↗</span></Link></div><DestinationArt motif={destination.motif} className="aspect-[6/5] w-full rounded-[2rem] border border-beige" /></div></section>
    <section className="border-b border-beige py-10"><div className="container-shell"><h2 className="eyebrow">{copy.highlights}</h2><ul className="mt-5 flex flex-wrap gap-x-10 gap-y-3">{journey.highlights.map((highlight) => <li key={highlight} className="flex items-center gap-3 text-sm text-ink-soft"><span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full border border-beige text-[10px] text-sea-ink">✓</span>{highlight}</li>)}</ul></div></section>
    <section className="section-space"><div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><div><p className="eyebrow">{copy.itineraryEyebrow}</p><h2 className="section-heading mt-4 max-w-md">{copy.itineraryTitle}</h2><p className="body-copy mt-6 max-w-md">{copy.itineraryNote}</p></div><ol className="divide-y divide-beige border-y border-beige">{journey.itinerary.map((step, index) => <li key={step.title} className="flex gap-6 py-9"><span className="shrink-0 font-display text-4xl italic text-sea-ink">0{index + 1}</span><div><h3 className="font-display text-3xl leading-tight">{step.title}</h3><p className="mt-4 text-sm leading-7 text-ink-soft">{step.description}</p></div></li>)}</ol></div><p className="container-shell mt-12 max-w-4xl text-xs leading-6 text-ink-soft">{siteCopy.journeysPage.priceNote}</p></section>
    <PageCTA title={copy.ctaTitle} label={copy.cta} href={`/contact?destination=${journey.destinationSlug}&journey=${journey.slug}#plan-your-trip`} />
  </main>;
}
