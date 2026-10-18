# Divine Travels verification

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

The inquiry endpoint validates and returns demo success; it sends no email and stores no lead. Newsletter submission is also a demo. Reviews, prices, contact details, and operational claims remain clearly marked sample content. See the README for content replacement and delivery integration.
