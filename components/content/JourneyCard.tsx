import Image from 'next/image';
import Link from 'next/link';
import { destinations } from '@/content/destinations';
import type { Journey } from '@/content/journeys';
import { siteCopy } from '@/content/site';
import { DestinationArt } from './DestinationArt';

export function JourneyCard({ journey, compact = false }: { journey: Journey; compact?: boolean }) {
  const destination = destinations.find((place) => place.slug === journey.destinationSlug);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-beige bg-ivory shadow-[0_20px_60px_-35px_rgba(43,42,40,.15)]">
      {destination && <Link href={`/journeys/${journey.slug}`} tabIndex={-1} aria-hidden="true" className={`relative block overflow-hidden ${compact ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
        {destination.image ? <Image src={destination.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /> : <DestinationArt motif={destination.motif} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />}
        <span className="absolute bottom-4 left-5 rounded-full bg-ivory/85 px-3 py-1.5 text-[10px] uppercase tracking-[.15em] text-ink-soft">{destination.name} · {journey.duration}</span>
      </Link>}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-display text-3xl leading-tight tracking-tight text-ink"><Link href={`/journeys/${journey.slug}`} className="transition-colors hover:text-sea-ink">{journey.title}</Link></h3>
        <p className="mt-3 text-sm leading-7 text-ink-soft">{journey.description}</p>
        <ul className="my-5 space-y-2 border-y border-beige/70 py-5">{journey.highlights.map((highlight) => <li key={highlight} className="flex items-center gap-2.5 text-xs text-ink-soft"><span aria-hidden="true" className="h-1 w-1 rounded-full bg-taupe" />{highlight}</li>)}</ul>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[.12em] text-ink-soft">{siteCopy.cards.journeyPricePrefix}</p><p className="mt-1 text-sm text-ink">{journey.price}<span className="ml-1 text-[10px] text-ink-soft">/ {siteCopy.cards.journeyPriceUnit}</span></p></div><Link href={`/journeys/${journey.slug}`} className="text-link text-xs">{siteCopy.cards.journeyLink}<span aria-hidden="true"> ↗</span></Link></div>
      </div>
    </article>
  );
}
