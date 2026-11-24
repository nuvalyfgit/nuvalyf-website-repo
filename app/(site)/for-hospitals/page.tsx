import type { Metadata } from "next";
import { BarChart3, Building2, FileLock2, ListOrdered, Pill, ShieldCheck, UsersRound, Workflow } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { CardGrid, PageHero, Section } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { Proof } from "@/components/home/v2";
import { SectionHeading } from "@/components/section-heading";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/for-hospitals" },
  title: "For Hospitals & Clinics",
  description: "Clinic and hospital management software: staff and department coordination, patient flow, queues, pharmacy inventory, digital records, reporting and access control.",
};

const solutions = [
  { Icon: Building2, title: "Hospital & clinic management", text: "Run one clinic or a group of clinics from one platform, with data kept separate per organisation." },
  { Icon: UsersRound, title: "Staff & department coordination", text: "Doctors, nurses, front desk and administrators each get the right tools and the right access." },
  { Icon: Workflow, title: "Patient workflow", text: "Registration, appointment or walk-in, queue, consultation, prescription, billing and follow-up in one flow." },
  { Icon: ListOrdered, title: "Appointments & queues", text: "A live, reorderable queue per doctor that keeps every department aligned." },
  { Icon: Pill, title: "Pharmacy inventory", text: "Medicine stock, batches and expiry tracked alongside prescriptions." },
  { Icon: FileLock2, title: "Digital patient records", text: "One record per patient with history, reports and prescriptions under controlled access." },
  { Icon: BarChart3, title: "Operational reporting", text: "Visits, appointments, collections and activity by doctor, department or clinic." },
  { Icon: ShieldCheck, title: "Security & access management", text: "Role-based permissions, audit trail, clinic data separation and backups." },
];

export function generateMetadata() {
  return pageSeo("/for-hospitals", baseMetadata);
}

export default function ForHospitalsPage() {
  return (
    <PageShell crumbs={[["For hospitals & clinics", "/for-hospitals"]]}>
      <PageHero
        screen="queue"
        eyebrow="For hospitals & clinics"
        title="One software for"
        highlight="your whole hospital."
        lead="From the front desk to the pharmacy to the owner's dashboard, NuvaLyf connects staff, patients and data so your organisation runs as one."
        primary={{ label: "Send an enquiry", href: "#enquiry" }}
        secondary={{ label: "Book a demo", href: "/book-a-demo" }}
      />

      <Section>
        <SectionHeading eyebrow="What you get" title="Made for clinics with many doctors." align="center" />
        <CardGrid items={solutions} cols={4} />
      </Section>

      <Proof />

      <Section id="enquiry" tint>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading eyebrow="Hospital & clinic enquiry" title="Tell us about your organisation." description="Share a few details and our team will come back within one working day with a tailored walkthrough and pricing." />
          <EnquiryForm kind="hospital" />
        </div>
      </Section>
    </PageShell>
  );
}
