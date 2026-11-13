import {
  ArrowRight, BellRing, CalendarCheck2, Check, ClipboardList, Link2, MapPin, Monitor, PlugZap,
  QrCode, Search, ShieldCheck, Smartphone, Stethoscope, UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { docconnect } from "@/data/site-content";
import { IPhoneJourney } from "@/components/iphone-journey";

const audiences = [
  {
    Icon: Smartphone,
    title: "For patients",
    points: ["Find verified doctors by symptom or specialty", "Book for the whole family", "Live token with “leave home at” time", "Prescriptions in the app"],
  },
  {
    Icon: Stethoscope,
    title: "For doctors",
    points: ["Your own booking link and QR, 0% commission", "One-tap “running late” alert to every waiting patient", "Online and walk-in patients in one line"],
  },
  {
    Icon: UsersRound,
    title: "For clinics",
    points: ["Fewer empty slots and no-shows", "Waiting-room TV with token numbers only", "QR check-in at the door"],
  },
];

const flow = [
  { Icon: Search, title: "Patient books", text: "On DocConnect, from the app or the doctor’s link." },
  { Icon: ClipboardList, title: "Lands in the EMR", text: "The booking appears in the clinic’s live queue." },
  { Icon: Stethoscope, title: "Doctor consults", text: "Notes, vitals and prescription in the EMR." },
  { Icon: BellRing, title: "Back to the patient", text: "Prescription and follow-up reach the patient’s app." },
];

/** Phone mockup of the patient's live token: the feature that sells DocConnect. */
export function LiveTicket() {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(55%_50%_at_50%_45%,rgba(57,219,192,0.25),transparent_70%)] blur-2xl" />
      <div className="rounded-[40px] border border-white/15 bg-[#0d1733] p-2.5 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <div className="overflow-hidden rounded-[32px] bg-[#f5f9f9]">
          <div className="flex items-center justify-between bg-[#0b6b63] px-5 pb-5 pt-6 text-white">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9be8da]">Your visit today</p>
              <p className="mt-1 text-base font-bold">Dr. Kavya Rao</p>
              <p className="flex items-center gap-1 text-[11px] text-white/70"><MapPin className="h-3 w-3" />Sunrise Clinic · Room 2</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#39dbc0]" />LIVE
            </span>
          </div>

          <div className="p-4">
            <div className="rounded-2xl border border-[#e2ebe9] bg-white p-4 text-center shadow-[0_10px_30px_rgba(13,38,52,0.06)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#71808e]">Your token</p>
              <p className="font-display text-6xl font-bold text-[#0b1535]">07</p>
              <div className="my-3 border-t border-dashed border-[#cfdcd9]" />
              <div className="grid grid-cols-3 text-left">
                {[["Ahead", "3"], ["Serving", "04"], ["Your turn", "5:52"]].map(([k, v], i) => (
                  <div key={k}>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#8a96a1]">{k}</p>
                    <p className={`text-lg font-bold ${i === 2 ? "text-[#0b6b63]" : "text-[#0b1535]"}`}>{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#0b1535] p-3.5 text-white">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#39dbc0] text-[#07231f]"><CalendarCheck2 className="h-4 w-4" /></span>
              <span>
                <strong className="block text-sm">Leave home at 5:32 pm</strong>
                <span className="text-[11px] text-white/60">We’ll update you if the doctor runs late</span>
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#e2ebe9] bg-white px-3.5 py-3 text-xs">
              <span className="flex items-center gap-2 font-semibold text-[#3f4e5f]"><QrCode className="h-4 w-4 text-[#0b6b63]" />Check in at the door</span>
              <span className="font-bold text-[#0b6b63]">Show QR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DocConnectSection() {
  return (
    <>
      <section id="docconnect" className="grain relative overflow-hidden bg-[#070d24] py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_85%_20%,rgba(57,219,192,0.16),transparent_60%),radial-gradient(45%_45%_at_10%_90%,rgba(125,134,255,0.14),transparent_62%)]" />
        <div className="site-container relative grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#39dbc0]/30 bg-[#39dbc0]/10 px-3 py-1.5 text-xs font-bold text-[#9be8da]">
              Launching soon · DocConnect
            </span>
            <SectionHeading
              eyebrow="Patient booking"
              title="Your EMR runs the clinic. DocConnect fills it."
              description="Patients find your doctors, book online and watch their place in line live, so they arrive on time instead of waiting an hour in the lobby."
              inverse
            />

            <div className="reveal-stagger mt-12 grid gap-4 sm:grid-cols-3">
              {audiences.map(({ Icon, title, points }) => (
                <div key={title} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-5">
                  <Icon className="h-5 w-5 text-[#39dbc0]" />
                  <h3 className="mt-4 text-base font-bold">{title}</h3>
                  <ul className="mt-3 space-y-2">
                    {points.map((p) => (
                      <li key={p} className="flex gap-2 text-[13px] leading-5 text-white/65">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#39dbc0]" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full bg-[#39dbc0] px-7 font-bold text-[#07231f] hover:bg-[#5ce7d0]">
                <a href={docconnect.earlyAccessUrl}>Get early access <ArrowRight /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-white/18 bg-white/[0.04] px-7 font-semibold text-white hover:bg-white/10 hover:text-white">
                <a href="#contact">Add DocConnect to my clinic</a>
              </Button>
            </div>
          </div>

          <IPhoneJourney />
        </div>
      </section>

      <section id="together" className="bg-white py-24 sm:py-32">
        <div className="site-container">
          <SectionHeading
            eyebrow="Better together"
            title="One patient journey, from booking to prescription."
            description="DocConnect and NuvaLyf EMR share the same appointments and queue, so nobody types anything twice."
            align="center"
          />

          <ol className="reveal-stagger mt-16 grid gap-4 md:grid-cols-4">
            {flow.map(({ Icon, title, text }, i) => (
              <li key={title} className="relative rounded-[22px] border border-[#dce7e5] bg-[#f9fcfb] p-6">
                <span className="text-xs font-bold text-[#9aa5ae]">0{i + 1}</span>
                <span className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-[#0b6b63] text-white"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 text-base font-bold text-[#0b1535]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#647383]">{text}</p>
                {i < flow.length - 1 && (
                  <ArrowRight className="absolute -right-3.5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-[#dce7e5] bg-white p-1.5 text-[#0b6b63] md:block" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>

          {/* Two ways to buy: the package, or DocConnect on top of another EMR. */}
          <div className="mt-20 grid gap-5 lg:grid-cols-2">
            <div className="card-lift rounded-[26px] bg-[linear-gradient(160deg,#0b1535_0%,#084b45_100%)] p-8 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9be8da]">Complete package</p>
              <h3 className="mt-3 text-2xl font-bold">NuvaLyf EMR + DocConnect</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">Run the clinic and take online bookings on one connected platform. Appointments, queue and prescriptions stay in sync automatically.</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {["Built in, nothing to connect", "One login for your clinic team", "Live queue shared with patients", "One support team"].map((p) => (
                  <li key={p} className="flex gap-2.5"><Check className="h-4 w-4 shrink-0 text-[#39dbc0]" />{p}</li>
                ))}
              </ul>
              <Button asChild className="mt-8 h-11 rounded-full bg-[#39dbc0] px-6 font-bold text-[#07231f] hover:bg-[#5ce7d0]">
                <a href="#contact">Book a demo <ArrowRight /></a>
              </Button>
            </div>

            <div className="card-lift rounded-[26px] border border-[#dce7e5] bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#087a70]">Already have an EMR?</p>
              <h3 className="mt-3 text-2xl font-bold text-[#0b1535]">DocConnect on its own</h3>
              <p className="mt-3 text-sm leading-6 text-[#647383]">Keep the system your hospital already uses. DocConnect connects to it, so online bookings land where your staff already work.</p>
              <ul className="mt-6 space-y-2.5 text-sm text-[#3f4e5f]">
                {[
                  { Icon: PlugZap, t: "Connects through standard APIs and FHIR" },
                  { Icon: Link2, t: "Your doctors, schedules and queue stay in your EMR" },
                  { Icon: ShieldCheck, t: "Your patient data stays under your control" },
                  { Icon: Monitor, t: "Start with booking requests, go live step by step" },
                ].map(({ Icon, t }) => (
                  <li key={t} className="flex gap-2.5"><Icon className="h-4 w-4 shrink-0 text-[#0b6b63]" />{t}</li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-8 h-11 rounded-full border-[#0b6b63] px-6 font-bold text-[#0b6b63] hover:bg-[#eef8f6]">
                <a href="#contact">Talk to us about integration</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
