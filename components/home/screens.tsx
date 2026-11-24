/** Clean product-style screens (sample data). Replace with real screenshots when available. */
import { Frame, Row } from "./frame";
import { LiveQueue, PhoneTrack, RxLive } from "./live";

export const QueueScreen = () => (
  <Frame title="Today's queue · Dr. Meera" tab="Front desk">
    <div className="mb-3 grid grid-cols-3 gap-2 text-center">
      {[["24", "Booked"], ["9", "Waiting"], ["12 min", "Avg wait"]].map(([n, l]) => (
        <div key={l} className="rounded-lg bg-[#F8FAFC] py-2"><b className="block text-lg">{n}</b><span className="text-xs text-[#64748B]">{l}</span></div>
      ))}
    </div>
    <Row a="12 · Ananya R." b="Follow-up" c="In consult" on />
    <Row a="13 · Mohammed S." b="Fever, 3 days" c="Next" />
    <Row a="14 · Priya K." b="DocConnect" c="Arrived" />
    <Row a="15 · Rahul V." b="New patient" c="On the way" />
  </Frame>
);

export const BookScreen = () => (
  <Frame title="DocConnect · Book a visit" tab="Patient app">
    <p className="font-semibold">Dr. Meera Nair · General Medicine</p>
    <p className="text-xs text-[#64748B]">Tomorrow, Tue</p>
    <div className="mt-3 grid grid-cols-3 gap-2">
      {["9:00", "9:20", "9:40", "10:00", "10:20", "10:40"].map((t, i) => (
        <span key={t} className={`rounded-lg py-2 text-center text-xs font-semibold ${i === 2 ? "bg-[#0F766E] text-white" : i === 1 ? "bg-[#F1F5F9] text-[#94A3B8] line-through" : "ring-1 ring-[#E2E8F0]"}`}>{t}</span>
      ))}
    </div>
    <div className="mt-3 rounded-lg bg-[#F0FDFA] p-3 text-xs text-[#0F766E]">Token 14 confirmed. You will get a live update before your turn.</div>
  </Frame>
);

export const ConsultScreen = () => (
  <Frame title="Ananya R. · 34 F" tab="Consultation">
    <div className="grid grid-cols-3 gap-2 text-center">
      {[["BP", "118/76"], ["Temp", "98.6°F"], ["SpO2", "99%"]].map(([l, v]) => (
        <div key={l} className="rounded-lg bg-[#F8FAFC] py-2"><span className="block text-xs text-[#64748B]">{l}</span><b>{v}</b></div>
      ))}
    </div>
    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">History</p>
    <Row a="12 Oct" b="Viral fever · recovered" />
    <Row a="02 Aug" b="Thyroid panel · normal" />
    <div className="mt-2 rounded-lg bg-[#FEF2F2] px-3 py-2 text-xs font-medium text-[#B91C1C]">Allergy: Penicillin</div>
  </Frame>
);

export const RxScreen = () => (
  <Frame title="Prescription · Ananya R." tab="Rx">
    {[["Paracetamol 650", "1-0-1 · 3 days"], ["Cetirizine 10", "0-0-1 · 5 days"], ["ORS sachet", "As needed"]].map(([m, d]) => (
      <div key={m} className="flex items-center justify-between border-b border-[#F1F5F9] py-2.5"><b className="font-medium">{m}</b><span className="text-[#64748B]">{d}</span></div>
    ))}
    <div className="mt-3 flex gap-2 text-xs font-semibold">
      <span className="rounded-lg bg-[#0F766E] px-3 py-2 text-white">Send on WhatsApp</span>
      <span className="rounded-lg px-3 py-2 ring-1 ring-[#E2E8F0]">Print</span>
    </div>
  </Frame>
);

export const BillScreen = () => (
  <Frame title="Invoice #2481" tab="Billing">
    {[["Consultation", "₹500"], ["CBC test", "₹350"], ["Medicines", "₹180"]].map(([a, b]) => (
      <div key={a} className="flex justify-between border-b border-[#F1F5F9] py-2.5"><span>{a}</span><span>{b}</span></div>
    ))}
    <div className="flex justify-between pt-3 text-base font-bold"><span>Total</span><span>₹1,030</span></div>
    <div className="mt-3 rounded-lg bg-[#F0FDFA] px-3 py-2 text-xs font-semibold text-[#0F766E]">Paid by UPI · receipt sent</div>
  </Frame>
);

export const TrackScreen = () => (
  <Frame title="DocConnect · Your turn" tab="Live">
    <div className="flex items-end justify-between">
      <div><span className="text-xs text-[#64748B]">Your token</span><b className="block font-display text-5xl">14</b></div>
      <div className="text-right"><span className="text-xs text-[#64748B]">Leave home by</span><b className="block text-2xl text-[#0F766E]">6:40 PM</b></div>
    </div>
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F1F5F9]"><div className="h-full w-2/3 rounded-full bg-[#0F766E]" /></div>
    <p className="mt-2 text-xs text-[#64748B]">3 patients ahead · Dr. Meera is on time</p>
    <div className="mt-3 rounded-lg bg-[#F8FAFC] px-3 py-2 text-xs">We will message you when you are next.</div>
  </Frame>
);

export const screens = { book: BookScreen, queue: LiveQueue, consult: ConsultScreen, rx: RxLive, bill: BillScreen, track: PhoneTrack };
export type ScreenKey = keyof typeof screens;
