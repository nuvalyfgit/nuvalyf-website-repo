import type { Metadata } from "next";
import { CalendarClock, ClipboardList, FileText, Search, Stethoscope, UserRound } from "lucide-react";
import { IPhoneJourney } from "@/components/iphone-journey";
import { CardGrid, CtaBand, PageHero, Section } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
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

export default function ForDoctorsPage() {
  return (
    <PageShell crumbs={[["For doctors", "/for-doctors"]]}>
      <PageHero
        eyebrow="For doctors"
        title="Spend your time on patients."
        highlight="Not on paperwork."
        lead="NuvaLyf simplifies everyday clinical work: the context you need before you start, faster notes and prescriptions, and a calmer queue."
        secondary={{ label: "See all features", href: "/products" }}
      />

      <Section>
        <SectionHeading eyebrow="Built around the doctor" title="Everything in the consultation, nothing in the way." align="center" />
        <CardGrid items={benefits} />
      </Section>

      <section className="nv-hero relative py-20 text-white sm:py-28">
        <div className="nv-aurora"><span /><span /><span /></div>
        <div className="nv-grid" />
        <div className="site-container grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <SectionHeading inverse eyebrow="DocConnect for doctors" title="Get found by patients near you." description="Your NuvaLyf profile becomes a verified DocConnect listing. Patients book a time, see their place in the queue live and arrive when you're ready for them." />
          <IPhoneJourney />
        </div>
      </section>

      <CtaBand title="See it with your own workflow." text="Book a 30-minute demo and we'll walk through a consultation the way you run it." />
    </PageShell>
  );
}
