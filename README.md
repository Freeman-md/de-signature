# De Signature

De Signature is a premium, mobile-first reservation landing page for the event. It is a static Next.js App Router site: visitors select a table package and begin the reservation conversation on WhatsApp. There is no payment flow, database, account system, or reservation storage in this release.

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

When configured, a package button creates a link in this form:

```text
https://wa.me/<number>?text=Hi%2C%20I'd%20like%20to%20reserve%20the%20%E2%82%A61%2C000%2C000%20package%20for%20De%20Signature.
```

If the number is unset or malformed, buttons are deliberately disabled and the page states that reservations are being set up. No misleading link is generated.

`NEXT_PUBLIC_SITE_URL` is optional. Once the deployed URL is known, configure it without a trailing slash to enable canonical metadata. It is also the safe prerequisite for adding generated `robots.ts` and `sitemap.ts` later.

## Edit event content and assets

- Reservation packages and their item values live in `src/features/reservations/content.ts`. The package cards read only from this typed source of truth.
- The reservation message and phone validation live in `src/features/reservations/whatsapp.ts`.
- Replace the approved flyer at `public/images/de-signature-flyer.png` with a similarly sized, licensed image. Update the image dimensions and alternative text in `src/app/page.tsx` and `src/app/layout.tsx` if the replacement differs.
- `VenueLayout` is ready for a confirmed boat or venue layout image at `src/features/reservations/components/VenueLayout.tsx`. Pass its source and verified alternative text only when the real asset exists; the section intentionally stays absent until then.

## Deploy to Vercel

Push this branch to GitHub, import the repository into Vercel, and set the two public environment values above in the Vercel project settings. Vercel detects Next.js automatically and runs `npm run build`. Confirm the WhatsApp contact and review the mobile deployment before publishing the URL.

## Still to confirm

- Public WhatsApp reservation number and that it reaches the correct contact.
- Event date, start time, venue, entry rules, and any social links.
- Boat or venue layout image.
- Whether any package should be promoted as recommended.
- Final deployed mobile visual approval.
