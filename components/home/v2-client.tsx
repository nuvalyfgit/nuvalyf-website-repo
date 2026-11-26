"use client";

import { useEffect, useRef, useState } from "react";
import { screens, type ScreenKey } from "./screens";
import { moduleGroups } from "@/data/modules";
import { specialtyStyle } from "@/data/specialty-style";

export type Step = { k: string; t: string; d: string; screen: ScreenKey };
const clinicDay: Step[] = [
  { k: "Book", t: "Patients book online", d: "On DocConnect they pick a slot and get a token. No calls to the front desk.", screen: "book" },
  { k: "Queue", t: "One live queue", d: "Walk-ins and online bookings land in the same list. Patients see their turn live.", screen: "queue" },
  { k: "Consult", t: "Full history at a glance", d: "Vitals, past visits and allergies on one screen before you say hello.", screen: "consult" },
  { k: "Prescribe", t: "Prescriptions in a few taps", d: "Favourites and templates. Send on WhatsApp or print.", screen: "rx" },
  { k: "Bill", t: "Bill and close the visit", d: "Consultation, tests and medicines in one invoice. Receipt goes out automatically.", screen: "bill" },
];

/** Sticky walkthrough: the screen stays pinned while the steps scroll past. */
export function Walkthrough({ eyebrow = "How it works", title = "From booking to billing, in one place.", steps = clinicDay, tint = false }: { eyebrow?: string; title?: string; steps?: Step[]; tint?: boolean }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <section id="how" className={`${tint ? "bg-[#F4F7F6]" : "bg-white"} py-14 sm:py-16`}>
      <div className="site-container">
        <p className="text-sm font-semibold text-[#0F766E]">{eyebrow}</p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold leading-tight text-[#0B1120] sm:text-4xl">{title}</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            {steps.map((s, i) => { const S = screens[s.screen]; return (
              <div key={s.k} ref={(el) => { refs.current[i] = el; }} data-i={i} className="flex items-center py-6 lg:min-h-[50vh] lg:py-0">
                <div className={`relative border-l-2 pl-6 transition-colors duration-500 ${i <= active ? "border-[#0F766E]" : "border-[#E2E8F0]"}`}>
                  <span className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 bg-white transition-colors duration-500 ${i <= active ? "border-[#0F766E] bg-[#0F766E]" : "border-[#CBD5E1]"}`} />
                  <span className="nv-mono text-xs font-medium uppercase tracking-widest text-[#94A3B8]">0{i + 1} · {s.k}</span>
                  <h3 className={`mt-2 font-display text-2xl font-semibold transition-colors duration-500 ${active === i ? "text-[#0B1120]" : "text-[#94A3B8]"}`}>{s.t}</h3>
                  <p className="mt-2 max-w-md text-[#475569]">{s.d}</p>
                  <div className="mt-6 lg:hidden"><S /></div>
                </div>
              </div>
            ); })}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-265px)] h-[530px]">
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold text-[#475569]">
                <span className="rounded-full bg-[#F0FDFA] px-3 py-1 text-[#0F766E] ring-1 ring-[#99F6E4]">Ananya R. · Token 12</span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-[#E2E8F0]"><span className="block h-full rounded-full bg-[#0F766E] transition-all duration-700" style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></span>
                <span>{active + 1}/{steps.length}</span>
              </div>
              <div className="relative h-[480px]">
              {steps.map(({ k, screen }, i) => { const S = screens[screen]; return (
                <div key={k} className={`absolute inset-0 transition-all duration-500 ${active === i ? "translate-y-0 opacity-100" : i < active ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0"}`}>
                  <S />
                </div>
              ); })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4">
          <span className="text-[#475569]">Want to see this with your own clinic? <span className="text-xs text-[#94A3B8]">(Screens show sample data.)</span></span>
          <a href="/book-a-demo" className="inline-flex items-center gap-1 text-sm font-semibold text-[#0F766E] hover:underline">Book a free demo →</a>
        </div>
      </div>
    </section>
  );
}

const names: Record<string, string> = { ent: "ENT", "specialty-clinics": "Multi-specialty" };
const label = (slug: string) => names[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** Specialty rail: moves sideways as you scroll down (desktop); swipe on phones. */
export function SpecialtyRail() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const w = wrap.current, t = track.current;
      if (!w || !t || window.innerWidth < 1024) { if (t) t.style.transform = ""; return; }
      const r = w.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      t.style.transform = `translateX(${-p * (t.scrollWidth - t.parentElement!.clientWidth)}px)`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  const items = Object.entries(specialtyStyle);
  return (
    <section ref={wrap} className="bg-[#F4F7F6] lg:h-[220vh]">
      <div className="py-16 sm:py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
        <div className="site-container flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#0F766E]">Specialties</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-[#0B1120] sm:text-4xl">Made for your specialty.</h2>
          </div>
          <a href="/solutions" className="text-sm font-semibold text-[#0F766E] hover:underline">All specialties →</a>
        </div>
        <div className="mt-8 overflow-x-auto lg:overflow-hidden">
          <div ref={track} className="flex w-max gap-4 px-4 pb-2 will-change-transform sm:px-[max(1rem,calc((100vw-72rem)/2))]">
            {items.map(([slug, s]) => (
              <a key={slug} href={`/specialties/${slug}`} className="group w-[280px] shrink-0 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ ["--acc" as string]: s.accent }}>
                <span className="inline-block h-1.5 w-10 rounded-full transition-all duration-500 group-hover:w-full" style={{ background: s.accent }} />
                <h3 className="mt-4 text-lg font-semibold text-[#0B1120]">{label(slug)}</h3>
                <p className="text-xs text-[#64748B]">{s.title}</p>
                <div className="mt-4 space-y-2 text-sm">
                  {s.rows.map(([a, b], j) => (
                    <div key={a} className="flex justify-between gap-3 border-b border-[#F1F5F9] pb-2"><span className="text-[#64748B]">{a}</span><span className="text-right font-medium text-[#0B1120] transition-all duration-300 group-hover:translate-x-[-4px] group-hover:text-[var(--acc)]" style={{ transitionDelay: `${j * 80}ms` }}>{b}</span></div>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Module tabs: one group visible at a time, so the page stays short. */
export function ModuleTabs() {
  const [g, setG] = useState(0);
  const group = moduleGroups[g];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  useEffect(() => { const b = tabs.current[g]; if (b) setPill({ left: b.offsetLeft, width: b.offsetWidth }); }, [g]);
  return (
    <section id="modules" className="bg-[#F4F7F6] py-14 sm:py-16">
      <div className="site-container">
        <p className="text-sm font-semibold text-[#0F766E]">14 modules</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-[#0B1120] sm:text-4xl">Choose the features you need.</h2>
        <div role="tablist" className="relative mt-8 flex gap-2 overflow-x-auto pb-1">
          <span aria-hidden="true" className="absolute top-0 h-[42px] rounded-full bg-[#0B1120] transition-all duration-300 ease-out" style={pill} />
          {moduleGroups.map((m, i) => (
            <button key={m.title} ref={(el) => { tabs.current[i] = el; }} role="tab" aria-selected={g === i} onClick={() => setG(i)} className={`relative z-10 h-[42px] shrink-0 rounded-full px-5 text-sm font-semibold transition-colors duration-300 ${g === i ? "text-white" : "text-[#475569] ring-1 ring-[#E2E8F0] hover:text-[#0B1120]"}`}>
              {m.title} <span className="opacity-60">{m.items.length}</span>
            </button>
          ))}
        </div>
        <p className="mt-6 text-[#475569]">{group.text}</p>
        <div key={g} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {group.items.map(({ Icon, title, text }, i) => (
            <article key={title} className="nv-tab-in nv-lift rounded-2xl border border-[#E2E8F0] bg-white p-5" style={{ animationDelay: `${i * 60}ms` }}>
              <Icon className="h-5 w-5 text-[#0F766E]" />
              <h3 className="mt-4 font-semibold text-[#0B1120]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-[#64748B]">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4">
          <span className="text-[#475569]">Not sure which features you need?</span>
          <a href="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-[#0F766E] hover:underline">Talk to our team →</a>
        </div>
      </div>
    </section>
  );
}
