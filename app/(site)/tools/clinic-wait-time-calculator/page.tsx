import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { WaitCalculator } from "@/components/home/interactive";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  title: "Clinic Wait Time Calculator: Estimate Time Saved",
  description: "Free calculator for clinics: estimate how many hours of patient waiting a live queue and reminders could save each month. Book a demo to see it.",
  alternates: { canonical: "/tools/clinic-wait-time-calculator" },
};

export function generateMetadata() {
  return pageSeo("/tools/clinic-wait-time-calculator", baseMetadata);
}

export default function CalculatorPage() {
  return (
    <PageShell crumbs={[["Tools", "/tools/clinic-wait-time-calculator"], ["Waiting time calculator", "/tools/clinic-wait-time-calculator"]]}>
      <section className="nv-hero py-20 text-white sm:py-28">
        <div className="nv-grid" />
        <div className="site-container max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#5eead4]">Free tool</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">Clinic waiting time calculator</h1>
          <p className="mt-5 text-lg leading-8 text-white/70">Long waits cost patients time and cost clinics visits. Enter your numbers to estimate what a live queue and visit reminders could change.</p>
        </div>
      </section>
      <section className="bg-[#f6faf9] py-16 sm:py-24">
        <div className="site-container"><WaitCalculator /></div>
      </section>
      <section className="bg-white py-16">
        <div className="site-container max-w-3xl space-y-4 text-[#475569]">
          <h2 className="font-display text-2xl font-semibold text-[#0b1120]">How the estimate works</h2>
          <p>Waiting time saved assumes patients who see a live ETA on their phone arrive closer to their turn, cutting time in the waiting room by about 30%. Extra visits assume reminders recover about 5% of appointments that would otherwise be missed.</p>
          <p>These are starting assumptions, not guarantees. During a demo we can look at your actual numbers.</p>
        </div>
      </section>
    </PageShell>
  );
}
