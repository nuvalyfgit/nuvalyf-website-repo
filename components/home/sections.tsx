import { ArrowRight, BarChart3, CalendarDays, FileText, HeartPulse, Languages, ListOrdered, Lock, Pill, ShieldCheck, Smartphone, Sparkles, UsersRound } from "lucide-react";
import { Counter, Reveal } from "./effects";
import { HeroStage } from "./hero-stage";
import { LiveCounter } from "./more-sections";

const SPECIALTIES = ["General Medicine", "Paediatrics", "Dermatology", "Dentistry", "Orthopaedics", "Gynaecology", "Cardiology", "ENT", "Ophthalmology", "Psychiatry", "Diabetology", "Physiotherapy"];

export function CinematicHero({ clinics, served = null, period = "this month" }: { clinics: number; served?: number | null; period?: string }) {
  return (
    <section className="nv-hero text-white">
      <div className="nv-aurora"><span /><span /><span /></div>
      <div className="nv-grid" />
      <svg className="nv-ecg pointer-events-none absolute inset-x-0 top-[58%] -z-10 h-24 w-full opacity-60" viewBox="0 0 1400 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60 H520 L560 60 L585 18 L615 92 L640 40 L660 60 H900 L925 50 L945 60 H1400" fill="none" stroke="#5eead4" strokeWidth="2" />
      </svg>
      <div className="site-container grid min-h-[100svh] items-center gap-10 pb-16 pt-28 lg:grid-cols-[1.05fr_1fr] lg:pb-10 lg:pt-24">
        <div>
          <div className="mb-4"><LiveCounter value={served} period={period} /></div>
          <a href="/docconnect" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4 text-sm text-white/80 backdrop-blur hover:bg-white/10">
            <span className="rounded-full bg-[#14b8a6] px-2.5 py-0.5 text-xs font-bold text-[#042f2e]">New</span> DocConnect: patients book you online <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.02] sm:text-6xl xl:text-7xl">
            <span className="mb-5 block font-sans text-sm font-bold uppercase tracking-[0.2em] text-[#5eead4]">Clinic EMR &amp; online booking software</span>
            Run your clinic.<br />
            <span className="font-serif-accent italic nv-gradient-text">Fill it with patients.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">
            Records, queue, prescriptions and billing in one calm workspace, plus a patient app that sends new bookings straight to it. Built for clinics in India and the UAE.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="/book-a-demo" className="group inline-flex h-13 items-center gap-2 rounded-full bg-[#14b8a6] px-7 py-3.5 font-bold text-[#042f2e] shadow-[0_10px_40px_-8px_rgba(20,184,166,0.8)] transition hover:bg-[#2dd4bf]">Book a free demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
            <a href="/pricing" className="inline-flex h-13 items-center rounded-full border border-white/20 px-7 py-3.5 font-bold text-white transition hover:bg-white/10">See pricing</a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
            {[[`${clinics}+`, "clinics live"], ["2", "countries"], ["14", "modules"]].map(([v, l]) => (
              <div key={l}><dt className="sr-only">{l}</dt><dd className="font-display text-3xl font-semibold">{v}</dd><dd className="mt-1 text-sm text-white/55">{l}</dd></div>
            ))}
          </dl>
        </div>
        <HeroStage />
      </div>
      <div className="nv-marquee border-t border-white/10 py-5">
        <div className="nv-marquee-track gap-10 text-sm font-semibold text-white/45">
          {[...SPECIALTIES, ...SPECIALTIES].map((s, i) => <span key={i} className="flex items-center gap-10 whitespace-nowrap">{s}<span className="h-1 w-1 rounded-full bg-[#14b8a6]" /></span>)}
        </div>
      </div>
    </section>
  );
}

export function StorySection({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#059669]">One connected journey</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#0b1120] sm:text-6xl">From first search to <span className="font-serif-accent italic text-[#059669]">follow-up</span>, in one system.</h2>
        </Reveal>
        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}

const BENTO = [
  { Icon: HeartPulse, title: "Electronic medical records", text: "Structured history, vitals and allergies, always one click away.", span: "lg:col-span-2 lg:row-span-2", big: true },
  { Icon: ListOrdered, title: "Live queue", text: "Reception and doctors stay in sync, patients see real ETAs.", span: "" },
  { Icon: FileText, title: "Digital prescriptions", text: "Clear dosage, allergy warnings, PDF in one tap.", span: "" },
  { Icon: CalendarDays, title: "Appointments & walk-ins", text: "Online, phone and walk-in visits in one calendar.", span: "lg:col-span-2" },
  { Icon: Pill, title: "Pharmacy & inventory", text: "Stock, batches, expiry and low-stock alerts.", span: "" },
  { Icon: BarChart3, title: "Reports & analytics", text: "Visits, collections and growth at a glance.", span: "" },
  { Icon: UsersRound, title: "Roles & permissions", text: "Doctors, reception, nurses and admins see what they need.", span: "lg:col-span-2" },
];

export function Bento() {
  return (
    <section className="bg-[#f6faf9] py-24 sm:py-32">
      <div className="site-container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#059669]">The platform</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#0b1120] sm:text-5xl">Everything a clinic runs on. <span className="font-serif-accent italic text-[#059669]">Nothing it doesn&apos;t.</span></h2>
          </div>
          <a href="/products" className="inline-flex items-center gap-2 font-bold text-[#059669] hover:underline">All 14 modules <ArrowRight className="h-4 w-4" /></a>
        </Reveal>
        <div className="mt-14 grid auto-rows-[minmax(190px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENTO.map(({ Icon, title, text, span, big }, i) => (
            <Reveal key={title} delay={i * 60} className={`nv-spot group rounded-[28px] border border-[#e2e8f0] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(5,150,105,0.35)] ${span}`}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#ecfdf5] to-[#ccfbf1] text-[#059669]"><Icon className="h-5 w-5" /></span>
              <h3 className={`mt-6 font-display font-semibold text-[#0b1120] ${big ? "text-3xl" : "text-xl"}`}>{title}</h3>
              <p className={`mt-2 leading-7 text-[#64748b] ${big ? "max-w-sm text-lg" : ""}`}>{text}</p>
              {big && (
                <div className="mt-8 space-y-2.5 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
                  {[["BP", "128/82", "w-3/4"], ["Sugar (F)", "104 mg/dL", "w-1/2"], ["SpO₂", "98%", "w-[90%]"]].map(([k, v, w]) => (
                    <div key={k} className="flex items-center gap-3 text-sm"><span className="w-20 text-[#64748b]">{k}</span><span className="h-1.5 flex-1 rounded-full bg-[#e2e8f0]"><span className={`block h-1.5 rounded-full bg-gradient-to-r from-[#059669] to-[#14b8a6] ${w}`} /></span><b className="w-24 text-right text-[#0f172a]">{v}</b></div>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Numbers({ clinics, countries }: { clinics: number; countries: number }) {
  const items: [number, string, string][] = [[clinics, "+", "clinics run their day on NuvaLyf"], [countries, "", "countries: India and the UAE"], [14, "", "modules in one platform"], [0, "", "paid placements in DocConnect search"]];
  return (
    <section className="relative overflow-hidden bg-[#0b1120] py-24 text-white">
      <div className="nv-grid" />
      <div className="site-container grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([n, s, l], i) => (
          <Reveal key={l} delay={i * 80}>
            <div className="font-display text-6xl font-semibold nv-gradient-text"><Counter to={n} suffix={s} /></div>
            <p className="mt-3 max-w-[14rem] text-white/60">{l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function DocConnectBand() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="site-container">
        <div className="nv-hero nv-border-glow grid items-center gap-12 overflow-hidden rounded-[40px] p-8 text-white sm:p-14 lg:grid-cols-2">
          <div className="nv-aurora"><span /><span /><span /></div>
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#5eead4]">DocConnect · for patients</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">Patients find you. <span className="font-serif-accent italic nv-gradient-text">And wait less.</span></h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-white/70">A verified profile, real-time slots and a live token on the patient&apos;s phone. Bookings flow straight into your NuvaLyf EMR.</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[[ShieldCheck, "Verified doctors only"], [Smartphone, "Live token and ETA"], [Languages, "Book for the whole family"], [Sparkles, "Video consults"]].map(([I, t]) => {
                const Ic = I as typeof ShieldCheck;
                return <li key={t as string} className="flex items-center gap-3 text-white/85"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[#5eead4]"><Ic className="h-4 w-4" /></span>{t as string}</li>;
              })}
            </ul>
            <a href="/docconnect" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[#0b1120] transition hover:bg-[#ccfbf1]">Explore DocConnect <ArrowRight className="h-4 w-4" /></a>
          </Reveal>
          <Reveal delay={150} className="relative mx-auto">
            <div className="h-[460px] w-[240px] rounded-[40px] border-[9px] border-[#020617] bg-white p-5 text-[#0b1120] shadow-[0_40px_100px_-20px_rgba(20,184,166,0.6)]">
              <div className="mx-auto h-5 w-24 rounded-full bg-[#020617]" />
              <p className="mt-6 text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">Your visit today</p>
              <div className="mt-2 font-display text-7xl font-semibold">07</div>
              <p className="text-sm text-[#475569]">Dr. Kavya Rao · Dermatology</p>
              <div className="mt-5 rounded-2xl bg-[#ecfdf5] p-4"><p className="text-xs text-[#047857]">Leave home at</p><p className="font-display text-2xl font-semibold">5:10 PM</p></div>
              <div className="mt-3 rounded-2xl bg-[#f8fafc] p-4 text-xs text-[#475569]">3 people ahead · ETA <b className="text-[#0b1120]">5:35 PM</b></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section className="border-y border-[#e2e8f0] bg-white py-14">
      <div className="site-container grid gap-8 sm:grid-cols-3">
        {[[Lock, "Your data stays yours", "Your clinic owns its records and can export them any time. We never sell data."], [ShieldCheck, "Role-based access", "Every action is permissioned and logged in an audit trail."], [HeartPulse, "Built with doctors", "Designed alongside clinics across India and the UAE."]].map(([I, t, d]) => {
          const Ic = I as typeof Lock;
          return (
            <Reveal key={t as string} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#ecfdf5] text-[#059669]"><Ic className="h-5 w-5" /></span>
              <div><h3 className="font-bold text-[#0b1120]">{t as string}</h3><p className="mt-1 text-sm leading-6 text-[#64748b]">{d as string}</p></div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
