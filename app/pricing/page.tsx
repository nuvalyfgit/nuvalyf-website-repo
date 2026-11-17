import type { Metadata } from "next";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import { CtaBand, PageHero, Section } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { PricingPlans } from "@/components/pricing-plans";
import { SectionHeading } from "@/components/section-heading";
import { featureRows, hospitalRanges, inr, marketplace, plans, pricingFaqs, seats, support } from "@/data/pricing";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing: Clinic EMR Software Plans in India",
  description: `Clinic EMR and booking software plans from ${inr(plans[0].monthly)} a month. Compare Starter, Growth and Pro, add seats and modules, save 10% yearly. Book a demo.`,
};

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NuvaLyf EMR",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web browser",
  url: "https://nuvalyf.com/pricing",
  offers: plans.map((p) => ({
    "@type": "Offer",
    name: `${p.name} plan`,
    price: p.monthly,
    priceCurrency: "INR",
    url: "https://nuvalyf.com/pricing",
    priceSpecification: { "@type": "UnitPriceSpecification", price: p.monthly, priceCurrency: "INR", unitCode: "MON", valueAddedTaxIncluded: false },
  })),
};

const th = "px-5 py-4 text-left text-sm font-bold text-[#0F172A]";
const td = "px-5 py-4 text-sm text-[#475569]";

export default function PricingPage() {
  return (
    <PageShell crumbs={[["Pricing", "/pricing"]]}>
      <JsonLd data={offersJsonLd} />
      <PageHero
        eyebrow="Pricing"
        title="Simple plans for every clinic."
        highlight={`From ${inr(plans[0].monthly)} a month.`}
        lead="One clinic location, everything you need to run it, and DocConnect bookings included. Pay monthly, or yearly and save 10%."
        secondary={{ label: "Talk to sales", href: "/contact" }}
      />

      <Section tint>
        <PricingPlans />
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-[#94A3B8]">
          Starting prices for one clinic location, in Indian rupees, before applicable GST. Prices depend on your clinic&apos;s city;
          your exact price, plan and any add-ons are confirmed in your written quotation.
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="Compare plans" title="What's in each plan." align="center" />
        <div className="mt-12 overflow-x-auto rounded-[22px] border border-[#E2E8F0]">
          <table className="w-full min-w-[640px] border-collapse">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th scope="col" className={th}>Feature</th>
                {plans.map((p) => <th key={p.id} scope="col" className={th}>{p.name}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {[
                ["Price per month (from)", ...plans.map((p) => inr(p.monthly))],
                ["Doctors included", ...plans.map((p) => String(p.doctors))],
                ["Staff / admin logins included", ...plans.map((p) => String(p.staff))],
                ["DocConnect visits included / month", ...plans.map((p) => String(p.docconnectVisits))],
                ...featureRows,
              ].map(([f, ...v]) => (
                <tr key={f}>
                  <th scope="row" className={`${td} font-semibold text-[#0F172A]`}>{f}</th>
                  {v.map((x, i) => <td key={i} className={`${td} ${x === "Not included" ? "text-[#94A3B8]" : ""}`}>{x}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tint>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[22px] border border-[#E2E8F0] bg-white p-8">
            <h2 className="text-xl font-bold text-[#0F172A]">Extra logins</h2>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">Everyone gets their own login with the right permissions. Add people any time.</p>
            <ul className="mt-6 divide-y divide-[#E2E8F0]">
              {seats.map(([role, price]) => (
                <li key={role} className="flex justify-between py-3 text-sm"><span className="text-[#475569]">{role}</span><span className="font-bold text-[#0F172A]">{inr(price)} / month</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-[22px] border border-[#E2E8F0] bg-white p-8">
            <h2 className="text-xl font-bold text-[#0F172A]">Optional modules</h2>
            <ul className="mt-6 space-y-6 text-sm">
              <li>
                <p className="flex justify-between gap-4"><span className="font-bold text-[#0F172A]">Pharmacy, inventory & stock</span><span className="shrink-0 font-bold text-[#0F172A]">₹499 / month</span></p>
                <p className="mt-1.5 leading-6 text-[#64748B]">Per clinic, on the Growth plan. Barcodes and stock alerts included. Already part of Pro.</p>
              </li>
              <li>
                <p className="flex justify-between gap-4"><span className="font-bold text-[#0F172A]">Doctor AI scribe</span><span className="shrink-0 font-bold text-[#0F172A]">₹699 / doctor / month</span></p>
                <p className="mt-1.5 leading-6 text-[#64748B]">On any plan, for each doctor who uses it. 600 audio minutes a month per doctor; extra 300 minutes for ₹199. Doctors review every draft.</p>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1fr]">
          <SectionHeading
            eyebrow="DocConnect visits"
            title="Pay only when a new patient actually walks in."
            description="Each plan includes new-patient visits from DocConnect every month. You're charged only for completed visits by new patients who booked through DocConnect, and extra visits are capped every month."
          />
          <div>
            <div className="overflow-x-auto rounded-[22px] border border-[#E2E8F0]">
              <table className="w-full min-w-[440px] border-collapse">
                <thead className="bg-[#F8FAFC]">
                  <tr><th scope="col" className={th}>Plan</th><th scope="col" className={th}>Included / month</th><th scope="col" className={th}>Each extra visit</th><th scope="col" className={th}>Monthly cap</th></tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {marketplace.map(([plan, inc, extra, cap]) => (
                    <tr key={plan}><th scope="row" className={`${td} font-semibold text-[#0F172A]`}>{plan}</th><td className={td}>{inc}</td><td className={td}>{inr(extra)}</td><td className={td}>{inr(cap)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#64748B]">Never charged: walk-ins, your own patients and channels, cancellations, no-shows and repeat visits. Patients pay your consultation fee directly.</p>
          </div>
        </div>
      </Section>

      <Section tint>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[22px] border border-[#E2E8F0] bg-white p-8">
            <h2 className="text-xl font-bold text-[#0F172A]">Support on every plan</h2>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">Resolution times are counted from when you raise the ticket.</p>
            <ul className="mt-6 divide-y divide-[#E2E8F0]">
              {support.map(([flag, what, tat]) => (
                <li key={flag} className="grid gap-1 py-3 text-sm sm:grid-cols-[110px_1fr_auto] sm:gap-4">
                  <span className="font-bold text-[#0F172A]">{flag}</span><span className="text-[#475569]">{what}</span><span className="font-semibold text-[#059669]">{tat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[22px] border border-[#E2E8F0] bg-white p-8">
            <h2 className="text-xl font-bold text-[#0F172A]">Hospitals and larger organisations</h2>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">Scoped to your departments, branches and workflows. Indicative starting ranges, before GST:</p>
            <ul className="mt-6 divide-y divide-[#E2E8F0]">
              {hospitalRanges.map(([org, range]) => (
                <li key={org} className="flex justify-between gap-4 py-3 text-sm"><span className="text-[#475569]">{org}</span><span className="shrink-0 font-bold text-[#0F172A]">{range}</span></li>
              ))}
            </ul>
            <a href="/for-hospitals#enquiry" className="mt-6 inline-flex text-sm font-bold text-[#059669] hover:underline">Send a hospital enquiry →</a>
          </div>
        </div>
      </Section>

      <FaqSection items={pricingFaqs} eyebrow="Pricing FAQ" title="Questions about pricing." />
      <CtaBand title="Find the right plan for your clinic." text="We'll walk you through NuvaLyf and confirm the exact price for your city." />
    </PageShell>
  );
}
