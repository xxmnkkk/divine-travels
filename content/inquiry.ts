export const inquiryDestinations = [
  { value: "italy", label: "Italy" },
  { value: "japan", label: "Japan" },
  { value: "maldives", label: "Maldives" },
  { value: "greece", label: "Greece" },
  { value: "morocco", label: "Morocco" },
  { value: "kenya", label: "Kenya" },
  { value: "bali", label: "Bali" },
  { value: "iceland", label: "Iceland" },
  { value: "open", label: "I’m open to ideas" },
] as const;

export const inquiryBudgets = [
  { value: "under-2-lakh", label: "Under ₹2 lakh" },
  { value: "2-4-lakh", label: "₹2–4 lakh" },
  { value: "4-6-lakh", label: "₹4–6 lakh" },
  { value: "6-10-lakh", label: "₹6–10 lakh" },
  { value: "10-lakh-plus", label: "₹10 lakh+" },
  { value: "discuss", label: "I’d like some guidance" },
] as const;

export const inquiryInterests = [
  "Culture & history",
  "Food & wine",
  "Beach & island",
  "Wildlife & nature",
  "Art & design",
  "Rest & wellbeing",
  "Adventure",
  "Celebrations",
] as const;

export const inquiryContent = {
  eyebrow: "YOUR NEXT CHAPTER",
  heading: "Every memorable journey starts with",
  headingEmphasis: "a conversation.",
  description:
    "A place you’ve always imagined. A feeling you want to find. Tell us what’s on your mind, and start shaping a journey around you.",
  promises: [
    { title: "Your pace, your priorities", text: "Room for the things you love. Space to simply be." },
    { title: "Thoughtful from the start", text: "A few details help bring your travel ideas into focus." },
  ],
  asideNote: "A little inspiration is all you need to begin.",
  steps: ["Where & when", "Your travel style", "A few final details"],
  requiredNote: "Fields marked * are required.",
  destination: { label: "Where would you like to go?", placeholder: "Choose a destination" },
  flexibility: {
    label: "How are your dates looking?",
    options: [
      { value: "flexible", label: "A little flexible" },
      { value: "fixed", label: "Dates are set" },
      { value: "deciding", label: "Still dreaming" },
    ],
    hint: "Approximate dates are welcome. Leave them blank if you’re still deciding.",
  },
  departureDate: "Departure date",
  returnDate: "Return date",
  travelers: { label: "How many are traveling?", hint: "Include adults and children (up to 24 travelers)." },
  budget: {
    label: "Your budget, per traveler",
    placeholder: "Choose a comfortable range",
    hint: "In Indian rupees, excluding international flights. A starting point, with room to refine.",
  },
  interests: { label: "What draws you in?", hint: "Choose any that feel like you. Optional." },
  name: { label: "Your name", placeholder: "First and last name" },
  email: { label: "Email address", placeholder: "you@example.com" },
  phone: { label: "Phone number", placeholder: "+91 98765 43210", optional: "Optional" },
  notes: {
    label: "Anything else we should know?",
    placeholder: "A special occasion, a favorite kind of stay, or a small detail that would make the journey yours…",
    hint: "Optional · up to 2,000 characters",
  },
  honeypot: "Leave this field empty",
  back: "Back",
  next: "Continue",
  submit: "Create my trip brief",
  submitting: "Preparing your brief…",
  demoNote: "Preview form: your brief is validated here. It is not sent to a consultant.",
  privacyNote: "Please leave out passport, payment, and other sensitive details.",
  errorHeading: "A little more detail, please",
  networkError: "We couldn’t prepare your brief. Please try again. Your details are still here.",
  serverError: "Please review your details and try again. Your brief has not been submitted.",
  success: {
    eyebrow: "A BEAUTIFUL BEGINNING",
    title: "Your trip brief is ready.",
    description:
      "Thank you for sharing a little of your travel story. This is a working preview: your details were validated, but have not been emailed or shared with a travel consultant.",
    destination: "Your destination",
    travelers: "Travelers",
    open: "Open to inspiration",
    restart: "Start a new brief",
  },
} as const;
