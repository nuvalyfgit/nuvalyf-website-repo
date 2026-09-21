import { ArrowRight, CalendarDays, Check, ChevronRight, Clock3, HeartPulse, IndianRupee, Search, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div className="absolute -left-8 top-16 h-40 w-40 rounded-full bg-[#39dbc0]/25 blur-3xl" />
      <div className="absolute -right-6 bottom-8 h-44 w-44 rounded-full bg-[#7d86ff]/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1535] p-2 shadow-[0_32px_100px_rgba(11,21,53,0.35)]">
        <div className="flex min-h-[485px] overflow-hidden rounded-[22px] bg-[#f4f8f8]">
          <aside className="hidden w-[82px] flex-col items-center gap-4 bg-[#101b3e] py-6 sm:flex">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#39dbc0] to-[#7d86ff] text-sm font-black text-[#0b1535]">N</div>
            {[UsersRound, CalendarDays, HeartPulse, IndianRupee].map((Icon, index) => (
              <span key={index} className={`grid h-9 w-9 place-items-center rounded-xl ${index === 0 ? "bg-white/12 text-[#39dbc0]" : "text-white/40"}`}><Icon className="h-4 w-4" /></span>
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
              {[
                ["Today’s patients", "24", "+4"], ["In queue", "06", "Live"], ["Appointments", "18", "75%"], ["Collections", "₹18.4k", "Today"],
              ].map(([label, value, tag]) => (
                <div key={label} className="rounded-2xl border border-[#dfe8e6] bg-white p-3.5 shadow-[0_10px_30px_rgba(13,38,52,0.04)]">
                  <p className="text-[10px] font-semibold text-[#71808e]">{label}</p>
                  <div className="mt-2 flex items-end justify-between gap-2"><strong className="text-xl text-[#0b1535]">{value}</strong><span className="rounded-full bg-[#e5f7f3] px-2 py-0.5 text-[9px] font-bold text-[#087a70]">{tag}</span></div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_.8fr]">
              <div className="rounded-2xl border border-[#dfe8e6] bg-white p-4">
                <div className="flex items-center justify-between"><h4 className="text-sm font-bold text-[#0b1535]">Live queue</h4><span className="text-[10px] font-semibold text-[#087a70]">View all</span></div>
                <div className="mt-4 space-y-2.5">
                  {[
                    ["01", "Meera Krishnan", "Follow-up", "Now"], ["02", "Arun Kumar", "Consultation", "8 min"], ["03", "Sana Fathima", "New patient", "16 min"],
                  ].map(([number, name, type, time], index) => (
                    <div key={name} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 rounded-xl bg-[#f6f9f9] p-2.5">
                      <span className={`grid h-8 w-8 place-items-center rounded-lg text-[11px] font-bold ${index === 0 ? "bg-[#0b6b63] text-white" : "bg-white text-[#526173]"}`}>{number}</span>
                      <span className="min-w-0"><strong className="block truncate text-xs text-[#17243a]">{name}</strong><span className="text-[10px] text-[#7b8795]">{type}</span></span>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-[#687787]"><Clock3 className="h-3 w-3" />{time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-[#0b6b63] p-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9be8da]">Clinic flow</p>
                <p className="mt-2 text-3xl font-bold">92%</p>
                <p className="text-[10px] text-white/60">on-time consultations</p>
                <svg className="mt-6 h-[90px] w-full" viewBox="0 0 180 90" role="img" aria-label="Clinic activity trend">
                  <path d="M0 69 C25 68 30 41 52 48 S78 64 96 39 S124 17 144 31 S163 39 180 14" fill="none" stroke="#78ead7" strokeWidth="4" strokeLinecap="round" />
                  <path d="M0 69 C25 68 30 41 52 48 S78 64 96 39 S124 17 144 31 S163 39 180 14 V90 H0Z" fill="url(#chart-fill)" opacity=".25" />
                  <defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#78ead7"/><stop offset="1" stopColor="#78ead7" stopOpacity="0"/></linearGradient></defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 left-6 hidden items-center gap-3 rounded-2xl border border-[#dce8e5] bg-white px-4 py-3 shadow-xl sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e4f7f3] text-[#087a70]"><Check className="h-4 w-4" /></span>
        <span><strong className="block text-xs text-[#0b1535]">Prescription finalised</strong><span className="text-[10px] text-[#71808e]">PDF ready to share</span></span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[radial-gradient(circle_at_90%_5%,rgba(57,219,192,0.13),transparent_32%),linear-gradient(180deg,#f8fcfb_0%,#ffffff_100%)] pt-14 sm:pt-20 lg:pt-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39dbc0]/50 to-transparent" />
      <div className="site-container grid items-center gap-14 pb-24 lg:grid-cols-[.88fr_1.12fr] lg:gap-10 lg:pb-32">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#cde7e2] bg-white px-3.5 py-2 text-xs font-bold text-[#0b6b63] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#39c9af]" /> Modern clinic technology for India
          </div>
          <h1 className="font-display max-w-[760px] text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#0b1535] sm:text-6xl lg:text-[4.65rem]">
            Smarter clinics.<br /><span className="text-gradient">Better connected care.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#526173]">NUVA LYF brings patient records, appointments, consultations, prescriptions, billing and patient communication together in one secure platform for modern clinics across India.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full bg-[#0b6b63] px-7 text-white hover:bg-[#07574f]">
              <a href="#contact">Book a Demo <ArrowRight /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-[#bed7d3] bg-white px-7 text-[#0b1535] shadow-none hover:bg-[#f2f8f7]">
              <a href="#platform">Explore the Platform <ChevronRight /></a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[#5b6b7a]">
            {["Built for outpatient care", "Role-based access", "Clinic data control"].map((item) => <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0b8b7f]" />{item}</span>)}
          </div>
        </div>
        <DashboardMockup />
      </div>
      <div className="border-y border-[#e3ecea] bg-white/70">
        <div className="site-container flex flex-col items-center justify-between gap-4 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-semibold text-[#526173]">Modern clinic technology designed for healthcare providers across India.</p>
          <div className="flex items-center gap-2 text-sm font-bold text-[#0b1535]"><Search className="h-4 w-4 text-[#0b6b63]" /> One patient. One connected record.</div>
        </div>
      </div>
    </section>
  );
}
