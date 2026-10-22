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
  {
    slug: 'rajasthan-palaces-and-quiet-courtyards', title: 'Palaces and quiet courtyards', destinationSlug: 'rajasthan', duration: '10 days', price: '₹1.2–2.4 lakh',
    description: 'A considered route through Jaipur, Jodhpur and Udaipur, connecting palace stories with living craft and stays that are worth returning to in the afternoon.',
    highlights: ['Jaipur with a local guide', 'Jodhpur’s craft and old-city lanes', 'Unhurried lakeside days in Udaipur'],
    itinerary: [
      { title: 'Days 1–3 · A personal introduction to Jaipur', description: 'Arrive at a comfortable pace before an early heritage visit, time with local craftspeople and a meal that opens a conversation about Rajasthan’s food traditions.' },
      { title: 'Days 4–6 · The blue lanes of Jodhpur', description: 'Travel onward with sensible stops, then explore the old city and its fort with a guide. Leave a full afternoon for your stay or an optional countryside outing.' },
      { title: 'Days 7–10 · Stay a little longer in Udaipur', description: 'Finish with lakeside walks, palace courtyards and small workshops. A boat outing is optional and subject to local conditions; the final morning stays free of a checklist.' },
    ],
  },
  {
    slug: 'kerala-backwaters-and-slow-mornings', title: 'Backwaters and slow mornings', destinationSlug: 'kerala', duration: '9 days', price: '₹0.9–1.8 lakh',
    description: 'From Kochi’s historic lanes to Munnar’s tea country and a quiet waterside stay. A Kerala journey with varied landscapes, thoughtful food and room between the plans.',
    highlights: ['Kochi’s heritage and local kitchens', 'A gentle stay in tea country', 'Backwater time at your own pace'],
    itinerary: [
      { title: 'Days 1–2 · Settle into Kochi', description: 'Explore Fort Kochi with a local guide, visit a small gallery or workshop and share a cooking encounter shaped around your tastes. Keep the first evening easy.' },
      { title: 'Days 3–5 · Mornings in the hills', description: 'Take the scenic route to the Munnar region for tea landscapes, a guided walk when weather allows and time to enjoy a quieter stay rather than a string of viewpoints.' },
      { title: 'Days 6–9 · Follow the backwaters', description: 'Base yourself near Kumarakom or Alappuzha, with a boat outing chosen around local conditions. Add a coastal pause if it suits your route, leaving time for the journey home.' },
    ],
  },
  {
    slug: 'ladakh-under-open-skies', title: 'Ladakh, under open skies', destinationSlug: 'ladakh', duration: '9 days', price: '₹1.1–2.2 lakh',
    description: 'A measured introduction to Leh, the Indus Valley and, when conditions allow, Nubra. Acclimatization comes first, followed by monastery visits and landscapes that deserve an unhurried day.',
    highlights: ['Acclimatization before excursions', 'Indus Valley monasteries with a guide', 'A flexible Nubra Valley chapter'],
    itinerary: [
      { title: 'Days 1–2 · Give Leh time', description: 'Reserve at least the first 48 hours for acclimatization, without higher-altitude excursions or an active sightseeing schedule. Your stay provides the starting point; the road can wait.' },
      { title: 'Days 3–5 · Along the Indus', description: 'Continue with selected monastery visits and village encounters, adapting the pace with your local guide. Keep travel distances manageable and leave space for another quiet morning.' },
      { title: 'Days 6–9 · A wider valley, a flexible return', description: 'Consider Nubra only after acclimatization and confirmation of permits, weather and road access. If conditions change, remain around Leh and the Indus Valley; return to Leh with a buffer before departure.' },
    ],
  },
  {
    slug: 'andaman-an-island-at-your-pace', title: 'An island at your pace', destinationSlug: 'andaman-islands', duration: '8 days', price: '₹1.0–2.0 lakh',
    description: 'A focused Andaman escape with a gentle arrival, a few full days on Swaraj Dweep and space around the ferry crossings. Forest-fringed beaches set the mood; the sea sets the schedule.',
    highlights: ['An easy main-island arrival', 'Long beach days on Swaraj Dweep', 'Considered ferry and flight buffers'],
    itinerary: [
      { title: 'Days 1–2 · Arrive without a rush', description: 'Begin in Sri Vijaya Puram, also known as Port Blair, and settle in before your onward island transfer. Your ferry arrangements follow current schedules and sea conditions.' },
      { title: 'Days 3–6 · Make Swaraj Dweep your base', description: 'Leave time for Radhanagar and other suitable beaches, forest shade and a guided water outing if conditions allow. Choose a few meaningful plans and protect the days between them.' },
      { title: 'Days 7–8 · A considered return', description: 'Travel back to the main island ahead of your onward flight, with a buffer for changing ferry conditions. Enjoy an easy final evening rather than another island connection.' },
    ],
  },
];
