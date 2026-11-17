import { AboutTeamSection } from "@/components/about-team-section";
import { DocConnectSection } from "@/components/docconnect-section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { DemoForm } from "@/components/demo-form";
import { FeaturesSection } from "@/components/features-section";
import { FaqSection } from "@/components/faq-section";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { JourneySection } from "@/components/journey-section";
import { PlatformSection } from "@/components/platform-section";
import { ReachSection } from "@/components/reach-section";
import { SecuritySection } from "@/components/security-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SolutionsSection } from "@/components/solutions-section";
import { SocialProof } from "@/components/social-proof";
import type { Metadata } from "next";
import { JsonLd, emrSoftwareJsonLd } from "@/components/json-ld";
import { getStats } from "@/lib/cms";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar", "x-default": "/" } },
};

export default async function Home() {
  const stats = await getStats();
  const clinics = stats.clinics ?? 50;
  return (
    <main>
      <JsonLd data={emrSoftwareJsonLd} />
      <SiteHeader />
      <Hero clientCount={clinics} />
      <FeaturesSection />
      <JourneySection />
      <PlatformSection />
      <DocConnectSection />
      <SecuritySection />
      <ReachSection clientCount={clinics} />
      <SocialProof />
      <SolutionsSection />
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
