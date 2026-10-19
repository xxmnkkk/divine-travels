import { site } from "./site";

export const home = {
  hero: {
    eyebrow: `BESPOKE JOURNEYS · EST. ${site.established}`,
    lineOne: "Journeys,",
    emphasis: "beautifully",
    lineTwo: " planned.",
    description: "Thoughtfully crafted escapes. Local insight. Every detail, uniquely yours.",
    primary: "Plan my trip",
    secondary: "Explore destinations",
    annotation: "A little further from ordinary",
    scroll: "A world waiting for you",
  },
  trust: ["Personally planned", "Local expertise", "24/7 on-trip support", "Flexible possibilities"],
  destinations: { eyebrow: "THE WORLD, YOUR WAY", title: "Where will your curiosity ", emphasis: "take you?", description: "Some places stay with you. Let’s find yours.", link: "Explore all destinations" },
  process: {
    eyebrow: "A THOUGHTFUL WAY TO TRAVEL",
    title: "Your dream. Our expertise. ", emphasis: "One beautiful journey.",
    description: "From the first conversation to the last sunset, we take care of the details that make a trip yours.",
    steps: [
      { title: "Tell us your dream", description: "A place you’ve always imagined. A feeling you’re chasing. We start by listening." },
      { title: "Meet your consultant", description: "One real person, with the knowledge and curiosity to understand your kind of travel." },
      { title: "Make it your own", description: "We shape a personal itinerary together, refining every detail until it feels just right." },
      { title: "Go, with peace of mind", description: "Settle into the moment. Your consultant and local team are only a call away." },
    ],
  },
  journeys: { eyebrow: "A LITTLE INSPIRATION", title: "Extraordinary places. ", emphasis: "Your kind of pace.", description: "A few thoughtfully imagined journeys. Each one is a starting point, never a set itinerary.", link: "View all journeys", note: "Illustrative itineraries and guide prices, per person. Your final quote is tailored to your dates and preferences." },
  why: {
    eyebrow: "THE DIVINE DIFFERENCE", title: "The luxury of feeling ", emphasis: "understood.",
    description: "Travel should feel like an extension of who you are. The slow mornings. The unexpected detours. The little place you’d never have found alone.",
    second: "We bring a human touch to every journey, connecting your ideas with people who know a place by heart. Nothing rushed. Nothing off the shelf.",
    link: `Get to know ${site.name}`,
    note: "Considered in every detail.",
    values: [ {title:"Your own travel consultant",description:"One person who gets to know you, from the very first hello."}, {title:"People, not just places",description:"Local knowledge that opens the door to a more personal experience."}, {title:"Room to be you",description:"A journey shaped around your taste, budget, and natural rhythm."}, {title:"Thoughtful from start to finish",description:"Care that travels with you, wherever the day takes you."} ],
  },
  journal: {
    caption: "Somewhere that feels like you.",
    brand: site.name.toUpperCase(),
    title: "A journey, just for you.",
    details: "YOUR PACE \u00a0 · \u00a0 YOUR PEOPLE \u00a0 · \u00a0 YOUR PLACE",
  },
  stories: { eyebrow: "MOMENTS THAT STAY", title: "A journey is personal. ", emphasis: "So are the stories.", disclaimer: "Illustrative traveler stories · Placeholder testimonials for design preview", link: "Read more stories" },
  stats: [ { value:8,suffix:"",label:"Destinations to discover" }, { value:4,suffix:"",label:"Journeys to make your own" }, { value:1,suffix:"",label:"Dedicated point of contact" } ],
  faq: { eyebrow:"A FEW THINGS TO KNOW",title:"A little clarity, ",emphasis:"before you go.",description:"Every journey starts with a conversation. Here are a few answers to get you started.",link:"Have another question?" },
};
