import { ArrowRight, Check, ChevronRight, Clock3, IndianRupee, CalendarDays, HeartPulse, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltStage } from "@/components/tilt-stage";

const stats = [
  ["Today’s patients", "24", "+4"],
  ["In queue", "06", "Live"],
  ["Appointments", "18", "75%"],
  ["Collections", "₹18.4k", "Today"],
] as const;

const queue = [
  ["01", "Meera Krishnan", "Follow-up", "Now"],
  ["02", "Arun Kumar", "Consultation", "8 min"],
  ["03", "Sana Fathima", "New patient", "16 min"],
] as const;

/**
 * The product surface, composed on a real 3D plane. Each element sits at its
 * own translateZ, so the pointer tilt produces genuine parallax between the
 * chrome, the panel and the two floating chips.
 */
function DashboardMockup() {
  return (
    <div className="stage w-full">
      <TiltStage className="relative mx-auto w-full max-w-[720px]">
        {/* Light behind the glass */}
        <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(57,219,192,0.22),transparent_70%)] blur-2xl" />

        <div className="plane relative rounded-[30px] border border-white/12 bg-white/[0.06] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="flex min-h-[500px] overflow-hidden rounded-[24px] bg-[#f5f9f9]">
            <aside className="hidden w-[84px] flex-col items-center gap-4 bg-[#0d1733] py-6 sm:flex">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#39dbc0] to-[#7d86ff] text-sm font-black text-[#0b1535]">N</div>
              {[UsersRound, CalendarDays, HeartPulse, IndianRupee].map((Icon, index) => (
                <span key={index} className={`grid h-9 w-9 place-items-center rounded-xl transition ${index === 0 ? "bg-white/12 text-[#39dbc0]" : "text-white/55"}`}>
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </aside>

            <div className="min-w-0 flex-1 p-4 sm:p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0b6b63]">Monday, 16 September</p>
                  <h3 className="mt-1 text-xl font-bold text-[#0b1535] sm:text-2xl">Good morning, Dr. Arjun</h3>
                </div>
                <div className="hidden h-9 w-9 rounded-full bg-[#d9efeb] sm:block" />
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {stats.map(([label, value, tag]) => (
                  <div key={label} className="rounded-2xl border border-[#e2ebe9] bg-white p-3.5 shadow-[0_10px_30px_rgba(13,38,52,0.05)]">
                    <p className="text-[10px] font-semibold text-[#71808e]">{label}</p>
                    <div className="mt-2 flex items-end justify-between gap-2">
                      <strong className="text-xl text-[#0b1535]">{value}</strong>
                      <span className="rounded-full bg-[#e5f7f3] px-2 py-0.5 text-[9px] font-bold text-[#087a70]">{tag}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_.8fr]">
                <div className="rounded-2xl border border-[#e2ebe9] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0b1535]">Live queue</h4>
                    <span className="text-[10px] font-semibold text-[#087a70]">View all</span>
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {queue.map(([number, name, type, time], index) => (
                      <div key={name} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 rounded-xl bg-[#f6f9f9] p-2.5">
                        <span className={`grid h-8 w-8 place-items-center rounded-lg text-[11px] font-bold ${index === 0 ? "bg-[#0b6b63] text-white" : "bg-white text-[#526173]"}`}>{number}</span>
                        <span className="min-w-0">
                          <strong className="block truncate text-xs text-[#17243a]">{name}</strong>
                          <span className="text-[10px] text-[#7b8795]">{type}</span>
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#687787]"><Clock3 className="h-3 w-3" />{time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-[#0b6b63] p-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9be8da]">Clinic flow</p>
                  <p className="mt-2 text-3xl font-bold">92%</p>
                  <p className="text-[10px] text-white/60">on-time consultations</p>
                  <svg className="mt-6 h-[90px] w-full" viewBox="0 0 180 90" role="img" aria-label="Clinic activity trend">
                    <path d="M0 69 C25 68 30 41 52 48 S78 64 96 39 S124 17 144 31 S163 39 180 14" fill="none" stroke="#78ead7" strokeWidth="4" strokeLinecap="round" />
                    <path d="M0 69 C25 68 30 41 52 48 S78 64 96 39 S124 17 144 31 S163 39 180 14 V90 H0Z" fill="url(#chart-fill)" opacity=".28" />
                    <defs>
                      <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop stopColor="#78ead7" />
                        <stop offset="1" stopColor="#78ead7" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chips that float clear of the panel in Z. */}
        <div className="depth-3 absolute -bottom-6 left-4 hidden items-center gap-3 rounded-2xl border border-white/15 bg-white/95 px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur sm:flex">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e4f7f3] text-[#087a70]"><Check className="h-4 w-4" /></span>
          <span>
            <strong className="block text-xs text-[#0b1535]">Prescription finalised</strong>
            <span className="text-[10px] text-[#71808e]">PDF ready to share</span>
          </span>
        </div>

        <div className="depth-2 absolute -right-5 -top-5 hidden items-center gap-2 rounded-full border border-white/15 bg-[#0d1733]/95 px-3.5 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#39dbc0] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#39dbc0]" />
          </span>
          <span className="text-[11px] font-bold text-white">6 patients waiting</span>
        </div>
      </TiltStage>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="grain relative overflow-hidden bg-[#070d24] pt-16 sm:pt-20 lg:pt-24">
      {/* Atmosphere: two broad colour fields plus a faint technical grid. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_78%_8%,rgba(57,219,192,0.18),transparent_60%),radial-gradient(55%_45%_at_12%_85%,rgba(125,134,255,0.16),transparent_62%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
        }}
      />

      <div className="site-container relative grid items-center gap-16 pb-28 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:pb-36">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-2 text-xs font-bold text-[#9be8da] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#39c9af]" /> Modern clinic technology for India
          </div>

          <h1 className="t-display font-display text-white">
            Smarter clinics.
            <br />
            <span className="bg-[linear-gradient(100deg,#39dbc0_0%,#7fe6d2_38%,#9aa6ff_100%)] bg-clip-text text-transparent">Better connected care.</span>
          </h1>

          <p className="t-lead mt-8 max-w-xl text-white/60">
            NUVA LYF brings patient records, appointments, consultations, prescriptions, billing and patient communication together in one secure platform for modern clinics across India.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-13 rounded-full bg-[#39dbc0] px-8 text-[15px] font-bold text-[#07231f] shadow-[0_16px_40px_rgba(57,219,192,0.28)] transition hover:bg-[#5ce7d0]">
              <a href="#contact">Book a Demo <ArrowRight /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-13 rounded-full border-white/18 bg-white/[0.04] px-8 text-[15px] font-semibold text-white backdrop-blur transition hover:bg-white/10 hover:text-white">
              <a href="#platform">Explore the Platform <ChevronRight /></a>
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/60">
            {["Built for outpatient care", "Role-based access", "Clinic data control"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#39dbc0]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <DashboardMockup />
      </div>

      {/* The thread is born here and runs the rest of the page. */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(57,219,192,0.55))]" />

      <div className="relative border-t border-white/8 bg-white/[0.02] backdrop-blur">
        <div className="site-container flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-medium text-white/60">Modern clinic technology designed for healthcare providers across India.</p>
          <div className="flex items-center gap-2.5 text-sm font-bold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#39dbc0]" />
            One patient. One connected record.
          </div>
        </div>
      </div>
    </section>
  );
}
