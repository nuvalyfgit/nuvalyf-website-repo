const base = "https://nuvalyf.com";

/** Structured data for search engines. Renders an invisible script tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Breadcrumb trail. Home is added first automatically. */
export function BreadcrumbJsonLd({ crumbs }: { crumbs: [name: string, path: string][] }) {
  const items = [["Home", "/"], ...crumbs];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${base}${path === "/" ? "" : path}` })),
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: [string, string][] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      }}
    />
  );
}

/** The EMR as a software product. No ratings or prices: we only state what's true. */
export const emrSoftwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NuvaLyf CMS",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Clinic management and EMR software",
  operatingSystem: "Web browser",
  url: `${base}/products`,
  description:
    "Clinic EMR and practice management software: patient records, appointments, live queue, digital prescriptions, pharmacy inventory, billing and reports.",
  areaServed: ["IN", "AE"],
  publisher: { "@type": "Organization", name: "NuvaLyf", url: base },
};
