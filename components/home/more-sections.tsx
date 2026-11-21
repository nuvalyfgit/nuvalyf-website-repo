import { Counter, Reveal } from "./effects";
import { BeforeAfter, Globe, TryDemo, WaitCalculator } from "./interactive";

const Head = ({ eyebrow, title, accent, text, dark }: { eyebrow: string; title: string; accent: string; text?: string; dark?: boolean }) => (
  <Reveal className="max-w-3xl">
    <p className={`text-sm font-bold uppercase tracking-[0.2em] ${dark ? "text-[#5eead4]" : "text-[#059669]"}`}>{eyebrow}</p>
    <h2 className={`mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl ${dark ? "text-white" : "text-[#0b1120]"}`}>{title} <span className={`font-serif-accent italic ${dark ? "nv-gradient-text" : "text-[#059669]"}`}>{accent}</span></h2>
    {text && <p className={`mt-4 text-lg leading-8 ${dark ? "text-white/65" : "text-[#475569]"}`}>{text}</p>}
  </Reveal>
);

/** 1. Live counter: only shown when the team has entered a real figure in the CMS. */
export function LiveCounter({ value, period }: { value: number | null; period: string }) {
  if (!value) return null;
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur">
      <span className="nv-pulse-dot h-2 w-2 rounded-full bg-[#5eead4]" />
      <b className="font-display text-base text-white"><Counter to={value} /></b> patients seen on NuvaLyf {period}
    </div>
  );
}

export function TryDemoSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="site-container">
        <Head eyebrow="Try it yourself" title="Run a consult." accent="Right here." text="Call the next patient, tap medicines and share the prescription. This is how simple your day gets." />
        <Reveal className="mt-12"><TryDemo /></Reveal>
      </div>
    </section>
  );
}

export function BeforeAfterSection() {
  return (
    <section className="bg-[#f6faf9] py-24 sm:py-32">
      <div className="site-container">
        <Head eyebrow="Drag to compare" title="Same clinic." accent="Calmer day." />
        <Reveal className="mt-12"><BeforeAfter /></Reveal>
      </div>
    </section>
  );
}

export function CalculatorSection() {
  return (
    <section id="calculator" className="bg-white py-24 sm:py-32">
      <div className="site-container">
        <Head eyebrow="Wait-time calculator" title="How much waiting" accent="could you remove?" text="Move the sliders to match your clinic." />
        <Reveal className="mt-12"><WaitCalculator /></Reveal>
      </div>
    </section>
  );
}

export function GlobeNumbers({ clinics, countries }: { clinics: number; countries: number }) {
  const items: [number, string, string][] = [[clinics, "+", "clinics run their day on NuvaLyf"], [countries, "", "countries: India and the UAE"], [14, "", "modules in one platform"]];
  return (
    <section className="relative overflow-hidden bg-[#0b1120] py-24 text-white sm:py-32">
      <div className="nv-grid" />
      <div className="site-container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Head eyebrow="Where we work" title="From Chennai to Dubai," accent="one connected platform." dark />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {items.map(([n, s, l], i) => (
              <Reveal key={l} delay={i * 80}>
                <div className="font-display text-5xl font-semibold nv-gradient-text"><Counter to={n} suffix={s} /></div>
                <p className="mt-2 text-sm text-white/60">{l}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mx-auto w-full max-w-[460px]"><Globe /></Reveal>
      </div>
    </section>
  );
}
