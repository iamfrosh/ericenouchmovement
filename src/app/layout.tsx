import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Analytics } from "@/components/layout/Analytics";
import { SITE } from "@/lib/site";
import { siteUrl } from "@/lib/utils";

// Self-hosted variable fonts (Inter for body, Manrope for headings): no runtime request to Google.
const inter = localFont({ src: "./fonts/inter.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const manrope = localFont({ src: "./fonts/manrope.woff2", variable: "--font-manrope", weight: "200 800", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [{ url: "/eem-logo.png", alt: "Eric Enoch Movement logo" }],
  },
  twitter: { card: "summary", title: SITE.name, description: SITE.description },
  icons: { icon: "/eem-logo.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:border focus:border-line focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
