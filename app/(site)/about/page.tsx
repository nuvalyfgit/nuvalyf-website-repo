import type { Metadata } from "next";
import { Compass, Eye, HeartHandshake, Lock, Network, Puzzle, Scale, Sparkles, Target, Workflow } from "lucide-react";
import { CardGrid, CtaBand, PageHero, Section } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { StatsBand } from "@/components/stats-band";
import { getMilestones } from "@/lib/cms";
import { pageSeo } from "@/lib/seo";
import { Team } from "@/components/home/v2";

const baseMetadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Us",
  description: "NuvaLyf builds simple, secure clinic technology for healthcare providers in India and the UAE. Our story, mission, vision and values.",
};

const problems = [
  { Icon: Puzzle, title: "Disconnected tools", text: "Paper registers, spreadsheets and separate billing apps mean the same details are entered again and again." },
  { Icon: Workflow, title: "Crowded waiting rooms", text: "Patients arrive too early because they can't see the queue, and front desks spend the day answering calls." },
  { Icon: Lock, title: "Scattered patient records", text: "History, reports and prescriptions live in different places, so doctors start consultations without context." },
];

const values = [
  { Icon: HeartHandshake, title: "Clinic first", text: "We design around how doctors and front desks actually work, not the other way round." },
  { Icon: Scale, title: "Honest claims", text: "We never claim certifications or approvals that have not been independently obtained and verified." },
  { Icon: Lock, title: "Your data, your control", text: "Clinics own their data and can export it at any time, with original documents included." },
  { Icon: Sparkles, title: "Simplicity", text: "Fewer clicks, clear screens and training for every role, so software helps rather than slows." },
];

export function generateMetadata() {
  return pageSeo("/about", baseMetadata);
}

export default async function AboutPage() {
  const milestones = await getMilestones();

  return (
    <PageShell crumbs={[["About us", "/about"]]}>
      <PageHero
        eyebrow="About NuvaLyf"
        title="Simple software for clinics"
        highlight="in India and the UAE."
        lead="Healthcare professionals should spend more time caring for patients and less time managing disconnected systems. NuvaLyf is building a simple, secure digital foundation for clinics across India, the UAE and beyond."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <SectionHeading eyebrow="Our story" title="Why we started NuvaLyf." />
          <div className="reveal space-y-5 text-[17px] leading-8 text-[#475569]">
            <p>NuvaLyf began with a simple observation: clinics were running on a patchwork of registers, spreadsheets and apps that didn&apos;t talk to each other. Doctors lost time searching for history, front desks juggled calls, and patients waited without knowing when they would be seen.</p>
            <p>We set out to bring registration, appointments, the live queue, consultations, prescriptions, billing and patient communication into one connected record. Today, more than 50 clinics across India and the UAE run their everyday operations on NuvaLyf CMS.</p>
            <p>Next, DocConnect extends the same record to patients, letting them book online and see their place in the queue live.</p>
          </div>
        </div>
      </Section>

      <Section tint>
        <SectionHeading eyebrow="Why we exist" title="Problems we solve." align="center" />
        <CardGrid items={problems} />
      </Section>

      <section className="nv-hero relative py-20 text-white sm:py-28">
        <div className="nv-aurora"><span /><span /><span /></div>
        <div className="nv-grid" />
        <div className="site-container grid gap-4 md:grid-cols-3">
          {[
            [Target, "Our mission", "Make modern clinic technology simple, secure and accessible across India, the UAE and beyond."],
            [Eye, "Our vision", "Help create a more connected and efficient healthcare ecosystem."],
            [Compass, "Our approach", "Build around real clinic workflows instead of forcing complex software."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Target;
            return (
              <article key={t as string} className="rounded-[22px] border border-white/10 bg-white/[0.045] p-7">
                <I className="h-6 w-6 text-[#14B8A6]" />
                <h2 className="mt-8 text-lg font-bold">{t as string}</h2>
                <p className="mt-3 text-sm leading-6 text-white/60">{d as string}</p>
              </article>
            );
          })}
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Values & objectives" title="What we believe in." align="center" />
        <CardGrid items={values} cols={4} />
      </Section>

      <Section tint>
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Connected healthcare" title="All patient details in one place." description="Every stage of the visit, from registration to follow-up, writes to the same record. The CMS runs the clinic; DocConnect connects patients to it. Nothing is re-entered, re-asked or reconciled later." />
            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#059669]"><Network className="h-5 w-5" /> CMS + DocConnect, one source of truth</div>
          </div>
          <ol className="reveal relative space-y-6 border-l border-[#CBD5E1] pl-8">
            {milestones.map((m) => (
              <li key={m.title} className="relative">
                <span className="absolute -left-[39px] top-1 h-4 w-4 rounded-full border-4 border-[#F8FAFC] bg-[#059669]" />
                {m.when && <p className="text-xs font-bold uppercase tracking-wider text-[#059669]">{m.when}</p>}
                <h3 className="mt-1 text-lg font-bold text-[#0F172A]">{m.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Achievements" title="Clinics that use NuvaLyf." />
        <div className="mt-12"><StatsBand /></div>
      </Section>

      <Team />

      <CtaBand />
    </PageShell>
  );
}
