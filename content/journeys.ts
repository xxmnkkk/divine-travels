import type { ItineraryStep } from './destinations';

export interface Journey {
  slug: string;
  title: string;
  destinationSlug: string;
  duration: string;
  price: string;
  description: string;
  highlights: string[];
  itinerary: ItineraryStep[];
}

export const journeys: Journey[] = [
  {
    slug: 'the-slow-italian-summer', title: 'The slow Italian summer', destinationSlug: 'italy', duration: '12 days', price: '₹3.8–5.2 lakh',
    description: 'From Roman mornings to a Tuscan table and the blue of the coast. A journey for travelers who prefer fewer check-ins and a little more time in each place.',
    highlights: ['Private city walks', 'A countryside cooking afternoon', 'Time on the coast'],
    itinerary: [
      { title: 'Days 1–3 · Rome, a personal introduction', description: 'Arrive with an easy first evening. Explore the ancient city with a private guide, then follow your appetite through neighborhood markets and quiet side streets.' },
      { title: 'Days 4–8 · At home in Tuscany', description: 'Settle into a countryside base. Visit hill towns, spend an afternoon in a local kitchen and leave whole mornings for a book, a walk or a second coffee.' },
      { title: 'Days 9–12 · A coastal finale', description: 'Trade rolling hills for the sea. We can arrange a private boat day, a coastal walk or a table that is worth staying for. The final pace is yours.' },
    ],
  },
  {
    slug: 'japan-in-the-details', title: 'Japan, in the details', destinationSlug: 'japan', duration: '14 days', price: '₹4.8–6.5 lakh',
    description: 'A thoughtful first encounter with Japan, connecting Tokyo’s neighborhood life, a mountain retreat and the gardens and craft traditions of Kyoto.',
    highlights: ['Tokyo with a local', 'A traditional ryokan stay', 'Kyoto’s quiet gardens'],
    itinerary: [
      { title: 'Days 1–5 · Tokyo’s many worlds', description: 'Find your bearings with a guide, explore a food neighborhood and spend time in the galleries, shops or design studios that speak to you.' },
      { title: 'Days 6–8 · A mountain pause', description: 'Travel by rail to a slower setting. A ryokan stay brings seasonal cooking and a different daily rhythm, with walks adapted to your comfort.' },
      { title: 'Days 9–14 · Kyoto and beyond', description: 'Begin temple visits early, meet an artisan and explore Kyoto’s neighborhoods at a considered pace. An optional day trip adds a new perspective before your onward journey.' },
    ],
  },
  {
    slug: 'an-island-for-two', title: 'An island for two', destinationSlug: 'maldives', duration: '7 days', price: '₹2.8–4.5 lakh',
    description: 'A simple, beautifully judged island escape. The right villa, thoughtful dining and enough unscheduled time to settle into the ocean’s rhythm.',
    highlights: ['An island matched to you', 'A sunset sailing moment', 'Unhurried lagoon days'],
    itinerary: [
      { title: 'Days 1–2 · Let the island find you', description: 'Arrive by a transfer selected around your flight. Settle into your villa, take a first swim and leave the first full day open.' },
      { title: 'Days 3–5 · Make it your own', description: 'Choose a guided reef outing, a restorative treatment or a quiet sunset sail. We help arrange a few meaningful moments and protect the space between them.' },
      { title: 'Days 6–7 · A slow goodbye', description: 'Enjoy a final day without a checklist. Your onward transfer is coordinated in advance, with timing shaped around local operating conditions.' },
    ],
  },
  {
    slug: 'kenya-beyond-the-horizon', title: 'Kenya, beyond the horizon', destinationSlug: 'kenya', duration: '10 days', price: '₹4.2–6.2 lakh',
    description: 'A gentle introduction to safari, with intimate camps, knowledgeable guides and time to understand the landscapes around you. End with a few days beside the sea.',
    highlights: ['Small, considered camps', 'Expert local guiding', 'A coastal finish'],
    itinerary: [
      { title: 'Day 1 · An easy landing', description: 'Rest in Nairobi after your flight, ready for the journey ahead. If your arrival allows, take a short, personally guided introduction to the city.' },
      { title: 'Days 2–6 · Time in the wild', description: 'Fly to a carefully chosen camp. Morning and afternoon outings follow the reserve’s conditions, with quiet time between drives and no promise of particular sightings.' },
      { title: 'Days 7–10 · Coast into a gentler rhythm', description: 'Finish on the coast, where a small beachfront stay offers space to swim, read and reflect before your journey home.' },
    ],
  },
];
