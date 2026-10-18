'use client';

import { useMemo, useState } from 'react';
import { destinations, destinationInterests, destinationRegions } from '@/content/destinations';
import { siteCopy } from '@/content/site';
import { DestinationCard } from './DestinationCard';

export function DestinationExplorer() {
  const [region, setRegion] = useState(destinationRegions[0]);
  const [interest, setInterest] = useState(destinationInterests[0]);
  const filtered = useMemo(() => destinations.filter((destination) => (region === destinationRegions[0] || destination.region === region) && (interest === destinationInterests[0] || destination.interests.includes(interest))), [region, interest]);
  const copy = siteCopy.destinationsPage;
  return (
    <div>
      <div className="mb-10 space-y-5 rounded-3xl border border-beige bg-sand/35 p-5 md:p-7">
        <fieldset><legend className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-ink-soft">{copy.regionLabel}</legend><div className="flex flex-wrap gap-2">{destinationRegions.map((item) => <button key={item} type="button" aria-pressed={region === item} onClick={() => setRegion(item)} className={`rounded-full border px-4 py-2 text-xs transition-colors ${region === item ? 'border-ink bg-ink text-ivory' : 'border-beige bg-ivory text-ink-soft hover:border-taupe'}`}>{item}</button>)}</div></fieldset>
        <fieldset><legend className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-ink-soft">{copy.interestLabel}</legend><div className="flex flex-wrap gap-2">{destinationInterests.map((item) => <button key={item} type="button" aria-pressed={interest === item} onClick={() => setInterest(item)} className={`rounded-full border px-4 py-2 text-xs transition-colors ${interest === item ? 'border-sea-deep bg-sea-deep text-ivory' : 'border-beige bg-ivory text-ink-soft hover:border-taupe'}`}>{item}</button>)}</div></fieldset>
      </div>
      <p className="mb-6 text-xs text-ink-soft" role="status" aria-live="polite">{filtered.length} {copy.countLabel}</p>
      {filtered.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((destination) => <DestinationCard key={destination.slug} destination={destination} />)}</div> : <div className="rounded-3xl border border-beige bg-sand/40 px-6 py-16 text-center"><h2 className="font-display text-4xl text-ink">{copy.emptyTitle}</h2><p className="mt-3 text-sm text-ink-soft">{copy.emptyDescription}</p><button type="button" onClick={() => { setRegion(destinationRegions[0]); setInterest(destinationInterests[0]); }} className="button-secondary mt-6">{copy.reset}</button></div>}
    </div>
  );
}
