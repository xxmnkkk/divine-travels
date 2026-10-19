import { site } from './site';

export const layout = {
  brand: {
    homeLabel: `${site.name} home`,
  },
  navigation: {
    links: site.nav,
    mainLabel: 'Main navigation',
    mobileLabel: 'Mobile navigation',
    dialogLabel: 'Navigation',
    openLabel: 'Open navigation',
    closeLabel: 'Close navigation',
    primaryCta: 'Plan my trip',
    mobileCta: 'Let’s plan your journey',
    mobileNote: 'Thoughtfully crafted. Entirely yours.',
  },
  footer: {
    introduction: ['A world of possibilities.', 'A journey that’s entirely yours.'],
    about: { label: 'A little about us', href: '/about' },
    exploreHeading: 'Explore',
    exploreLabel: 'Footer explore',
    exploreLinks: [
      { label: 'Destinations', href: '/destinations' },
      { label: 'Our journeys', href: '/journeys' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Traveler stories', href: '/stories' },
    ],
    contactHeading: 'Let’s talk travel',
    contactLink: 'Meet your consultant',
    email: site.email,
    emailHref: `mailto:${site.email}`,
    emailLabel: 'Email us',
    phone: site.phone,
    phoneHref: `tel:${site.phoneHref}`,
    phoneLabel: 'Call us',
    copyright: `${site.name}. Thoughtfully crafted journeys.`,
    legalLabel: 'Legal information',
    legalLinks: [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }],
    note: 'Made for the way you travel.',
  },
};
