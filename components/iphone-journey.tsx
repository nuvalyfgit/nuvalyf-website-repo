"use client";

import { useEffect, useState } from "react";
import { BatteryFull, BellRing, Check, Home, MapPin, Search, Signal, Star, Wifi } from "lucide-react";

const STEPS = ["Search", "Book", "Live queue", "Your turn"] as const;
const STEP_MS = 3200;

/** Pro-style phone frame: titanium band, Dynamic Island, side buttons. */
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-[290px] sm:w-[310px] ${className}`}>
      {/* side buttons */}
      <span className="absolute -left-[3px] top-[104px] h-7 w-[3px] rounded-l bg-[#4a505a]" />
      <span className="absolute -left-[3px] top-[150px] h-12 w-[3px] rounded-l bg-[#4a505a]" />
      <span className="absolute -left-[3px] top-[208px] h-12 w-[3px] rounded-l bg-[#4a505a]" />
      <span className="absolute -right-[3px] top-[170px] h-20 w-[3px] rounded-r bg-[#4a505a]" />

      {/* titanium band */}
      <div className="rounded-[58px] bg-[linear-gradient(145deg,#8b929c_0%,#3b4048_22%,#23272d_50%,#3b4048_78%,#9aa1ab_100%)] p-[3px] shadow-[0_50px_120px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)]">
        {/* black bezel */}
        <div className="rounded-[55px] bg-black p-[9px]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[47px] bg-[#F8FAFC]">
            {/* status bar + Dynamic Island */}
            <div className="absolute inset-x-0 top-0 z-20 flex h-12 items-center justify-between px-7 text-[13px] font-semibold text-[#0F172A]">
              <span>9:41</span>
              <span className="flex items-center gap-1"><Signal className="h-3.5 w-3.5" /><Wifi className="h-3.5 w-3.5" /><BatteryFull className="h-4 w-4" /></span>
            </div>
            <div className="absolute left-1/2 top-[11px] z-30 h-[30px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
            {children}
            {/* home indicator */}
            <div className="absolute bottom-2 left-1/2 z-20 h-[5px] w-[110px] -translate-x-1/2 rounded-full bg-[#0F172A]/80" />
          </div>
        </div>
      </div>
      {/* glass sheen */}
      <div className="pointer-events-none absolute inset-[12px] rounded-[47px] bg-[linear-gradient(115deg,rgba(255,255,255,0.14)_0%,transparent_28%)]" />
    </div>
  );
}

function Screen({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div aria-hidden={!active} className={`absolute inset-0 px-4 pb-6 pt-14 transition-all duration-700 ${active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
      {children}
    </div>
  );
}

const card = "rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-[0_8px_24px_rgba(13,38,52,0.06)]";

/** The DocConnect patient journey, auto-playing inside the phone. */
export function IPhoneJourney({ showSteps = true }: { showSteps?: boolean }) {
  const [step, setStep] = useState(2);
  const [ahead, setAhead] = useState(3);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setStep(0);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [step, playing]);

  useEffect(() => {
    if (step !== 2) return setAhead(3);
    if (!playing) return;
    const t = setInterval(() => setAhead((a) => Math.max(1, a - 1)), 900);
    return () => clearInterval(t);
  }, [step, playing]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-16 -z-10 bg-[radial-gradient(50%_45%_at_50%_45%,rgba(20,184,166,0.28),transparent_70%)] blur-2xl" />
      <PhoneFrame>
        <Screen active={step === 0}>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#059669]">DocConnect</p>
          <p className="mt-1 text-lg font-bold text-[#0F172A]">Find a doctor</p>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 text-[13px] text-[#0F172A]">
            <Search className="h-4 w-4 text-[#059669]" />fever, child<span className="h-4 w-px animate-pulse bg-[#059669]" />
          </div>
          {[["Dr. Kavya Rao", "Pediatrics · 1.2 km", "4.9"], ["Dr. Arjun Menon", "Pediatrics · 2.0 km", "4.8"], ["Dr. Sana Iqbal", "General · 2.4 km", "4.7"]].map(([n, d, r], i) => (
            <div key={n} className={`${card} mt-2.5 flex items-center gap-3 ${i === 0 ? "ring-2 ring-[#14B8A6]" : ""}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ECFDF5] text-xs font-bold text-[#059669]">{n.split(" ")[1][0]}{n.split(" ")[2][0]}</span>
              <span className="min-w-0 flex-1">
                <strong className="block truncate text-[13px] text-[#0F172A]">{n}</strong>
                <span className="text-[11px] text-[#64748B]">{d}</span>
              </span>
              <span className="flex items-center gap-0.5 text-[11px] font-bold text-[#0F172A]"><Star className="h-3 w-3 fill-[#f5b642] text-[#f5b642]" />{r}</span>
            </div>
          ))}
          <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#059669]"><Check className="h-3.5 w-3.5" />Verified doctors only</p>
        </Screen>

        <Screen active={step === 1}>
          <p className="text-lg font-bold text-[#0F172A]">Booking confirmed</p>
          <p className="flex items-center gap-1 text-[12px] text-[#64748B]"><MapPin className="h-3 w-3" />Sunrise Clinic · Dr. Kavya Rao</p>
          <div className={`${card} mt-4 text-center`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#64748B]">Your token</p>
            <p className="font-display text-7xl font-bold leading-none text-[#0F172A]">07</p>
            <div className="my-3 border-t border-dashed border-[#CBD5E1]" />
            <p className="text-[13px] font-semibold text-[#0F172A]">Today · 5:30 pm</p>
          </div>
          <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-[#ECFDF5] p-3 text-[12px] font-semibold text-[#065F46]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#059669] text-white"><Check className="h-4 w-4" /></span>
            Added for: Aisha (daughter)
          </div>
        </Screen>

        <Screen active={step === 2}>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-[#0F172A]">Live queue</p>
            <span className="flex items-center gap-1.5 rounded-full bg-[#059669] px-2.5 py-1 text-[10px] font-bold text-white"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#14B8A6]" />LIVE</span>
          </div>
          <div className={`${card} mt-4 text-center`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#64748B]">Patients ahead</p>
            <p key={ahead} className="font-display text-7xl font-bold leading-none text-[#0F172A] [animation:rise_.45s_ease-out]">{ahead}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div className="h-full rounded-full bg-[#059669] transition-all duration-700" style={{ width: `${((4 - ahead) / 4) * 100}%` }} />
            </div>
            <div className="mt-3 grid grid-cols-2 text-left">
              <div><p className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Serving</p><p className="text-lg font-bold text-[#0F172A]">0{7 - ahead}</p></div>
              <div><p className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Your turn</p><p className="text-lg font-bold text-[#059669]">5:52</p></div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#0F172A] p-3.5 text-white">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#14B8A6] text-[#042F2E]"><Home className="h-4 w-4" /></span>
            <span><strong className="block text-[13px]">Leave home at 5:32 pm</strong><span className="text-[11px] text-white/60">We&apos;ll tell you if it changes</span></span>
          </div>
        </Screen>

        <Screen active={step === 3}>
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="relative grid h-20 w-20 place-items-center rounded-full bg-[#059669] text-white">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#14B8A6]/40" />
              <BellRing className="relative h-9 w-9" />
            </span>
            <p className="mt-6 text-2xl font-bold text-[#0F172A]">It&apos;s your turn</p>
            <p className="mt-1 text-[13px] text-[#64748B]">Room 2 · Dr. Kavya Rao</p>
            <span className="mt-5 rounded-full bg-[#ECFDF5] px-4 py-2 text-[12px] font-bold text-[#065F46]">Waited at home: 48 min</span>
          </div>
        </Screen>
      </PhoneFrame>

      {showSteps && (
        <div className="mt-8 flex justify-center gap-1.5" role="tablist" aria-label="Demo steps">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={i === step}
              onClick={() => { setStep(i); setPlaying(false); }}
              className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition ${i === step ? "bg-[#14B8A6] text-[#042F2E]" : "bg-white/[0.07] text-white/60 hover:text-white"}`}
            >
              {i + 1}. {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
