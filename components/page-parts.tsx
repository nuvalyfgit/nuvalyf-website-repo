import { ArrowRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Dark hero band used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  lead,
  primary = { label: "Book a Demo", href: "/book-a-demo" },
  secondary,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  lead: string;
  primary?: { label: string; href: string } | null;
  secondary?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-[#0B1120] py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_85%_10%,rgba(20,184,166,0.18),transparent_60%),radial-gradient(45%_45%_at_5%_100%,rgba(5,150,105,0.14),transparent_62%)]" />
      <div className={`site-container relative ${children ? "grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]" : ""}`}>
        <div className="max-w-3xl">
          <p className="t-eyebrow text-[#14B8A6]">{eyebrow}</p>
          <h1 className="t-display mt-5 font-display">
            {title}
            {highlight && (
              <>
                <br />
                <span className="bg-[linear-gradient(100deg,#14B8A6_0%,#5EEAD4_45%,#6EE7B7_100%)] bg-clip-text text-transparent">{highlight}</span>
              </>
            )}
          </h1>
          <p className="t-lead mt-6 max-w-2xl text-white/60">{lead}</p>
          {(primary || secondary) && (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {primary && (
                <Button asChild size="lg" className="h-12 rounded-full bg-[#14B8A6] px-7 font-bold text-[#042F2E] hover:bg-[#2DD4BF]">
                  <a href={primary.href}>{primary.label} <ArrowRight /></a>
                </Button>
              )}
              {secondary && (
                <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-white/18 bg-white/[0.04] px-7 font-semibold text-white hover:bg-white/10 hover:text-white">
                  <a href={secondary.href}>{secondary.label}</a>
                </Button>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export type IconCard = { Icon: LucideIcon; title: string; text: string; points?: string[]; tag?: string };

/** Grid of icon cards on a light background. */
export function CardGrid({ items, cols = 3 }: { items: IconCard[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`reveal-stagger mt-14 grid gap-4 ${grid}`}>
      {items.map(({ Icon, title, text, points, tag }) => (
        <article key={title} className="card-lift rounded-[22px] border border-[#E2E8F0] bg-white p-7">
          <div className="flex items-start justify-between gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ECFDF5] text-[#059669]"><Icon className="h-5 w-5" /></span>
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
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-[28px] bg-[linear-gradient(160deg,#0F172A_0%,#065F46_100%)] p-8 text-white sm:p-12 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#99F6E4]">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">{title}</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-white/65">{text}</p>
        </div>
        <Button asChild size="lg" className="h-12 shrink-0 rounded-full bg-[#14B8A6] px-7 font-bold text-[#042F2E] hover:bg-[#2DD4BF]">
          <a href={href}>{label} <ArrowRight /></a>
        </Button>
      </div>
    </section>
  );
}

/** Plain light section wrapper with consistent spacing. */
export function Section({ id, tint, children }: { id?: string; tint?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`${tint ? "bg-[#F8FAFC]" : "bg-white"} py-20 sm:py-28`}>
      <div className="site-container">{children}</div>
    </section>
  );
}
