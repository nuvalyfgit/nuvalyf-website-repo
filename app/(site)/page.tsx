import { AboutTeamSection } from "@/components/about-team-section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { DemoForm } from "@/components/demo-form";
import { FaqSection } from "@/components/faq-section";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { FinalCta } from "@/components/final-cta";
import { Bento, CinematicHero, DocConnectBand, StorySection, TrustStrip } from "@/components/home/sections";
import { SpotlightTracker } from "@/components/home/effects";
import { Story } from "@/components/home/story";
import { BeforeAfterSection, CalculatorSection, GlobeNumbers, TryDemoSection } from "@/components/home/more-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SocialProof } from "@/components/social-proof";
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
  const clinics = stats.clinics ?? 50;
  return (
    <main>
      <JsonLd data={emrSoftwareJsonLd} />
      <SiteHeader overlay />
      <SpotlightTracker />
      <CinematicHero clinics={clinics} served={stats.patientsServed} period={stats.patientsServedPeriod} />
      <StorySection><Story /></StorySection>
      <TryDemoSection />
      <Bento />
      <BeforeAfterSection />
      <GlobeNumbers clinics={clinics} countries={stats.countries ?? 2} />
      <CalculatorSection />
      <DocConnectBand />
      <TrustStrip />
      <SocialProof />
      <AboutTeamSection />
      <FaqSection />
      <FinalCta />
      <DemoForm />
      <SiteFooter />
      <WhatsAppButton />
      <MobileActionBar />
    </main>
  );
}
