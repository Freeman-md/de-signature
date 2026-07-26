# Milestone 4: Immersive Boat Seating Plan

**Status:** Frozen
**Version:** 1.0.0  
**Last Updated:** 2026-07-26  
**Depends On:** Milestone 3  
**Target Pull Request:** —  
**Target Branch:** —  
**Superseded By:** —

## Goal

Replace the current abstract seat-grid presentation with a high-fidelity, responsive top-down boat seating plan that immediately reads as the actual vessel while preserving the existing package selection, multi-seat selection and WhatsApp reservation behaviour.

The result should feel closer to a polished cinema seat map or transport booking plan, but visually grounded in the supplied `20 Seater Boat - Seating Map (With Cabin)` reference. It must sell the boat-party experience without turning the site into a fragile 3D demo.

## Implementation decision

Use a custom responsive inline SVG for the boat, decks and structural illustration, combined with native HTML seat buttons positioned over the visual plan from typed coordinate data.

This is the binding default architecture because:

- the required experience is a fixed two-dimensional top-down plan;
- SVG preserves sharp detail across phone, tablet and desktop sizes;
- the boat shell can use paths, gradients, patterns, masks and shadows without shipping a graphics engine;
- native HTML buttons retain reliable keyboard, focus, touch and assistive-technology behaviour;
- the existing React selection state and WhatsApp flow can remain intact.

Do not add Three.js, WebGL, Canvas, a 3D model, a seat-map framework or a graphics editor. Those technologies add bundle size and accessibility work without solving a real requirement in this fixed 20-seat plan. If the implementation agent discovers a genuine blocker that cannot be solved with SVG and normal DOM controls, stop and escalate instead of silently replacing this architecture.

## Required behaviour

### Preserve the working reservation flow

- Preserve the existing three reservation packages and their canonical typed source.
- Preserve package selection and package-only WhatsApp reservation behaviour.
- Preserve selection and deselection of one or multiple seats.
- Preserve seat labels `A` through `T` and their existing deck ownership.
- Preserve selected-seat ordering and singular/plural WhatsApp message grammar.
- Preserve safe handling when the WhatsApp number is absent or invalid.
- Preserve the rule that the integrated reservation action requires one package and at least one selected seat.
- Do not change package prices, contents or message intent.
- Do not claim that seats are booked, held, sold or unavailable.

### Replace the current seat presentation

Replace the current generic boxed or card-like deck diagrams with a dedicated immersive boat-plan stage.

The stage must:

- have an unmistakable boat silhouette before the user reads any labels;
- show the upper deck and lower cabin as two accurate but stylised top-down vessel plans;
- use the supplied boat illustration as the factual reference for structure and seating groups;
- keep all 20 seat controls visually anchored to their real area of the vessel;
- make the deck, aisle, cabin, seating, tables, helm and non-passenger areas easy to understand at a glance;
- remain part of the existing single-page reservation flow;
- preserve the current selected package and selected seats while users inspect or switch decks.

The implementation should be detailed and premium, not photorealistic. It must look intentionally illustrated for The Signature rather than like the reference image was pasted onto the page.

## Boat visual specification

### Shared vessel language

Both plans must use one coherent visual system derived from the current site:

- warm cream, burnt orange, dark brown, black and restrained red accents;
- a clear outer hull and inner deck boundary;
- a pointed bow and recognisable stern;
- layered highlights, shadows and borders that create controlled depth;
- material cues such as wood decking, upholstery, glass or metal where appropriate;
- subtle grain or texture that matches the site without reducing legibility;
- large, readable deck names and orientation cues;
- consistent seat state styling across both decks.

Use SVG gradients, patterns, clipping paths, masks and lightweight filters only where they materially improve the result. Avoid excessive blur, glow or decorative complexity.

### Upper Deck

The upper deck must visually include:

- the complete top-down hull shape;
- an open-deck floor area;
- two rows of five individual passenger chairs around a central aisle;
- seats `A` through `E` in the first row;
- seats `F` through `J` in the second row;
- recognisable upholstered chair shapes with a backrest, cushion and controlled depth, not plain squares;
- a helm or driver area near the bow;
- a windscreen or equivalent separation near the helm;
- a crew area near the stern;
- structural separation between passenger seats and the driver/crew positions;
- driver and crew regions that are visible but never interactive.

The broad orientation and spatial meaning must match the supplied reference even when exact proportions are adjusted for responsive usability.

### Lower Deck / Cabin

The lower plan must visually include:

- the complete top-down hull shape;
- a clearly enclosed cabin boundary;
- two lounge-style seating zones organised around two tables;
- seats `K` through `O` mapped to the first lounge group;
- seats `P` through `T` mapped to the second lounge group;
- bench or sofa segments that read as cabin lounge seating rather than ten unrelated cinema chairs;
- clear selectable divisions for each labelled passenger position;
- a central entry, passage, doorway or equivalent structural break between the two lounge areas;
- cabin windows or equivalent enclosure cues;
- wood-floor or cabin-material treatment that distinguishes this deck from the open upper deck.

Every lower-deck position must still behave as one independent seat button even when several positions visually form one continuous bench.

## Seat rendering and states

Each passenger position must have a recognisable seat shape appropriate to its deck.

Every seat must expose these states:

- `Available`
- `Selected`
- `Keyboard focus`
- `Hover`, where hover exists
- `Pressed`, during pointer interaction

Requirements:

- Keep the seat letter visible in every state.
- Do not rely on colour alone to communicate selection.
- Selected seats must use at least two signals, such as fill plus outline, check mark, raised treatment or state label.
- Focus must remain visually distinct from selection.
- Seat state changes may use subtle transitions but no bouncing, spinning or theatrical animation.
- Respect `prefers-reduced-motion`.
- Do not introduce unavailable, held, reserved or sold styling.

## Responsive presentation

The map must remain useful rather than merely shrinking the desktop artwork.

### Desktop and large tablets

- Give the boat plan enough width to show meaningful structural detail.
- The upper and lower deck may appear stacked or side by side only when both remain legible and all seat controls retain adequate target size.
- The reservation summary should remain visible near the map without obscuring it.

### Phones and narrow tablets

- Show one deck prominently at a time through a clear `Upper Deck` / `Lower Deck` switcher when displaying both simultaneously would make controls too small.
- Preserve all selections when changing the visible deck.
- Show selected counts in the deck controls when useful, for example `Upper Deck · 2 selected`.
- Keep the entire active boat plan inside the viewport without page-level horizontal overflow.
- Do not require pinch zoom, drag-to-pan or device rotation.
- Maintain a minimum 24 by 24 CSS-pixel target in every viewport and target approximately 44 by 44 CSS pixels for touch use wherever the layout permits.
- Seat labels must be readable without browser zoom.

The implementation may adjust internal spacing and decoration by breakpoint, but it must not change seat identity, order or deck ownership.

## Architecture and source ownership

### Visual coordinate model

Extend the existing typed seat-map source so each seat has the minimum visual information needed to place and render it deliberately, such as:

- label;
- deck;
- visual group;
- normalised `x` and `y` position;
- width and height or a named size variant;
- rotation or orientation when required;
- seat visual variant, such as `chair` or `lounge-segment`.

Use normalised coordinates or percentages tied to each deck stage rather than viewport-specific pixel coordinates.

Requirements:

- Keep one canonical definition for seat identity and deck ownership.
- Do not create one data source for behaviour and another contradictory source for visual placement.
- Keep structural SVG artwork separate from reservation state logic.
- Keep pure seat ordering, coordinate validation and WhatsApp helpers independently testable.
- Do not scatter magic coordinates through JSX.

### Rendering layers

Use a deliberate layered structure:

1. an inline SVG illustration layer for hull, floor, furniture, cabin and structural detail;
2. an interaction layer containing native HTML `<button>` elements positioned over their matching seat locations;
3. a normal semantic text layer for deck headings, guidance, legend and selection summary.

The decorative SVG layer should normally be hidden from assistive technology when the same structure and seat meaning are provided semantically. Do not make users navigate dozens of decorative SVG paths.

### Client boundary

- Keep the page server-rendered by default.
- Keep the interactive reservation flow inside the existing focused Client Component boundary.
- Do not move static site sections, metadata or event copy into client rendering.
- Do not add global state management.
- Do not add a graphics runtime dependency.

## Accessibility

- Use native buttons for all 20 passenger seats.
- Give every control a complete accessible name, such as `Upper Deck seat A` or `Lower Deck seat K`.
- Expose selection with `aria-pressed` or another correct native/ARIA state.
- Keep keyboard focus order predictable: upper deck `A` through `J`, then lower deck `K` through `T`.
- Users must be able to select and deselect every seat with keyboard alone.
- The deck switcher must be keyboard operable and expose the active deck correctly.
- Provide normal text that explains the deck groups and selected seats so the spatial diagram is not the only source of meaning.
- Announce meaningful selection-summary changes without producing excessive screen-reader noise.
- Keep visible focus indicators against every material and seat state.
- Do not require hover, drag, pinch, precise pointer movement or colour perception.
- Preserve semantic headings and landmarks.

## Visual quality bar

The milestone is not complete merely because the hull has rounded corners around the existing grid.

The finished selector must satisfy all of these qualities:

- recognisable as a boat from shape and structure alone;
- recognisable upper open deck and enclosed lower cabin;
- visually faithful to the supplied seating-map reference;
- premium enough to support the event's positioning;
- seat positions feel physically placed in the boat rather than arranged in generic cards;
- detail survives desktop display without becoming cluttered on mobile;
- selection states remain clearer than decorative artwork;
- no part resembles a generic SaaS dashboard, cinema grid or wireframe placeholder.

## Performance and resilience

- Do not add Three.js, React Three Fiber, WebGL, Canvas or a seat-map package.
- Do not load a 3D model, texture pack or animation runtime.
- Prefer inline vector paths and CSS over large raster background images.
- Keep filters and textures lightweight enough for mid-range mobile devices.
- Avoid continuous animation and animation-frame loops.
- Do not regress page loading, layout stability or existing static rendering.
- The selector must remain understandable and operable when non-essential CSS motion is disabled.
- A visual-decoration failure must not break seat buttons, package selection or WhatsApp generation.

## Documentation

Update the README to document:

- the new SVG-plus-native-button rendering approach;
- where the hull/deck illustrations live;
- where seat coordinates and visual variants are defined;
- how to reposition a seat without changing its identity;
- how upper and lower deck mobile switching works;
- how to validate the selector after editing the visual plan;
- that the layout is an interactive preference map and does not hold or confirm seats.

## Explicitly out of scope

- Three-dimensional camera controls
- Three.js, React Three Fiber, WebGL or Canvas rendering
- 3D boat models, GLTF/GLB files or photorealistic rendering
- 360-degree tours or virtual reality
- Dragging or rotating the vessel
- User-controlled zoom and pan
- Backend seat availability
- Seat locking, holds, inventory or concurrency control
- Reservation persistence
- Payment integration
- Authentication or administration
- Changing the 20 passenger-seat labels or deck allocation
- Changing reservation packages or prices
- A general-purpose seating-plan editor
- Redesigning unrelated sections of the landing page
- Reworking the completed metadata system

## Required tests

1. Preserve all existing package, seat-selection and WhatsApp tests.
2. Verify the canonical seat data still contains exactly `A` through `T`, with `A`–`J` on the upper deck and `K`–`T` on the lower deck.
3. Verify every seat has one valid visual placement and visual variant.
4. Verify normalised coordinates and dimensions remain inside their deck bounds.
5. Verify every seat label and visual placement is unique.
6. Verify driver and crew regions do not appear as passenger controls.
7. Verify all 20 seats render as native buttons with correct accessible names and selected states.
8. Verify selection persists when switching between upper and lower deck views.
9. Verify keyboard operation and focus order remain correct.
10. Verify the final WhatsApp message remains unchanged in meaning and includes every selected seat.
11. Add focused responsive browser coverage for at least:
    - `320 × 568`;
    - `390 × 844`;
    - `768 × 1024`;
    - `1440 × 900`.
12. At each responsive viewport, verify there is no page-level horizontal overflow and every passenger seat remains reachable.
13. Add focused visual-regression screenshots for the selector at one narrow-phone viewport and one desktop viewport.
14. Verify reduced-motion mode does not hide state changes or controls.
15. Run the repository's aggregate validation commands.

At minimum, the completed milestone must pass:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

When browser or visual tests require a separate script, add and document the smallest clear command for running them.

## Acceptance criteria

- [ ] The current abstract deck grids are replaced by recognisable top-down boat plans.
- [ ] The implementation uses custom inline SVG artwork and native HTML seat buttons.
- [ ] No Three.js, WebGL, Canvas, 3D model or seat-map runtime dependency is introduced.
- [ ] The upper deck visibly includes the hull, open deck, two rows of five chairs, central aisle, helm, windscreen and crew region.
- [ ] The lower deck visibly includes the hull, enclosed cabin, two lounge groups, two tables, central passage and cabin enclosure cues.
- [ ] Seats `A`–`J` remain on the upper deck and `K`–`T` remain on the lower deck.
- [ ] Driver and crew regions are never selectable.
- [ ] Every seat is visually anchored to its correct part of the vessel.
- [ ] Upper-deck seats look like upholstered chairs rather than boxes.
- [ ] Lower-deck positions look like selectable lounge segments rather than unrelated cinema chairs.
- [ ] Available, selected, focus, hover and pressed states are clear and coherent.
- [ ] Selection is not communicated by colour alone.
- [ ] All 20 seat controls remain native, keyboard operable and accessibly named.
- [ ] The deck switcher works on narrow screens and preserves selections.
- [ ] The selector has no page-level horizontal overflow at the required viewports.
- [ ] Seat labels remain readable and controls remain touch-usable on narrow phones.
- [ ] Package selection, multi-seat selection, summary and WhatsApp behaviour remain correct.
- [ ] Missing WhatsApp configuration continues to fail safely.
- [ ] The rest of the landing page remains server-rendered and visually unchanged except where integration requires a small adjustment.
- [ ] Typed seat identity and visual-placement data have one source of truth.
- [ ] Responsive and visual-regression coverage is present and passing.
- [ ] README documentation is updated.
- [ ] Lint, typecheck, focused tests and production build pass.
- [ ] The independent review covers every agent-verifiable acceptance criterion.
- [ ] The pull request is not merged by an agent.

## Manual tasks

1. Compare the completed upper and lower deck plans against the supplied boat reference.
2. Confirm that the illustration captures the organiser's intended real vessel closely enough for public reservation use.
3. Confirm the orientation of the bow, stern, upper rows and lower lounge groups.
4. Review the selector on a real narrow phone, tablet and desktop display.
5. Confirm that every visible seat label corresponds to the intended real passenger position.
6. Test a live package-and-seat WhatsApp reservation on a phone.
7. Approve the final visual balance between realism, brand styling and selection clarity.

## Manual acceptance criteria

- [ ] The organiser immediately recognises the selector as the intended boat rather than a generic seating diagram.
- [ ] The upper and lower deck structures match the supplied reference closely enough for customers to understand where they are choosing.
- [ ] Seat labels map correctly to the organiser-approved passenger positions.
- [ ] The final mobile presentation remains clear without zooming or horizontal scrolling.
- [ ] The final desktop presentation contains enough structural detail to sell the boat-party experience.
- [ ] A live reservation opens the correct WhatsApp contact with the selected package and seats.
- [ ] The deployed selector is approved for public promotion.
