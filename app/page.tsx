import { AboutTeamSection } from "@/components/about-team-section";
import { DemoForm } from "@/components/demo-form";
import { FeaturesSection } from "@/components/features-section";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { JourneySection } from "@/components/journey-section";
import { PlatformSection } from "@/components/platform-section";
import { SecuritySection } from "@/components/security-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SolutionsSection } from "@/components/solutions-section";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <FeaturesSection />
      <JourneySection />
      <PlatformSection />
      <SecuritySection />
      <SolutionsSection />
      <AboutTeamSection />
      <FinalCta />
      <DemoForm />
      <SiteFooter />
    </main>
  );
}
