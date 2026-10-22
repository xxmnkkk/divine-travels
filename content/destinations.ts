export type DestinationMotif = 'italy' | 'japan' | 'maldives' | 'greece' | 'morocco' | 'kenya' | 'bali' | 'iceland' | 'india';

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
  {
    slug: 'rajasthan', name: 'Rajasthan', region: 'India', eyebrow: 'Palace courtyards & living craft',
    tagline: 'Behind every courtyard, another story.',
    description: 'The first light on a Jaipur courtyard. An artisan at work in Jodhpur. An evening table overlooking Udaipur’s lakes. We connect Rajasthan’s celebrated cities with the quieter encounters between them, choosing a few thoughtful bases rather than a different hotel every night.',
    interests: ['Culture', 'Food & wine', 'Slow travel'], bestTime: 'October to March is generally more comfortable for city walks and countryside stays. Summer heat and the monsoon change the pace, so we shape travel time and outdoor visits around the season.', duration: '8–12 days', motif: 'india',
    image: '/images/destinations/rajasthan.webp', imageAlt: 'Udaipur’s City Palace glowing beside Lake Pichola at sunset, Rajasthan',
    itinerary: [
      { title: 'Jaipur, beyond the palace gates', description: 'Pair an early heritage visit with the city’s living craft traditions, a local kitchen and time to enjoy your courtyard stay.' },
      { title: 'The lanes and landscapes of Jodhpur', description: 'Explore the old city with a guide, then take a quieter turn into the surrounding countryside without filling every afternoon.' },
      { title: 'An unhurried finish in Udaipur', description: 'Settle beside the lakes for palace stories, independent workshops and slow evenings. Boat outings follow local conditions and availability.' },
    ], seasonSource: { label: 'Rajasthan’s climate and seasons', url: 'https://rtdc.tourism.rajasthan.gov.in/Pages/Besttimetovisit.aspx' },
  },
  {
    slug: 'kerala', name: 'Kerala', region: 'India', eyebrow: 'Backwater light & hillside mornings',
    tagline: 'Follow the water. Find a softer rhythm.',
    description: 'From Fort Kochi’s old lanes to tea country and palm-lined backwaters, Kerala invites a gentler kind of journey. We balance the changing landscapes with local cooking, considered stays and enough time to enjoy the view from the veranda.',
    interests: ['Nature', 'Wellness', 'Slow travel'], bestTime: 'November to February is a useful starting point for a varied Kerala journey. Rain can arrive in other seasons, with heavier monsoon periods affecting roads, boating and coastal plans; the route stays responsive to local conditions.', duration: '7–10 days', motif: 'india',
    image: '/images/destinations/kerala.webp', imageAlt: 'A traditional houseboat cruising palm-lined backwaters in Alappuzha, Kerala',
    itinerary: [
      { title: 'A warm introduction to Kochi', description: 'Walk historic neighborhoods with a local guide, visit small galleries and get to know Kerala through a meal shaped around your tastes.' },
      { title: 'A few days in the hills', description: 'Travel to the Munnar region for tea landscapes, gentle walks and a stay that makes the journey uphill worthwhile. Outings follow the weather.' },
      { title: 'Life beside the backwaters', description: 'Choose a quiet waterside base near Kumarakom or Alappuzha, with a considered boat outing and time simply to watch the day unfold.' },
    ], seasonSource: { label: 'Kerala Tourism’s seasonal travel guidance', url: 'https://www.keralatourism.org/faq/20-things-to-know-before-you-visit-kerala' },
  },
  {
    slug: 'goa', name: 'Goa', region: 'India', eyebrow: 'Village lanes & days by the sea',
    tagline: 'There is more to Goa than a beach day.',
    description: 'A shaded village lane, a family recipe and a long afternoon beside the Arabian Sea. We find your version of Goa, whether that means a quiet southern beach, a small heritage stay or a few days exploring the state’s food and layered history.',
    interests: ['Beach', 'Food & wine', 'Slow travel'], bestTime: 'October to March usually brings a drier setting for coast and village days. The June-to-September monsoon offers a different, greener visit; sea activities and seasonal openings depend on local weather and operating guidance.', duration: '5–8 days', motif: 'india',
    image: '/images/destinations/goa.webp', imageAlt: 'Coconut palms above Cabo de Rama Beach at sunset, South Goa', imageClassName: 'object-[50%_60%]',
    itinerary: [
      { title: 'Arrive into your kind of Goa', description: 'Choose a coastal or village base that suits your pace, with the first afternoon kept free for settling in.' },
      { title: 'Food, homes and local stories', description: 'Meet a guide for heritage lanes and a cooking encounter, leaving room to follow the small places that catch your attention.' },
      { title: 'A few days without a timetable', description: 'Balance beach walks and long lunches with optional outings. Swimming and time on the water always follow current local advice.' },
    ], seasonSource: { label: 'Goa’s weather through the year', url: 'https://goa-tourism.com/weather-of-goa/' },
  },
  {
    slug: 'kashmir', name: 'Kashmir', region: 'India', eyebrow: 'Lake mornings & mountain light',
    tagline: 'Leave room for the light to change.',
    description: 'A quiet morning on Dal Lake, gardens opening into the mountains and a conversation over kahwa. We build Kashmir around a few well-chosen places, combining Srinagar’s waterways and craft with valley stays that give the landscape time to settle around you.',
    interests: ['Nature', 'Culture', 'Slow travel'], bestTime: 'Spring and summer suit gardens and valley days, while autumn brings changing foliage. Winter is a different, snow-dependent journey. Mountain roads, weather and current local advisories shape the final route in every season.', duration: '6–9 days', motif: 'india',
    image: '/images/destinations/kashmir.webp', imageAlt: 'A yellow shikara reflected in Dal Lake beneath hazy mountains, Srinagar',
    itinerary: [
      { title: 'Srinagar, gently introduced', description: 'Settle into a considered stay, explore gardens and craft traditions, and choose a quiet shikara outing when conditions allow.' },
      { title: 'A valley stay with room to pause', description: 'Spend a few days around Pahalgam or another suitable valley base, with guided walks adapted to the season and your preferred pace.' },
      { title: 'A flexible mountain chapter', description: 'Consider Gulmarg or more time near the lake, balancing access, weather and travel time. Keep the last day relaxed before your departure.' },
    ], seasonSource: { label: 'Srinagar’s official seasonal planning guide', url: 'https://srinagar.nic.in/plan-your-visit/' },
  },
  {
    slug: 'ladakh', name: 'Ladakh', region: 'India', eyebrow: 'Monastery walls & open skies',
    tagline: 'A wider horizon. A more considered pace.',
    description: 'Ladakh’s scale asks you to slow down. Begin with time to acclimatize in Leh, then follow the Indus Valley’s monasteries and the landscapes beyond. We favor realistic distances, experienced local guiding and the freedom to change the route when mountain conditions require it.',
    interests: ['Nature', 'Culture', 'Adventure'], bestTime: 'The warmer months, broadly May to September, offer more options for a journey. High passes and roads remain seasonal, so access, permits and weather must be checked. At least the first 48 hours in Leh are reserved for acclimatization before higher-altitude travel.', duration: '8–11 days', motif: 'india',
    image: '/images/destinations/ladakh.webp', imageAlt: 'Snow-dusted mountain peaks near Pangong Lake in Ladakh',
    itinerary: [
      { title: 'Begin with acclimatization in Leh', description: 'Keep at least the first 48 hours free of higher-altitude excursions. Settle into your stay and let the journey begin without a sightseeing schedule.' },
      { title: 'Along the Indus Valley', description: 'Once ready to continue, explore selected monasteries and village landscapes with a local guide, keeping each day deliberately manageable.' },
      { title: 'Beyond Leh, when conditions allow', description: 'Consider Nubra or another suitable extension after acclimatization, subject to permits, weather and road access. Return to Leh with a buffer before flying onward.' },
    ], seasonSource: { label: 'Ladakh’s seasons and travel planning', url: 'https://tourism.ladakh.gov.in/' },
  },
  {
    slug: 'andaman-islands', name: 'Andaman Islands', region: 'India', eyebrow: 'Forest shade & island time',
    tagline: 'A few islands. A little more time.',
    description: 'Clear-water coves, coastal forest and the gentle rhythm of an island stay. We keep an Andaman journey focused, choosing your base carefully and giving ferries, beach days and the weather the space they need. There is no need to collect an island every day.',
    interests: ['Beach', 'Nature', 'Honeymoon'], bestTime: 'October to May is a common starting window for an island journey. Rain and changing sea conditions can affect ferries and water activities in any season, especially around the monsoon; transfers and departure buffers are planned accordingly.', duration: '6–9 days', motif: 'india',
    image: '/images/destinations/andaman-islands.webp', imageAlt: 'Kalapathar Beach framed by coastal trees on Swaraj Dweep in the Andaman Islands',
    itinerary: [
      { title: 'An easy arrival on the main island', description: 'Begin in Sri Vijaya Puram, also known as Port Blair, with time to settle in and an onward ferry plan shaped around your flight.' },
      { title: 'Find your rhythm on Swaraj Dweep', description: 'Make one island your base for forest-fringed beaches, a guided water outing when suitable, and long afternoons without another transfer.' },
      { title: 'Return with room to spare', description: 'Keep the route flexible and allow time on the main island before your onward flight. Ferry schedules and sea conditions take priority over a fixed checklist.' },
    ], seasonSource: { label: 'Andaman Tourism’s island travel guidance', url: 'https://www.andamantourism.gov.in/faq.php' },
  },
];

export const destinationRegions = ['All places', ...Array.from(new Set(destinations.map((destination) => destination.region)))];
export const destinationInterests = ['All interests', ...Array.from(new Set(destinations.flatMap((destination) => destination.interests)))];
