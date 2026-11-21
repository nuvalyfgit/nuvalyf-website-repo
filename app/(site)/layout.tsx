import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Self-hosted at build time: no layout shift, no third-party request.
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
import { AnalyticsConsent } from "@/components/analytics-consent";
import Script from "next/script";
import { prefsScript } from "@/components/prefs";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://nuvalyf.com"),
  title: { default: "NuvaLyf | Clinic EMR & Online Patient Booking", template: "%s | NuvaLyf" },
  description:
    "NuvaLyf EMR runs your clinic: records, queue, prescriptions and billing. DocConnect lets patients book online and track their turn live. Book a demo today.",
  openGraph: {
    type: "website",
    siteName: "NuvaLyf",
    title: "NuvaLyf | Run your clinic. Fill it with patients.",
    description: "Clinic EMR and DocConnect online booking with a live queue, for India and the UAE.",
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
    <html lang="en" className={`scroll-smooth ${sans.variable} ${serif.variable}`} suppressHydrationWarning>

      <body>
        <Script id="nv-prefs" strategy="beforeInteractive">{prefsScript}</Script>
        {children}
        <AnalyticsConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
