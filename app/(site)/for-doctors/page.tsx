import { CardGrid, CtaBand, PageHero, Section } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { Walkthrough, type Step } from "@/components/home/v2-client";
import { RxCard } from "@/components/home/creative";
import type { Metadata } from "next";
import { CalendarClock, ClipboardList, FileText, Search, Stethoscope, UserRound } from "lucide-react";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/for-doctors" },
  title: "For Doctors",
  description: "EMR software for doctors: patient context before you start, faster notes, digital prescriptions and a public profile patients can book through DocConnect.",
};

const benefits = [
  { Icon: ClipboardList, title: "Patient records at a glance", text: "Allergies, vitals, conditions and previous visits on one screen before the patient sits down.", points: ["Clinical timeline", "Reports and scans attached", "Prominent allergy alerts"] },
  { Icon: Stethoscope, title: "Consultation workflow", text: "Move from queue to notes to prescription to follow-up without switching tools.", points: ["Templates for common visits", "Vitals and diagnoses", "Close the visit in one step"] },
  { Icon: FileText, title: "Digital prescriptions", text: "Clear, professional prescriptions with your registration details and signature block.", points: ["Allergy and duplicate warnings", "Preview before finalising", "Share as PDF or on WhatsApp"] },
  { Icon: CalendarClock, title: "Appointments & queue", text: "See today's list, walk-ins and follow-ups, and know who is next.", points: ["Live queue", "Follow-up scheduling", "Running-late updates"] },
  { Icon: UserRound, title: "Doctor profile management", text: "Keep your qualifications, specialties, fees and timings up to date in one place.", points: ["Working hours and leave", "Consultation fees", "Multiple clinics"] },
  { Icon: Search, title: "Profile visibility & discovery", text: "With DocConnect, patients can find your verified profile and book directly.", points: ["Verified badge", "Reviews from real visits", "Your own booking link"], tag: "Soon" },
];

export function generateMetadata() {
  return pageSeo("/for-doctors", baseMetadata);
}

const doctorDay: Step[] = [
  { k: "Before", t: "Know the patient before they sit down", d: "Vitals from the front desk, past visits and allergies, already on your screen.", screen: "consult" },
  { k: "During", t: "Write the prescription in seconds", d: "Favourites, templates and dose suggestions. No retyping the same medicines.", screen: "rx" },
  { k: "After", t: "Patients get it on WhatsApp", d: "Prescription and follow-up date go out automatically. The next patient is already called.", screen: "queue" },
];

export default function ForDoctorsPage() {
  return (
    <PageShell crumbs={[["For doctors", "/for-doctors"]]}>
      <PageHero
        eyebrow="For doctors"
        title="Less paperwork,"
        highlight="more time with patients."
        lead="The context you need before you start, faster prescriptions, and a calmer queue."
        secondary={{ label: "See all features", href: "/products" }}
        screen="rx"
      />
      <Walkthrough eyebrow="Your consultation" title="Your consultation, made easy." steps={doctorDay} />
      <RxCard />
      <Section tint>
        <SectionHeading eyebrow="Built around the doctor" title="What you get." />
        <CardGrid items={benefits} cols={4} />
      </Section>
      <CtaBand title="Book a free demo." text="A 30-minute demo, run the way you consult." />
    </PageShell>
  );
}
