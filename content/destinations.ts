export type DestinationMotif = 'italy' | 'japan' | 'maldives' | 'greece' | 'morocco' | 'kenya' | 'bali' | 'iceland';

export interface ItineraryStep {
  title: string;
  description: string;
}

export interface Destination {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  eyebrow: string;
  interests: string[];
  bestTime: string;
  duration: string;
  motif: DestinationMotif;
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
  itinerary: ItineraryStep[];
  seasonSource: { label: string; url: string };
}

export const destinations: Destination[] = [
  {
    slug: 'italy', name: 'Italy', region: 'Europe', eyebrow: 'Art, appetite & the art of living',
    tagline: 'A little less hurry. A little more Italy.',
    description: 'An early walk through quiet Roman streets. A long lunch beneath Tuscan olive trees. A small boat waiting on the coast. We connect the Italy you have imagined with the places, people and pauses that make it your own.',
    interests: ['Culture', 'Food & wine', 'Slow travel'], bestTime: 'Spring and autumn are lovely starting points for city and countryside journeys. We tailor the timing to your region and interests.', duration: '10–14 days', motif: 'italy',
    image: '/images/destinations/italy.webp', imageAlt: 'Pastel buildings and a tiled church dome above the coast in Positano, Italy', imageClassName: 'object-[50%_65%]',
    itinerary: [
      { title: 'Rome, at your pace', description: 'Settle into a small hotel, explore ancient streets with a private guide and leave an afternoon free for a neighborhood café.' },
      { title: 'The Tuscan countryside', description: 'Trade the city for hill towns, a countryside kitchen and unhurried evenings among the vines.' },
      { title: 'A coastal close', description: 'Finish beside the water, with time for a boat outing, a market visit or simply a table with a view.' },
    ], seasonSource: { label: 'Italy through the seasons', url: 'https://www.italia.it/en/italy/seasons' },
  },
  {
    slug: 'japan', name: 'Japan', region: 'Asia', eyebrow: 'Quiet rituals & new perspectives',
    tagline: 'Find wonder in the smallest details.',
    description: 'From the energy of Tokyo to the stillness of a garden in Kyoto, Japan rewards a thoughtful route. We make room for the celebrated sights and the small encounters: a family-run workshop, an intimate meal, a night in a ryokan.',
    interests: ['Culture', 'Food & wine', 'Nature'], bestTime: 'Spring and autumn offer distinctive seasonal color. Winter and summer bring their own rewards; we plan around your preferred places and pace.', duration: '12–16 days', motif: 'japan',
    image: '/images/destinations/japan.webp', imageAlt: 'A pagoda framed by cherry blossoms in Kyoto, Japan',
    itinerary: [
      { title: 'Tokyo, neighborhood by neighborhood', description: 'Meet the city through a local guide, independent shops and a food walk shaped around your tastes.' },
      { title: 'A mountain interlude', description: 'Take a slower turn with a ryokan stay, regional cooking and time to enjoy the landscape.' },
      { title: 'Kyoto, beyond the postcard', description: 'Pair temple gardens and historic lanes with an artisan visit and an afternoon without a schedule.' },
    ], seasonSource: { label: 'Japan through the seasons', url: 'https://www.japan.travel/en/gc/when-to-go/' },
  },
  {
    slug: 'maldives', name: 'Maldives', region: 'Indian Ocean', eyebrow: 'Barefoot days & open horizons',
    tagline: 'An island, chosen just for you.',
    description: 'Some islands are made for shared family days. Others suit a quiet escape for two. We look beyond the water villa to find your right fit, considering reef access, dining, transfers and the rhythm you want from each day.',
    interests: ['Beach', 'Honeymoon', 'Wellness'], bestTime: 'December to April is typically drier. Ocean conditions and seasonal experiences vary by atoll, so your island and timing belong in the same conversation.', duration: '5–8 days', motif: 'maldives',
    image: '/images/destinations/maldives.webp', imageAlt: 'Overwater villas linked by a curved wooden walkway in a turquoise Maldivian lagoon',
    itinerary: [
      { title: 'Arrive, and exhale', description: 'A carefully coordinated island transfer leaves space to settle in, dip into the lagoon and watch the light change.' },
      { title: 'Your own island rhythm', description: 'Balance guided reef time, a spa ritual and a quiet sailing excursion with days that ask nothing of you.' },
      { title: 'One last slow morning', description: 'Plan a gentle departure around your onward flight, with all transfer details considered ahead of time.' },
    ], seasonSource: { label: 'Maldives destination guide', url: 'https://visitmaldives.s3.amazonaws.com/0wNb5ewA/9quw9cju.pdf' },
  },
  {
    slug: 'greece', name: 'Greece', region: 'Europe', eyebrow: 'Island light & timeless stories',
    tagline: 'Follow the light, leave room for the day.',
    description: 'A thoughtful Greek journey balances discovery with ease. Begin among the stories of Athens, then find an island whose character suits you: village walks, a sheltered swim and a long, generous lunch beside the sea.',
    interests: ['Beach', 'Culture', 'Slow travel'], bestTime: 'Late spring and early autumn are appealing for an island journey. Sailing schedules, sea conditions and seasonal openings help shape your final route.', duration: '8–12 days', motif: 'greece',
    image: '/images/destinations/greece.webp', imageAlt: 'A blue-domed church and whitewashed buildings in Santorini, Greece', imageClassName: 'object-[50%_25%]',
    itinerary: [
      { title: 'A considered start in Athens', description: 'Explore the city with a private guide, from ancient landmarks to the food shops of a lived-in neighborhood.' },
      { title: 'An island with your name on it', description: 'Choose a base for village wandering, hidden coves and a relaxed day on the water.' },
      { title: 'Stay a little longer', description: 'Leave a few days open for a cooking visit, a second island or the simple pleasure of returning to a favorite beach.' },
    ], seasonSource: { label: 'Explore the seasons in Greece', url: 'https://www.visitgreece.gr/en' },
  },
  {
    slug: 'morocco', name: 'Morocco', region: 'Africa', eyebrow: 'Craft, color & a slower welcome',
    tagline: 'Let the journey unfold, one doorway at a time.',
    description: 'Behind a quiet medina doorway, another world opens. Follow Morocco from courtyard gardens and artisan workshops to mountain villages and broad desert skies, with thoughtful hosts to bring each place into focus.',
    interests: ['Culture', 'Adventure', 'Food & wine'], bestTime: 'Spring and autumn are useful starting points, especially when combining cities with the interior. Mountains, coast and desert each call for their own timing.', duration: '8–12 days', motif: 'morocco',
    image: '/images/destinations/morocco.webp', imageAlt: 'Golden sand dunes and a desert camp near Merzouga, Morocco',
    itinerary: [
      { title: 'The medina, with a local', description: 'Stay in a considered riad and discover the craft, food and everyday rituals behind the city’s intricate lanes.' },
      { title: 'An Atlas Mountains pause', description: 'Spend a few days in the foothills, sharing a meal with your hosts and walking at a comfortable pace.' },
      { title: 'A change of horizon', description: 'Choose the Atlantic coast or a longer desert route, with travel time balanced carefully against time to enjoy being there.' },
    ], seasonSource: { label: 'Morocco’s climate and seasons', url: 'https://www.visitmorocco.com/en/climate-and-seasons' },
  },
  {
    slug: 'kenya', name: 'Kenya', region: 'Africa', eyebrow: 'Wild spaces & thoughtful encounters',
    tagline: 'Time in the wild. A different sense of scale.',
    description: 'Dawn on the savannah has a way of changing your perspective. We pair carefully chosen camps with experienced local guides and a sensible pace, creating room for wildlife, learning and the simple quiet of the landscape.',
    interests: ['Wildlife', 'Nature', 'Adventure'], bestTime: 'Drier periods, often July to October and December to March, are popular for wildlife journeys. Rainfall and wildlife movement vary; sightings are never guaranteed.', duration: '8–12 days', motif: 'kenya',
    image: '/images/destinations/kenya.webp', imageAlt: 'Elephants grazing among lush green vegetation in Tsavo West, Kenya',
    itinerary: [
      { title: 'A gentle arrival in Nairobi', description: 'Recover from your flight before moving into the bush, with an introduction to the city if time allows.' },
      { title: 'Days shaped by the landscape', description: 'Enjoy guided game drives and quiet camp time, with activities tailored to the reserve and your interests.' },
      { title: 'A final change of pace', description: 'Add a second landscape for a different perspective, or finish with unhurried days on the Kenyan coast.' },
    ], seasonSource: { label: 'Kenya: when to visit', url: 'https://magicalkenya.com/download/4057/?tmstv=1733480802' },
  },
  {
    slug: 'bali', name: 'Bali', region: 'Asia', eyebrow: 'Island rituals & gentle days',
    tagline: 'A softer pace, from hillside to sea.',
    description: 'Bali is most rewarding when there is room to notice it. A temple offering on a morning walk. The sound of water through rice terraces. A family kitchen. We pair those small encounters with stays that give you space to unwind.',
    interests: ['Wellness', 'Beach', 'Culture'], bestTime: 'April to October is generally the drier season. Conditions differ between the coast and uplands, and a rewarding journey can be planned across the year.', duration: '8–12 days', motif: 'bali',
    image: '/images/destinations/bali.webp', imageAlt: 'Lush rice terraces and palms in Tegallalang, Bali',
    itinerary: [
      { title: 'Begin in the green heart', description: 'Settle near Ubud with guided village walks, an artisan visit and time for a restorative treatment.' },
      { title: 'Take the scenic way', description: 'Travel through the quieter countryside with stops for local cooking and the landscapes that interest you.' },
      { title: 'Days by the Indian Ocean', description: 'Finish at a coastal stay chosen for your kind of beach time, from long lunches to a first surf lesson.' },
    ], seasonSource: { label: 'Indonesia’s weather and seasons', url: 'https://www.indonesia.travel/us/en/general-information/weather-climate-seasons' },
  },
  {
    slug: 'iceland', name: 'Iceland', region: 'Europe', eyebrow: 'Elemental landscapes & open roads',
    tagline: 'A journey with room for the unexpected.',
    description: 'Waterfalls, volcanic coastlines and wide skies make Iceland feel wonderfully unfamiliar. We build a realistic route around the season, giving each landscape the time it deserves and leaving flexibility for the weather.',
    interests: ['Nature', 'Adventure', 'Wellness'], bestTime: 'Summer brings longer days and broader access. Winter offers a different, more weather-dependent journey; northern lights and road access cannot be promised.', duration: '7–10 days', motif: 'iceland',
    image: '/images/destinations/iceland.webp', imageAlt: 'Skógafoss waterfall cascading between green cliffs in Iceland',
    itinerary: [
      { title: 'Reykjavík and a warm welcome', description: 'Arrive gently, with time for the harbor, a good meal and a geothermal soak.' },
      { title: 'Along the south coast', description: 'Follow a considered route past waterfalls and volcanic shores, accompanied by a guide who knows the changing conditions.' },
      { title: 'A quieter final chapter', description: 'Explore a less hurried corner of the country, with flexible days for walking, photography and rest.' },
    ], seasonSource: { label: 'Iceland through the seasons', url: 'https://www.visiticeland.com/article/iceland-in-the-summer/' },
  },
];

export const destinationRegions = ['All places', ...Array.from(new Set(destinations.map((destination) => destination.region)))];
export const destinationInterests = ['All interests', ...Array.from(new Set(destinations.flatMap((destination) => destination.interests)))];
