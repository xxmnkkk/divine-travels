import type { Metadata } from 'next';
import { PageIntro } from '@/components/content/PageIntro';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { site, siteCopy } from '@/content/site';
import { createMetadata } from '@/lib/seo';

const copy = siteCopy.contactPage;
export const metadata: Metadata = createMetadata({ title: 'Plan your journey', description: copy.description, path: '/contact' });

export default function ContactPage() {
  return <main id="main-content"><PageIntro {...copy} /><section className="section-space"><div className="container-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-24"><div><h2 className="font-display text-4xl leading-tight md:text-5xl">{copy.asideTitle}</h2><p className="body-copy mt-6 max-w-xl">{copy.asideDescription}</p><div className="mt-8 rounded-2xl border border-beige bg-sand/40 p-5"><h3 className="text-xs font-medium text-ink">{copy.detailsTitle}</h3><p className="mt-2 text-xs leading-6 text-ink-soft">{copy.detailsDescription}</p></div></div><dl className="grid self-start gap-6 border-y border-beige py-7 sm:grid-cols-2 lg:grid-cols-1"><div><dt className="eyebrow">{copy.emailLabel}</dt><dd className="mt-2 text-sm text-ink-soft">{site.email}</dd></div><div><dt className="eyebrow">{copy.phoneLabel}</dt><dd className="mt-2 text-sm text-ink-soft">{site.phone}</dd></div><div><dt className="eyebrow">{copy.locationLabel}</dt><dd className="mt-2 text-sm text-ink-soft">{site.location}</dd></div></dl></div></section><InquiryForm /></main>;
}
