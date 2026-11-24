import { ArrowRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/home/effects";
import { screens, type ScreenKey } from "@/components/home/screens";

/** Light hero at the top of every inner page: one line, one sentence, actions, and a product screen. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  lead,
  primary = { label: "Book a demo", href: "/book-a-demo" },
  secondary,
  screen,
  below,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  lead: string;
  primary?: { label: string; href: string } | null;
  secondary?: { label: string; href: string };
  screen?: ScreenKey;
  below?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const S = screen ? screens[screen] : null;
  const aside = children ?? (S ? <S /> : <Facts />);
  return (
    <section className="border-b border-[#EEF2F6] bg-white py-12 sm:py-14">
      <div className={`site-container ${aside ? "grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]" : ""}`}>
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold text-[#0F766E]">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-[#0B1120] sm:text-5xl">
            {title}{highlight && <> <span className="text-[#0F766E]">{highlight}</span></>}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[#475569]">{lead}</p>
          {(primary || secondary) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {primary && <a href={primary.href} className="inline-flex h-12 items-center gap-2 rounded-full bg-[#0F766E] px-6 text-sm font-semibold text-white transition hover:bg-[#115E59]">{primary.label} <ArrowRight className="h-4 w-4" /></a>}
              {secondary && <a href={secondary.href} className="inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold text-[#0B1120] ring-1 ring-[#CBD5E1] transition hover:bg-[#F1F5F9]">{secondary.label}</a>}
            </div>
          )}
          {below}
        </Reveal>
        {aside && <Reveal delay={120}>{aside}</Reveal>}
      </div>
    </section>
  );
}

/** Default hero side card so no hero has an empty right half. */
function Facts() {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
      <div className="grid grid-cols-3 gap-3 text-center">
        {[["50+", "clinics"], ["2", "countries"], ["14", "modules"]].map(([n, l]) => (
          <div key={l} className="rounded-xl bg-white p-4 ring-1 ring-[#E2E8F0]"><b className="block font-display text-3xl text-[#0B1120]">{n}</b><span className="text-sm text-[#64748B]">{l}</span></div>
        ))}
      </div>
      <p className="mt-5 text-sm text-[#475569]">Clinic software and online booking for India and the UAE.</p>
      <a href="/book-a-demo" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0F766E] hover:underline">Book a free demo <ArrowRight className="h-4 w-4" /></a>
    </div>
  );
}

export type IconCard = { Icon: LucideIcon; title: string; text: string; points?: string[]; tag?: string };

/** Grid of icon cards on a light background. */
export function CardGrid({ items, cols = 3 }: { items: IconCard[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`reveal-stagger mt-14 grid gap-4 ${grid}`}>
      {items.map(({ Icon, title, text, points, tag }) => (
        <article key={title} className="rounded-2xl border border-[#E2E8F0] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ecfdf5] to-[#ccfbf1] text-[#059669]"><Icon className="h-5 w-5" /></span>
            {tag && <span className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">{tag}</span>}
          </div>
          <h3 className="mt-5 text-lg font-bold text-[#0F172A]">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#64748B]">{text}</p>
          {points && (
            <ul className="mt-4 space-y-2">
              {points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-[#475569]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" />{p}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

/** Closing call-to-action band. */
export function CtaBand({
  eyebrow = "Ready when you are",
  title = "See NuvaLyf in action.",
  text = "A 30-minute walkthrough with our team, tailored to your clinic.",
  href = "/book-a-demo",
  label = "Book a Demo",
}: { eyebrow?: string; title?: string; text?: string; href?: string; label?: string }) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto bg-[#0F766E] flex max-w-5xl flex-col items-start justify-between gap-6 rounded-[32px] p-8 text-white sm:p-12 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-white/80">{text}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 rounded-full bg-white px-7 font-semibold text-[#0F766E] hover:bg-[#F0FDFA]">
            <a href={href}>{label} <ArrowRight /></a>
          </Button>
          <a href="/contact?topic=pricing" className="inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/10">Want to know the price?</a>
        </div>
      </div>
    </section>
  );
}

/** Plain light section wrapper with consistent spacing. */
export function Section({ id, tint, children }: { id?: string; tint?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`${tint ? "bg-[#f6faf9]" : "bg-white"} py-14 sm:py-16`}>
      <div className="site-container">{children}</div>
    </section>
  );
}
