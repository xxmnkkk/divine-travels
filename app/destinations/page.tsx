import type { Metadata } from 'next';
import { DestinationExplorer } from '@/components/content/DestinationExplorer';
import { PageIntro } from '@/components/content/PageIntro';
import { PageCTA } from '@/components/content/PageCTA';
import { siteCopy } from '@/content/site';
import { createMetadata } from '@/lib/seo';

const copy = siteCopy.destinationsPage;
export const metadata: Metadata = createMetadata({ title: 'Destinations', description: copy.description, path: '/destinations' });

export default function DestinationsPage() {
  return <main id="main-content"><PageIntro {...copy} /><section className="section-space"><div className="container-shell"><DestinationExplorer /></div></section><PageCTA {...siteCopy.destinationDetail} eyebrow={siteCopy.destinationDetail.ctaEyebrow} title={siteCopy.destinationDetail.ctaTitle} description={siteCopy.destinationDetail.ctaDescription} label={siteCopy.destinationDetail.cta} /></main>;
}
