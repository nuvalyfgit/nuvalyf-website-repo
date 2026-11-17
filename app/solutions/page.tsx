import type { Metadata } from "next";
import { ArrowRight, Building2, Crown, Headset, Network, Stethoscope, UsersRound } from "lucide-react";
import { CtaBand, PageHero, Section } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { specialtyPages } from "@/data/more-content";

export const metadata: Metadata = {
  alternates: { canonical: "/solutions" },
  title: "Solutions",
  description: "NuvaLyf solutions for doctors, clinic owners, front desk teams, multi-doctor clinics, hospitals and growing clinic groups, across 12 specialties.",
};

const roles = [
  { Icon: Stethoscope, title: "For Doctors", text: "Fast access to patient context, clinical notes, history, allergies and prescriptions.", href: "/for-doctors" },
  { Icon: Building2, title: "For Hospitals & Clinics", text: "Department coordination, patient flow, pharmacy, reporting and access control.", href: "/for-hospitals" },
  { Icon: Crown, title: "For Clinic Owners", text: "Better visibility across staff, operations, billing, reports and clinic data.", href: "/for-hospitals" },
  { Icon: Headset, title: "For Front Desk Teams", text: "Clear registration, appointment, queue, billing and communication workflows.", href: "/products#front-desk" },
  { Icon: UsersRound, title: "For Multi-Doctor Clinics", text: "Centralised patient management with role-based staff access and coordination.", href: "/for-hospitals" },
  { Icon: Network, title: "For Growing Clinic Groups", text: "Structured operations, controlled information and scalable clinic technology.", href: "/for-hospitals" },
];

export default function SolutionsPage() {
  return (
    <PageShell crumbs={[["Solutions", "/solutions"]]}>
      <PageHero
        eyebrow="Solutions"
        title="Built for every part"
        highlight="of your clinic."
        lead="Give each person the tools and visibility they need, while keeping permissions appropriate to their role."
        secondary={{ label: "Browse specialties", href: "#specialties" }}
      />

      <Section>
        <SectionHeading eyebrow="By role" title="Find the right fit for your team." align="center" />
        <div className="reveal-stagger mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roles.map(({ Icon, title, text, href }) => (
            <a key={title} href={href} className="card-lift group rounded-[22px] border border-[#E2E8F0] bg-white p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ECFDF5] text-[#059669]"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-5 text-lg font-bold text-[#0F172A]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">{text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#059669]">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </a>
          ))}
        </div>
      </Section>

      <Section id="specialties" tint>
        <SectionHeading eyebrow="By specialty" title="Built for the way you practise." description="The same connected core supports a wide range of outpatient care settings." align="center" />
        <div className="reveal-stagger mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {specialtyPages.map((s) => (
            <a key={s.slug} href={`/specialties/${s.slug}`} className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4 text-sm font-semibold text-[#0F172A] transition hover:border-[#059669] hover:text-[#059669]">
              {s.name} <ArrowRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageShell>
  );
}
