import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { FaqSection } from "@/components/faq-section";
import { PageHero, Section } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { categoryLabels, formatDate, getPosts } from "@/lib/cms";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/resources" },
  title: "Resources & Blog",
  description: "Guides, clinic operations tips and product updates from the NuvaLyf team.",
};

export function generateMetadata() {
  return pageSeo("/resources", baseMetadata);
}

export default async function ResourcesPage() {
  const posts = await getPosts();
  return (
    <PageShell crumbs={[["Resources", "/resources"]]}>
      <PageHero eyebrow="Resources" title="Ideas for running" highlight="a better clinic." lead="Practical guides on clinic operations, choosing software and getting the most from NuvaLyf." primary={null} />

      <Section>
        {posts.length === 0 ? (
          <p className="text-[#64748B]">Articles are coming soon.</p>
        ) : (
          <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <a key={p.slug} href={`/resources/${p.slug}`} className="card-lift group flex flex-col overflow-hidden rounded-[22px] border border-[#E2E8F0] bg-white p-7">
                {p.cover && <Image src={p.cover} alt={p.coverAlt || p.title} width={600} height={315} className="-mx-7 -mt-7 mb-6 aspect-[1200/630] w-[calc(100%+3.5rem)] max-w-none object-cover" />}
                <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">{categoryLabels[p.category] ?? p.category}</span>
                <h2 className="mt-3 text-xl font-bold leading-snug text-[#0F172A]">{p.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#64748B]">{p.summary}</p>
                <span className="mt-6 flex items-center justify-between text-sm text-[#94A3B8]">
                  {formatDate(p.date)}
                  <ArrowRight className="h-4 w-4 text-[#059669] transition group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        )}
      </Section>

      <FaqSection eyebrow="FAQ" title="Questions clinics ask." />
    </PageShell>
  );
}
