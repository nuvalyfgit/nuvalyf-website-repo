import type { Metadata } from "next";
import { Briefcase, GraduationCap, HeartPulse, MapPin, Rocket, UsersRound } from "lucide-react";
import { CardGrid, PageHero, Section } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { contact } from "@/data/site-content";
import { getJobs } from "@/lib/cms";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Careers",
  description: "Join NuvaLyf and build healthcare technology used by clinics in India and the UAE. Open roles and internships.",
};

const why = [
  { Icon: HeartPulse, title: "Work that matters", text: "What you build is used by doctors and patients every day." },
  { Icon: Rocket, title: "Real ownership", text: "A small team where your ideas ship and you see the impact." },
  { Icon: GraduationCap, title: "Learn fast", text: "Work across product, engineering and the clinics we serve." },
  { Icon: UsersRound, title: "Founder access", text: "Work directly with the founders on product and growth." },
];

const typeLabel: Record<string, string> = { "full-time": "Full-time", internship: "Internship", contract: "Contract" };

export function generateMetadata() {
  return pageSeo("/careers", baseMetadata);
}

export default async function CareersPage() {
  const jobs = await getJobs();
  const apply = (title: string) => `mailto:${contact.email}?subject=${encodeURIComponent(`Application: ${title}`)}`;

  return (
    <PageShell crumbs={[["Careers", "/careers"]]}>
      <PageHero eyebrow="Careers" title="Build the future of" highlight="connected healthcare." lead="We're a founder-led team making clinic technology simple, secure and accessible. Come build it with us." primary={{ label: "See open roles", href: "#roles" }} />

      <Section>
        <SectionHeading eyebrow="Why NuvaLyf" title="A place to do your best work." align="center" />
        <CardGrid items={why} cols={4} />
      </Section>

      <Section id="roles" tint>
        <SectionHeading eyebrow="Open roles" title={jobs.length ? `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"}` : "No open roles right now"} />
        {jobs.length > 0 ? (
          <div className="mt-10 space-y-3">
            {jobs.map((j) => (
              <article key={j.slug} className="flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{j.title}</h3>
                  <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#64748B]">
                    {j.team && <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{j.team}</span>}
                    {j.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{j.location}</span>}
                    <span>{typeLabel[j.type] ?? j.type}</span>
                  </p>
                  {j.summary && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#475569]">{j.summary}</p>}
                </div>
                <a href={apply(j.title)} className="shrink-0 rounded-full bg-[#059669] px-6 py-3 text-center text-sm font-bold text-white hover:bg-[#047857]">Apply</a>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-8">
            <p className="text-[#475569]">We don&apos;t have any open positions at the moment, but we&apos;re always happy to hear from people who care about healthcare.</p>
            <a href={apply("Open application")} className="mt-5 inline-block rounded-full bg-[#059669] px-6 py-3 text-sm font-bold text-white hover:bg-[#047857]">Send your CV</a>
          </div>
        )}
      </Section>
    </PageShell>
  );
}
