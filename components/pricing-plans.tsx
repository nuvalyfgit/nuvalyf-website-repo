"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { annualPrice, inr, plans } from "@/data/pricing";

/** Plan cards with a monthly / yearly switch. */
export function PricingPlans() {
  const [yearly, setYearly] = useState(false);
  return (
    <div>
      <div className="flex justify-center">
        <div role="group" aria-label="Billing period" className="inline-flex rounded-full border border-[#E2E8F0] bg-white p-1 shadow-sm">
          {[false, true].map((y) => (
            <button
              key={String(y)}
              type="button"
              aria-pressed={yearly === y}
              onClick={() => setYearly(y)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${yearly === y ? "bg-[#0F172A] text-white" : "text-[#475569] hover:text-[#0F172A]"}`}
            >
              {y ? "Yearly" : "Monthly"}
              {y && <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] ${yearly ? "bg-[#14B8A6] text-[#042F2E]" : "bg-[#ECFDF5] text-[#059669]"}`}>Save 10%</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="reveal-stagger mt-12 grid gap-5 lg:grid-cols-3">
        {plans.map((p) => (
          <article
            key={p.id}
            className={`relative flex flex-col rounded-[24px] border p-8 ${p.popular ? "border-[#059669] bg-[#0B1120] text-white shadow-[0_24px_70px_rgba(5,150,105,0.25)]" : "border-[#E2E8F0] bg-white text-[#0F172A]"}`}
          >
            {p.popular && <span className="absolute -top-3 left-8 rounded-full bg-[#14B8A6] px-3 py-1 text-xs font-black text-[#042F2E]">Most popular</span>}
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className={`mt-2 text-sm leading-6 ${p.popular ? "text-white/60" : "text-[#64748B]"}`}>{p.tagline}</p>
            <p className="mt-7 flex items-baseline gap-1.5">
              <span className={`text-sm font-semibold ${p.popular ? "text-white/60" : "text-[#64748B]"}`}>from</span>
              <span className="font-display text-4xl font-semibold">{inr(yearly ? annualPrice(p.monthly) : p.monthly)}</span>
              <span className={`text-sm ${p.popular ? "text-white/60" : "text-[#64748B]"}`}>/ {yearly ? "year" : "month"}</span>
            </p>
            <p className={`mt-1 text-xs ${p.popular ? "text-white/45" : "text-[#94A3B8]"}`}>
              {yearly ? `Paid upfront. ${inr(p.monthly)} / month if paid monthly.` : "Billed monthly."} Before GST.
            </p>

            <dl className={`mt-7 grid grid-cols-3 gap-2 rounded-2xl p-4 text-center ${p.popular ? "bg-white/[0.06]" : "bg-[#F8FAFC]"}`}>
              {[
                [p.doctors, p.doctors === 1 ? "doctor" : "doctors"],
                [p.staff, "staff logins"],
                [p.docconnectVisits, "DocConnect visits / mo"],
              ].map(([v, l]) => (
                <div key={String(l)}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-xl font-bold">{v}</dd>
                  <dd className={`text-[11px] leading-4 ${p.popular ? "text-white/55" : "text-[#64748B]"}`}>{l}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-7 flex-1 space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className={`flex gap-2.5 text-sm ${p.popular ? "text-white/80" : "text-[#475569]"}`}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#14B8A6]" />
                  {h}
                </li>
              ))}
            </ul>

            <a
              href={`/book-a-demo?plan=${p.id}`}
              className={`mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full font-bold transition ${p.popular ? "bg-[#14B8A6] text-[#042F2E] hover:bg-[#2DD4BF]" : "bg-[#059669] text-white hover:bg-[#047857]"}`}
            >
              Book a demo <ArrowRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
