import { WhatsAppButton } from "@/components/whatsapp-button";
import { FaqSection } from "@/components/faq-section";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { Cta, Hero, Integrations, Numbers, Proof, Team } from "@/components/home/v2";
import { SpecialtyRail, Walkthrough } from "@/components/home/v2-client";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { JsonLd, emrSoftwareJsonLd } from "@/components/json-ld";
import { getStats } from "@/lib/cms";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar", "x-default": "/" } },
};

export function generateMetadata() {
  return pageSeo("/", baseMetadata);
}

export default async function Home() {
  const stats = await getStats();
  return (
    <main>
      <JsonLd data={emrSoftwareJsonLd} />
      <SiteHeader overlay />
      <Hero clinics={stats.clinics ?? 50} countries={stats.countries ?? 2} />
      <Walkthrough />
      <Numbers clinics={stats.clinics ?? 50} countries={stats.countries ?? 2} served={stats.patientsServed ?? null} period={stats.patientsServedPeriod ?? ""} />
      <SpecialtyRail />
      <Proof />
      <Integrations />
      <Team />
      <FaqSection />
      <Cta />
      <SiteFooter />
      <WhatsAppButton />
      <MobileActionBar />
    </main>
  );
}
