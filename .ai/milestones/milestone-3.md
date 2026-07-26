# Milestone 3: Complete Metadata and Social Sharing

**Status:** Archived
**Version:** 1.0.0  
**Last Updated:** 2026-07-26  
**Depends On:** Milestone 2  
**Target Pull Request:** —  
**Target Branch:** —  
**Superseded By:** —

## Goal

Implement a complete, production-ready metadata system for The Signature so the deployed site presents accurate, polished information in search engines, browser surfaces, bookmarks, messaging apps and social platforms.

The finished milestone must replace the current partial metadata setup with one coherent source of truth, a dedicated landscape social-preview image and all appropriate Next.js App Router metadata files. It must not invent event facts that have not been confirmed.

## Required behaviour

### Metadata source of truth

- Create one small typed metadata/site configuration module for reusable public values such as:
  - site name;
  - default title;
  - title template;
  - description;
  - canonical site URL;
  - social-preview image details;
  - theme and background colours;
  - public language.
- Reuse that source across layout metadata, social images, manifest, robots and sitemap generation where applicable.
- Keep reservation packages and event content in their existing feature-owned sources. Do not turn the metadata configuration into a general content dumping ground.
- Validate and normalise `NEXT_PUBLIC_SITE_URL` before using it as an absolute URL.
- Strip trailing slashes consistently.
- A missing or invalid site URL must not crash local development or the production build.
- Features that require a real absolute production URL must be omitted or fail safely until the value is configured.

### Document metadata

Use the Next.js Metadata API in Server Components to provide a complete root metadata definition for the public site.

It must include, where appropriate:

- a concise default page title;
- a reusable title template;
- a useful meta description written for a person deciding whether to open the site;
- `applicationName`;
- canonical URL when a valid production site URL is configured;
- Open Graph metadata;
- X/Twitter card metadata;
- indexing directives;
- browser/application icons through Next.js file conventions;
- manifest linkage through the Next.js manifest convention;
- appropriate format-detection behaviour where automatic telephone or address linking would be misleading;
- theme colour through the supported viewport metadata API rather than obsolete or duplicated manual tags.

The title and description must:

- use `The Signature` consistently;
- accurately describe a premium, reservation-led boat-party experience;
- mention the seat and package reservation journey only where it reads naturally;
- avoid fake scarcity, unsupported superlatives and unconfirmed date, location or capacity claims;
- remain concise enough to avoid obvious truncation in common search and sharing surfaces.

Do not add obsolete `meta keywords` merely to make the metadata appear more complete.

### Open Graph and social cards

Implement a dedicated social-preview asset for link sharing.

The primary preview must:

- use a landscape `1.91:1` composition, targeting `1200 × 630` pixels;
- be purpose-built for social sharing rather than using the portrait flyer unchanged;
- visually derive from the existing hero and flyer direction;
- show `The Signature` prominently;
- include a short supporting line only when it remains legible at small preview sizes;
- maintain safe text margins so platforms do not crop important content;
- use strong contrast and remain understandable without relying on tiny flyer text;
- contain no unconfirmed date, venue, phone number or availability claim;
- have descriptive alternative text;
- remain within the file-size limits supported by Next.js metadata image conventions.

Preferred implementation:

- use a committed static `opengraph-image` asset when that gives the most predictable rendering and visual control for this single-page site;
- a code-generated `ImageResponse` implementation is acceptable only when it remains simpler, deterministic and visually equivalent;
- do not add a screenshot service, browser automation or runtime image-generation dependency merely to capture the hero section.

The Open Graph metadata must define at least:

- title;
- description;
- canonical URL when configured;
- site name;
- page type appropriate to this public landing page;
- preview image, dimensions, MIME type where available and alt text.

The X/Twitter metadata must use a large-image card and the same approved visual unless a separate crop is genuinely required. Do not add a creator or site account that has not been confirmed.

### Icons and installable-site metadata

Add complete, brand-appropriate icon coverage using Next.js metadata file conventions:

- favicon;
- standard app icon;
- Apple touch icon.

Icons must:

- remain recognisable at small sizes;
- use a simplified brand mark or initials rather than shrinking the full flyer;
- have transparent or intentional backgrounds;
- avoid depending on fine text that becomes unreadable.

Add a web manifest containing only relevant values, including:

- full name: `The Signature`;
- short name;
- description;
- start URL;
- display mode;
- theme colour;
- background colour;
- correctly sized icon references.

Do not turn the site into a PWA project. Offline caching, service workers, install prompts and push notifications are out of scope.

### Search indexing files

Add `robots.ts` and `sitemap.ts` using Next.js metadata route conventions.

Requirements:

- Production robots output must allow crawling of the public landing page.
- Robots output must reference the sitemap only when a valid absolute site URL is available.
- The sitemap must include the canonical public home URL and no invented routes.
- Do not include URL fragments such as `#packages` or `#seat-selection` as sitemap entries.
- Do not emit fake localhost, placeholder or malformed production URLs.
- Sitemap change frequency and priority may be included only when deliberately chosen and must not imply frequently changing inventory.
- Keep both routes deterministic and cacheable.

### Structured data

Review the page for valid JSON-LD opportunities and implement only schema that can be truthful and complete enough to be useful.

- A minimal `WebSite` entity may be added for the canonical site when a valid production URL is configured.
- An `Event` entity must not be published until the required factual event information, especially a confirmed start date and location or valid online-event mode, is available.
- If the repository already contains confirmed event facts by implementation time, an `Event` entity may be added only when its values come from one typed source and match the visible page.
- Do not invent organiser details, dates, venue, address, ticket availability, offers, performers or attendance mode.
- JSON-LD must be serialised safely and rendered in the server-generated document.
- Structured data must never contradict visible page content or metadata.

### Sharing and crawler compatibility

- Ensure essential metadata and social tags appear in the initial server-rendered `<head>`.
- Use absolute URLs for canonical and social-image properties in production.
- Do not depend on client-side JavaScript to create or modify metadata after load.
- Preserve the existing static-generation and Vercel deployment model.
- Do not add user-agent-specific application logic unless Next.js itself requires it for metadata handling.
- Avoid duplicate or conflicting canonical, Open Graph, Twitter, icon or robots declarations.

### Documentation

Update the README with:

- the metadata architecture and source-of-truth location;
- how to edit the title, description and social-preview copy;
- how to replace or regenerate the social image and icons;
- the required format for `NEXT_PUBLIC_SITE_URL`;
- which metadata features are intentionally omitted when the URL is missing;
- how to inspect generated metadata locally and after deployment;
- how to verify the production link preview on major social and messaging platforms;
- the fact that platforms may cache old previews and may require their own re-scrape or refresh tools;
- the confirmed manual deployment checks.

## Constraints

- Preserve Next.js App Router, TypeScript, Tailwind CSS and the current frontend-only architecture.
- Use official Next.js metadata APIs and file conventions instead of manually filling `head` with duplicate tags.
- Keep the implementation proportionate to one public landing page.
- Prefer static metadata and static assets where the content is static.
- Do not add a CMS, database, API, analytics provider or external metadata service.
- Do not add a head-management dependency.
- Do not add an image-generation dependency when normal repository assets or `next/og` are sufficient.
- Do not claim that every platform renders previews identically. Implement standards-compliant metadata and verify representative platforms.
- Do not commit production secrets or private account information.
- Do not merge the pull request as an agent.

## Explicitly out of scope

- Changing reservation packages or boat-seat behaviour
- A visual redesign of the landing page
- Payment or booking infrastructure
- CMS or database integration
- Analytics and advertising pixels
- Search Console or Bing Webmaster account configuration
- Purchasing or configuring a domain
- Automatically modifying Vercel project or DNS settings
- Service workers, offline support or full PWA functionality
- Push notifications
- Dynamic social images per seat or package selection
- Publishing incomplete `Event` structured data
- Adding unconfirmed social-media account handles
- Keyword stuffing or obsolete meta-keyword tags
- Creating extra public routes only to make the sitemap larger

## Required tests

1. Add focused tests for site URL normalisation, including valid URLs, trailing slashes, missing values and malformed values.
2. Add focused tests proving the root metadata uses `The Signature`, the approved description and no old `De Signature` public branding.
3. Verify canonical, Open Graph URL and absolute social-image URL behaviour when a valid production URL is configured.
4. Verify URL-dependent fields are omitted safely when the production URL is missing or invalid.
5. Verify Open Graph metadata includes title, description, site name, type and a `1200 × 630` image with alt text.
6. Verify X/Twitter metadata uses a large-image card and the approved preview asset.
7. Verify the manifest contains the correct name, short name, colours, start URL and valid icon declarations.
8. Verify robots output allows the public site and includes a sitemap only when a valid production URL exists.
9. Verify the sitemap contains exactly the canonical home page and no fragments or placeholder URLs.
10. Verify icons and social-image files or generated routes exist and remain within framework-supported size limits.
11. Verify JSON-LD is absent when sufficient factual data is unavailable, or validate every emitted entity against its typed source when present.
12. Inspect the production build output or rendered document and prove there are no duplicate canonical or conflicting social tags.
13. Run the repository's aggregate validation commands.

At minimum, the completed milestone must pass:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Acceptance criteria

- [ ] Metadata values are owned by one small typed site configuration rather than duplicated across files.
- [ ] `NEXT_PUBLIC_SITE_URL` is validated and normalised before absolute metadata URLs are generated.
- [ ] The root document has an accurate title, title template and description for The Signature.
- [ ] Canonical metadata is correct when the production URL is configured and is not faked when it is unavailable.
- [ ] Complete Open Graph metadata is rendered in the initial HTML.
- [ ] Complete large-image X/Twitter card metadata is rendered in the initial HTML.
- [ ] A dedicated `1200 × 630` landscape social-preview image replaces the portrait flyer as the primary share image.
- [ ] The social image uses the approved brand direction, readable text, safe margins and descriptive alt text.
- [ ] Favicon, standard app icon and Apple touch icon are present and recognisable at their intended sizes.
- [ ] A correct web manifest is generated without introducing service-worker or offline complexity.
- [ ] `robots.ts` safely allows the public page and references only a real configured sitemap URL.
- [ ] `sitemap.ts` emits only the canonical home page and no fragments, placeholders or invented routes.
- [ ] No incomplete or fabricated `Event` structured data is published.
- [ ] Any emitted JSON-LD is server-rendered, valid, truthful and consistent with visible content.
- [ ] Metadata does not contain any public `De Signature` branding.
- [ ] Metadata and share previews do not contain invented date, venue, contact, organiser or availability facts.
- [ ] The implementation contains no duplicate or conflicting canonical, Open Graph, Twitter, icon or robots declarations.
- [ ] The existing reservation and seat-selection behaviour remains unchanged.
- [ ] README metadata, asset-editing, URL configuration and deployment-verification guidance is complete.
- [ ] Lint, typecheck, focused tests and production build pass.
- [ ] The independent review covers every agent-verifiable acceptance criterion.
- [ ] The pull request is not merged by an agent.

## Manual tasks

1. Confirm the final production URL or custom domain and configure it as `NEXT_PUBLIC_SITE_URL` in Vercel.
2. Confirm the final title and description copy before public launch.
3. Review and approve the dedicated landscape social-preview design.
4. Deploy the completed milestone to Vercel.
5. Inspect the deployed page source and confirm that canonical and social-image URLs use the production domain.
6. Share or inspect the production URL through representative services such as WhatsApp, LinkedIn, Facebook and X, accounting for platform preview caching.
7. Refresh cached previews through platform tooling when an old image or description remains.
8. Confirm favicon and Apple home-screen icon appearance on real browser and mobile surfaces.
9. Supply confirmed date and location details later before requesting `Event` structured data.

## Manual acceptance criteria

- [ ] The production URL is configured correctly in Vercel and no metadata points to localhost or a preview deployment.
- [ ] The approved title, description and landscape image appear correctly when the production link is shared.
- [ ] The social preview remains readable and well-cropped on representative messaging and social platforms.
- [ ] Browser-tab, bookmark and mobile home-screen icons are visually approved.
- [ ] Search and crawler files resolve correctly on the production domain.
- [ ] The deployed metadata is approved for public promotion.
