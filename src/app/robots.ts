import type { MetadataRoute } from "next";

import { siteMetadata, type SiteMetadataConfig } from "@/lib/site-metadata";

export function createRobots(config: SiteMetadataConfig): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: config.canonicalUrl ? `${config.canonicalUrl}/sitemap.xml` : undefined,
  };
}

export default function robots(): MetadataRoute.Robots {
  return createRobots(siteMetadata);
}
