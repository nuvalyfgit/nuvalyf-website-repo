/**
 * India clinic pricing (from the NUVA LYF India pricing proposal, 1 Nov 2026).
 * The website shows the T5 rates as "from" prices; the exact price depends on the clinic's city
 * and is confirmed in the quotation. All amounts in INR, before GST.
 */
export const ANNUAL_DISCOUNT = 0.1;

export type Plan = {
  id: "starter" | "growth" | "pro";
  name: string;
  tagline: string;
  monthly: number;
  doctors: number;
  staff: number;
  docconnectVisits: number;
  highlights: string[];
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For a single-doctor clinic getting organised.",
    monthly: 599,
    doctors: 1,
    staff: 2,
    docconnectVisits: 30,
    highlights: ["Patient records / EMR", "Digital prescriptions", "Appointments and billing", "DocConnect profile and booking", "Basic reports and role permissions"],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For busy clinics with several doctors.",
    monthly: 1399,
    doctors: 3,
    staff: 5,
    docconnectVisits: 60,
    highlights: ["Everything in Starter", "Multiple doctor schedules", "Advanced booking-source reports", "Advanced role permissions", "Pharmacy & inventory add-on available"],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For large clinics that run their own pharmacy.",
    monthly: 2999,
    doctors: 8,
    staff: 12,
    docconnectVisits: 120,
    highlights: ["Everything in Growth", "Pharmacy, inventory, barcode and stock alerts included", "8 doctors and 12 staff logins", "120 DocConnect visits a month included"],
  },
];

export const annualPrice = (monthly: number) => Math.round(monthly * 12 * (1 - ANNUAL_DISCOUNT) * 100) / 100;

export const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

/** Feature comparison: [feature, starter, growth, pro]. */
export const featureRows: [string, string, string, string][] = [
  ["Patient records / EMR, digital prescriptions", "Included", "Included", "Included"],
  ["Appointment calendar, billing, DocConnect profile and booking", "Included", "Included", "Included"],
  ["Multiple doctor schedules", "Single doctor", "Included", "Included"],
  ["Booking-source dashboard and reports", "Basic", "Advanced", "Advanced"],
  ["Role permissions", "Basic", "Advanced", "Advanced"],
  ["Pharmacy, inventory, barcode, stock alerts", "Not included", "₹499 / month", "Included"],
  ["Doctor AI scribe (optional, per doctor)", "₹699 / month", "₹699 / month", "₹699 / month"],
  ["Support (P1 / P2 / P3 resolution)", "6h / 24h / 48h", "6h / 24h / 48h", "6h / 24h / 48h"],
];

export const seats: [string, number][] = [
  ["Doctor", 299],
  ["Clinic manager / admin", 149],
  ["Receptionist", 99],
  ["Pharmacy staff", 99],
  ["Nurse / assistant", 99],
];

/** DocConnect new-patient visits: [plan, included per month, each extra visit, monthly cap]. */
export const marketplace: [string, number, number, number][] = [
  ["Starter", 30, 25, 1000],
  ["Growth", 60, 20, 2500],
  ["Pro", 120, 15, 4000],
];

export const support: [string, string, string][] = [
  ["P1 · Urgent", "Service unavailable or a critical clinic workflow blocked", "Within 6 hours"],
  ["P2 · Medium", "Something isn't working, but there's a workaround", "Within 24 hours"],
  ["P3 · Low", "Minor issue or routine support request", "Within 48 hours"],
];

export const hospitalRanges: [string, string][] = [
  ["Small OPD centre / polyclinic", "₹5,000 – ₹10,000 / month"],
  ["Small hospital / nursing home", "₹10,000 – ₹25,000 / month"],
  ["Multispecialty hospital / chain", "Custom quotation"],
];

export const pricingFaqs: [string, string][] = [
  ["Are prices the same in every city?", "No. Prices depend on your clinic's city. The prices on this page are our starting prices, and your exact price is confirmed in your written quotation."],
  ["Do prices include GST?", "No. All prices are in Indian rupees and exclude applicable GST."],
  ["Is there a discount for paying yearly?", "Yes. Paying 12 months upfront saves 10% on the base plan. Extra seats, add-ons and DocConnect visit charges are not discounted."],
  ["What counts as a DocConnect visit?", "A completed appointment by a new patient who booked through DocConnect and actually attended. Walk-ins, your own patients, cancellations, no-shows and repeat visits are never charged."],
  ["What happens if we go over the included DocConnect visits?", "Each extra visit has a small fee, and there is a monthly cap, so the extra charge never goes above the cap for your plan."],
  ["Can we add more doctors or staff?", "Yes. Add seats at any time. Every person gets their own login with the right permissions."],
  ["How does the AI scribe work?", "It's optional and charged per doctor who uses it. Each doctor gets 600 audio minutes a month. If you need more, a 300-minute pack is ₹199. Doctors always review the draft notes."],
];
