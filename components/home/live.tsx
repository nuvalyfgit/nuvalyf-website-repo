"use client";

import { useEffect, useRef, useState } from "react";
import { Frame, Row } from "./frame";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True once the element has been on screen. */
function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

const pool = [["Rahul V.", "New patient"], ["Fatima N.", "DocConnect"], ["Arjun M.", "Follow-up"], ["Sneha P.", "DocConnect"], ["Imran K.", "Walk-in"], ["Divya S.", "Review"]];

/** 1. Queue that moves on its own: the patient in consult finishes, the next is called, a new booking lands. */
export function LiveQueue() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!seen || reduced()) return;
    const id = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(id);
  }, [seen]);
  const rows = [0, 1, 2, 3].map((i) => {
    const n = tick + i;
    const [name, why] = i === 0 && tick === 0 ? ["Ananya R.", "Follow-up"] : pool[(n + 5) % pool.length];
    return { token: 12 + n, name, why, status: ["In consult", "Next", "Arrived", "On the way"][i] };
  });
  return (
    <div ref={ref}>
      <Frame title="Today's queue · Dr. Meera" tab="Front desk">
        <div className="mb-3 grid grid-cols-3 gap-2 text-center">
          {[[String(24 + tick), "Booked"], [String(Math.max(4, 9 - (tick % 4))), "Waiting"], [`${Math.max(8, 12 - (tick % 5))} min`, "Avg wait"]].map(([n, l]) => (
            <div key={l} className="rounded-lg bg-[#F8FAFC] py-2"><b key={n} className="nv-pop block text-lg">{n}</b><span className="text-xs text-[#64748B]">{l}</span></div>
          ))}
        </div>
        <div className="space-y-1">
          {rows.map((r, i) => (
            <div key={r.token} className="nv-row-in"><Row a={`${r.token} · ${r.name}`} b={r.why} c={r.status} on={i === 0} /></div>
          ))}
        </div>
      </Frame>
    </div>
  );
}

const meds = [["Paracetamol 650", "1-0-1 · 3 days"], ["Cetirizine 10", "0-0-1 · 5 days"], ["ORS sachet", "As needed"]];

/** 2. Prescription that fills itself in, then sends. */
export function RxLive() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced()) { setStep(5); return; }
    const id = setInterval(() => setStep((s) => (s >= 5 ? s : s + 1)), 650);
    return () => clearInterval(id);
  }, [seen]);
  return (
    <div ref={ref}>
      <Frame title="Prescription · Ananya R." tab="Rx">
        <div className="min-h-[132px]">
          {meds.slice(0, step).map(([m, d]) => (
            <div key={m} className="nv-row-in flex items-center justify-between border-b border-[#F1F5F9] py-2.5"><b className="font-medium">{m}</b><span className="text-[#64748B]">{d}</span></div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold">
          <span className={`rounded-lg px-3 py-2 text-white transition-all duration-300 ${step >= 4 ? "scale-95 bg-[#115E59]" : "bg-[#0F766E]"}`}>Send on WhatsApp</span>
          <span className="rounded-lg px-3 py-2 ring-1 ring-[#E2E8F0]">Print</span>
          {step >= 5 && <span className="nv-row-in ml-auto text-[#0F766E]">Sent ✓</span>}
        </div>
      </Frame>
    </div>
  );
}

/** 5. Patient phone: people ahead count down, then a "leave now" notification slides in. */
export function PhoneTrack() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [ahead, setAhead] = useState(3);
  useEffect(() => {
    if (!seen || reduced()) return;
    const id = setInterval(() => setAhead((a) => (a <= 0 ? 3 : a - 1)), 2200);
    return () => clearInterval(id);
  }, [seen]);
  return (
    <div ref={ref} className="mx-auto aspect-[9/18.5] w-[228px] rounded-[2.6rem] bg-[#0B1120] p-2.5 shadow-[0_40px_80px_-30px_rgba(15,23,42,.55)]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.1rem] bg-white px-4 pb-5 pt-3 text-[#0B1120]">
        <div className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0B1120]" />
        <div className="flex items-center justify-between px-1 text-[11px] font-semibold"><span>9:41</span><span className="flex items-center gap-1"><span className="h-2 w-3 rounded-sm bg-[#0B1120]" /><span className="h-2.5 w-5 rounded-[3px] border border-[#0B1120] p-[1px]"><span className="block h-full w-3/4 rounded-[1px] bg-[#0B1120]" /></span></span></div>
        <div className={`absolute inset-x-3 top-10 z-10 rounded-2xl bg-[#0B1120]/95 px-4 py-3 text-xs text-white shadow-lg transition-all duration-500 ${ahead === 0 ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0"}`}>
          <b className="block">DocConnect · now</b>You are next. Please come in.
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#CCFBF1] text-sm font-bold text-[#0F766E]">MN</span>
          <div className="text-xs"><b className="block text-sm">Dr. Meera Nair</b><span className="text-[#64748B]">General Medicine · Token 14</span></div>
        </div>
        <p className="mt-7 text-center text-xs uppercase tracking-widest text-[#64748B]">Patients ahead</p>
        <p key={ahead} className="nv-pop text-center font-display text-8xl font-semibold leading-none">{ahead}</p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#F1F5F9]"><div className="h-full rounded-full bg-[#0F766E] transition-all duration-700" style={{ width: `${((3 - ahead) / 3) * 100}%` }} /></div>
        <p className="mt-3 text-center text-sm font-semibold text-[#0F766E]">{ahead === 0 ? "It's your turn" : `About ${ahead * 8} min`}</p>
        <div className="mt-auto space-y-2 pt-6 text-xs">
          <div className="flex justify-between rounded-xl bg-[#F8FAFC] px-3 py-2.5"><span className="text-[#64748B]">Leave home by</span><b>{ahead === 0 ? "Now" : `6:${40 - ahead * 5} PM`}</b></div>
          <div className="rounded-xl bg-[#0F766E] py-2.5 text-center font-semibold text-white">Get directions</div>
        </div>
      </div>
    </div>
  );
}

/** 9. Number that rolls to its new value instead of jumping. */
export function RollNumber({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduced()) { setShown(value); return; }
    const start = from.current, t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 500), e = 1 - Math.pow(1 - p, 3);
      const v = Math.round(start + (value - start) * e);
      setShown(v); from.current = v;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{shown.toLocaleString("en-IN")}</>;
}
