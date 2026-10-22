# Divines Travels

A bespoke travel consultancy website built with Next.js App Router, TypeScript, Tailwind CSS, GSAP, Framer Motion, and Lenis. The illustrated coast is made from inline SVG, with accessible text and controls above it. Eight real destination photographs accompany the travel collection. Journeys, prices, testimonials, and service claims should still be reviewed as preview content before launch.

## Identity and contact

The brand is **Divines Travels**, using a transparent cutout of the supplied gold logo at `public/images/brand/divines-travels-transparent.png`. The original upload is preserved at `public/images/brand/divines-travels.png`. `components/layout/Brand.tsx` presents the logo alone in navigation and the footer, without a background or adjacent text wordmark. The favicon and social image use the same transparent artwork.

The provided contact details are [info@divinestravels.com](mailto:info@divinestravels.com) and [+91 88265 61219](tel:+918826561219). `content/site.ts` is the source for these details. The footer and contact page expose working email/telephone links. No postal address or location row is displayed. The footer contains brand, navigation, and contact information without a signup form.

The website’s inquiry form also sends a trip brief to the configured agency inbox through Gmail SMTP. The sending account and recipient are server configuration; they do not change the public contact details automatically.

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

`npm test` runs inquiry and calendar regression checks, including public-host validation behind an internal Next.js bind address, cross-origin rejection, fixed date rules, invalid input, payload limits, the honeypot, and local-date round trips. Use synthetic data and a mocked transport for automated mail checks; a real SMTP send is a separate integration check.

## Project map

| Path | Purpose |
| --- | --- |
| `app/` | Pages, shared layout, metadata routes, and the inquiry API |
| `components/hero/scene/` | Individual inline SVG scene layers |
| `components/hero/animateScene.ts` | Deferred GSAP scene motion and cleanup |
| `components/layout/` | Supplied logo variants, navigation, native mobile dialog, footer, Lenis |
| `components/content/` | Destination and journey cards, filters, illustration motifs, page sections |
| `components/sections/` | Process, stories, statistics, FAQ, and supporting home sections |
| `components/inquiry/` | Three-step inquiry UI and home-page loading boundary |
| `components/ui/` | Custom dropdown and calendar popover controls |
| `components/seo/` | Agency JSON-LD, legal-page layout, illustrated 404 ship |
| `content/` | Typed, editable copy and sample records |
| `lib/inquiry.ts` | Shared client/server form schema and defaults |
| `lib/seo.ts` | Canonical origin, metadata helper, and preview indexing rules |
| `public/images/brand/` | Supplied Divines Travels logo |
| `public/images/destinations/` | Eight optimized, locally hosted WebP destination photographs |
| `docs/photography.md` | Photographer credits, source pages, license record, and image descriptions |

## Edit copy and records

Copy lives in typed TypeScript files; no CMS or database is required.

| File | Edit here |
| --- | --- |
| `content/site.ts` | Agency identity, provided contact details, inner-page copy, shared values |
| `content/home.ts` | Hero text, home section introductions, calls to action |
| `content/layout.ts` | Brand labels, navigation, footer, email/telephone labels and links |
| `content/destinations.ts` | Eight destinations, regions, interests, seasonal sources, routes, photographs, alt text, crops |
| `content/journeys.ts` | Four sample journeys, indicative INR ranges, highlights, itineraries |
| `content/testimonials.ts` | Five clearly marked illustrative traveler stories |
| `content/faqs.ts` | Eight questions and answers |
| `content/inquiry.ts` | Form copy, destination options, INR budget ranges, interest chips |
| `content/controls.ts` | Calendar labels, hints, and clear/close actions |
| `content/legal.ts` | Privacy/terms preview explanations and 404 text |

Keep destination and journey slugs unique. A journey’s `destinationSlug` must match a destination. These records feed `generateStaticParams` and the sitemap; rebuild after adding, renaming, or removing records. If you add destinations, also update the inquiry options in `content/inquiry.ts` and add an illustration motif or a photograph. Keep all sample-price and placeholder-testimonial notices until the records have been verified.

Palette tokens and typography utilities live in `app/globals.css`; font configuration lives in `app/layout.tsx`. The original water/focus colors remain separate from darker small-text colors where needed for contrast. Keep ink text on gold buttons and recheck contrast after changing tokens.

## Maintain destination photography

All eight destinations now have real photographs in `public/images/destinations/`. Their official Unsplash source pages, photographers, license checks, and descriptions are recorded in [docs/photography.md](docs/photography.md). The optimized WebP assets total approximately **1.29 MB**, with a maximum image edge of 1,600 pixels. They are hosted locally; visitors do not need to request the photos from Unsplash. The hero remains an illustration.

Destination cards and detail pages use `next/image`. Home-page destination photos mount within 400 pixels of the viewport through `DeferredMedia`, avoiding the browser’s much larger native lazy-loading range while preserving image slots and a no-JavaScript fallback. Journey cards and journey detail pages reuse their linked destination’s photograph. If a record has no `image`, the existing SVG motif remains the fallback.

When replacing or adding a photo:

1. Choose an accurate image of the destination, verify its source and applicable license, and update `docs/photography.md` with the photographer, original page, location, and license record. Keep the attribution trail with the asset. Photographs of properties do not imply a partnership or endorsement.
2. Optimize the source before saving it under `public/images/destinations/`. Use WebP or AVIF, keep the longest edge around 1,600 pixels for these layouts, remove unnecessary metadata, and inspect the result at its displayed size. Avoid committing full camera originals. Next generates further responsive output sizes.
3. Update the destination’s `image`, `imageAlt`, and, where needed, `imageClassName` in `content/destinations.ts`. A local path looks like `/images/destinations/italy.webp`; omit `public` from the URL. Describe the actual image rather than using generic landscape text. Journey-card images are decorative duplicates of their linked content and deliberately have empty alt text.
4. Review the crop in destination cards, destination details, journey cards, and journey details at mobile and desktop widths. An `imageClassName` such as `object-[50%_65%]` can preserve the important subject. Keep fixed parent aspect ratios, `fill`, `object-cover`, and accurate responsive `sizes` to prevent layout shifts and oversized transfers.
5. Keep below-the-fold cards lazy. Only give an actual above-the-fold detail image high fetch priority; do not preload every tile. Recheck the production Network panel and Lighthouse after changing imagery.

Local photos require no remote image-host configuration. If switching to an external host, add a narrowly scoped `images.remotePatterns` entry in `next.config.ts` for its actual HTTPS host and path.

## Inquiry delivery and server configuration

The form has destination/dates, travel style, and contact steps. React Hook Form retains answers between steps; Zod validates the same data on the client and server. Fixed dates require departure and return, and calendar validity and date order are checked. Budget ranges are in INR per traveler, excluding international flights.

Destination and budget use custom Radix listboxes with keyboard navigation and typeahead. Dates use a custom DayPicker calendar in a Radix popover, with arrow-key navigation, Escape dismissal, and clear actions. The return calendar disables dates before departure. React Hook Form Controllers keep the controls synchronized with validation and error focus. Date-only values are parsed and serialized in the visitor’s local calendar without UTC conversion; the API still receives `YYYY-MM-DD` strings.

On the home page, the form code loads as visitors approach the inquiry section. Its anchor and contact-page fallback are present in the initial HTML. The contact page renders the form directly; destination and journey links prefill the relevant details.

`POST /api/inquiry` validates the JSON payload, then uses Nodemailer to send **one email to the configured inbox** through `smtp.gmail.com`, port **465**, with `secure: true` (TLS from connection start). The message includes plain text and branded HTML with escaped visitor content. It contains the destination, departure/return dates, date flexibility, traveler count, budget, interests, name, email, optional phone, and notes. The authenticated account is the `From` address; the visitor’s address is `Reply-To`, so the team can reply directly.

The API returns `{ accepted: true, mode: 'email' }` only after SMTP accepts the message for the configured recipient. Acceptance does not prove inbox placement, that the team has read the message, or that a trip is booked. No confirmation email is sent to the visitor, and this application does not create a CRM record or save the brief in a database. Emails may be retained by the sending/receiving mailbox providers and the agency’s email processes; no retention period has been verified or enforced by this application.

The existing JSON content-type, origin, payload-size, and field checks remain in place. Honeypot submissions are quietly discarded without sending mail. Missing or invalid mail configuration returns **503**; an SMTP sending/acceptance failure returns **502**. These failures must not show a success state, and the form retains answers for a retry. Infrastructure and email-provider logging are separate from the application and must be reviewed for the actual deployment.

Configure these variables in the project-root, ignored `.env.local` for local use, or in the hosting platform’s **server environment** for production:

| Variable | Purpose |
| --- | --- |
| `EMAIL_USER` | Gmail or Google Workspace account used to authenticate and send the message |
| `EMAIL_PASS` | That account’s Gmail app password; app passwords require Google 2-Step Verification |
| `EMAIL_TO` | Single inbox that receives trip briefs; if omitted or blank, defaults to `EMAIL_USER` |

The committed `.env.example` contains blank mail values. Keep real values in ignored local configuration or the host’s secret settings. Never add a `NEXT_PUBLIC_` prefix to mail credentials, put them in client code, or publish them in screenshots, test records, or documentation. For account setup and transport details, see Nodemailer’s official [Gmail guide](https://nodemailer.com/guides/using-gmail) and [SMTP transport reference](https://nodemailer.com/smtp).

After changing credentials or the recipient, restart the local Next.js server. In production, update the server environment and restart or redeploy the application so its running instances receive the new values; the values are not browser configuration. The host must allow outbound SMTP on port 465. Local test credentials are not production configuration.

To verify a deployment:

1. Confirm the sending account and receiving inbox with the operator, configure the three variables, and restart the server. Use synthetic trip details for the test.
2. Submit the form and check for the email-mode success response. Independently inspect the configured inbox and spam folder; confirm every trip/contact field appears, both message formats are readable, and replying addresses the visitor rather than the sending account.
3. In an isolated test environment, check missing configuration and simulated SMTP rejection. Confirm 503/502 responses, useful form errors, retained answers, and no false success. Run automated checks with a mocked transport rather than sending real email on each test run.
4. Record the actual test outcome separately in `docs/verification.md`. Recheck delivery after changing the mailbox, credentials, recipient, or deployment host. Review public-form abuse controls, mailbox access, provider practices, and hosting logs with the operator.

Do not collect passport or payment details in the trip brief. The privacy and terms pages remain review previews rather than completed operational legal documents; replace them with reviewed notices matching the actual operator, email providers, data handling, retention, and contact process.

## Motion and accessibility

The hero renders its complete static SVG on the server; the illustration JSX is kept out of the client bundle. A client wrapper dynamically imports GSAP scene code only when motion is permitted. Scene animations are scoped with `gsap.context()`/`gsap.matchMedia()` and reverted on cleanup. An IntersectionObserver pauses scene loops off screen, and scene cleanup disconnects observers and pointer listeners. Fine-pointer parallax is disabled on touch devices; mobile hides extra clouds, planes, distant waves, and glitter, and shows headline copy immediately. Continue animating transform and opacity rather than layout properties.

Lenis runs from the GSAP ticker and forwards scroll updates to ScrollTrigger. Its instance/ticker subscription are destroyed on unmount or a reduced-motion preference change. A generation guard prevents overlapping dynamic imports from creating multiple instances. Keep this cleanup when adding effects.

The mobile navigation uses a native modal `dialog`: the background is inert, focus stays inside, Escape closes it, and focus returns to the menu button. The FAQ uses keyboard-operable controls, inquiry fields have labels and linked errors, and a skip link targets the main landmark. Respect reduced motion in new animations and retain visible keyboard focus styles.

Manual checks after edits:

- Tab through navigation, the mobile menu, accordions, filters, interest chips, form steps, error-summary links, and direct contact links. Check Escape and focus restoration in the menu.
- Submit an empty form step, fix the highlighted field, go back, and verify answers remain. Check fixed dates, invalid email, retry behavior, success, and restart.
- Test 360, 390, 768, 1440, and 1920 pixel widths, landscape mobile, 200% zoom, and long labels. Check overflow and date fields on an actual mobile browser.
- Enable reduced motion before loading and change it while the page is open. Confirm the coast remains static and navigation still works.
- Check contrast, landmark/heading order, and screen-reader labels. Automated accessibility tools complement these checks.

## SEO and preview indexing

Set `NEXT_PUBLIC_SITE_URL` to the actual public **origin** of your verified agency domain, beginning with `https://` and without a path. It is public configuration, not a secret. Rebuild after changing it. `lib/seo.ts` supplies the same origin to canonical URLs, Open Graph/Twitter metadata, the sitemap, robots, and TravelAgency JSON-LD.

The shipped `https://divinestravels.example` fallback is a staging placeholder. `.example` sites and Vercel preview deployments are intentionally `noindex`, and their robots file disallows crawling. The email domain does not change the canonical origin automatically. With a verified real site domain and a production deployment, normal marketing pages become indexable. Review staging controls on other hosting platforms. Privacy and terms preview pages remain `noindex` until replaced with reviewed operational documents and their explicit `noIndex` options are removed; they are excluded from the sitemap for now. Those pages are explanations of the preview, not completed launch-ready legal documents.

`app/opengraph-image.tsx` generates a 1200×630 branded image without external image/font requests; its renderer uses supported JSX styles rather than Tailwind. `app/icon.tsx` generates the favicon from the transparent logo through `lib/brand-image.ts`. Rebuild after replacing the logo and check navigation/footer fit, icon legibility, and the social image. The background-removal prompt and asset details are recorded in [docs/logo-edit.md](docs/logo-edit.md). Add business details or ratings to JSON-LD only when they are factual; the schema deliberately omits unverified address details and reviews.

## Measure performance before launch

The earlier local production baseline recorded a **92 mobile performance median** over three Lighthouse runs and **100 desktop performance**. After the logo and photography update, one fresh mobile run scored **90 performance, 100 automated accessibility, and 100 best practices**, with zero layout shift. Settings, behavior checks, preview-indexing context, and bundle measurement limits are recorded in [docs/verification.md](docs/verification.md). Recheck the actual deployment after changing content or adding integrations.

Run a production build and serve it with `npm start`. Test Lighthouse against that server or the intended production host using mobile throttling and at least three runs. Record the median and note the device/network settings. Review the Performance panel for main-thread work, off-screen animation activity, dropped frames, and layout shifts. Check both the static/reduced-motion view and the fully animated view.

The design targets Lighthouse performance of 90+ and an initial hero JavaScript budget under 150 KB, but these are targets, not certified results. Measure compressed, transferred client assets in the production browser Network panel with cache disabled, distinguishing shared libraries from the deferred hero animation chunk. Do not equate total `.next` output or server bundles with the JavaScript a visitor downloads. Re-measure when adding libraries, photos, or new scene effects.

## Launch checklist

- Set and verify the canonical production domain and hosting environment; check canonical, robots, sitemap, icon, OG image, and social previews on the final host.
- Verify the provided email/phone links on the final host, confirm the establishment year and operating details, and review any unverified support or flexibility claims. Keep the address omitted as requested.
- Replace illustrative reviews with approved real accounts, or retain their visible placeholder labels. Confirm every price, route, season, inclusion, and source link.
- Configure the production SMTP account and recipient, verify actual inbox receipt and reply behavior, and check error handling. There is no CRM integration or visitor confirmation email.
- Publish reviewed privacy and booking terms matching actual operations, and update their indexing options.
- Run lint, typecheck, build, responsive/keyboard/reduced-motion checks, API failure checks, accessibility checks, and production performance measurements.
- Confirm photo licenses, final copy, sender credentials, monitoring, deployment logs, and the support process.

No service credentials or real customer data belong in tracked project files. Keep local mail credentials in ignored configuration and review the remaining preview offers before launch.
