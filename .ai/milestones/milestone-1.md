# Milestone 1: Deployable Reservation Landing Page

**Status:** Archived
**Version:** 1.0.0  
**Last Updated:** 2026-07-25  
**Depends On:** none  
**Target Pull Request:** —  
**Target Branch:** —  
**Superseded By:** —

## Goal

Build the first deployable version of the De Signature website as a premium, mobile-first event landing page that presents the event clearly, showcases the three reservation packages and lets visitors start a reservation through WhatsApp without a payment gateway or backend.

The finished milestone must be production-ready enough to deploy immediately and use as the primary reservation page for the event.

## Required behaviour

### Project foundation

- Initialise the repository as a current Next.js App Router project using TypeScript.
- Configure Tailwind CSS and shadcn/ui.
- Use the repository's existing package-manager convention when one exists. Otherwise use npm.
- Keep the implementation frontend-only for this milestone.
- Use Server Components by default and add Client Components only where browser interaction genuinely requires them.
- Produce server-rendered HTML for the public page and avoid forcing request-time SSR when static generation is sufficient.

### Page structure

Build one polished public landing page with these sections:

1. Hero
   - Brand name: `De Signature`.
   - Premium event positioning.
   - Music policy: DJ Ozone.
   - Primary CTA: `Reserve a Package`.
   - Secondary CTA: `View Packages`.
   - Use the supplied flyer as the principal visual reference and initial event asset.
   - Do not invent an event date, time, venue, social handle or other unconfirmed factual details.

2. Event experience
   - Briefly explain the event as exclusive, curated and reservation-led.
   - Keep copy concise and credible.
   - Avoid generic luxury filler, fake scarcity claims and unsupported promises.

3. Reservation packages
   - Render exactly three packages from typed source data.
   - Show the total package price prominently.
   - Show every included item and its stated value.
   - Give each package a clear reservation CTA.
   - Do not mark a package as recommended unless that status is explicitly configured in source data.

4. Venue or layout section
   - Provide a deliberate section and reusable component for the supplied boat or venue layout image when the asset becomes available.
   - Until a real layout asset exists, do not invent a map or display a broken placeholder.
   - The page must remain visually complete without the optional layout asset.

5. Reservation and contact section
   - Explain that reservation confirmation is handled directly through WhatsApp.
   - Provide a final reservation CTA.
   - Show only confirmed contact details.

### Reservation packages

Use the following source-of-truth data and preserve the supplied amounts in Nigerian naira:

#### ₦2,000,000 package

- Don Julio: ₦850,000
- Bumbu Cream: ₦500,000
- Belaire Rosé, quantity 2: ₦600,000
- De Signature Platter: ₦50,000

#### ₦1,000,000 package

- Casamigos: ₦500,000
- Rémy Martin VSOP: ₦300,000
- Crema di Cappuccino: ₦150,000
- De Signature Platter: ₦50,000

#### ₦500,000 package

- Hennessy VSOP: ₦300,000
- Piccini Moscato: ₦150,000
- De Signature Platter: ₦50,000

For every package:

- The sum of item values must equal the displayed package price.
- Prices must be formatted consistently with the naira symbol and thousands separators.
- Package data must live in one typed content module rather than being duplicated across components.

### WhatsApp reservation flow

- Each package CTA must create a WhatsApp deep link using the configured reservation phone number.
- The message must identify De Signature and the selected package price.
- Example intent: `Hi, I'd like to reserve the ₦1,000,000 package for De Signature.`
- The phone number must be supplied through a documented public environment variable or one clearly named configuration value.
- If no reservation number is configured, the page must not generate a misleading or broken WhatsApp link.
- Missing configuration must be handled visibly and safely, with clear setup documentation.
- Do not submit or store reservation data in this milestone.

### Visual direction

Translate the supplied flyer into a coherent web design rather than reproducing it as a full-page poster.

The design must:

- Feel premium, energetic and appropriate for an exclusive nightlife event.
- Use a restrained palette derived from the flyer: warm burnt orange, black, cream or off-white and controlled red accents.
- Use expressive editorial typography with clear hierarchy.
- Use the flyer image intentionally, with responsive cropping and readable foreground content.
- Use grain, glow, gradients or motion sparingly.
- Keep package information easy to scan.
- Maintain adequate spacing and contrast on mobile.
- Avoid generic SaaS layouts, neon nightclub clichés, excessive glassmorphism and over-animation.
- Respect `prefers-reduced-motion` for any non-essential animation.

### Responsive behaviour and accessibility

- Design mobile-first and support common phone, tablet and desktop widths.
- Keep all reservation CTAs usable by touch and keyboard.
- Use semantic landmarks and heading order.
- Provide meaningful alternative text for content images and empty alternative text for purely decorative images.
- Provide visible focus states.
- Meet WCAG AA contrast for essential text and controls.
- Avoid text embedded only inside images when the same information is required to understand or use the page.

### SEO and sharing

- Add page metadata with a useful title and description for De Signature.
- Add canonical-ready metadata configuration without inventing a production domain.
- Add Open Graph and Twitter metadata.
- Use the supplied flyer as the initial social preview image when technically suitable.
- Add Event structured data only for facts that are confirmed in source data.
- Omit unknown structured-data fields rather than inventing values.
- Add `robots.ts` and `sitemap.ts` only when they can be generated correctly from configured site metadata.
- Ensure the primary page content exists in rendered HTML and does not depend on client-side JavaScript to appear.

### Assets and performance

- Store the supplied flyer in the repository under an appropriate public asset path.
- Render images through `next/image` where appropriate.
- Set correct image dimensions and responsive sizing.
- Avoid unnecessary third-party scripts and heavy animation libraries.
- Keep the page free from obvious layout shift.
- Do not block deployment because final event details or the layout image are not yet supplied. Handle optional content deliberately.

### Documentation

Update the README with:

- The purpose of the project.
- Local installation and development commands.
- Production build command.
- Required and optional environment variables.
- How to change event copy and reservation packages.
- How to add or replace the flyer and venue-layout assets.
- How the WhatsApp reservation message is generated.
- A simple deployment path suitable for Vercel.
- A list of unconfirmed event details that still require human input.

## Constraints

- Use Next.js App Router, TypeScript, Tailwind CSS and shadcn/ui.
- Keep the architecture proportionate to a single-page event site.
- Do not copy irrelevant portfolio-specific architecture from the current `AGENTS.md` into the implementation. Where repository instructions conflict with the actual De Signature product, update repository-level project descriptions and commands as part of this milestone while preserving the milestone workflow itself.
- Keep event content and package data easy to edit without touching rendering logic.
- Prefer static generation for the page unless a real requirement makes request-time rendering necessary.
- Do not add speculative abstractions for future payments, bookings, inventory or administration.
- Do not commit credentials, phone numbers intended to remain private or environment files containing secrets.
- Do not add dependencies without a concrete need.
- Do not merge the pull request as an agent.

## Explicitly out of scope

- Online payments or payment-gateway integration
- Database or CMS integration
- Authentication or administration
- Reservation persistence
- Email delivery
- API routes or Server Actions for reservation submission
- Table inventory, seat locking or availability management
- Automated reservation approval
- QR-code ticketing
- Customer accounts
- Analytics-provider integration beyond leaving a clean place for later instrumentation
- Inventing event date, time, venue, rules, phone number, social links or package details
- A multi-page marketing site
- Unrelated repository architecture work

## Required tests

1. Add focused automated coverage for package-data integrity so every package total equals the sum of its included item values.
2. Add focused coverage for WhatsApp reservation-link generation, including the selected package and missing phone-number configuration.
3. Verify the public page renders all three package prices and their included items.
4. Verify essential reservation links and controls have accessible names.
5. Run the repository's aggregate validation commands.

At minimum, the completed project must pass:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

If the initial scaffold does not provide `typecheck` or `test`, add clear scripts for them.

## Acceptance criteria

- [ ] A current Next.js App Router project is configured with TypeScript, Tailwind CSS and shadcn/ui.
- [ ] The repository contains one production-quality, responsive De Signature landing page.
- [ ] The page uses the supplied flyer as a visual asset and translates its direction into a coherent web design.
- [ ] Exactly three reservation packages are rendered from one typed source of truth.
- [ ] Every package displays the correct total and complete item breakdown.
- [ ] Automated package-integrity checks prove each package total equals its item values.
- [ ] Each configured package CTA opens WhatsApp with a message containing De Signature and the selected package.
- [ ] Missing WhatsApp configuration does not produce a broken or misleading reservation link.
- [ ] Unknown event details are omitted or handled as explicitly unconfirmed rather than invented.
- [ ] The page remains visually complete when no venue-layout image is present.
- [ ] Essential content is server-rendered and available without client-side JavaScript.
- [ ] Metadata and social-sharing configuration are present and use only confirmed information.
- [ ] The page is keyboard accessible, has visible focus states and uses semantic structure.
- [ ] Images are responsive and implemented without obvious layout shift.
- [ ] The implementation does not include a database, payment integration, authentication or reservation persistence.
- [ ] README setup, editing, configuration and deployment instructions are complete.
- [ ] Lint, typecheck, focused tests and production build pass.
- [ ] The independent review covers every agent-verifiable acceptance criterion.
- [ ] The pull request is not merged by an agent.

## Manual tasks

1. Supply or confirm the public WhatsApp reservation number in international format.
2. Supply and confirm the event date, start time, venue and any entry rules before publication if those details should appear on the site.
3. Supply the final boat or venue layout image if it should be shown.
4. Confirm whether any package should be visually promoted as recommended.
5. Review the deployed mobile page for brand fit before distributing the URL publicly.

## Manual acceptance criteria

- [ ] The configured WhatsApp number reaches the correct reservation contact.
- [ ] A real reservation CTA opens WhatsApp on a phone with the correct package message.
- [ ] Published date, time, venue and rules match the organisers' confirmed event details.
- [ ] The final visual direction feels appropriate for De Signature and does not resemble a generic template.
- [ ] The deployed page is approved for public promotion.
