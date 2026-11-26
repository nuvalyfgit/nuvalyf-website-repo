import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Counter, Reveal } from "./effects";
import { LiveQueue, PhoneTrack } from "./live";

const btn = "inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition";
export const PriceButton = ({ dark }: { dark?: boolean }) => (
  <a href="/contact?topic=pricing" className={`${btn} ${dark ? "text-white ring-1 ring-white/25 hover:bg-white/10" : "text-[#0B1120] ring-1 ring-[#CBD5E1] hover:bg-[#F1F5F9]"}`}>Want to know the price?</a>
);

const Mono = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <p className={`nv-mono text-xs font-medium uppercase tracking-[0.18em] ${dark ? "text-[#5EEAD4]" : "text-[#0F766E]"}`}>{children}</p>
);

const Callout = ({ label, className }: { label: string; className: string }) => (
  <span className={`nv-callout nv-mono absolute z-20 hidden items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0B1120] shadow-lg ring-1 ring-black/5 lg:inline-flex ${className}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />{label}
  </span>
);

export function Hero({ clinics, countries }: { clinics: number; countries: number }) {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] pb-16 pt-28 text-white sm:pt-32">
      <div className="nv-hero-lines" aria-hidden="true" />
      <div className="site-container relative grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <Mono dark>Clinic management system · India &amp; UAE</Mono>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-[60px]">Simple software to run your clinic.</h1>
          <p className="mt-5 max-w-lg text-lg text-white/65">Records, queue, prescriptions and billing for your team. DocConnect for patients to book and track their turn.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/book-a-demo" className={`${btn} nv-btn bg-[#14B8A6] text-[#042F2E] hover:bg-[#2DD4BF]`}>Book a demo <ArrowRight className="h-4 w-4" /></a>
            <PriceButton dark />
          </div>
          <dl className="mt-10 flex gap-10 border-t border-white/10 pt-6">
            {[[clinics, "+", "clinics"], [countries, "", "countries"], [14, "", "modules"]].map(([n, s, l]) => (
              <div key={l as string}><dt className="font-display text-3xl font-semibold"><Counter to={n as number} suffix={s as string} /></dt><dd className="nv-mono text-xs uppercase tracking-wider text-white/50">{l}</dd></div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={120} className="relative pb-10 lg:pr-36">
          <Callout label="Live queue" className="-left-24 top-24" />
          <Callout label="Rx on WhatsApp" className="-left-20 bottom-20" />
          <Callout label="Patient app" className="right-2 -top-4" />
          <div className="relative">
            <LiveQueue />
            <span className="nv-cursor pointer-events-none absolute z-30 hidden lg:block" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" fill="#0B1120" stroke="#fff" strokeWidth="1.5" /></svg>
              <span className="nv-mono ml-3 rounded bg-[#0F766E] px-1.5 py-0.5 text-[10px] font-semibold text-white">Front desk</span>
            </span>
          </div>
          <div className="absolute -bottom-8 -right-6 hidden w-[228px] origin-bottom-right scale-[.66] lg:block"><PhoneTrack /></div>
          <p className="nv-mono mt-3 text-[10px] uppercase tracking-wider text-white/40">Sample data · not real patients</p>
        </Reveal>
      </div>
    </section>
  );
}

/** Real numbers from the CMS (Stats). Patients served shows only when entered. */
export function Numbers({ clinics, countries, served, period }: { clinics: number; countries: number; served: number | null; period: string }) {
  const items: [number, string, string][] = [[clinics, "+", "clinics onboarded"], [countries, "", "countries: India and the UAE"], [14, "", "modules in one system"]];
  if (served) items.push([served, "+", `patients served ${period}`.trim()]);
  return (
    <section className="bg-[#0B1120] py-14 text-white sm:py-16">
      <div className={`site-container grid gap-8 sm:grid-cols-2 ${items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {items.map(([n, s, l], i) => (
          <Reveal key={l} delay={i * 80} className="border-l border-white/15 pl-6">
            <b className="block font-display text-5xl font-semibold tracking-tight sm:text-6xl"><Counter to={n} suffix={s} /></b>
            <span className="nv-mono mt-2 block text-xs uppercase tracking-wider text-white/55">{l}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const security = [
  ["ACCESS", "Role-based access", "Doctors, front desk and admins see only what they need."],
  ["AUDIT", "Audit log", "Every change to a record is logged with who and when."],
  ["BACKUP", "Daily backups", "Your clinic data is backed up every day."],
  ["ENCRYPTION", "Encrypted data", "Patient data is encrypted in storage and in transit."],
];

/** Security band (kept as Proof so other pages keep working). */
export function Proof() {
  return (
    <section className="bg-[#0B1120] py-14 text-white sm:py-16">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Mono dark>Security &amp; reliability</Mono>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Your patients&apos; data, protected.</h2>
          </Reveal>
          <a href="/book-a-demo" className="nv-btn inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#0B1120] hover:bg-[#F0FDFA]">Book a demo <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {security.map(([tag, t, d], i) => (
            <Reveal key={t} delay={i * 70} className="nv-lift bg-[#0B1120] p-6">
              <span className="nv-mono text-[11px] text-[#5EEAD4]">{tag}</span>
              <h3 className="mt-3 text-lg font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/60">{d}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-6 text-white/55">We don&apos;t claim certifications we haven&apos;t earned. Ask us how and where your clinic&apos;s data is stored, and we&apos;ll show you.</p>
      </div>
    </section>
  );
}

const integrations = ["WhatsApp", "UPI payments", "Razorpay", "SMS", "Google Maps", "ABDM / ABHA", "Lab partners"];

export function Integrations() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="site-container grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-center">
        <Reveal>
          <Mono>Integrations</Mono>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[#0B1120] sm:text-4xl">Connects with the tools you use.</h2>
          <p className="mt-3 text-[#475569]">We are adding these integrations now. Ask us which ones are ready for your clinic.</p>
        </Reveal>
        <ul className="flex flex-wrap gap-3">
          {integrations.map((n, i) => (
            <Reveal key={n} delay={i * 50}>
              <li className="nv-lift flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                <span className="font-semibold text-[#0B1120]">{n}</span>
                <span className="nv-mono rounded bg-[#FEF3C7] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[#92400E]">Soon</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const people: { name: string; role: string; linkedin?: string }[] = [
  { name: "Syed Affan Zaid", role: "Founder & CEO", linkedin: "https://www.linkedin.com/in/syed-affan-816062265/" },
  { name: "Wasiq Mohideen", role: "Co-Founder & CTO" },
  { name: "Syed Rayan Maaz", role: "Co-Founder & Sales Director" },
  { name: "Mohammed Sufiyan", role: "Developer" },
];

/** Editorial list of the core team: one calm row per person, no cards. */
export function Team() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="text-sm font-semibold text-[#0F766E]">Who we are</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#0B1120] sm:text-4xl">The people behind NuvaLyf.</h2>
          <p className="mt-4 text-lg leading-8 text-[#475569]">
            A focused team working across India and the UAE. Product, support and onboarding teams work with them on every clinic we set up.
          </p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
            <a href="/about" className="inline-flex items-center gap-1 text-[#0F766E] hover:underline">About NuvaLyf <ArrowRight className="h-4 w-4" /></a>
            <a href="/careers" className="inline-flex items-center gap-1 text-[#64748B] hover:text-[#0F766E]">We&apos;re hiring <ArrowRight className="h-4 w-4" /></a>
          </div>
        </Reveal>
        <ul className="border-t border-[#E2E8F0]">
          {people.map((p, i) => {
            const row = (
              <>
                <span aria-hidden="true" className="absolute inset-y-3 left-0 w-[3px] origin-center scale-y-0 rounded-full bg-[#0F766E] transition-transform duration-300 group-hover:scale-y-100" />
                <span className="font-display text-xl font-semibold tracking-tight text-[#0B1120] sm:text-2xl">{p.name}</span>
                <span className="text-sm text-[#64748B] sm:text-right">{p.role}</span>
                <span className="hidden w-5 justify-self-end sm:block" aria-hidden="true">
                  {p.linkedin && <ArrowUpRight className="h-5 w-5 text-[#94A3B8] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0F766E]" />}
                </span>
              </>
            );
            const cls = "group relative grid gap-1 py-5 transition-[padding] duration-300 hover:pl-5 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-6";
            return (
              <li key={p.name} className="border-b border-[#E2E8F0]">
                <Reveal delay={i * 70}>
                  {p.linkedin ? (
                    <a href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name}, ${p.role}, on LinkedIn`} className={cls}>{row}</a>
                  ) : (
                    <div className={cls}>{row}</div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="bg-[#F4F7F6] py-14 sm:py-16">
      <div className="site-container">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#0F766E] p-8 text-white sm:p-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Book a free demo.</h2>
            <p className="mt-2 text-white/80">A 30-minute demo with your own workflow. Pricing is tailored to your clinic.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/book-a-demo" className={`${btn} bg-white text-[#0F766E] hover:bg-[#F0FDFA]`}>Book a demo <ArrowRight className="h-4 w-4" /></a>
            <PriceButton dark />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
