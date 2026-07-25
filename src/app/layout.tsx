import type { Metadata } from "next";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const socialImage = siteUrl
  ? [{ url: "/images/de-signature-flyer.png", width: 1080, height: 1246, alt: "De Signature Party flyer" }]
  : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "De Signature | A curated night out",
  description: "De Signature is an exclusive, reservation-led experience with music by DJ Ozone.",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    title: "De Signature",
    description: "Good people. Great vibes. A curated, reservation-led experience.",
    images: socialImage,
  },
  twitter: { card: "summary_large_image", title: "De Signature", description: "A curated, reservation-led experience.", images: siteUrl ? ["/images/de-signature-flyer.png"] : undefined },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
