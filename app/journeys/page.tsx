import type { Metadata } from 'next';
import { JourneyCard } from '@/components/content/JourneyCard';
import { PageIntro } from '@/components/content/PageIntro';
import { PageCTA } from '@/components/content/PageCTA';
import { journeys } from '@/content/journeys';
import { siteCopy } from '@/content/site';
import { createMetadata } from '@/lib/seo';

const copy = siteCopy.journeysPage;
export const metadata: Metadata = createMetadata({ title: 'Sample journeys', description: copy.description, path: '/journeys' });

export default function JourneysPage() {
  return <main id="main-content"><PageIntro {...copy} /><section className="section-space"><div className="container-shell"><div className="grid gap-7 md:grid-cols-2">{journeys.map((journey) => <JourneyCard key={journey.slug} journey={journey} />)}</div><p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-6 text-ink-soft">{copy.priceNote}</p></div></section><PageCTA title={siteCopy.journeyDetail.ctaTitle} label={siteCopy.journeyDetail.cta} /></main>;
}
