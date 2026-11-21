"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, FileText, PhoneCall, Send, UserRound } from "lucide-react";

/* ------------------------------------------------------------ 2. Try-it demo */

const PATIENTS = [
  { t: 21, name: "Ananya R.", age: "34 F", reason: "Fever, 3 days", allergy: "Penicillin" },
  { t: 22, name: "Mohammed I.", age: "52 M", reason: "BP review", allergy: "None" },
  { t: 23, name: "Priya S.", age: "8 F", reason: "Cough", allergy: "None" },
  { t: 24, name: "Karthik M.", age: "41 M", reason: "Back pain", allergy: "Sulfa" },
];
const MEDS = ["Paracetamol 650", "Azithromycin 500", "Cetirizine 10", "ORS sachets", "Vitamin D3 60K"];

export function TryDemo() {
  const [cur, setCur] = useState(0);
  const [meds, setMeds] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const p = PATIENTS[cur % PATIENTS.length];
  const callNext = () => { setCur((c) => c + 1); setMeds([]); setSent(false); };
  return (
    <div className="grid overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-white shadow-[0_40px_100px_-40px_rgba(5,150,105,0.4)] lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-[#e2e8f0] bg-[#f8fafc] p-5 lg:border-b-0 lg:border-r">
        <p className="text-xs font-bold uppercase tracking-wider text-[#0f766e]">Today&apos;s queue</p>
        <ul className="mt-3 space-y-2">
          {[0, 1, 2].map((k) => {
            const q = PATIENTS[(cur + k) % PATIENTS.length];
            return (
              <li key={q.t + k} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${k === 0 ? "bg-[#0b1120] text-white" : "bg-white text-[#334155] ring-1 ring-[#e2e8f0]"}`}>
                <b className="w-6">{q.t + Math.floor((cur + k) / PATIENTS.length) * 4}</b>{q.name}
                {k === 0 && <span className="ml-auto text-[10px] font-bold uppercase text-[#5eead4]">In room</span>}
              </li>
            );
          })}
        </ul>
        <button onClick={callNext} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#14b8a6] py-3 text-sm font-bold text-[#042f2e] transition hover:bg-[#2dd4bf]"><PhoneCall className="h-4 w-4" /> Done · call next</button>
      </aside>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#ecfdf5] text-[#059669]"><UserRound className="h-5 w-5" /></span>
          <div><p className="font-bold text-[#0b1120]">{p.name} <span className="font-normal text-[#64748b]">· {p.age}</span></p><p className="text-sm text-[#64748b]">{p.reason}</p></div>
          <span className={`ml-auto rounded-full px-3 py-1 text-xs font-bold ${p.allergy === "None" ? "bg-[#f1f5f9] text-[#475569]" : "bg-[#fef2f2] text-[#b91c1c]"}`}>Allergy: {p.allergy}</span>
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#0f766e]">Tap to prescribe</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {MEDS.map((m) => {
            const on = meds.includes(m);
            const warn = m.startsWith("Azithromycin") && p.allergy !== "None" && false;
            return (
              <button key={m} onClick={() => { setSent(false); setMeds((x) => (on ? x.filter((y) => y !== m) : [...x, m])); }}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${on ? "bg-[#059669] text-white" : "bg-[#f1f5f9] text-[#334155] hover:bg-[#e2e8f0]"} ${warn ? "ring-2 ring-red-400" : ""}`}>
                {on && <Check className="mr-1 inline h-3.5 w-3.5" />}{m}
              </button>
            );
          })}
        </div>
        <div className="mt-6 min-h-[92px] rounded-2xl border border-dashed border-[#cbd5e1] p-4">
          {meds.length ? (
            <ul className="space-y-1.5 text-sm text-[#334155]">{meds.map((m) => <li key={m} className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#059669]" />{m} · 1-0-1 · 5 days</li>)}</ul>
          ) : <p className="text-sm text-[#94a3b8]">Your prescription builds here.</p>}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button disabled={!meds.length} onClick={() => setSent(true)} className="inline-flex items-center gap-2 rounded-full bg-[#0b1120] px-5 py-3 text-sm font-bold text-white transition disabled:opacity-40"><Send className="h-4 w-4" /> Share with patient</button>
          {sent && <span className="rounded-full bg-[#ecfdf5] px-3 py-1.5 text-sm font-semibold text-[#047857]">Sent to {p.name.split(" ")[0]}&apos;s phone as a PDF</span>}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 3. Wait-time calculator */

export function WaitCalculator() {
  const [patients, setPatients] = useState(40);
  const [wait, setWait] = useState(45);
  const [fee, setFee] = useState(500);
  const [days, setDays] = useState(26);
  const reduction = 0.3; // assumption, stated on screen
  const hoursSaved = Math.round((patients * days * wait * reduction) / 60);
  const extraSlots = Math.round((patients * days * 0.05));
  const revenue = extraSlots * fee;
  const field = (label: string, v: number, set: (n: number) => void, min: number, max: number, step: number, unit: string) => (
    <label className="block">
      <span className="flex justify-between text-sm font-semibold text-[#334155]"><span>{label}</span><b className="text-[#0b1120]">{v.toLocaleString("en-IN")} {unit}</b></span>
      <input type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(Number(e.target.value))} className="mt-3 w-full accent-[#059669]" />
    </label>
  );
  return (
    <div className="grid gap-8 rounded-[28px] border border-[#e2e8f0] bg-white p-7 sm:p-10 lg:grid-cols-2">
      <div className="space-y-7">
        {field("Patients per day", patients, setPatients, 5, 200, 5, "")}
        {field("Average wait today", wait, setWait, 5, 120, 5, "min")}
        {field("Consultation fee", fee, setFee, 100, 3000, 50, "₹")}
        {field("Clinic days per month", days, setDays, 10, 31, 1, "")}
      </div>
      <div className="flex flex-col justify-between rounded-[22px] bg-[#0b1120] p-7 text-white">
        <div>
          <p className="text-sm text-white/60">Patient waiting time saved each month</p>
          <p className="mt-1 font-display text-6xl font-semibold nv-gradient-text">{hoursSaved.toLocaleString("en-IN")} h</p>
          <p className="mt-6 text-sm text-white/60">Potential extra visits from fewer no-shows</p>
          <p className="mt-1 font-display text-3xl font-semibold">{extraSlots} · ₹{revenue.toLocaleString("en-IN")}</p>
        </div>
        <div>
          <p className="mt-6 text-xs leading-5 text-white/45">Estimate only. Assumes live ETAs cut waiting by about 30% and reminders recover about 5% of visits. Your numbers will vary.</p>
          <a href={`/book-a-demo?source=calculator&patients=${patients}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#14b8a6] px-6 py-3 font-bold text-[#042f2e] hover:bg-[#2dd4bf]">See it for your clinic <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 5. Before / after */

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = (x: number) => { const r = box.current?.getBoundingClientRect(); if (r) setPos(Math.max(4, Math.min(96, ((x - r.left) / r.width) * 100))); };
  const Panel = ({ after }: { after?: boolean }) => (
    <div className={`absolute inset-0 grid place-items-center p-8 ${after ? "bg-gradient-to-br from-[#ecfdf5] to-[#ccfbf1]" : "bg-[#f1f0ec]"}`}>
      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
        {(after
          ? [["Live queue", "Everyone sees their ETA"], ["Digital records", "History in one click"], ["Prescription", "On the patient's phone"]]
          : [["Crowded waiting room", "No idea how long"], ["Paper files", "Searched by hand"], ["Handwritten slips", "Hard to read, easy to lose"]]
        ).map(([t, d], i) => (
          <div key={t} className={`rounded-2xl p-5 ${after ? "bg-white shadow-lg" : "rotate-[-1.5deg] bg-[#fffdf5] shadow"}`} style={after ? {} : { transform: `rotate(${[-2, 1.5, -1][i]}deg)` }}>
            <p className={`font-bold ${after ? "text-[#0b1120]" : "font-serif-accent text-xl italic text-[#57534e]"}`}>{t}</p>
            <p className={`mt-1 text-sm ${after ? "text-[#047857]" : "text-[#78716c]"}`}>{d}</p>
          </div>
        ))}
      </div>
      <span className={`absolute top-5 ${after ? "right-5 bg-[#059669] text-white" : "left-5 bg-[#44403c] text-white"} rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider`}>{after ? "With NuvaLyf" : "Before"}</span>
    </div>
  );
  return (
    <div ref={box} className="relative h-[380px] select-none overflow-hidden rounded-[28px] border border-[#e2e8f0] sm:h-[320px]"
      onPointerMove={(e) => e.buttons === 1 && drag(e.clientX)} onPointerDown={(e) => drag(e.clientX)}>
      <Panel />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}><Panel after /></div>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0b1120] shadow-xl">⇆</span>
      </div>
      <input type="range" min={4} max={96} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Compare before and after" className="absolute inset-x-0 bottom-0 w-full opacity-0" />
    </div>
  );
}

/* ------------------------------------------------------------ 4. Dotted globe (canvas, no 3D library) */

const MARKERS = [{ lat: 21, lon: 78, label: "India" }, { lat: 24.4, lon: 54.4, label: "UAE" }];

export function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const size = c.clientWidth;
    c.width = c.height = size * dpr;
    ctx.scale(dpr, dpr);
    const R = size / 2 - 6;
    const pts: [number, number][] = [];
    for (let lat = -80; lat <= 80; lat += 5) for (let lon = -180; lon < 180; lon += 360 / Math.max(8, Math.round(72 * Math.cos((lat * Math.PI) / 180)))) pts.push([lat, lon]);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "reduce";
    let rot = -70, raf = 0, t = 0;
    const proj = (lat: number, lon: number) => {
      const la = (lat * Math.PI) / 180, lo = ((lon + rot) * Math.PI) / 180;
      return { x: size / 2 + R * Math.cos(la) * Math.sin(lo), y: size / 2 - R * Math.sin(la) * 0.98 + R * 0.02, z: Math.cos(la) * Math.cos(lo) };
    };
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const g = ctx.createRadialGradient(size / 2, size / 2, R * 0.2, size / 2, size / 2, R);
      g.addColorStop(0, "rgba(20,184,166,0.10)"); g.addColorStop(1, "rgba(20,184,166,0.02)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(size / 2, size / 2, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(94,234,212,0.35)"; ctx.lineWidth = 1.2; ctx.shadowColor = "#14b8a6"; ctx.shadowBlur = 24; ctx.stroke(); ctx.shadowBlur = 0;
      for (const [la, lo] of pts) { const p = proj(la, lo); if (p.z > 0) { ctx.fillStyle = `rgba(94,234,212,${0.25 + p.z * 0.7})`; ctx.beginPath(); ctx.arc(p.x, p.y, 1.1 + p.z * 0.9, 0, Math.PI * 2); ctx.fill(); } }
      const m = MARKERS.map((k) => ({ ...k, ...proj(k.lat, k.lon) }));
      if (m[0].z > 0 && m[1].z > 0) {
        ctx.strokeStyle = "rgba(94,234,212,0.8)"; ctx.lineWidth = 1.5; ctx.beginPath();
        ctx.moveTo(m[0].x, m[0].y); ctx.quadraticCurveTo((m[0].x + m[1].x) / 2, Math.min(m[0].y, m[1].y) - 40, m[1].x, m[1].y); ctx.stroke();
      }
      for (const k of m) if (k.z > 0) {
        const pulse = 6 + ((t / 20) % 14);
        ctx.fillStyle = `rgba(94,234,212,${0.5 - pulse / 40})`; ctx.beginPath(); ctx.arc(k.x, k.y, pulse, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#5eead4"; ctx.beginPath(); ctx.arc(k.x, k.y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.font = "600 12px Inter, sans-serif"; ctx.fillText(k.label, k.x + 9, k.y - 7);
      }
    };
    const loop = () => { t++; rot += 0.12; if (rot > -40) rot = -110; draw(); raf = requestAnimationFrame(loop); };
    if (reduce) { rot = -72; draw(); } else loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="aspect-square w-full max-w-[460px]" aria-label="Globe showing NuvaLyf in India and the UAE" role="img" />;
}
