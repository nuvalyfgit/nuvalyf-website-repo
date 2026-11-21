import type { Metadata } from "next";
import { CalendarCheck2, Clock3, MonitorPlay, UsersRound } from "lucide-react";
import { DemoForm } from "@/components/demo-form";
import { PageHero } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/book-a-demo" },
  title: "Book a Demo",
  description: "Book a free 30-minute demo of NuvaLyf EMR and DocConnect. Pick a date and time that suits you.",
};

const what = [
  { Icon: Clock3, t: "30 minutes, online" },
  { Icon: MonitorPlay, t: "Live walkthrough of your workflow" },
  { Icon: UsersRound, t: "Bring your doctors and front desk" },
  { Icon: CalendarCheck2, t: "Pick a time that suits you" },
];

export function generateMetadata() {
  return pageSeo("/book-a-demo", baseMetadata);
}

export default function BookADemoPage() {
  return (
    <PageShell crumbs={[["Book a demo", "/book-a-demo"]]}>
      <PageHero eyebrow="Book a demo" title="See NuvaLyf in action." lead="Tell us about your clinic and choose a time. We'll confirm by email and WhatsApp." primary={null}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {what.map(({ Icon, t }) => (
            <li key={t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm font-semibold text-white/80"><Icon className="h-5 w-5 shrink-0 text-[#14B8A6]" />{t}</li>
          ))}
        </ul>
      </PageHero>
      <DemoForm />
    </PageShell>
  );
}
