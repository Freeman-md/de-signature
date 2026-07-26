import { describe, expect, it } from "vitest";

import { createManifest } from "@/app/manifest";
import { createRobots } from "@/app/robots";
import { createSitemap } from "@/app/sitemap";
import { createSiteMetadata } from "@/lib/site-metadata";

describe("metadata routes", () => {
  it("provides a focused web manifest with valid icon declarations", () => {
    const config = createSiteMetadata();
    const manifest = createManifest(config);

    expect(manifest).toMatchObject({
      name: "The Signature",
      short_name: "Signature",
      description: config.description,
      start_url: "/",
      scope: "/",
      display: "standalone",
      theme_color: "#110d0b",
      background_color: "#110d0b",
      lang: "en",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      ],
    });
  });

  it("allows the public page and links the configured sitemap", () => {
    const robots = createRobots(createSiteMetadata("https://signatureparty.ng/"));

    expect(robots.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(robots.sitemap).toBe("https://signatureparty.ng/sitemap.xml");
  });

  it("omits the sitemap reference when no safe production URL exists", () => {
    expect(createRobots(createSiteMetadata()).sitemap).toBeUndefined();
    expect(createRobots(createSiteMetadata("https://localhost:3000")).sitemap).toBeUndefined();
  });

  it("contains exactly the canonical home page when configured", () => {
    const sitemap = createSitemap(createSiteMetadata("https://signatureparty.ng/"));

    expect(sitemap).toEqual([{ url: "https://signatureparty.ng" }]);
    expect(JSON.stringify(sitemap)).not.toContain("#");
    expect(JSON.stringify(sitemap)).not.toContain("localhost");
  });

  it("is empty rather than publishing a placeholder URL when unconfigured", () => {
    expect(createSitemap(createSiteMetadata())).toEqual([]);
    expect(createSitemap(createSiteMetadata("invalid"))).toEqual([]);
  });
});
