import type { MetadataRoute } from "next";

import { siteMetadata, type SiteMetadataConfig } from "@/lib/site-metadata";

export function createSitemap(config: SiteMetadataConfig): MetadataRoute.Sitemap {
  if (!config.canonicalUrl) {
    return [];
  }

  return [{ url: config.canonicalUrl }];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(siteMetadata);
}
