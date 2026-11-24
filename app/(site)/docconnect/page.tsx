import type { Metadata } from "next";
import { getSettings } from "@/lib/cms";
import { Clock3, MessageCircle, ShieldCheck, Star, UsersRound, Video } from "lucide-react";
import { Countdown, WaitlistCards } from "@/components/docconnect-launch";
import { PageHero } from "@/components/page-parts";
import { Walkthrough } from "@/components/home/v2-client";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/docconnect" },
  title: "DocConnect: Launching Soon",
  description: "The waiting room is closing. Book a doctor, watch your turn live and arrive just in time. Join the DocConnect early-access list.",
};

const roadmap = [
  { Icon: Clock3, t: "Live queue and ETA", ready: true },
  { Icon: UsersRound, t: "Family booking", ready: true },
  { Icon: ShieldCheck, t: "Verified doctors", ready: true },
  { Icon: Star, t: "Reviews from real visits", ready: true },
  { Icon: Video, t: "Video consults", ready: false },
  { Icon: MessageCircle, t: "WhatsApp updates", ready: false },
];

export function generateMetadata() {
  return pageSeo("/docconnect", baseMetadata);
}

export default async function DocConnectLaunch() {
  const { launchDate } = await getSettings();
  return (
    <PageShell crumbs={[["DocConnect", "/docconnect"]]}>
      <PageHero
        eyebrow="DocConnect · launching soon"
        title="Book a doctor"
        highlight="and wait from home."
        lead="Book a doctor, watch your turn move live, and leave home only when it is almost time. Coming to clinics in India and the UAE."
        primary={{ label: "Get early access", href: "#early-access" }}
        secondary={{ label: "I run a clinic", href: "#early-access" }}
        screen="track"
        below={<div className="mt-7 inline-flex rounded-2xl bg-[#0B1120] p-3"><Countdown launchDate={launchDate} /></div>}
      />
      <Walkthrough eyebrow="How it works" title="How DocConnect works." tint steps={[
        { k: "Book", t: "Book a verified doctor", d: "Search by specialty, pick a time, book for anyone in your family.", screen: "book" },
        { k: "Track", t: "Track your turn live", d: "See how many are ahead and when to leave home. Updates if the doctor runs late.", screen: "track" },
        { k: "Visit", t: "Walk in, leave with your prescription", d: "Walk in when it is your turn. The prescription lands in the app after the visit.", screen: "rx" },
      ]} />

      {/* Waitlists */}
      <section id="early-access" className="scroll-mt-24 bg-[#F1F5F9] py-14 sm:py-16">
        <div className="site-container">
          <SectionHeading
            eyebrow="Early access"
            title="Join early."
            description="Patients get first access in their city. Clinics that join now lock in founding-partner terms."
            align="center"
          />
          <div className="mt-14"><WaitlistCards /></div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-white py-12">
        <div className="site-container">
          <p className="text-center text-sm font-bold text-[#0F172A]">What&apos;s landing at launch</p>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {roadmap.map(({ Icon, t, ready }) => (
              <span key={t} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${ready ? "bg-[#ECFDF5] text-[#065F46]" : "border border-dashed border-[#c9d6d3] text-[#64748B]"}`}>
                <Icon className="h-4 w-4" />{t}{!ready && <span className="text-xs font-bold text-[#94A3B8]">· soon</span>}
              </span>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
