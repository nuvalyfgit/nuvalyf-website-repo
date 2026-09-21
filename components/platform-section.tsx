"use client";

import { BarChart3, CalendarClock, Check, ClipboardPlus, FileCheck2, FileText, FolderLock, MessageCircle, MoreHorizontal, Pill, Search, ShieldCheck, Stethoscope, UserRound, type LucideIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { platformTabs } from "@/data/site-content";
import { SectionHeading } from "@/components/section-heading";

const platformIcons: Record<string, LucideIcon> = {
  patient: UserRound,
  "front-desk": CalendarClock,
  clinical: ClipboardPlus,
  prescription: Pill,
  documents: FolderLock,
  communication: MessageCircle,
  operations: BarChart3,
};

function ProductVisual({ type }: { type: string }) {
  if (type === "patient") {
    return (
      <div className="product-panel">
        <div className="flex items-center justify-between border-b border-[#dce8e5] p-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#dff5f0] text-[#087a70]"><UserRound className="h-5 w-5" /></span><div><strong className="block text-sm text-[#0b1535]">Meera Krishnan</strong><span className="text-[11px] text-[#71808e]">NUV-10482 · 34 years</span></div></div><MoreHorizontal className="h-5 w-5 text-[#7d8894]" /></div>
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {["Blood group", "Allergies", "Last visit"].map((item, index) => <div key={item} className="rounded-xl bg-[#f3f8f7] p-3"><span className="text-[10px] text-[#7b8795]">{item}</span><strong className={`mt-1 block text-xs ${index === 1 ? "text-[#bd514e]" : "text-[#263449]"}`}>{["O+", "Penicillin", "03 Sep 2026"][index]}</strong></div>)}
        </div>
        <div className="mx-4 mb-4 rounded-xl border border-[#e2ebe9] bg-white p-4"><p className="text-xs font-bold text-[#263449]">Clinical timeline</p>{["Follow-up consultation", "Blood report uploaded", "Initial consultation"].map((item, index) => <div key={item} className="mt-3 flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#39c9af]"/><span className="text-[11px] text-[#526173]">{item}</span><span className="ml-auto text-[10px] text-[#96a1aa]">{index + 1} wk ago</span></div>)}</div>
      </div>
    );
  }
  if (type === "queue") {
    return <div className="product-panel p-4"><div className="mb-4 flex items-center justify-between"><strong className="text-sm text-[#0b1535]">Today’s queue</strong><span className="rounded-full bg-[#e1f6f1] px-3 py-1 text-[10px] font-bold text-[#087a70]">6 waiting</span></div>{["Meera Krishnan", "Arun Kumar", "Sana Fathima", "Naveen Raj"].map((name, index) => <div key={name} className="mb-2 grid grid-cols-[38px_1fr_auto] items-center gap-3 rounded-xl border border-[#e5ecea] bg-white p-3"><span className={`grid h-9 w-9 place-items-center rounded-lg text-xs font-bold ${index === 0 ? "bg-[#0b6b63] text-white" : "bg-[#f2f7f6] text-[#526173]"}`}>{index + 1}</span><span><strong className="block text-xs text-[#263449]">{name}</strong><span className="text-[10px] text-[#84909b]">{index === 0 ? "With doctor" : `${index * 8 + 5} min wait`}</span></span><span className="rounded-full bg-[#f1f5f5] px-2 py-1 text-[9px] text-[#63717e]">{index === 0 ? "Active" : "Waiting"}</span></div>)}</div>;
  }
  if (type === "clinical") {
    return <div className="product-panel p-4"><div className="rounded-xl border border-[#f1d5d2] bg-[#fff7f6] p-3"><span className="text-[10px] font-bold uppercase tracking-wider text-[#b74d47]">Allergy alert</span><p className="mt-1 text-xs font-semibold text-[#7c302c]">Penicillin · reported 2024</p></div><div className="mt-3 grid grid-cols-3 gap-2">{[["BP","120/80"],["Pulse","72 bpm"],["Temp","98.4°F"]].map(([label,value])=><div key={label} className="rounded-xl bg-[#f3f8f7] p-3 text-center"><span className="block text-[10px] text-[#7f8b96]">{label}</span><strong className="mt-1 block text-xs text-[#243248]">{value}</strong></div>)}</div><div className="mt-3 rounded-xl border border-[#e1eae8] bg-white p-4"><span className="text-[10px] font-bold uppercase tracking-wider text-[#0b6b63]">Consultation notes</span><div className="mt-3 h-2 w-full rounded bg-[#e9efee]"/><div className="mt-2 h-2 w-5/6 rounded bg-[#e9efee]"/><div className="mt-2 h-2 w-2/3 rounded bg-[#e9efee]"/></div></div>;
  }
  if (type === "prescription") {
    return <div className="product-panel p-4"><div className="rounded-xl bg-[#0b1535] p-4 text-white"><div className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-[#39dbc0]"/><strong className="text-sm">NUVA LYF Clinic</strong></div><p className="mt-1 text-[10px] text-white/50">Digital prescription preview</p></div><div className="mt-3 rounded-xl border border-[#e1eae8] bg-white p-4">{[["Amoxicillin 500 mg","1-0-1 · 5 days"],["Paracetamol 650 mg","SOS · After food"]].map(([name,dose])=><div key={name} className="mb-3 flex items-start gap-3 border-b border-[#eef2f1] pb-3 last:mb-0 last:border-0 last:pb-0"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#e3f6f2] text-[10px] font-bold text-[#087a70]">Rx</span><span><strong className="block text-xs text-[#263449]">{name}</strong><span className="text-[10px] text-[#7a8793]">{dose}</span></span></div>)}</div></div>;
  }
  if (type === "documents") {
    return <div className="product-panel p-4"><div className="flex items-center gap-3 rounded-xl border border-[#dfe8e6] bg-white p-3"><Search className="h-4 w-4 text-[#7b8995]"/><span className="text-xs text-[#96a1aa]">Search patient documents</span></div><div className="mt-4 grid grid-cols-2 gap-3">{["Blood report.pdf", "Chest scan.jpg", "Prescription.pdf", "Referral note.pdf"].map((file,index)=><div key={file} className="rounded-xl border border-[#e1eae8] bg-white p-3"><FileText className={`h-5 w-5 ${index % 2 ? "text-[#7888ff]" : "text-[#0b8b7f]"}`}/><strong className="mt-5 block truncate text-[11px] text-[#263449]">{file}</strong><span className="text-[9px] text-[#8c97a1]">Secure · Patient record</span></div>)}</div></div>;
  }
  if (type === "communication") {
    return <div className="product-panel p-4"><div className="flex items-center gap-3 border-b border-[#e1eae8] pb-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#dff5f0] text-[#087a70]"><MessageCircle className="h-5 w-5"/></span><span><strong className="block text-xs text-[#263449]">Clinic inbox</strong><span className="text-[10px] text-[#7f8b96]">Official business channel</span></span></div><div className="mt-4 space-y-3"><div className="mr-10 rounded-2xl rounded-tl-sm bg-[#edf2f2] p-3 text-[11px] text-[#526173]">Can I reschedule tomorrow’s appointment?</div><div className="ml-10 rounded-2xl rounded-tr-sm bg-[#0b6b63] p-3 text-[11px] text-white">Yes. Your visit is confirmed for 11:30 AM.</div><div className="flex items-center gap-2 text-[9px] text-[#86929c]"><ShieldCheck className="h-3.5 w-3.5 text-[#0b8b7f]"/> Consent and opt-out status checked</div></div></div>;
  }
  return <div className="product-panel p-4"><div className="grid grid-cols-3 gap-2">{[["Visits","684"],["Appointments","522"],["Collections","₹3.8L"]].map(([label,value])=><div key={label} className="rounded-xl border border-[#e1eae8] bg-white p-3"><span className="text-[9px] text-[#7e8a95]">{label}</span><strong className="mt-1 block text-sm text-[#0b1535]">{value}</strong></div>)}</div><div className="mt-3 rounded-xl bg-[#0b1535] p-4"><div className="flex items-center justify-between"><span className="text-[10px] font-bold text-white">Clinic activity</span><span className="text-[9px] text-white/45">Last 7 days</span></div><div className="mt-6 flex h-28 items-end gap-3">{[42,66,51,82,70,90,76].map((height,index)=><span key={index} className="flex-1 rounded-t-md bg-gradient-to-t from-[#39dbc0] to-[#7d86ff]" style={{height:`${height}%`}}/>)}</div></div><div className="mt-3 flex items-center gap-2 rounded-xl bg-[#e8f7f4] p-3 text-[10px] font-semibold text-[#087a70]"><FileCheck2 className="h-4 w-4"/> Clinic data export ready when authorised</div></div>;
}

export function PlatformSection() {
  return (
    <section id="platform" className="section-space overflow-hidden bg-[#0b1535]">
      <div className="site-container">
        <SectionHeading eyebrow="NUVA LYF Product Platform" title="One connected platform for the modern clinic." description="Move from front desk to consultation, prescription, billing, communication and reporting without breaking the flow of care." inverse />
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/55">Explore each workflow to see how NUVA LYF supports the patient journey from reception and consultation through communication and reporting.</p>
        <Tabs defaultValue="patient" className="mt-12">
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <TabsList variant="line" className="h-auto min-w-max gap-2 rounded-full border border-white/10 bg-white/5 p-1.5">
              {platformTabs.map((tab) => {
                const Icon = platformIcons[tab.value] ?? UserRound;

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="group/tab cursor-pointer rounded-full border border-transparent px-4 py-2.5 text-white/65 after:hidden transition-[background-color,border-color,color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#39dbc0]/45 hover:bg-[#17345a] hover:text-white hover:shadow-[0_10px_28px_rgba(0,0,0,0.22)] focus-visible:border-[#78ead7] focus-visible:bg-[#17345a] focus-visible:text-white focus-visible:ring-[#78ead7]/35 data-[state=active]:border-white data-[state=active]:bg-white data-[state=active]:text-[#0b1535] data-[state=active]:shadow-[0_10px_30px_rgba(0,0,0,0.2)] data-[state=active]:hover:translate-y-0 data-[state=active]:hover:border-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#0b1535]"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/[0.08] text-[#78ead7] transition-colors group-hover/tab:bg-[#39dbc0]/15 group-hover/tab:text-[#8ff3e1] group-data-[state=active]/tab:bg-[#dff7f2] group-data-[state=active]/tab:text-[#087a70]">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span>{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
          {platformTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-7">
              <div className="grid items-center gap-9 rounded-[28px] border border-white/10 bg-white/[0.045] p-5 sm:p-8 lg:grid-cols-[.9fr_1.1fr] lg:p-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#39dbc0]">{tab.eyebrow}</p>
                  <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">{tab.title}</h3>
                  <p className="mt-4 max-w-lg leading-7 text-white/60">{tab.description}</p>
                  <ul className="mt-7 space-y-3">{tab.bullets.map((bullet)=><li key={bullet} className="flex items-start gap-3 text-sm text-white/75"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#39dbc0]/15 text-[#39dbc0]"><Check className="h-3 w-3"/></span>{bullet}</li>)}</ul>
                </div>
                <ProductVisual type={tab.visual} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
