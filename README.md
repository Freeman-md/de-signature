# The Signature

The Signature is a premium, mobile-first reservation landing page for the event. It is a static Next.js App Router site: visitors can choose a table package, select one or more of the boat's 20 passenger seats, review their choices, and begin the reservation conversation on WhatsApp. Package-only WhatsApp enquiries also remain available. There is no payment flow, database, account system, seat locking, availability inventory, or reservation storage in this release.

## Run locally

1. Install Node.js 20.9 or later.
2. Copy `.env.example` to `.env.local` and configure the public reservation number when it is confirmed.
3. Install dependencies and start the site:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production checks and build:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The immersive selector also has focused browser and visual-regression coverage:

```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install chromium
npm run test:browser
```

The browser suite covers `320 × 568`, `390 × 844`, `768 × 1024`, and `1440 × 900`, including page overflow, seat reachability, keyboard selection, reduced motion, and stable narrow/desktop selector screenshots. Run `npm run test:browser:update` only after intentionally reviewing a visual change.

## Configuration

`NEXT_PUBLIC_WHATSAPP_RESERVATION_PHONE` is required before reservation buttons become active. Use international digits only, without spaces or a leading `+` (for example, `2348012345678`). It is a public browser configuration value, not a secret.

When configured, a package-only button creates a link in this form:

```text
https://wa.me/<number>?text=Hi%2C%20I'd%20like%20to%20reserve%20the%20%E2%82%A61%2C000%2C000%20package%20for%20The%20Signature.
```

The integrated flow creates a message containing the chosen package and selected seat labels. Its final action stays disabled until one package and at least one seat are selected. If the number is unset or malformed, all WhatsApp actions are deliberately disabled and the page states that reservations are being set up. No misleading link is generated.

`NEXT_PUBLIC_SITE_URL` is optional during development and required for production metadata that needs an absolute URL. Set it to the public `http://` or `https://` origin, without a deployment path, credentials, query string, fragment, or trailing slash. For example:

```text
NEXT_PUBLIC_SITE_URL=https://your-confirmed-domain.com
```

The application validates and normalises this value. Missing, malformed, non-root-path, localhost/loopback, and `.local` values do not break development or builds. Instead, canonical metadata, absolute Open Graph and X image URLs, the robots sitemap reference, the sitemap home entry, and canonical-site structured data are deliberately omitted. The public page remains indexable and no localhost or placeholder production URL is emitted.

## Metadata and sharing

Reusable public metadata has one typed source of truth in `src/lib/site-metadata.ts`. Edit that module to change the site name, default title, title template, description, social-image details, colours, language, and manifest icon declarations. Reservation packages and event content remain in their feature-owned files.

The dedicated sharing image is `public/opengraph-image.png` (`1200 × 630`, PNG). Its large, high-contrast title and short supporting line are designed for cropped link-preview cards rather than reproducing the portrait flyer. Replace it with another licensed `1200 × 630` PNG, keep important text inside safe margins, update its alternative text in `src/lib/site-metadata.ts`, and keep it below 5 MB. It intentionally lives under `public` so the conditional Metadata API configuration can omit the image when no safe absolute production URL exists; placing the file at `src/app/opengraph-image.png` would make Next.js publish a localhost fallback during an unconfigured build.

Brand icons use the simplified Signature initial:

- `src/app/favicon.ico` for browser tabs;
- `src/app/icon.png` at `512 × 512` for the standard application icon;
- `src/app/apple-icon.png` at `180 × 180` for Apple home-screen surfaces;
- `public/icon-192.png` at `192 × 192` for the matching manifest declaration.

Replace or regenerate all four from the same simplified source mark so they remain visually consistent. Preserve their filenames and dimensions; do not shrink the full flyer into an icon.

Next.js generates the document metadata, viewport theme colour, `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml`, icon links, and social image route through App Router conventions. No incomplete `Event` JSON-LD is published because a confirmed date and location are not yet available.

To inspect the generated output locally, configure a real test deployment URL in the current shell, build, start the production server, and view the initial page source:

```bash
NEXT_PUBLIC_SITE_URL=https://your-confirmed-domain.com npm run build
npm run start
```

Check that the source contains one canonical link, one coherent Open Graph set, one coherent X card set, the manifest link, and absolute social-image URLs on the configured origin. Also open `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml`, and `/opengraph-image.png`. Repeat these checks against the final deployed domain.

After deployment, inspect the production link in WhatsApp, LinkedIn, Facebook, and X. Rendering and cropping vary by platform, so approve representative previews rather than assuming they are identical. These services cache metadata and images; use each platform's re-scrape or card-refresh tooling when an older preview persists.

## Edit event content and assets

- Reservation packages and their item values live in `src/features/reservations/content.ts`. The package cards read only from this typed source of truth.
- Decks, visual seat groups, labels `A` through `T`, seat ordering, and normalised placement data live in `src/features/reservations/seat-map.ts`. Each seat has one percentage-based `x`, `y`, `width`, and `height` plus a `chair` or `lounge-segment` variant. Reposition a seat by changing only those visual fields; its label and deck remain its identity.
- Package-only and seat-aware reservation messages plus phone validation live in `src/features/reservations/whatsapp.ts`.
- Replace the approved flyer at `public/images/de-signature-flyer.png` with a similarly sized, licensed image. Update the image dimensions and alternative text in `src/app/page.tsx` if the replacement differs.

## Boat-plan rendering

The selector uses three deliberate layers: custom inline SVG structure, native HTML seat buttons positioned from the canonical coordinate model, and normal semantic headings, guidance, legend, and summary. The upper-deck and lower-cabin hull artwork lives in `src/features/reservations/components/BoatDeckArtwork.tsx`; it is decorative and hidden from assistive technology. Reservation state stays in the focused `ReservationFlow` Client Component and the 20 accessible buttons remain ordinary keyboard-operable controls.

On viewports narrower than `1024px`, the selector shows one deck at a time through the `Upper Deck` / `Lower Deck` control. The buttons include each deck's selected count, and switching only changes the visible plan—package and seat selections remain intact. At larger sizes both plans appear together.

After editing the illustration or coordinates, run the unit suite to validate seat identity and bounds, then run the browser suite to verify all targets remain reachable without horizontal overflow and compare the narrow/desktop screenshots. This is an interactive preference map only: it does not hold, book, confirm, or report the availability of a seat.

## Deploy to Vercel

Push the milestone branch to GitHub, import the repository into Vercel, and set the two public environment values above in the Vercel project settings. Set `NEXT_PUBLIC_SITE_URL` to the confirmed production URL without a trailing slash, then redeploy so the `The Signature` metadata and canonical URL are published. Vercel detects Next.js automatically and runs `npm run build`.

Changing the Vercel project name, assigned Vercel domain, or custom domain is a manual account task. Make those changes in the Vercel project settings only after the organiser confirms the desired public name and domain; do not assume the repository name must change.

After deployment:

1. Confirm the final title, description, and landscape preview design.
2. Inspect the initial source and crawler routes on the production domain; confirm no URL points to localhost or a preview deployment.
3. Check the production link through representative WhatsApp, LinkedIn, Facebook, and X previews, refreshing platform caches when necessary.
4. Approve favicon, browser bookmark, and Apple home-screen icon rendering on real devices.
5. Test both a package-only message and a package-and-seat message against the live WhatsApp contact.
6. Review the reservation layout on a narrow phone and a desktop screen.

## Still to confirm

- Public WhatsApp reservation number and that it reaches the correct contact.
- Event date, start time, venue, entry rules, and any social links.
- Whether any package should be promoted as recommended.
- Final Vercel project name and assigned or custom domain.
- Organiser approval that the recreated upper/lower deck arrangement and seat lettering match the physical boat.
- Final deployed mobile visual approval.
