import { ArrowUpRight, Building2, CheckCircle2, CircleDot, HeartHandshake, Hospital, Stethoscope } from "lucide-react";
import { differentiators, personas, specialties } from "@/data/site-content";
import { SectionHeading } from "@/components/section-heading";

const personaIcons = [Stethoscope, Building2, HeartHandshake, Hospital, CircleDot];

export function SolutionsSection() {
  return (
    <>
      <section id="solutions" className="section-space bg-[#f4f9f8]">
        <div className="site-container">
          <SectionHeading eyebrow="Solutions" title="Built for every part of your clinic." description="Give each person the tools and visibility they need, while keeping permissions appropriate to their role." align="center" />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {personas.map((persona,index)=>{const Icon=personaIcons[index];return <article key={persona.title} className={`rounded-[22px] p-6 ${index===0?"bg-[#0b6b63] text-white":"border border-[#dce7e5] bg-white text-[#0b1535]"}`}><Icon className={`h-6 w-6 ${index===0?"text-[#9be8da]":"text-[#0b6b63]"}`}/><h3 className="mt-8 text-lg font-bold">{persona.title}</h3><p className={`mt-3 text-sm leading-6 ${index===0?"text-white/70":"text-[#647383]"}`}>{persona.description}</p><ArrowUpRight className={`mt-7 h-5 w-5 ${index===0?"text-[#9be8da]":"text-[#9aa5ae]"}`}/></article>})}
          </div>
          <div className="mt-20 grid gap-10 lg:grid-cols-[.62fr_1fr]">
            <SectionHeading eyebrow="Flexible by specialty" title="Built for the way you practise." description="The same connected core can support a wide range of outpatient care settings without claiming specialty modules that have not been built." />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specialties.map((specialty)=><div key={specialty} className="flex items-center gap-2.5 rounded-xl border border-[#dce7e5] bg-white px-4 py-3 text-sm font-semibold text-[#3f4e5f]"><CheckCircle2 className="h-4 w-4 shrink-0 text-[#0b8b7f]"/>{specialty}</div>)}
            </div>
          </div>
        </div>
      </section>
      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading eyebrow="Why NUVA LYF" title="Built for healthcare. Designed for simplicity." align="center" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[26px] border border-[#dce7e5] bg-[#dce7e5] sm:grid-cols-2 lg:grid-cols-5">
            {differentiators.map((item,index)=><div key={item.title} className="bg-white p-6"><span className="text-3xl font-light text-[#c2d3cf]">0{index+1}</span><h3 className="mt-10 text-base font-bold text-[#0b1535]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#647383]">{item.description}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
