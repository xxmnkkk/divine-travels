# Divines Travels verification

Verified on 18 October 2026 against the local Next.js production server. These are local laboratory results, not a guarantee for another deployment or device.

## Build and behavior

- `npm run build` and `npm run lint` completed after each of the six implementation phases and after the final performance changes.
- Strict TypeScript checks pass. All nine inquiry regression tests pass with `npm test`.
- All 19 sitemap page URLs return HTTP 200. Robots, favicon, Open Graph image, privacy, and terms routes return HTTP 200. An unknown destination returns HTTP 404.
- Browser checks covered destination region/interest filtering, empty results and reset, destination navigation, query-based form prefill, step validation and focus, retained answers, and successful demo submission.
- Browser checks covered mobile modal focus, Escape and navigation, keyboard FAQ interaction, story controls and arrow keys, and the deferred form loading from the home-page CTA with one inquiry anchor.
- Home layouts were inspected at 360, 768, 1440, and 1920 pixel widths without horizontal document overflow. Dynamic illustration cleanup, preference listeners, touch guards, and off-screen/tab pausing were also reviewed in source.

## Lighthouse 12.8.2

Audits used headless Chrome and `npm start`, with default simulated mobile throttling: 412 × 823 CSS pixels, 4× CPU slowdown, 150 ms RTT, and 1,638.4 Kbps throughput. Each mobile run used a fresh audit context.

| Metric | Mobile run 1 | Mobile run 2 | Mobile run 3 | Desktop |
| --- | --- | --- | --- | --- |
| Performance | 92 | 92 | 92 | 100 |
| Accessibility | 100 | 100 | 100 | 100 |
| Best practices | 100 | 100 | 100 | 100 |
| Largest Contentful Paint | 3.3 s | 3.4 s | 3.4 s | 0.7 s |
| Total Blocking Time | 10 ms | 20 ms | 10 ms | — |
| Cumulative Layout Shift | 0 | 0 | 0 | 0 |

The mobile performance median is **92**. Accessibility scores cover automated checks and supplement the keyboard and interaction checks above.

SEO scores are 66 on the supplied preview configuration because the `.example` canonical domain is intentionally `noindex` and robots-disallowed. This safeguard is preserved. Set a verified production `NEXT_PUBLIC_SITE_URL`, rebuild, and audit the deployed host to verify indexing and final canonical/social URLs.

## Loading changes

The headline stays visible from the server response; mobile skips its editorial entrance. Static SVG artwork is server-rendered and passed into the scene's client motion wrapper. GSAP is deferred, reduced-motion users retain static art, and the home-page form loads within 800 pixels of the viewport. The direct contact form still renders immediately.

The final mobile audit observed 290,635 bytes of total homepage script transfer, including React, Next.js, Framer Motion, shared UI, and the scene. Deferring the form reduced the observed transfer by about 52 KB. The three deferred scene dependency/runtime chunks total 139,992 raw bytes / 56,311 gzip bytes; those figures exclude shared app code and the client wrappers. Turbopack shares some UI and content modules across chunks, so this subset must not be described as the entire page or a standalone hero-only bundle.

## Preview boundaries

The inquiry endpoint now emails validated trip briefs through Gmail SMTP, as recorded in the 22 October follow-up below. It does not save a lead in an application database or CRM. Reviews, prices, and operational claims remain clearly marked sample content. The agency’s supplied phone and email are shown as direct contact links; the footer signup feature has been removed. See the README for configuration and content review.

## Custom controls follow-up

Replaced destination/budget selects and both native date inputs with shared custom controls. Browser checks verified arrow-key dropdown selection, required-date errors focusing the custom trigger, calendar month/day keyboard navigation, disabled return dates before departure, date clearing, Escape focus restoration, retained selections across steps, and a successful demo submission. The calendar stayed within the viewport at 360 pixels. All 12 tests cover the inquiry route plus local-calendar date parsing, leap days, and date-only round trips; calendar tests were also run in Kolkata and Los Angeles timezones.

The follow-up production build, lint, and all 12 tests pass. One fresh mobile Lighthouse run retained a homepage performance score of 92 and automated accessibility of 100. A separate contact-page audit scored 100 for automated accessibility with the custom form controls rendered.

## Logo, contact, and photography follow-up · 19 October 2026

The supplied Divines Travels gold-and-navy logo now appears in navigation, the footer, the favicon, and the social preview. Email and telephone links use the agency’s provided details; no address is displayed. The footer signup feature and its unused component/copy have been removed. The inquiry form remains a clearly labeled demonstration that does not deliver messages.

Eight real, locally hosted WebP photos replace the destination illustrations across destination and journey cards/detail pages, About, and the home travel journal. Sources and licensing are recorded in [photography.md](photography.md). The originally requested illustrated hero is preserved. Source photos total approximately 1.29 MB; responsive Next.js image variants reduce individual transfers.

An initial photo audit exposed early downloads caused by the browser’s native lazy-loading distance. Home destination images now mount within 400 pixels of the viewport, with fixed aspect-ratio space and server-rendered no-JavaScript fallbacks. Browser checks confirmed photos load as visitors reach the cards at desktop and 360-pixel mobile widths, without horizontal overflow or console errors. The mobile menu still opens and closes with Escape. Direct contact links, footer layout, and generated icon/social image were inspected.

The final production build, lint, strict TypeScript check, and all 12 existing tests pass. One final Lighthouse run with the same simulated mobile settings scored **90 performance, 100 accessibility, and 100 best practices**, with **3.6 s LCP, 40 ms TBT, and zero CLS**. The audit observed no destination-photo downloads during the initial hero load. This is one follow-up measurement, not a new three-run median; the table above records the earlier illustration-only baseline.

## Transparent logo follow-up · 19 October 2026

Replaced the navy-backed logo display with a genuine transparent PNG cutout and removed the separate text beside the navigation logo. Header and footer now show only the complete supplied logo artwork on the site’s own background. Icon, social preview, and structured-data logo references use the transparent asset. The original upload is retained; the image edit prompt and output details are recorded in [logo-edit.md](logo-edit.md).

Alpha-channel inspection confirms fully transparent background pixels. Desktop and 360-pixel mobile browser checks confirm the image loads, the adjacent text is absent, and there is no horizontal overflow. The generated favicon and social preview were visually inspected. Production build, lint, and strict TypeScript checks pass. This small branding follow-up did not rerun the earlier performance audit or inquiry tests.

## Gmail inquiry delivery · 22 October 2026

Implemented the same Nodemailer/Gmail SMTP pattern and environment variable names as the reference Travel Addresses project: `EMAIL_USER`, `EMAIL_PASS`, and an optional `EMAIL_TO` recipient override. The authenticated mailbox is the sender; replies are addressed to the traveler. Validated trip/contact fields are included in a plain-text and escaped branded HTML message. The API waits for explicit SMTP acceptance for the configured recipient before returning email-mode success. It returns 503 for missing/invalid mail settings and 502 for failed or rejected sends, without logging credentials or trip details. The form retains answers after a failure and its former demo copy has been replaced.

All **26 tests pass**, covering API validation, awaiting delivery, SMTP rejection, empty/wrong/rejected recipients, missing configuration, recipient override/fallback, HTML escaping, complete message fields, authenticated sender and visitor reply address, and calendar rules. Tests use synthetic credentials and a mocked transport; they never send mail. Production build, lint, and strict TypeScript checks pass.

Gmail SMTP authentication was verified with the authorized local test configuration. One synthetic inquiry was then submitted through all three form steps on the local production server. Gmail accepted the test message and the browser displayed “Your trip brief has been sent.” The configured inbox and spam folder were not independently inspected, so this verifies SMTP acceptance rather than inbox placement or reading. No automatic traveler confirmation email is sent.

The local credential file is ignored by Git and restricted to owner access. A scan of 178 generated browser/static-page files found no copy of the supplied password. No test credentials were added to the committed example or public copy. Set the three mail variables in the production server environment, restart/redeploy, and verify the final inbox there. Existing services on port 3000 were left untouched; the temporary verification server used port 3002.

## Inquiry autofill false-positive regression · 22 October 2026

A legitimate inquiry included a populated legacy `website` field, which was vulnerable to browser or password-manager autofill. The API treated any nonblank value as spam, skipped the mail transport, and still returned `{ accepted: true, mode: 'email' }`. The browser consequently displayed a sent confirmation even though SMTP had not been contacted. The earlier synthetic SMTP check did not exercise this case, so it did not establish that every success response represented a real send.

The fix replaces the anti-spam field with optional `_formCheck` and ignores legacy `website` input. The frontend defaults the new field to empty and places it inside a truly hidden wrapper with autocomplete disabled and password-manager ignore attributes. A nonblank `_formCheck` now produces HTTP 400 with `accepted: false` and a clear failure before any SMTP attempt. Valid inquiries can return email-mode success only after the configured recipient is accepted by SMTP; the anti-spam branch cannot return a false delivery confirmation.

All **28 tests pass**, including a valid Japan request with a populated legacy `website`, absent/blank/whitespace-only `_formCheck`, and a populated `_formCheck` returning 400 without SMTP or a false success. Production build, lint, and TypeScript checks pass. The generated contact HTML contains the new field inside its hidden wrapper and no old `website` input.

A cookie-free replay of the reported Japan inquiry against the running local API on port 3001 returned 200/email-mode success after Gmail accepted the configured recipient. A populated new form check returned 400 with `accepted: false` and no email mode. No unrelated cookies or authentication headers were reused or stored. Inbox placement was not independently inspected.
