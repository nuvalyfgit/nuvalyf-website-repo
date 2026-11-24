import type { Metadata } from "next";
import { ArrowRight, Check, ShieldCheck, Star, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-parts";
import { Walkthrough } from "@/components/home/v2-client";
import { FaqSection } from "@/components/faq-section";
import { PageShell } from "@/components/page-shell";
import { docconnect } from "@/data/site-content";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/find-a-doctor" },
  title: "Find a Doctor & Book Online with DocConnect",
  description: "Book verified doctors near you, see your place in the queue live and know exactly when to leave home. Free for patients.",
};


const perks = [
  { Icon: ShieldCheck, t: "Only verified doctors" },
  { Icon: Star, t: "Reviews only from real, completed visits" },
  { Icon: UsersRound, t: "One account for the whole family" },
  { Icon: Check, t: "Reminder before your turn" },
];

export function generateMetadata() {
  return pageSeo("/find-a-doctor", baseMetadata);
}

export default function FindADoctor() {
  return (
    <PageShell crumbs={[["Find a doctor", "/find-a-doctor"]]}>
      <PageHero
        eyebrow="DocConnect for patients"
        title="Find a doctor"
        highlight="and book online."
        lead="See your place in the queue live and know when to leave home. Free for patients. Launching soon in India and the UAE."
        primary={{ label: "Get early access", href: docconnect.earlyAccessUrl }}
        secondary={{ label: "How it works", href: "#how" }}
        screen="track"
        below={
          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {perks.map(({ Icon, t }) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-[#475569]"><Icon className="h-4 w-4 text-[#0F766E]" />{t}</li>
            ))}
          </ul>
        }
      />
      <Walkthrough eyebrow="How it works" title="How it works." tint steps={[
        { k: "Find", t: "Find a verified doctor", d: "Search by specialty or area and pick a time that suits you.", screen: "book" },
        { k: "Track", t: "Watch your turn live", d: "Know how many are ahead and when to leave home.", screen: "track" },
        { k: "Visit", t: "Walk straight in", d: "Your prescription lands in the app after the visit.", screen: "rx" },
      ]} />

      <FaqSection kind="patient" eyebrow="Patient FAQ" title="Questions patients ask." />

      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-3xl bg-[#0F766E] p-8 text-white sm:p-10 md:flex-row md:items-center">
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
