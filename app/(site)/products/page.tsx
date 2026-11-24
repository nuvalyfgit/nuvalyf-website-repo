import { JsonLd, emrSoftwareJsonLd } from "@/components/json-ld";
import { CtaBand, PageHero } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { Proof } from "@/components/home/v2";
import { ModuleTabs, Walkthrough } from "@/components/home/v2-client";
import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/products" },
  title: "Products & Features",
  description: "NuvaLyf CMS: patient, doctor, appointment and queue management, digital prescriptions, pharmacy inventory, reports and role-based access in one platform.",
};

export function generateMetadata() {
  return pageSeo("/products", baseMetadata);
}

export default function ProductsPage() {
  return (
    <PageShell crumbs={[["Products & features", "/products"]]}>
      <JsonLd data={emrSoftwareJsonLd} />
      <PageHero
        eyebrow="Products & features"
        title="All the tools"
        highlight="your clinic needs."
        lead="Front desk, consultation, pharmacy, billing and reports. Start with what you need and switch on the rest later."
        secondary={{ label: "See the modules", href: "#modules" }}
        screen="consult"
      />
      <ModuleTabs />
      <Walkthrough />
      <Proof />
      <CtaBand />
    </PageShell>
  );
}
