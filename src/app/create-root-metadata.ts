import type { Metadata } from "next";

import type { SiteMetadataConfig } from "@/lib/site-metadata";

export function createRootMetadata(config: SiteMetadataConfig): Metadata {
  const canonicalUrl = config.canonicalUrl;
  const socialImageUrl = canonicalUrl
    ? new URL(config.socialImage.path, `${canonicalUrl}/`).toString()
    : undefined;
  const socialImages = socialImageUrl
    ? [
        {
          url: socialImageUrl,
          width: config.socialImage.width,
          height: config.socialImage.height,
          type: config.socialImage.type,
          alt: config.socialImage.alt,
        },
      ]
    : [];

  return {
    metadataBase: canonicalUrl ? new URL(canonicalUrl) : undefined,
    title: {
      default: config.defaultTitle,
      template: config.titleTemplate,
    },
    description: config.description,
    applicationName: config.siteName,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    formatDetection: {
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: config.defaultTitle,
      description: config.description,
      siteName: config.siteName,
      type: "website",
      url: canonicalUrl,
      images: socialImages,
    },
    twitter: {
      card: "summary_large_image",
      title: config.defaultTitle,
      description: config.description,
      images: socialImages,
    },
  };
}
