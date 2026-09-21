import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NUVA LYF | Clinic Management & EMR Software India",
  description:
    "Modern clinic management and EMR software connecting patient records, appointments, consultations, prescriptions, billing and communication.",
  keywords: [
    "Clinic Management Software India",
    "EMR Software India",
    "EMR Software for Doctors",
    "Clinic Software for Doctors",
    "Patient Management Software",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
