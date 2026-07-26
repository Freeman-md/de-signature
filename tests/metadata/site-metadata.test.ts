import { describe, expect, it } from "vitest";

import { createRootMetadata } from "@/app/create-root-metadata";
import { createSiteMetadata, normalizeSiteUrl } from "@/lib/site-metadata";

describe("site URL normalisation", () => {
  it.each([
    ["https://signatureparty.ng", "https://signatureparty.ng"],
    ["https://signatureparty.ng/", "https://signatureparty.ng"],
    ["http://signatureparty.ng:8080/", "http://signatureparty.ng:8080"],
    [" https://SIGNATUREPARTY.NG./ ", "https://signatureparty.ng"],
    ["https://127.signatureparty.ng/", "https://127.signatureparty.ng"],
  ])("normalises %s", (input, expected) => {
    expect(normalizeSiteUrl(input)).toBe(expected);
  });

  it.each([
    undefined,
    "",
    "not a URL",
    "ftp://the-signature.example",
    "https://localhost:3000",
    "https://app.localhost",
    "http://localhost.",
    "http://127.0.0.1:3000",
    "http://127.0.0.2",
    "http://127.255.255.255",
    "http://127.1",
    "http://[::1]:3000",
    "http://[0:0:0:0:0:0:0:1]",
    "http://0.0.0.0",
    "https://signature.local",
    "https://the-signature.example",
    "https://example.com",
    "https://events.example.com",
    "https://signature.invalid",
    "https://signature.test",
    "https://user:password@signatureparty.ng",
    "https://signatureparty.ng?preview=true",
    "https://signatureparty.ng/#packages",
    "https://signatureparty.ng/events",
    "https://signatureparty.ng/events/",
    "https://signatureparty.ng//",
  ])("rejects missing, malformed, or non-production values (%s)", (input) => {
    expect(normalizeSiteUrl(input)).toBeUndefined();
  });
});

describe("root metadata", () => {
  it("uses the approved public brand and description", () => {
    const config = createSiteMetadata();
    const serializedMetadata = JSON.stringify(createRootMetadata(config));

    expect(config.description).toBe(
      "Choose your package and seats for The Signature, a premium, reservation-led boat-party experience.",
    );
    expect(serializedMetadata).toContain("The Signature");
    expect(serializedMetadata).toContain(config.description);
    expect(serializedMetadata).not.toContain("De Signature");
    expect(serializedMetadata).not.toContain("keywords");
  });

  it("builds canonical and absolute social URLs from a valid site URL", () => {
    const config = createSiteMetadata("https://signatureparty.ng/");
    const metadata = createRootMetadata(config);
    const socialImageUrl = "https://signatureparty.ng/opengraph-image.png";

    expect(metadata.metadataBase?.toString()).toBe("https://signatureparty.ng/");
    expect(metadata.alternates?.canonical).toBe("https://signatureparty.ng");
    expect(metadata.openGraph?.url).toBe("https://signatureparty.ng");
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({ url: socialImageUrl }),
    ]);
    expect(metadata.twitter?.images).toEqual([
      expect.objectContaining({ url: socialImageUrl }),
    ]);
  });

  it.each([undefined, "invalid", "https://localhost:3000"])(
    "omits absolute URL fields safely for %s",
    (siteUrl) => {
      const metadata = createRootMetadata(createSiteMetadata(siteUrl));

      expect(metadata.metadataBase).toBeUndefined();
      expect(metadata.alternates).toBeUndefined();
      expect(metadata.openGraph?.url).toBeUndefined();
      expect(metadata.openGraph?.images).toEqual([]);
      expect(metadata.twitter?.images).toEqual([]);
    },
  );

  it("provides complete Open Graph and X card definitions", () => {
    const config = createSiteMetadata("https://signatureparty.ng");
    const metadata = createRootMetadata(config);

    expect(metadata.openGraph).toMatchObject({
      title: config.defaultTitle,
      description: config.description,
      siteName: config.siteName,
      type: "website",
      images: [
        {
          width: 1200,
          height: 630,
          type: "image/png",
          alt: config.socialImage.alt,
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: config.defaultTitle,
      description: config.description,
      images: [{ url: "https://signatureparty.ng/opengraph-image.png" }],
    });
  });
});
