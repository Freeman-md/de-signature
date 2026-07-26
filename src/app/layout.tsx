import type { Metadata, Viewport } from "next";

import { createRootMetadata } from "@/app/create-root-metadata";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = createRootMetadata(siteMetadata);

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: siteMetadata.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang={siteMetadata.language}><body>{children}</body></html>;
}
