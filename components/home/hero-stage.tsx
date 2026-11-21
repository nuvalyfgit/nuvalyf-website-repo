"use client";

import { useEffect, useRef, useState } from "react";
import { BellRing, CalendarCheck2, Check, FileText, TrendingUp } from "lucide-react";

const QUEUE = [
  { token: 12, name: "Ananya R.", note: "Follow-up · 10:20" },
  { token: 13, name: "Mohammed I.", note: "New patient · 10:35" },
  { token: 14, name: "Priya S.", note: "Walk-in · 10:40" },
  { token: 15, name: "Karthik M.", note: "Review · 10:55" },
];

/** The floating product composition in the hero: live queue, booking toast, prescription and insights. */
export function HeroStage() {
  const stage = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % QUEUE.length), 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.transform = `rotateY(${x * 10 - 8}deg) rotateX(${-y * 8 + 6}deg)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const now = QUEUE[i];
  const next = [1, 2].map((k) => QUEUE[(i + k) % QUEUE.length]);

  return (
    <div className="nv-stage relative mx-auto h-[460px] w-full max-w-[560px] sm:h-[520px]" aria-hidden="true">
      <div ref={stage} className="nv-stage-inner relative h-full w-full" style={{ transform: "rotateY(-8deg) rotateX(6deg)" }}>
        {/* Live queue */}
        <div className="nv-card nv-float-1 absolute left-[4%] top-[6%] w-[66%] rounded-[22px] p-5" style={{ transform: "translateZ(60px)" }}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f766e]">
              <span className="nv-pulse-dot h-2 w-2 rounded-full bg-[#14b8a6]" /> Live queue
            </span>
            <span className="rounded-full bg-[#ecfdf5] px-2.5 py-1 text-[10px] font-bold text-[#047857]">Dr. Kavya · OPD 2</span>
          </div>
          <div className="mt-4 flex items-end gap-4">
            <div className="text-[11px] font-semibold text-[#64748b]">Now serving
              <div key={now.token} className="nv-flip mt-1 font-display text-6xl font-semibold leading-none text-[#0b1120]">{now.token}</div>
            </div>
            <div className="mb-1 min-w-0">
              <div className="truncate text-sm font-bold text-[#0f172a]">{now.name}</div>
              <div className="text-xs text-[#64748b]">{now.note}</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {next.map((q, k) => (
              <div key={q.token} className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-3 py-2">
                <span className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-xs font-bold text-[#0f172a] shadow-sm">{q.token}</span>
                  <span className="text-xs font-semibold text-[#334155]">{q.name}</span>
                </span>
                <span className="text-[11px] font-semibold text-[#0f766e]">~{(k + 1) * 9} min</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prescription */}
        <div className="nv-card nv-float-2 absolute bottom-[4%] left-[0%] w-[52%] rounded-[20px] p-4" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ecfdf5] text-[#059669]"><FileText className="h-4 w-4" /></span>
            <div>
              <div className="text-xs font-bold text-[#0f172a]">Prescription ready</div>
              <div className="text-[11px] text-[#64748b]">Shared to patient · PDF</div>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            {["Amoxicillin 500 mg · 1-0-1 · 5 days", "Paracetamol 650 · SOS"].map((m) => (
              <div key={m} className="flex items-center gap-2 text-[11px] text-[#334155]"><Check className="h-3 w-3 text-[#059669]" />{m}</div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="nv-glass nv-float-3 absolute right-[0%] top-[34%] w-[44%] rounded-[20px] p-4 text-white" style={{ transform: "translateZ(90px)" }}>
          <div className="flex items-center justify-between text-[11px] font-semibold text-white/70">Today <TrendingUp className="h-3.5 w-3.5 text-[#5eead4]" /></div>
          <div className="mt-1 font-display text-3xl font-semibold">48 <span className="text-sm font-medium text-white/60">visits</span></div>
          <svg viewBox="0 0 120 36" className="mt-2 h-9 w-full">
            <defs><linearGradient id="nvspark" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#5eead4" stopOpacity=".5" /><stop offset="1" stopColor="#5eead4" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 30 L15 26 L30 28 L45 18 L60 21 L75 12 L90 15 L105 6 L120 9 L120 36 L0 36Z" fill="url(#nvspark)" />
            <path d="M0 30 L15 26 L30 28 L45 18 L60 21 L75 12 L90 15 L105 6 L120 9" fill="none" stroke="#5eead4" strokeWidth="2" />
          </svg>
          <div className="mt-2 text-[11px] text-white/60">Avg wait <b className="text-white">11 min</b> · down 32%</div>
        </div>

        {/* Booking toast */}
        <div className="nv-toast-in absolute right-[4%] top-[2%] w-[50%] rounded-2xl bg-[#0b1120]/90 p-3.5 text-white shadow-2xl ring-1 ring-white/10" style={{ transform: "translateZ(120px)" }}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#14b8a6] text-[#042f2e]"><CalendarCheck2 className="h-4 w-4" /></span>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold">New booking via DocConnect</div>
              <div className="text-[11px] text-white/60">Rahul · Today 5:30 PM</div>
            </div>
            <BellRing className="ml-auto h-3.5 w-3.5 text-[#5eead4]" />
          </div>
        </div>
      </div>
    </div>
  );
}
