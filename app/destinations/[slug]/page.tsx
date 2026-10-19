import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DestinationArt } from '@/components/content/DestinationArt';
import { DestinationCard } from '@/components/content/DestinationCard';
import { PageCTA } from '@/components/content/PageCTA';
import { destinations } from '@/content/destinations';
import { siteCopy } from '@/content/site';
import { createMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return destinations.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) return { title: 'Destination not found', robots: { index: false, follow: false } };
  return createMetadata({ title: `${destination.name}, personally planned`, description: destination.description, path: `/destinations/${destination.slug}` });
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) notFound();
  const copy = siteCopy.destinationDetail;
  const related = destinations.filter((item) => item.slug !== slug).slice(0, 4);
  return <main id="main-content">
    <section className="bg-sand/45 pb-16 pt-40 md:pb-24 md:pt-48"><div className="container-shell grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20"><div><Link href="/destinations" className="eyebrow transition-colors hover:text-sea-ink">← {destination.region} / {destination.name}</Link><h1 className="mt-6 font-display text-7xl leading-none tracking-[-.045em] md:text-8xl">{destination.name}</h1><p className="mt-6 max-w-md font-display text-3xl italic leading-tight text-ink-soft md:text-4xl">{destination.tagline}</p><p className="eyebrow mt-8">{destination.eyebrow}</p><Link href={`/contact?destination=${destination.slug}#plan-your-trip`} className="button-primary mt-8">{copy.cta}<span aria-hidden="true">↗</span></Link></div><div className="relative aspect-[6/5] overflow-hidden rounded-[2rem] border border-beige">{destination.image ? <Image src={destination.image} alt={destination.imageAlt ?? `${destination.name} landscape`} fill fetchPriority="high" sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 96px), (max-width: 1279px) calc(47.62vw - 99px), 511px" className={`object-cover ${destination.imageClassName ?? ""}`} /> : <DestinationArt motif={destination.motif} className="h-full w-full" />}</div></div></section>
    <section className="section-space"><div className="container-shell grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-24"><div><p className="eyebrow">{copy.overview}</p><h2 className="section-heading mt-4">{destination.tagline}</h2><p className="body-copy mt-6 max-w-xl">{destination.description}</p><p className="eyebrow mt-9">{copy.interests}</p><div className="mt-4 flex flex-wrap gap-2">{destination.interests.map((interest) => <span key={interest} className="rounded-full border border-beige px-4 py-2 text-xs text-ink-soft">{interest}</span>)}</div></div><aside className="self-start rounded-3xl border border-beige bg-sand/35 p-7 md:p-9"><p className="eyebrow">{copy.duration}</p><p className="mt-3 font-display text-4xl">{destination.duration}</p><div className="my-7 h-px bg-beige" /><h3 className="eyebrow">{copy.timing}</h3><p className="mt-3 text-sm leading-7 text-ink-soft">{destination.bestTime}</p><p className="mt-4 text-[11px] leading-5 text-ink-soft">{copy.seasonNote}</p><a href={destination.seasonSource.url} target="_blank" rel="noopener noreferrer" className="text-link mt-5 text-[11px]">{copy.sourceLabel}<span aria-hidden="true">↗</span></a></aside></div></section>
    <section className="section-space bg-sand/40"><div className="container-shell"><p className="eyebrow">{copy.itineraryEyebrow}</p><h2 className="section-heading mt-4 max-w-2xl">{copy.itineraryTitle}</h2><p className="body-copy mt-5 max-w-xl">{copy.itineraryNote}</p><ol className="mt-12 grid gap-6 md:grid-cols-3">{destination.itinerary.map((step, index) => <li key={step.title} className="rounded-3xl border border-beige bg-ivory p-7"><span className="font-display text-4xl italic text-sea-ink">0{index + 1}</span><h3 className="mt-6 font-display text-3xl leading-tight">{step.title}</h3><p className="mt-4 text-sm leading-7 text-ink-soft">{step.description}</p></li>)}</ol></div></section>
    <PageCTA eyebrow={copy.ctaEyebrow} title={copy.ctaTitle} description={copy.ctaDescription} label={copy.cta} href={`/contact?destination=${destination.slug}#plan-your-trip`} />
    <section className="section-space"><div className="container-shell"><h2 className="section-heading max-w-2xl">{copy.related}</h2><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <DestinationCard key={item.slug} destination={item} compact />)}</div></div></section>
  </main>;
}
