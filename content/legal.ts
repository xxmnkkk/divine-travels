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
  description: "How this website currently handles the details sent through its trip inquiry form.",
  notice: "Preview information, not legal advice or a complete agency privacy notice. The operator must confirm its identity, providers, retention practices, and request procedures before treating this as its operational notice.",
  sections: [
    {
      title: "Sending a trip inquiry",
      paragraphs: ["The inquiry form sends your destination, preferred dates and flexibility, traveler count, budget, interests, name, email, and any phone number or notes you provide to this website’s server for validation. Valid requests are emailed through Gmail’s SMTP service to the inbox configured by the operator.", "A success message appears only after the email provider accepts the message for that inbox. This does not confirm inbox placement, that a consultant has read it, or that any travel arrangements are booked. The website does not send an automatic confirmation email to you."],
    },
    {
      title: "Email handling and storage",
      paragraphs: ["The trip brief is included in one inbox email, with plain-text and HTML versions. It is sent from the authenticated sending account, with your email address set as the reply address so the team can respond to you. This application does not save inquiries in an application database or send them to a CRM.", "Messages may be retained in sending and receiving mailboxes or other email-provider systems. The agency’s mailbox access, provider practices, and retention process need to be confirmed by the operator. This website does not establish or promise a deletion period."],
    },
    {
      title: "Details in your browser",
      paragraphs: ["Your answers remain in the form as you move between its steps and if sending fails so you can retry. This project does not use browser storage to retain your trip brief after the form is reset or the page is reloaded. Please avoid entering passport, payment, or other sensitive information in your trip brief."],
    },
    {
      title: "Technical information",
      paragraphs: ["No analytics or advertising integration is configured in this project. Hosting and email providers may keep technical records, and external websites linked from this site operate independently. Actual hosting, mail-provider practices, access controls, and logging must be reviewed and documented by the operator."],
    },
    {
      title: "Questions and the operational notice",
      paragraphs: ["A reviewed operational notice needs to reflect the operator, the purpose of handling inquiries, its actual service providers, retention practices, and applicable choices or request procedures. This preview does not verify those arrangements. To ask about your inquiry or contact Divines Travels directly, use the email address or phone number published on this website."],
    },
  ],
};

export const termsContent: LegalPageContent = {
  eyebrow: "A NOTE ABOUT THIS PREVIEW",
  title: "A clear starting point.",
  description: "The status of this website, its sample journeys, and requests to discuss a trip.",
  notice: "Preview information, not legal advice or a completed set of agency booking terms. Confirm and review the operator’s actual policies before accepting bookings.",
  sections: [
    {
      title: "An invitation to imagine",
      paragraphs: ["This website presents Divines Travels as a bespoke travel consultancy. Journeys, brand story, and traveler accounts include sample material. Testimonials are illustrative placeholders, rather than verified customer reviews."],
    },
    {
      title: "Sample routes and prices",
      paragraphs: ["The routes, durations, seasonal notes, and prices are planning examples. They do not constitute a confirmed quote, live availability, or a reservation. Sample prices are in Indian rupees per person, usually based on two sharing, with flights, visas, and insurance excluded unless an eventual proposal states otherwise.", "A live agency would confirm suitability, availability, inclusions, accommodation, transport, and the final itinerary with you before a booking is made."],
    },
    {
      title: "Inquiries and bookings",
      paragraphs: ["The inquiry form emails your validated trip brief to the operator’s configured inbox. Its success state means the email provider accepted the message for that inbox; it does not confirm that a consultant has read it, a response time, a quote, or a reservation. No automatic confirmation email is sent to the traveler.", "The website does not accept payments or confirm bookings. Sending an inquiry starts a request for a conversation; any proposal, availability, price, and booking conditions must be confirmed separately with the agency."],
    },
    {
      title: "Details to confirm before booking",
      paragraphs: ["The operator’s published booking terms must explain its role, the relevant travel suppliers, payment schedule, changes, cancellation and refund arrangements, support process, insurance responsibilities, and other applicable conditions. These policies must reflect the agency’s actual operations and be reviewed before launch."],
    },
    {
      title: "Further reading and contact",
      paragraphs: ["Links to official tourism guidance are provided for background reading. Check current entry requirements, travel conditions, and supplier terms when planning a real journey. You can send a trip inquiry through the form or contact Divines Travels using the email address and phone number published on this website."],
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
