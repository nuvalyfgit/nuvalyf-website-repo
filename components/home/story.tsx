"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck2, Check, ClipboardList, FileText, QrCode, Repeat2 } from "lucide-react";

const STEPS = [
  { icon: CalendarCheck2, title: "Patients find you and book", text: "Your verified DocConnect profile ranks for your specialty and area. Patients book a real slot in seconds, and it lands straight in your EMR." },
  { icon: QrCode, title: "They arrive to a live queue", text: "A QR scan checks them in. Everyone sees an honest ETA on their phone, so the waiting room stays calm." },
  { icon: ClipboardList, title: "You consult with full context", text: "History, allergies and past prescriptions on one screen. Notes take minutes with templates." },
  { icon: FileText, title: "Prescribe and bill in one flow", text: "A clean digital prescription goes to the patient's phone, and billing closes the visit at the desk." },
  { icon: Repeat2, title: "They come back", text: "Follow-up reminders and reports show what's working, so your clinic grows visit after visit." },
];

function Screen({ step }: { step: number }) {
  const rows = (items: string[]) => items.map((t) => <div key={t} className="flex items-center gap-2 rounded-lg bg-[#f8fafc] px-3 py-2 text-xs text-[#334155]"><Check className="h-3.5 w-3.5 text-[#059669]" />{t}</div>);
  const views = [
    <><div className="text-xs font-bold uppercase tracking-wider text-[#0f766e]">Pick a time</div><div className="mt-3 grid grid-cols-3 gap-2">{["9:30", "9:45", "10:00", "10:15", "10:30", "10:45"].map((t, i) => <div key={t} className={`rounded-lg py-2 text-center text-xs font-bold ${i === 3 ? "bg-[#059669] text-white" : i === 1 ? "bg-[#f1f5f9] text-[#cbd5e1] line-through" : "bg-[#f1f5f9] text-[#0f172a]"}`}>{t}</div>)}</div><div className="mt-4 rounded-xl bg-[#0b1120] py-3 text-center text-sm font-bold text-white">Confirm booking</div></>,
    <><div className="text-xs font-bold uppercase tracking-wider text-[#0f766e]">Your token</div><div className="mt-2 font-display text-7xl font-semibold text-[#0b1120]">14</div><div className="mt-2 text-sm text-[#475569]">2 people ahead · ETA <b className="text-[#0f172a]">10:52 AM</b></div><div className="mt-4 h-2 rounded-full bg-[#f1f5f9]"><div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-[#059669] to-[#14b8a6]" /></div></>,
    <><div className="text-xs font-bold uppercase tracking-wider text-[#0f766e]">Ananya R. · 34 F</div><div className="mt-3 space-y-2">{rows(["Allergy: Penicillin", "Last visit: 12 Oct · BP 128/82", "Ongoing: Thyroid, 50 mcg"])}</div></>,
    <><div className="text-xs font-bold uppercase tracking-wider text-[#0f766e]">Prescription</div><div className="mt-3 space-y-2">{rows(["Azithromycin 500 · 1-0-0 · 3 days", "Cetirizine 10 · 0-0-1 · 5 days", "Review in 1 week"])}</div><div className="mt-3 rounded-xl bg-[#ecfdf5] py-2.5 text-center text-xs font-bold text-[#047857]">Sent to patient · Paid ₹600</div></>,
    <><div className="text-xs font-bold uppercase tracking-wider text-[#0f766e]">This month</div><div className="mt-3 flex items-end gap-1.5">{[40, 55, 48, 62, 70, 66, 82].map((h, i) => <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#059669] to-[#5eead4]" style={{ height: h }} />)}</div><div className="mt-3 text-sm text-[#475569]"><b className="text-[#0f172a]">212</b> follow-ups due · <b className="text-[#0f172a]">+18%</b> returning patients</div></>,
  ];
  return <>{views.map((v, i) => <div key={i} data-active={i === step} className="nv-screen absolute inset-0 p-6">{v}</div>)}</>;
}

/** Sticky scroll story: the phone changes as each step scrolls past. */
export function Story() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
      <ol className="space-y-6 lg:space-y-[28vh] lg:py-[18vh]">
        {STEPS.map((s, i) => (
          <li key={s.title} ref={(el) => { refs.current[i] = el; }} data-i={i} data-active={i === active} className="nv-step">
            <span className="flex items-center gap-3 text-sm font-bold text-[#059669]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ecfdf5]"><s.icon className="h-4 w-4" /></span>0{i + 1}</span>
            <h3 className="mt-4 font-display text-3xl font-semibold text-[#0b1120] sm:text-4xl">{s.title}</h3>
            <p className="mt-3 max-w-lg text-lg leading-8 text-[#475569]">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="hidden lg:block">
        <div className="sticky top-[18vh] mx-auto h-[560px] w-[300px] rounded-[46px] border-[10px] border-[#0b1120] bg-white shadow-[0_50px_120px_-30px_rgba(5,150,105,0.45)]">
          <div className="mx-auto mt-2 h-6 w-28 rounded-full bg-[#0b1120]" />
          <div className="relative h-[480px]"><Screen step={active} /></div>
        </div>
      </div>
    </div>
  );
}
