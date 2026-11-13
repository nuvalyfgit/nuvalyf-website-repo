import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nuvalyf.com"),
  title: { default: "NuvaLyf | Clinic EMR & Online Patient Booking", template: "%s | NuvaLyf" },
  description:
    "NuvaLyf EMR runs your clinic: records, queue, prescriptions and billing. DocConnect lets patients book online and track their turn live.",
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
  // Icons are picked up automatically from app/icon.png and app/apple-icon.png.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
