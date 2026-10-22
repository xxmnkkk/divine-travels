import type { Metadata } from 'next';
import { JourneyCard } from '@/components/content/JourneyCard';
import { JourneyExplorer, type JourneyExplorerItem } from '@/components/content/JourneyExplorer';
import { PageIntro } from '@/components/content/PageIntro';
import { PageCTA } from '@/components/content/PageCTA';
import { journeys } from '@/content/journeys';
import { destinations } from '@/content/destinations';
import { siteCopy } from '@/content/site';
import { createMetadata } from '@/lib/seo';

const copy = siteCopy.journeysPage;
export const metadata: Metadata = createMetadata({ title: 'Sample journeys', description: copy.description, path: '/journeys' });

export default function JourneysPage() {
  const items: JourneyExplorerItem[] = journeys.map((journey) => ({
    slug: journey.slug,
    collection: destinations.find((destination) => destination.slug === journey.destinationSlug)?.region === 'India' ? 'india' : 'international',
    card: <JourneyCard journey={journey} />,
  }));
  return <main id="main-content"><PageIntro {...copy} /><section className="section-space"><div className="container-shell"><JourneyExplorer items={items} /><p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-6 text-ink-soft">{copy.priceNote}</p></div></section><PageCTA title={siteCopy.journeyDetail.ctaTitle} label={siteCopy.journeyDetail.cta} /></main>;
}
