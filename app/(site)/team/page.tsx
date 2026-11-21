import type { Metadata } from "next";
import { CtaBand, PageHero, Section } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { TeamCard } from "@/components/team-card";
import { departmentLabels, getTeam } from "@/lib/cms";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/team" },
  title: "Our Team",
  description: "Meet the founders and team building NuvaLyf: leadership, R&D and technology, business development, marketing and our interns.",
};

export function generateMetadata() {
  return pageSeo("/team", baseMetadata);
}

export default async function TeamPage() {
  const team = await getTeam();
  const groups = Object.keys(departmentLabels)
    .map((key) => ({ key, label: departmentLabels[key], members: team.filter((m) => m.department === key) }))
    .filter((g) => g.members.length > 0);

  return (
    <PageShell crumbs={[["Our team", "/team"]]}>
      <PageHero
        eyebrow="Our team"
        title="Meet the people"
        highlight="building NuvaLyf."
        lead="Business vision and technology execution working together to build a better digital experience for healthcare providers."
        primary={{ label: "We're hiring", href: "/careers" }}
      />

      {groups.length > 1 && (
        <nav aria-label="Departments" className="sticky top-[76px] z-30 border-b border-[#E2E8F0] bg-white/90 backdrop-blur">
          <div className="site-container flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {groups.map((g) => (
              <a key={g.key} href={`#${g.key}`} className="shrink-0 rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#475569] hover:border-[#059669] hover:text-[#059669]">{g.label}</a>
            ))}
          </div>
        </nav>
      )}

      {groups.map((g, i) => (
        <Section key={g.key} id={g.key} tint={i % 2 === 1}>
          <div className="flex items-end justify-between gap-4">
            <h2 className="t-h2 font-display text-[#0F172A]">{g.label}</h2>
            <span className="text-sm font-semibold text-[#64748B]">{g.members.length} {g.members.length === 1 ? "person" : "people"}</span>
          </div>
          <div className={`reveal-stagger mt-10 grid gap-6 ${g.key === "leadership" ? "md:grid-cols-2 max-w-5xl" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
            {g.members.map((m) => <TeamCard key={m.slug} m={m} compact={g.key !== "leadership"} />)}
          </div>
        </Section>
      ))}

      <CtaBand eyebrow="Join us" title="Want to build healthcare technology?" text="We're always glad to hear from engineers, designers and healthcare people who care about clinics." href="/careers" label="See careers" />
    </PageShell>
  );
}
