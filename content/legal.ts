export type LegalPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  notice: string;
  sections: readonly { title: string; paragraphs: readonly string[] }[];
};

export const privacyContent: LegalPageContent = {
  eyebrow: "A NOTE ABOUT THIS PREVIEW",
  title: "Your details, thoughtfully considered.",
  description: "How the demonstration website currently handles the information entered here.",
  notice: "Preview information only. A complete agency privacy notice must be published before live inquiries or bookings are enabled.",
  sections: [
    {
      title: "The trip planning preview",
      paragraphs: ["The inquiry form sends the details you enter to this website’s server for validation. The current implementation does not save them to an application database, email them, or pass them to a consultant or CRM. The confirmation is a demonstration, rather than confirmation of a service request.", "To help check that the demonstration works, the server logs limited trip information: destination, traveler count, budget range, number of interests, and whether dates were provided. The application does not intentionally log names, email addresses, phone numbers, or notes."],
    },
    {
      title: "Details in your browser",
      paragraphs: ["Your answers remain in the form as you move between its steps. This project does not use browser storage to retain your trip brief after the form is reset or the page is reloaded. Please avoid entering passport, payment, or other sensitive information in this preview."],
    },
    {
      title: "Technical information",
      paragraphs: ["No analytics or advertising integration is configured in this project. Hosting providers may keep technical request logs, and external websites linked from this site operate independently. Actual hosting and provider practices must be documented by the operator before launch."],
    },
    {
      title: "Before the agency goes live",
      paragraphs: ["The published notice will need to identify the operator, data purposes, service providers, retention practices, and applicable choices or request procedures. Those operational details must be confirmed before live form submissions are enabled. To contact Divines Travels directly, use the email address or phone number published on this website."],
    },
  ],
};

export const termsContent: LegalPageContent = {
  eyebrow: "A NOTE ABOUT THIS PREVIEW",
  title: "A clear starting point.",
  description: "The status of this website, its sample journeys, and the planning preview.",
  notice: "This page explains the demonstration. It is not a completed set of agency booking terms. Confirm the operator’s actual policies before accepting live bookings.",
  sections: [
    {
      title: "An invitation to imagine",
      paragraphs: ["This website presents Divines Travels as a bespoke travel consultancy. Journeys, brand story, and traveler accounts include sample material. Testimonials are illustrative placeholders, rather than verified customer reviews."],
    },
    {
      title: "Sample routes and prices",
      paragraphs: ["The routes, durations, seasonal notes, and prices are planning examples. They do not constitute a confirmed quote, live availability, or a reservation. Sample prices are in Indian rupees per person, usually based on two sharing, with international flights, visas, and insurance excluded unless an eventual proposal states otherwise.", "A live agency would confirm suitability, availability, inclusions, accommodation, transport, and the final itinerary with you before a booking is made."],
    },
    {
      title: "No bookings through this preview",
      paragraphs: ["The website does not accept payments or confirm bookings. The inquiry form validates a demonstration trip brief; it does not deliver a request to a consultant."],
    },
    {
      title: "Details to confirm before booking",
      paragraphs: ["The operator’s published booking terms must explain its role, the relevant travel suppliers, payment schedule, changes, cancellation and refund arrangements, support process, insurance responsibilities, and other applicable conditions. These policies must reflect the agency’s actual operations and be reviewed before launch."],
    },
    {
      title: "Further reading and contact",
      paragraphs: ["Links to official tourism guidance are provided for background reading. Check current entry requirements, travel conditions, and supplier terms when planning a real journey. For a service request, call or email Divines Travels directly; the website’s trip planner is still a demonstration."],
    },
  ],
};

export const notFoundContent = {
  eyebrow: "A SMALL DETOUR · 404",
  title: "A little off the chart.",
  description: "This page has drifted beyond the horizon. There are still plenty of beautiful places to begin.",
  home: "Back to the beginning",
  destinations: "Explore destinations",
} as const;

export const legalNavigation = { home: "Back to Divines Travels", privacy: "Privacy preview", terms: "Terms preview" } as const;
