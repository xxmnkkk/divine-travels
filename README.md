# Divine Travels

A bespoke travel consultancy website built with Next.js App Router, TypeScript, Tailwind CSS, GSAP, Framer Motion, and Lenis. The illustrated coast is made from inline SVG, with accessible text and controls above it. All journeys, prices, testimonials, contact details, and service claims should be reviewed as preview content before launch.

## Run locally

Use Node.js **20.9 or later** and npm. A recent supported Node LTS release is recommended.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The first build uses `next/font/google` to obtain Cormorant Garamond and DM Sans; Next then serves those fonts locally. If the build environment cannot reach the font service, add licensed local font files and switch the imports in `app/layout.tsx` to `next/font/local`.

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm run lint` treats warnings as failures. `npm run build` creates the production app; `npm start` serves that build. The inquiry API needs a Next.js server or a host with Next.js route-handler support, so a static-only HTML export will not support submissions. Stop the development server before measuring the production build.

`npm test` runs nine inquiry regression checks plus three calendar checks, including public-host validation behind an internal Next.js bind address, cross-origin rejection, fixed date rules, invalid input, payload limits, the honeypot, and local-date round trips. The tests use synthetic preview data and call the actual route handler.

## Project map

| Path | Purpose |
| --- | --- |
| `app/` | Pages, shared layout, metadata routes, and the inquiry API |
| `components/hero/scene/` | Individual inline SVG scene layers |
| `components/hero/animateScene.ts` | Deferred GSAP scene motion and cleanup |
| `components/layout/` | Navigation, native mobile dialog, footer, newsletter demo, Lenis |
| `components/content/` | Destination and journey cards, filters, illustration motifs, page sections |
| `components/sections/` | Process, stories, statistics, FAQ, and supporting home sections |
| `components/inquiry/` | Three-step inquiry UI and home-page loading boundary |
| `components/ui/` | Custom dropdown and calendar popover controls |
| `components/seo/` | Agency JSON-LD, legal-page layout, illustrated 404 ship |
| `content/` | Typed, editable copy and sample records |
| `lib/inquiry.ts` | Shared client/server form schema and defaults |
| `lib/seo.ts` | Canonical origin, metadata helper, and preview indexing rules |

## Edit copy and records

Copy lives in typed TypeScript files; no CMS or database is required.

| File | Edit here |
| --- | --- |
| `content/site.ts` | Agency identity, placeholder contact details, inner-page copy, shared values |
| `content/home.ts` | Hero text, home section introductions, calls to action |
| `content/layout.ts` | Wordmark labels, navigation, footer, newsletter preview copy |
| `content/destinations.ts` | Eight destinations, regions, interests, seasonal source links, routes, optional photos |
| `content/journeys.ts` | Four sample journeys, indicative INR ranges, highlights, itineraries |
| `content/testimonials.ts` | Five clearly marked illustrative traveler stories |
| `content/faqs.ts` | Eight questions and answers |
| `content/inquiry.ts` | Form copy, destination options, INR budget ranges, interest chips |
| `content/controls.ts` | Calendar labels, hints, and clear/close actions |
| `content/legal.ts` | Privacy/terms preview explanations and 404 text |

Keep destination and journey slugs unique. A journey’s `destinationSlug` must match a destination. These records feed `generateStaticParams` and the sitemap; rebuild after adding, renaming, or removing records. If you add destinations, also update the inquiry options in `content/inquiry.ts` and add an illustration motif or a photograph. Keep all sample-price and placeholder-testimonial notices until the records have been verified.

Palette tokens and typography utilities live in `app/globals.css`; font configuration lives in `app/layout.tsx`. The original water/focus colors remain separate from darker small-text colors where needed for contrast. Keep ink text on gold buttons and recheck contrast after changing tokens.

## Replace destination tiles with photographs

The hero is intentionally an illustration. Destination cards and destination detail pages already have a `next/image` branch and fall back to the SVG motifs while `image` is absent.

1. Place a licensed, optimized photograph in `public/images/destinations/`, for example `italy.webp`.
2. Set `image: '/images/destinations/italy.webp'` on that destination record. Do not include `public` in the URL.
3. Review its crop in both the card and detail view. Images use `fill`, a parent with a fixed aspect ratio, `object-cover`, and responsive `sizes` to prevent layout shifts and unnecessary downloads.
4. Prefer AVIF/WebP originals around 1200–1600 pixels wide for the detail view. Start from a compressed source and inspect visual quality; Next generates responsive output variants. Avoid uploading a full camera original.
5. Replace the generic landscape alternative text with a specific, useful description if the photograph conveys meaningful details. Decorative images can use an empty alternative.

For an external image host, add a narrowly scoped `images.remotePatterns` entry in `next.config.ts` for its actual HTTPS host and path. Local images require no host configuration. Keep below-the-fold card images lazy; reserve `preload` for a genuine above-the-fold image. Journey cards currently use the destination illustration; add an optional typed image field and the same `next/image` pattern if those cards also need photography.

## Inquiry and newsletter status

The form has destination/dates, travel style, and contact steps. React Hook Form retains answers between steps; Zod validates the same data on the client and server. Fixed dates require departure and return, and calendar validity and date order are checked. Budget ranges are in INR per traveler, excluding international flights.

Destination and budget use custom Radix listboxes with keyboard navigation and typeahead. Dates use a custom DayPicker calendar in a Radix popover, with arrow-key navigation, Escape dismissal, and clear actions. The return calendar disables dates before departure. React Hook Form Controllers keep the controls synchronized with validation and error focus. Date-only values are parsed and serialized in the visitor’s local calendar without UTC conversion; the API still receives `YYYY-MM-DD` strings.

On the home page, the form code loads as visitors approach the inquiry section. Its anchor and contact-page fallback are present in the initial HTML. The contact page renders the form directly; destination and journey links prefill the relevant details.

`POST /api/inquiry` currently validates a JSON payload and returns `{ accepted: true, mode: 'demo' }`. It **does not send email, create a CRM lead, or save an inquiry**. The UI states that clearly. The server rejects oversized payloads, invalid origins and invalid fields, quietly accepts the honeypot, and logs only limited trip metadata rather than contact details or notes. Infrastructure request logging is separate and must be reviewed with the eventual host.

To enable real inquiries:

1. Implement the marked email/CRM TODO in `app/api/inquiry/route.ts` using server-only credentials, verified sender details, and the actual agency inbox.
2. Await the provider’s successful response before returning a delivery-confirmation state. Handle provider failures with a retryable error while retaining form answers. Keep the current demo wording until this is verified end to end.
3. Update the API response contract and form success copy together, add delivery/error checks, and define suitable abuse controls for the public deployment.
4. Publish a privacy notice that matches the actual operator, providers, data flow, retention, and contact process. Review the host’s logs and access controls.

The footer newsletter is also a local demo. It performs browser email validation and shows preview copy; no subscription service is connected. Wire a real opt-in service and its status/error behavior before claiming a subscription has been created. Do not collect passport or payment details in either form.

## Motion and accessibility

The hero renders its complete static SVG on the server; the illustration JSX is kept out of the client bundle. A client wrapper dynamically imports GSAP scene code only when motion is permitted. Scene animations are scoped with `gsap.context()`/`gsap.matchMedia()` and reverted on cleanup. An IntersectionObserver pauses scene loops off screen, and scene cleanup disconnects observers and pointer listeners. Fine-pointer parallax is disabled on touch devices; mobile hides extra clouds, planes, distant waves, and glitter, and shows headline copy immediately. Continue animating transform and opacity rather than layout properties.

Lenis runs from the GSAP ticker and forwards scroll updates to ScrollTrigger. Its instance/ticker subscription are destroyed on unmount or a reduced-motion preference change. A generation guard prevents overlapping dynamic imports from creating multiple instances. Keep this cleanup when adding effects.

The mobile navigation uses a native modal `dialog`: the background is inert, focus stays inside, Escape closes it, and focus returns to the menu button. The FAQ uses keyboard-operable controls, inquiry fields have labels and linked errors, and a skip link targets the main landmark. Respect reduced motion in new animations and retain visible keyboard focus styles.

Manual checks after edits:

- Tab through navigation, the mobile menu, accordions, filters, interest chips, form steps, error-summary links, and newsletter. Check Escape and focus restoration in the menu.
- Submit an empty form step, fix the highlighted field, go back, and verify answers remain. Check fixed dates, invalid email, retry behavior, success, and restart.
- Test 360, 390, 768, 1440, and 1920 pixel widths, landscape mobile, 200% zoom, and long labels. Check overflow and date fields on an actual mobile browser.
- Enable reduced motion before loading and change it while the page is open. Confirm the coast remains static and navigation still works.
- Check contrast, landmark/heading order, and screen-reader labels. Automated accessibility tools complement these checks.

## SEO and preview indexing

Set `NEXT_PUBLIC_SITE_URL` to the actual public **origin** of your verified agency domain, beginning with `https://` and without a path. It is public configuration, not a secret. Rebuild after changing it. `lib/seo.ts` supplies the same origin to canonical URLs, Open Graph/Twitter metadata, the sitemap, robots, and TravelAgency JSON-LD.

The shipped `https://divinetravels.example` fallback is a placeholder. `.example` sites and Vercel preview deployments are intentionally `noindex`, and their robots file disallows crawling. With a verified real domain and a production deployment, normal marketing pages become indexable. Review staging controls on other hosting platforms. Privacy and terms preview pages remain `noindex` until replaced with reviewed operational documents and their explicit `noIndex` options are removed; they are excluded from the sitemap for now.

`app/opengraph-image.tsx` generates a 1200×630 branded image without external image/font requests; its renderer uses supported JSX styles rather than Tailwind. `app/icon.svg` provides the favicon. Add verified contact/address details or ratings to the JSON-LD only when they are factual; the current schema deliberately omits placeholder business details and reviews.

## Measure performance before launch

The completed local production checks recorded a **92 mobile performance median** over three Lighthouse runs, **100 desktop performance**, **100 automated accessibility**, and zero layout shift. Settings, behavior checks, preview-indexing context, and bundle measurement limits are recorded in [docs/verification.md](docs/verification.md). Recheck the actual deployment after replacing preview content or adding integrations.

Run a production build and serve it with `npm start`. Test Lighthouse against that server or the intended production host using mobile throttling and at least three runs. Record the median and note the device/network settings. Review the Performance panel for main-thread work, off-screen animation activity, dropped frames, and layout shifts. Check both the static/reduced-motion view and the fully animated view.

The design targets Lighthouse performance of 90+ and an initial hero JavaScript budget under 150 KB, but these are targets, not certified results. Measure compressed, transferred client assets in the production browser Network panel with cache disabled, distinguishing shared libraries from the deferred hero animation chunk. Do not equate total `.next` output or server bundles with the JavaScript a visitor downloads. Re-measure when adding libraries, photos, or new scene effects.

## Launch checklist

- Set and verify the canonical production domain and hosting environment; check canonical, robots, sitemap, icon, OG image, and social previews on the final host.
- Replace placeholder email/phone, establishment year if necessary, agency identity, operating details, and any unverified support or flexibility claims.
- Replace illustrative reviews with approved real accounts, or retain their visible placeholder labels. Confirm every price, route, season, inclusion, and source link.
- Connect and verify email/CRM delivery and newsletter opt-in. Remove demo claims only after the underlying behavior changes.
- Publish reviewed privacy and booking terms matching actual operations, and update their indexing options.
- Run lint, typecheck, build, responsive/keyboard/reduced-motion checks, API failure checks, accessibility checks, and production performance measurements.
- Confirm photo licenses, final copy, sender credentials, monitoring, deployment logs, and the support process.

No service credentials, live offers, or real customer data are included in this project.
