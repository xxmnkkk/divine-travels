export interface Testimonial {
  name: string;
  initials: string;
  trip: string;
  quote: string;
  rating: number;
}

// Illustrative copy for design review. Replace with verified traveler reviews before launch.
export const testimonials: Testimonial[] = [
  { name: 'Ananya & Rohan', initials: 'AR', trip: 'A slow journey through Italy', quote: 'There was space to be spontaneous, yet every detail that mattered had been thought through. It felt like a trip made by someone who knew us.', rating: 5 },
  { name: 'Meera S.', initials: 'MS', trip: 'Japan, three generations together', quote: 'Our family travels at three different speeds. The itinerary somehow made room for all of us, with thoughtful guides and time to simply be together.', rating: 5 },
  { name: 'Kavya & Dev', initials: 'KD', trip: 'An island escape in the Maldives', quote: 'Choosing the island was the part we found overwhelming. Our consultant asked the right questions and helped us find the quiet, easy week we had hoped for.', rating: 5 },
  { name: 'Arjun P.', initials: 'AP', trip: 'A first safari in Kenya', quote: 'The smaller camp and the time with our guide made the difference. We came home with a new perspective, and a wish to return.', rating: 5 },
  { name: 'Nisha & family', initials: 'NF', trip: 'Bali, from the hills to the sea', quote: 'The little moments stayed with us: a morning walk, a shared meal, an afternoon without plans. The whole journey had a lovely sense of balance.', rating: 5 },
];

export const testimonialDisclaimer = 'Illustrative stories · Placeholder testimonials for design preview. These are not verified customer reviews.';
