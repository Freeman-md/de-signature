# Milestone 2: The Signature Boat Seat Selection

**Status:** Active  
**Version:** 1.0.0  
**Last Updated:** 2026-07-26  
**Depends On:** Milestone 1  
**Target Pull Request:** —  
**Target Branch:** —  
**Superseded By:** —

## Goal

Rename the public event brand from `De Signature` to `The Signature` and add a simple, visually polished boat-seat selection step that lets visitors choose one or more seats across the upper and lower decks before opening WhatsApp with both the selected package and selected seat labels.

The finished milestone must preserve the current single-page reservation experience, remain frontend-only, and be ready to deploy to Vercel without adding booking infrastructure that the event does not yet need.

## Required behaviour

### Brand rename

- Replace every user-facing occurrence of `De Signature` with `The Signature`.
- Update page copy, metadata, social-sharing text, flyer alternative text, README examples, WhatsApp messages and package item names where the event brand appears.
- Rename `De Signature Platter` to `The Signature Platter` in all three package definitions.
- Preserve the repository name unless Freeman explicitly renames it separately.
- Do not leave mixed public branding such as `De Signature` in one section and `The Signature` in another.

### Seat-selection feature

Add a dedicated reservation feature section to the existing landing page. The preferred placement is after the package section and before the final WhatsApp/contact CTA so the user journey remains:

```text
Choose package -> choose seat or seats -> review selection -> reserve on WhatsApp
```

The feature must:

- Present a clear stylised boat layout with two labelled levels:
  - `Upper Deck`
  - `Lower Deck`
- Represent exactly 20 selectable seats.
- Label upper-deck seats `A` through `J`.
- Label lower-deck seats `K` through `T`.
- Allow one or multiple seats to be selected.
- Allow a selected seat to be deselected before reservation.
- Show a compact live summary of the selected package and selected seat labels.
- Keep the current three reservation packages as the only package options.
- Require a package selection before generating the final reservation action.
- Require at least one seat selection before generating the final reservation action.
- Provide clear guidance when either selection is missing rather than generating an incomplete WhatsApp message.
- Preserve selections while the user moves between the package and seat controls within the same rendered page.
- Keep the interaction entirely in browser state. Do not claim that a seat is held, booked or unavailable.

### Boat visual direction

The layout must feel like a boat plan rather than a cinema grid pasted into the page.

Use a lightweight responsive representation built with normal React, semantic HTML and CSS/Tailwind. A custom canvas, SVG editor, seat-map library or WebGL implementation is not justified for 20 fixed seats.

The visual treatment must:

- Use a simplified boat silhouette or deck boundary that blends with the existing warm editorial theme.
- Make the upper and lower decks visually distinct without creating a separate page.
- Use a logical seat arrangement that is easy to scan and tap.
- Include a small legend for at least `Available` and `Selected`.
- Avoid showing `Reserved`, `Sold` or other availability states because no backend inventory exists.
- Keep seat labels visible without zooming.
- Use sufficiently large touch targets on mobile.
- Reflow cleanly across narrow phones, tablets and desktop screens without horizontal page overflow.
- Avoid heavy animation. Any transition must be subtle and respect reduced-motion preferences.

### Package selection integration

- Existing package cards remain the source for the three package options.
- Refactor package selection only as much as needed to support one coherent reservation flow.
- A user may select or change a package before opening WhatsApp.
- The selected package must be visibly distinguishable and announced accessibly.
- Do not duplicate package price or item data in the seat-selection component.
- The existing typed reservation package module remains the canonical package source.

### WhatsApp reservation flow

Update the reservation message generation so it can include the selected package and one or more seat labels.

Expected message shape:

```text
Hi, I'd like to reserve seats A, B and C with the ₦2,000,000 package for The Signature.
```

For one seat:

```text
Hi, I'd like to reserve seat A with the ₦2,000,000 package for The Signature.
```

Requirements:

- Seat labels must be sorted in deck order from `A` through `T`, regardless of click order.
- One selected seat must use singular grammar.
- Multiple selected seats must use plural grammar and readable punctuation.
- The message must include `The Signature`, the selected package price and every selected seat label.
- The configured WhatsApp number validation and safe missing-number behaviour must remain intact.
- The final reservation control must not generate a WhatsApp link when package or seat selection is incomplete.
- Do not submit, persist or reserve data before WhatsApp opens.

### Accessibility

- Use native `<button>` elements for seat controls.
- Expose each seat's selected state using the appropriate pressed/selected state and an accessible name such as `Upper Deck seat A`.
- Keyboard users must be able to reach, select and deselect every seat and package option.
- Show visible focus states that remain clear against every seat state.
- Communicate that multiple seats may be selected.
- Provide text equivalents for the deck grouping and selection summary so the boat shape is not the only way to understand the interface.
- Do not require drag, hover or precise pointer movement.
- Preserve semantic heading order and page landmarks.

### State and architecture

- Keep the landing page server-rendered by default.
- Isolate only the package-and-seat interaction behind the smallest sensible Client Component boundary.
- Keep static event content, SEO content and package descriptions available in rendered HTML.
- Place reservation-specific UI and state within the existing `src/features/reservations` feature boundary.
- Keep pure helpers, including seat ordering and WhatsApp message construction, independently testable.
- Define the deck and seat labels in one typed source of truth rather than scattering string literals across components.
- Do not add a global state library. Local React state is sufficient.
- Do not add a seat-map dependency unless the implementation agent can prove it reduces complexity. For this fixed 20-seat layout, the default decision is no dependency.

### SEO and public branding

- Update title, description, Open Graph and Twitter metadata to `The Signature`.
- Update structured data only where present and only with confirmed facts.
- Keep the production URL configurable through `NEXT_PUBLIC_SITE_URL`.
- Do not invent a new custom domain.
- Ensure public page content no longer indexes the old event name after deployment.

### Deployment readiness

- Keep the project compatible with the current Vercel deployment path.
- Update README deployment guidance to explain:
  - setting the confirmed `NEXT_PUBLIC_SITE_URL`;
  - redeploying after the branding change;
  - changing the Vercel project name or assigned domain manually in Vercel settings when required;
  - verifying the final production URL and WhatsApp flow.
- Do not hard-code a Vercel deployment URL that has not been confirmed.
- Deployment, project renaming and custom-domain ownership remain manual tasks because they require external account access.

## Constraints

- Preserve Next.js App Router, TypeScript, Tailwind CSS and the existing shadcn/ui setup.
- Keep the feature proportionate to 20 fixed seats and three fixed packages.
- Prefer normal React state, buttons and CSS layout over a graphics or booking framework.
- Preserve the existing visual identity while changing the brand copy to `The Signature`.
- Do not weaken the existing phone-number validation or missing-configuration safeguards.
- Do not introduce speculative abstractions for seat inventory, pricing rules or future ticketing.
- Do not commit credentials or private configuration.
- Do not merge the pull request as an agent.

## Explicitly out of scope

- Seat availability fetched from a backend
- Real-time seat locking
- Marking seats as sold, held or reserved
- Preventing simultaneous users from selecting the same seat
- Database or CMS integration
- Payment-gateway integration
- Authentication or administration
- Reservation persistence
- Customer accounts
- QR-code tickets
- Email or SMS confirmation
- A drag-and-drop boat editor
- User-configurable deck layouts
- More than 20 seats
- Changing package prices or contents beyond the brand rename
- Renaming the GitHub repository
- Automatically purchasing or configuring a custom domain
- Automatically changing Vercel account or DNS settings
- Unrelated visual redesign or application architecture work

## Required tests

1. Add focused tests proving the upper deck contains `A` through `J`, the lower deck contains `K` through `T`, and no label is duplicated or omitted.
2. Add focused tests for seat ordering so selected seats are rendered in `A` through `T` order regardless of selection order.
3. Add focused tests for singular and plural WhatsApp messages, including `The Signature`, the package price and all selected labels.
4. Preserve tests for missing or invalid WhatsApp phone configuration.
5. Add interaction coverage proving a user can select and deselect multiple seats.
6. Add interaction coverage proving the final reservation action remains unavailable until both a package and at least one seat are selected.
7. Add rendering coverage proving both decks, all 20 seat labels and the selection legend are present.
8. Verify essential controls have accessible names, selected states and keyboard-operable native button semantics.
9. Update existing tests and snapshots so no public-facing expectation still requires `De Signature`.
10. Run the repository's aggregate validation commands.

At minimum, the completed milestone must pass:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Acceptance criteria

- [ ] Every public-facing event-brand reference uses `The Signature`.
- [ ] All three packages use `The Signature Platter` where applicable.
- [ ] The landing page includes one integrated boat-seat selection section.
- [ ] Upper Deck contains seats `A` through `J`.
- [ ] Lower Deck contains seats `K` through `T`.
- [ ] All 20 seats are individually selectable and deselectable.
- [ ] Multiple seat selection works without a third-party seat-map dependency.
- [ ] A visitor can select and change one of the existing three packages.
- [ ] The final WhatsApp action is unavailable until a package and at least one seat are selected.
- [ ] The WhatsApp message uses correct singular or plural grammar and includes all selected seats, the package price and `The Signature`.
- [ ] Selected seats are ordered from `A` through `T` in the generated message.
- [ ] Missing WhatsApp configuration still fails safely without a broken link.
- [ ] The feature uses a small Client Component boundary while the rest of the public page remains server-rendered.
- [ ] Package and seat data each have one typed source of truth.
- [ ] Seat controls are keyboard operable, visibly focused and expose their selected state accessibly.
- [ ] The boat layout remains usable and visually coherent on phone, tablet and desktop widths.
- [ ] The implementation does not claim seats are held, unavailable or confirmed.
- [ ] Metadata and social-sharing copy use `The Signature`.
- [ ] README configuration, reservation-flow and Vercel deployment guidance are updated.
- [ ] No database, payment flow, seat locking or reservation persistence was introduced.
- [ ] Lint, typecheck, focused tests and production build pass.
- [ ] The independent review covers every agent-verifiable acceptance criterion.
- [ ] The pull request is not merged by an agent.

## Manual tasks

1. Supply the confirmed boat-layout reference image before implementation review if the final seat arrangement must match a real vessel rather than the simplified two-deck contract layout.
2. Confirm that seats `A` through `J` belong to the upper deck and `K` through `T` belong to the lower deck.
3. Confirm whether every seat may be paired with every reservation package or whether package-specific seat restrictions exist. The implementation must assume no restrictions unless confirmed before work begins.
4. Confirm the production Vercel project name and desired assigned or custom domain.
5. In Vercel, rename the project or assign the confirmed domain, configure `NEXT_PUBLIC_SITE_URL`, and redeploy.
6. Verify the live WhatsApp number, seat message and package message on a real phone.
7. Review the deployed boat layout on at least one narrow mobile screen and one desktop screen.

## Manual acceptance criteria

- [ ] The final boat layout accurately reflects the organiser-approved upper and lower deck arrangement.
- [ ] Seat lettering matches the organiser's confirmed physical seating plan.
- [ ] The deployed Vercel URL and any custom domain use the approved `The Signature` naming.
- [ ] A live reservation opens the correct WhatsApp contact with the correct package and seats.
- [ ] The deployed mobile and desktop experience is approved for public promotion.
