import type { Metadata } from "next";
import { Schibsted_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Self-hosted at build time: no layout shift, no third-party request.
const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
import { AnalyticsConsent } from "@/components/analytics-consent";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NuvaLyf",
  url: "https://nuvalyf.com",
  logo: "https://nuvalyf.com/nuva-lyf-logo.png",
  email: "business@nuvalyf.com",
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-93845-30408", contactType: "sales", areaServed: "IN" },
    { "@type": "ContactPoint", telephone: "+971-54-431-1859", contactType: "sales", areaServed: "AE" },
  ],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NuvaLyf",
  url: "https://nuvalyf.com",
  inLanguage: ["en", "ar"],
  publisher: { "@type": "Organization", name: "NuvaLyf", url: "https://nuvalyf.com" },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nuvalyf.com"),
  title: { default: "NuvaLyf | Clinic Management System (CMS) & EMR Software", template: "%s | NuvaLyf" },
  description:
    "NuvaLyf is clinic management and EMR software for records, queue, prescriptions and billing. Patients book on DocConnect and track their turn live.",
  openGraph: {
    type: "website",
    siteName: "NuvaLyf",
    title: "NuvaLyf | Run your whole clinic day from one screen",
    description: "Clinic management system (CMS) and DocConnect online booking with a live queue, for India and the UAE.",
  },
  keywords: [
    "Clinic Management Software India",
    "EMR Software India",
    "EMR Software for Doctors",
    "Clinic Software for Doctors",
    "Patient Management Software",
    "Online Doctor Appointment Booking",
    "Clinic Queue Management",
  ],
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined },
  // Icons are picked up automatically from app/icon.png and app/apple-icon.png.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>

      <body>
        {children}
        <AnalyticsConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      </body>
    </html>
  );
}
