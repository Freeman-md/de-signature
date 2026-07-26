export type SiteMetadataConfig = {
  siteName: string;
  shortName: string;
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  canonicalUrl?: string;
  language: string;
  themeColor: string;
  backgroundColor: string;
  socialImage: {
    path: string;
    width: number;
    height: number;
    type: "image/png";
    alt: string;
  };
  manifestIcons: ReadonlyArray<{
    src: string;
    sizes: string;
    type: "image/png";
    purpose: "any";
  }>;
};

const localHostnames = new Set(["localhost", "127.0.0.1", "::1"]);
const reservedHostnames = new Set(["example.com", "example.net", "example.org"]);

export function normalizeSiteUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim();

  if (!candidate) {
    return undefined;
  }

  try {
    const url = new URL(candidate);
    const hasSupportedProtocol = url.protocol === "https:" || url.protocol === "http:";
    const isLocalHostname = localHostnames.has(url.hostname) || url.hostname.endsWith(".local");
    const isReservedHostname =
      [...reservedHostnames].some(
        (hostname) => url.hostname === hostname || url.hostname.endsWith(`.${hostname}`),
      ) ||
      [".example", ".invalid", ".test"].some((suffix) => url.hostname.endsWith(suffix));
    const hasCredentials = Boolean(url.username || url.password);
    const hasQueryOrFragment = Boolean(url.search || url.hash);

    if (
      !hasSupportedProtocol ||
      isLocalHostname ||
      isReservedHostname ||
      hasCredentials ||
      hasQueryOrFragment
    ) {
      return undefined;
    }

    const path = url.pathname === "/" ? "" : url.pathname.replace(/\/+$/, "");

    return `${url.origin}${path}`;
  } catch {
    return undefined;
  }
}

export function createSiteMetadata(siteUrl = process.env.NEXT_PUBLIC_SITE_URL): SiteMetadataConfig {
  return {
    siteName: "The Signature",
    shortName: "Signature",
    defaultTitle: "The Signature | Premium Boat Party Reservations",
    titleTemplate: "%s | The Signature",
    description:
      "Choose your package and seats for The Signature, a premium, reservation-led boat-party experience.",
    canonicalUrl: normalizeSiteUrl(siteUrl),
    language: "en",
    themeColor: "#110d0b",
    backgroundColor: "#110d0b",
    socialImage: {
      path: "/opengraph-image.png",
      width: 1200,
      height: 630,
      type: "image/png",
      alt: "The Signature boat-party preview with package and seat reservation invitation",
    },
    manifestIcons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}

export const siteMetadata = createSiteMetadata();
