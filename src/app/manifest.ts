import type { MetadataRoute } from "next";

import { siteMetadata, type SiteMetadataConfig } from "@/lib/site-metadata";

export function createManifest(config: SiteMetadataConfig): MetadataRoute.Manifest {
  return {
    name: config.siteName,
    short_name: config.shortName,
    description: config.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: config.backgroundColor,
    theme_color: config.themeColor,
    lang: config.language,
    icons: [...config.manifestIcons],
  };
}

export default function manifest(): MetadataRoute.Manifest {
  return createManifest(siteMetadata);
}
