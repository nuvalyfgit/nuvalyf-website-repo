import type { Metadata } from "next";
import { getSettings } from "@/lib/cms";
import { ArrowRight, BellRing, Check, Clock3, MessageCircle, QrCode, ShieldCheck, Star, UsersRound, Video } from "lucide-react";
import { Countdown, WaitlistCards, WaitSlider } from "@/components/docconnect-launch";
import { IPhoneJourney } from "@/components/iphone-journey";
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
  { Icon: QrCode, t: "QR check-in", ready: true },
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
      {/* Hero */}
      <section className="nv-hero relative pb-24 pt-16 text-white sm:pt-24">
        <div className="nv-aurora"><span /><span /><span /></div>
        <div className="nv-grid" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_80%_25%,rgba(20,184,166,0.2),transparent_60%),radial-gradient(45%_45%_at_5%_95%,rgba(5,150,105,0.16),transparent_62%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]"
          style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)", backgroundSize: "68px 68px" }}
        />
        <div className="site-container relative grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-3.5 py-2 text-xs font-bold text-[#99F6E4]">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14B8A6] opacity-70" /><span className="relative h-2 w-2 rounded-full bg-[#14B8A6]" /></span>
              DocConnect · launching soon
            </span>
            <h1 className="t-display mt-7 font-display">
              The waiting room
              <br />
              <span className="bg-[linear-gradient(100deg,#14B8A6_0%,#5EEAD4_38%,#6EE7B7_100%)] bg-clip-text text-transparent">is closing.</span>
            </h1>
            <p className="t-lead mt-7 max-w-xl text-white/60">
              Book a doctor, watch your place in line move live, and leave home only when it&apos;s almost your turn. Coming to clinics in India and the UAE.
            </p>
            <div className="mt-9"><Countdown launchDate={launchDate} /></div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#early-access" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#14B8A6] px-8 text-[15px] font-bold text-[#042F2E] shadow-[0_16px_40px_rgba(20,184,166,0.28)] transition hover:bg-[#2DD4BF]">
                Get early access <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#early-access" className="inline-flex h-13 items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-8 text-[15px] font-semibold text-white transition hover:bg-white/10">
                I run a clinic
              </a>
            </div>
          </div>
          <IPhoneJourney />
        </div>
      </section>

      {/* Slider */}
      <section className="bg-[#f6faf9] py-24 sm:py-32">
        <div className="site-container grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Wait at home, not here"
            title="Get your evening back."
            description="Drag the slider. Every patient ahead of you is time you'd normally spend on a plastic chair. DocConnect turns it into time at home."
          />
          <WaitSlider />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-24 sm:py-32">
        <div className="site-container">
          <SectionHeading eyebrow="How it works" title="Book. Track. Arrive just in time." align="center" />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              { Icon: Check, t: "Book a verified doctor", d: "Search by symptom or specialty, pick a time, book for anyone in your family." },
              { Icon: Clock3, t: "Track your turn live", d: "See how many are ahead and the exact time to leave home. Updates if the doctor runs late." },
              { Icon: BellRing, t: "Walk straight in", d: "Scan the QR at the door. Your prescription lands in the app after the visit." },
            ].map(({ Icon, t, d }, i) => (
              <div key={t} className="rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFC] p-7">
                <span className="text-xs font-bold text-[#94A3B8]">0{i + 1}</span>
                <span className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-[#059669] text-white"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 text-lg font-bold text-[#0F172A]">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlists */}
      <section id="early-access" className="scroll-mt-24 bg-[#F1F5F9] py-24 sm:py-32">
        <div className="site-container">
          <SectionHeading
            eyebrow="Early access"
            title="Get in before the doors open."
            description="Patients get first access in their city. Clinics that join now lock in founding-partner terms."
            align="center"
          />
          <div className="mt-14"><WaitlistCards /></div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-white py-20">
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
