import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/faq-section";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { specialtyPages } from "@/data/more-content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return specialtyPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = specialtyPages.find((p) => p.slug === slug);
  if (!s) return {};
  return {
    title: `${s.name} Clinic Software: EMR & Online Booking`,
    description: `${s.headline} ${s.intro}`,
    alternates: { canonical: `/specialties/${s.slug}` },
  };
}

export default async function SpecialtyPage({ params }: Props) {
  const { slug } = await params;
  const s = specialtyPages.find((p) => p.slug === slug);
  if (!s) notFound();
  const others = specialtyPages.filter((p) => p.slug !== s.slug);

  return (
    <PageShell crumbs={[["Solutions", "/solutions"], [s.name, `/specialties/${s.slug}`]]}>
      <section className="grain relative overflow-hidden bg-[#0B1120] py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_80%_10%,rgba(20,184,166,0.18),transparent_60%)]" />
        <div className="site-container relative max-w-4xl">
          <p className="t-eyebrow text-[#14B8A6]">NuvaLyf for {s.name}</p>
          <h1 className="t-display mt-5 font-display">{s.headline}</h1>
          <p className="t-lead mt-6 max-w-2xl text-white/60">{s.intro}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full bg-[#14B8A6] px-7 font-bold text-[#042F2E] hover:bg-[#2DD4BF]">
              <a href="/book-a-demo">Book a {s.name.toLowerCase()} demo <ArrowRight /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-white/18 bg-white/[0.04] px-7 font-semibold text-white hover:bg-white/10 hover:text-white">
              <a href="/#docconnect">How online booking works</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="site-container">
          <SectionHeading eyebrow="Built for your day" title={`What ${s.name.toLowerCase()} clinics use most.`} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {s.points.map(([t, d]) => (
              <div key={t} className="rounded-[22px] border border-[#E2E8F0] bg-[#F8FAFC] p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#059669] text-white"><Check className="h-5 w-5" /></span>
                <h3 className="mt-5 text-lg font-bold text-[#0F172A]">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">{d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 rounded-[26px] bg-[linear-gradient(160deg,#0F172A_0%,#084b45_100%)] p-8 text-white md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#99F6E4]">NuvaLyf EMR</p>
              <p className="mt-2 text-sm leading-6 text-white/70">Records, live queue, prescriptions, documents, billing and reminders for your {s.name.toLowerCase()} practice.</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#99F6E4]">DocConnect</p>
              <p className="mt-2 text-sm leading-6 text-white/70">Patients find you, book online and track their turn live, so your waiting room stays calm.</p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />

      <section className="bg-white py-16">
        <div className="site-container">
          <p className="text-sm font-bold text-[#0F172A]">Other specialties</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <a key={o.slug} href={`/specialties/${o.slug}`} className="rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#059669] hover:text-[#059669]">{o.name}</a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
