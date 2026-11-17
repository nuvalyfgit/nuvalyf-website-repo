import type { Metadata } from "next";
import { JsonLd, emrSoftwareJsonLd } from "@/components/json-ld";
import { CardGrid, CtaBand, PageHero, Section } from "@/components/page-parts";
import { JourneySection } from "@/components/journey-section";
import { PageShell } from "@/components/page-shell";
import { PlatformSection } from "@/components/platform-section";
import { SecuritySection } from "@/components/security-section";
import { SectionHeading } from "@/components/section-heading";
import { moduleGroups } from "@/data/modules";

export const metadata: Metadata = {
  alternates: { canonical: "/products" },
  title: "Products & Features",
  description: "NuvaLyf EMR: patient, doctor, appointment and queue management, digital prescriptions, pharmacy inventory, reports and role-based access in one platform.",
};

export default function ProductsPage() {
  return (
    <PageShell crumbs={[["Products & features", "/products"]]}>
      <JsonLd data={emrSoftwareJsonLd} />
      <PageHero
        eyebrow="Products & features"
        title="Everything your clinic needs."
        highlight="Connected in one record."
        lead="Fourteen modules that cover the full outpatient journey, from the front desk to the consultation room to the owner's dashboard."
        secondary={{ label: "Try the interactive tour", href: "#platform" }}
      />

      <nav aria-label="Module groups" className="sticky top-[76px] z-30 border-b border-[#E2E8F0] bg-white/90 backdrop-blur">
        <div className="site-container flex gap-2 overflow-x-auto py-3 scrollbar-none">
          {moduleGroups.map((g) => (
            <a key={g.title} href={`#${g.title.toLowerCase().replace(" ", "-")}`} className="shrink-0 rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#475569] hover:border-[#059669] hover:text-[#059669]">{g.title}</a>
          ))}
          <a href="#platform" className="shrink-0 rounded-full bg-[#0F172A] px-4 py-2 text-sm font-semibold text-white">Interactive tour</a>
        </div>
      </nav>

      {moduleGroups.map((g, i) => (
        <Section key={g.title} id={g.title.toLowerCase().replace(" ", "-")} tint={i % 2 === 1}>
          <SectionHeading eyebrow={`${g.items.length} modules`} title={g.title} description={g.text} />
          <CardGrid items={g.items} cols={g.items.length === 4 ? 2 : 3} />
        </Section>
      ))}

      <PlatformSection />
      <JourneySection />
      <SecuritySection />
      <CtaBand />
    </PageShell>
  );
}
