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

const reservedHostnames = new Set(["example.com", "example.net", "example.org"]);

function normalizeHostname(url: URL): string {
  const hostnameWithoutTrailingDots = url.hostname.toLowerCase().replace(/\.+$/, "");

  if (hostnameWithoutTrailingDots !== url.hostname) {
    url.hostname = hostnameWithoutTrailingDots;
  }

  return hostnameWithoutTrailingDots.replace(/^\[(.*)\]$/, "$1");
}

function isLoopbackHostname(hostname: string): boolean {
  const ipv4Octets = hostname.split(".");
  const isIpv4Address =
    ipv4Octets.length === 4 &&
    ipv4Octets.every((octet) => /^\d{1,3}$/.test(octet) && Number(octet) <= 255);
  const isIpv4Loopback = isIpv4Address && Number(ipv4Octets[0]) === 127;
  const embeddedIpv4 = hostname.match(/^::(?:ffff:)?([0-9a-f]{1,4}):[0-9a-f]{1,4}$/i);
  const isEmbeddedIpv4Loopback =
    embeddedIpv4 !== null && (Number.parseInt(embeddedIpv4[1], 16) & 0xff00) === 0x7f00;

  return (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "::1" ||
    hostname === "0.0.0.0" ||
    isIpv4Loopback ||
    isEmbeddedIpv4Loopback
  );
}

export function normalizeSiteUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim();

  if (!candidate) {
    return undefined;
  }

  try {
    const url = new URL(candidate);
    const hostname = normalizeHostname(url);
    const hasSupportedProtocol = url.protocol === "https:" || url.protocol === "http:";
    const isLocalHostname = isLoopbackHostname(hostname) || hostname.endsWith(".local");
    const isReservedHostname =
      [...reservedHostnames].some(
        (reservedHostname) =>
          hostname === reservedHostname || hostname.endsWith(`.${reservedHostname}`),
      ) ||
      [".example", ".invalid", ".test"].some((suffix) => hostname.endsWith(suffix));
    const hasCredentials = Boolean(url.username || url.password);
    const hasQueryOrFragment = Boolean(url.search || url.hash);
    const hasNonRootPath = url.pathname !== "/";

    if (
      !hasSupportedProtocol ||
      isLocalHostname ||
      isReservedHostname ||
      hasCredentials ||
      hasQueryOrFragment ||
      hasNonRootPath
    ) {
      return undefined;
    }

    return url.origin;
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
