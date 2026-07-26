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

## Configuration

`NEXT_PUBLIC_WHATSAPP_RESERVATION_PHONE` is required before reservation buttons become active. Use international digits only, without spaces or a leading `+` (for example, `2348012345678`). It is a public browser configuration value, not a secret.

When configured, a package-only button creates a link in this form:

```text
https://wa.me/<number>?text=Hi%2C%20I'd%20like%20to%20reserve%20the%20%E2%82%A61%2C000%2C000%20package%20for%20The%20Signature.
```

The integrated flow creates a message containing the chosen package and selected seat labels. Its final action stays disabled until one package and at least one seat are selected. If the number is unset or malformed, all WhatsApp actions are deliberately disabled and the page states that reservations are being set up. No misleading link is generated.

`NEXT_PUBLIC_SITE_URL` is optional. Once the deployed URL is known, configure it without a trailing slash to enable canonical metadata. It is also the safe prerequisite for adding generated `robots.ts` and `sitemap.ts` later.

## Edit event content and assets

- Reservation packages and their item values live in `src/features/reservations/content.ts`. The package cards read only from this typed source of truth.
- Decks, visual seat groups, labels `A` through `T`, and seat ordering live in `src/features/reservations/seat-map.ts`.
- Package-only and seat-aware reservation messages plus phone validation live in `src/features/reservations/whatsapp.ts`.
- Replace the approved flyer at `public/images/de-signature-flyer.png` with a similarly sized, licensed image. Update the image dimensions and alternative text in `src/app/page.tsx` and `src/app/layout.tsx` if the replacement differs.

## Deploy to Vercel

Push the milestone branch to GitHub, import the repository into Vercel, and set the two public environment values above in the Vercel project settings. Set `NEXT_PUBLIC_SITE_URL` to the confirmed production URL without a trailing slash, then redeploy so the `The Signature` metadata and canonical URL are published. Vercel detects Next.js automatically and runs `npm run build`.

Changing the Vercel project name, assigned Vercel domain, or custom domain is a manual account task. Make those changes in the Vercel project settings only after the organiser confirms the desired public name and domain; do not assume the repository name must change. After deployment, open the final production URL, verify its canonical/social metadata, test both a package-only message and a package-and-seat message against the live WhatsApp contact, and review the layout on a narrow phone and a desktop screen.

## Still to confirm

- Public WhatsApp reservation number and that it reaches the correct contact.
- Event date, start time, venue, entry rules, and any social links.
- Whether any package should be promoted as recommended.
- Final Vercel project name and assigned or custom domain.
- Organiser approval that the recreated upper/lower deck arrangement and seat lettering match the physical boat.
- Final deployed mobile visual approval.
