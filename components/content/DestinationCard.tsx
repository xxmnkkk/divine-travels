import Image from 'next/image';
import Link from 'next/link';
import type { Destination } from '@/content/destinations';
import { siteCopy } from '@/content/site';
import { DestinationArt } from './DestinationArt';

export function DestinationCard({ destination, compact = false }: { destination: Destination; compact?: boolean }) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group block overflow-hidden rounded-3xl border border-beige bg-ivory transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-card">
      <div className={`relative overflow-hidden ${compact ? 'aspect-[5/4]' : 'aspect-[6/5]'}`}>
        {destination.image ? <Image src={destination.image} alt={`${destination.name} landscape`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /> : <DestinationArt motif={destination.motif} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />}
        <span className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-ivory/75 px-3 py-1 text-[10px] font-medium uppercase tracking-[.16em] text-ink-soft backdrop-blur-sm">{destination.region}</span>
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-6">
        <div><h3 className="font-display text-3xl leading-none tracking-tight text-ink">{destination.name}</h3><p className="mt-2 text-xs text-ink-soft">{destination.interests.slice(0, 2).join(' · ')}</p></div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-beige text-ink-soft transition-colors group-hover:border-sea-deep group-hover:bg-sea-deep group-hover:text-ivory"><span className="sr-only">{siteCopy.cards.destinationLink} {destination.name}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-4 w-4" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg></span>
      </div>
    </Link>
  );
}
