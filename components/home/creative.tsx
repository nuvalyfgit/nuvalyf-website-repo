"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

/** Your own prescription card: the visitor types their details and sees their prescription header live. */
export function RxCard() {
  const [doc, setDoc] = useState("");
  const [clinic, setClinic] = useState("");
  const [spec, setSpec] = useState("General Physician");
  const input = "mt-1.5 h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#99F6E4]";
  const q = new URLSearchParams({ clinic, name: doc }).toString();
  return (
    <section className="bg-[#F4F7F6] py-14 sm:py-16">
      <div className="site-container grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold text-[#0F766E]">Try it</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#0B1120] sm:text-4xl">See your own prescription.</h2>
          <p className="mt-3 text-[#475569]">Type your name and clinic. This is how your prescriptions will look on NuvaLyf.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-[#334155]">Your name<input className={input} value={doc} onChange={(e) => setDoc(e.target.value)} placeholder="Dr. Meera Nair" maxLength={40} /></label>
            <label className="text-sm font-medium text-[#334155]">Clinic name<input className={input} value={clinic} onChange={(e) => setClinic(e.target.value)} placeholder="Nair Family Clinic" maxLength={40} /></label>
            <label className="text-sm font-medium text-[#334155] sm:col-span-2">Specialty
              <select className={input} value={spec} onChange={(e) => setSpec(e.target.value)}>
                {["General Physician", "Pediatrician", "Gynecologist", "Dermatologist", "Orthopedic Surgeon", "Dentist", "Cardiologist", "ENT Specialist"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>
          <a href={`/book-a-demo?${q}`} className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#0F766E] px-6 text-sm font-semibold text-white hover:bg-[#115E59]">Get this for your clinic <ArrowRight className="h-4 w-4" /></a>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_24px_48px_-24px_rgba(15,23,42,.25)] sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b-2 border-[#0F766E] pb-4">
            <div>
              <p className="font-display text-xl font-semibold text-[#0B1120]">{doc || "Dr. Meera Nair"}</p>
              <p className="text-sm text-[#64748B]">{spec}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#0F766E]">{clinic || "Nair Family Clinic"}</p>
              <p className="text-xs text-[#64748B]">Mon to Sat · 9 AM to 9 PM</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm text-[#475569]"><span>Patient: <b className="text-[#0B1120]">Ananya R., 34 F</b></span><span suppressHydrationWarning>{new Date().toLocaleDateString("en-IN")}</span></div>
          <p className="mt-5 font-display text-2xl font-semibold text-[#0F766E]">Rx</p>
          {[["Paracetamol 650 mg", "1-0-1 · after food · 3 days"], ["Cetirizine 10 mg", "0-0-1 · 5 days"]].map(([m, d]) => (
            <div key={m} className="flex justify-between border-b border-[#F1F5F9] py-2.5 text-sm"><b className="font-medium text-[#0B1120]">{m}</b><span className="text-[#64748B]">{d}</span></div>
          ))}
          <p className="mt-4 text-sm text-[#475569]">Advice: plenty of fluids, rest. Review in 5 days.</p>
          <div className="mt-6 flex items-end justify-between text-xs text-[#94A3B8]">
            <span>Made with NuvaLyf</span>
            <span className="border-t border-[#CBD5E1] pt-1 text-[#475569]">{doc || "Dr. Meera Nair"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
