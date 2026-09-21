import { ArrowDown, ArrowRight } from "lucide-react";
import { journey } from "@/data/site-content";
import { SectionHeading } from "@/components/section-heading";

export function JourneySection() {
  return (
    <section className="section-space bg-[#f4f9f8]">
      <div className="site-container">
        <SectionHeading eyebrow="Built around the patient journey" title="One smooth path from arrival to follow-up." description="NUVA LYF helps clinics manage the outpatient journey without relying on disconnected systems, paper notes or scattered tools." />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, index) => (
            <div key={step} className="group relative flex items-center gap-4 rounded-2xl border border-[#dbe7e4] bg-white p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0b1535] text-xs font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-sm font-bold text-[#263449]">{step}</span>
              {index < journey.length - 1 && <ArrowRight className="absolute -right-2.5 z-10 hidden h-5 w-5 rounded-full bg-[#39c9af] p-1 text-[#0b1535] lg:block" />}
              {index < journey.length - 1 && <ArrowDown className="ml-auto h-4 w-4 text-[#39a997] sm:hidden" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
