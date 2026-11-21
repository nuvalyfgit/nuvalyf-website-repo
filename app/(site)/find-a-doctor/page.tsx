import type { Metadata } from "next";
import { ArrowRight, BellRing, CalendarCheck2, Check, QrCode, Search, ShieldCheck, Star, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IPhoneJourney } from "@/components/iphone-journey";
import { FaqSection } from "@/components/faq-section";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { docconnect } from "@/data/site-content";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/find-a-doctor" },
  title: "Find a Doctor & Book Online with DocConnect",
  description: "Book verified doctors near you, see your place in the queue live and know exactly when to leave home. Free for patients.",
};

const steps = [
  { Icon: Search, title: "Find a doctor", text: "Search by symptom, specialty or name. See fees, timings and reviews from real visits." },
  { Icon: CalendarCheck2, title: "Book in seconds", text: "Pick a time for yourself or a family member. No calls, no waiting on hold." },
  { Icon: BellRing, title: "Arrive on time", text: "Your live token tells you when to leave home and updates if the doctor runs late." },
];

const perks = [
  { Icon: ShieldCheck, t: "Only verified doctors" },
  { Icon: Star, t: "Reviews only from real, completed visits" },
  { Icon: UsersRound, t: "One account for the whole family" },
  { Icon: QrCode, t: "QR check-in at the clinic" },
];

export function generateMetadata() {
  return pageSeo("/find-a-doctor", baseMetadata);
}

export default function FindADoctor() {
  return (
    <PageShell crumbs={[["Find a doctor", "/find-a-doctor"]]}>
      <section className="nv-hero relative py-20 text-white sm:py-28">
        <div className="nv-aurora"><span /><span /><span /></div>
        <div className="nv-grid" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_85%_20%,rgba(20,184,166,0.18),transparent_60%),radial-gradient(45%_45%_at_10%_90%,rgba(5,150,105,0.14),transparent_62%)]" />
        <div className="site-container relative grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="t-eyebrow text-[#14B8A6]">DocConnect for patients</p>
            <h1 className="t-display mt-5 font-display">
              Book a doctor.
              <br />
              <span className="bg-[linear-gradient(100deg,#14B8A6_0%,#5EEAD4_38%,#6EE7B7_100%)] bg-clip-text text-transparent">Skip the waiting room.</span>
            </h1>
            <p className="t-lead mt-6 max-w-xl text-white/60">See your place in the queue live and know exactly when to leave home. Free for patients. Launching soon in India and the UAE.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full bg-[#14B8A6] px-7 font-bold text-[#042F2E] hover:bg-[#2DD4BF]">
                <a href={docconnect.earlyAccessUrl}>Get early access <ArrowRight /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-white/18 bg-white/[0.04] px-7 font-semibold text-white hover:bg-white/10 hover:text-white">
                <a href="#how">How it works</a>
              </Button>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {perks.map(({ Icon, t }) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-white/70"><Icon className="h-4 w-4 text-[#14B8A6]" />{t}</li>
              ))}
            </ul>
          </div>
          <IPhoneJourney />
        </div>
      </section>

      <section id="how" className="bg-white py-20 sm:py-28">
        <div className="site-container">
          <SectionHeading eyebrow="How it works" title="Three steps. No waiting room." align="center" />
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {steps.map(({ Icon, title, text }, i) => (
              <li key={title} className="rounded-[22px] border border-[#E2E8F0] bg-[#F8FAFC] p-7">
                <span className="text-xs font-bold text-[#94A3B8]">STEP {i + 1}</span>
                <span className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-[#059669] text-white"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 text-lg font-bold text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection kind="patient" eyebrow="Patient FAQ" title="Questions patients ask." />

      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-[28px] bg-[linear-gradient(160deg,#0F172A_0%,#084b45_100%)] p-8 text-white sm:p-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#99F6E4]">Are you a doctor or clinic?</p>
            <h2 className="mt-2 text-2xl font-bold">List your clinic on DocConnect.</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/65"><Check className="h-4 w-4 text-[#14B8A6]" />Your own booking link with 0% commission</p>
          </div>
          <Button asChild size="lg" className="h-12 shrink-0 rounded-full bg-[#14B8A6] px-7 font-bold text-[#042F2E] hover:bg-[#2DD4BF]">
            <a href="/book-a-demo">Get started <ArrowRight /></a>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
