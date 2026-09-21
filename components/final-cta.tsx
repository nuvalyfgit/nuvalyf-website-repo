import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-white px-4 py-8 sm:px-6 sm:py-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#0b6b63] px-6 py-14 text-center sm:px-10 sm:py-20">
        <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5"/><div className="absolute -bottom-24 -right-12 h-72 w-72 rounded-full border-[48px] border-[#39dbc0]/10"/>
        <div className="relative mx-auto max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9be8da]">Ready when you are</p><h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">See NUVA LYF in action.</h2><p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">Discover how one connected platform can simplify daily operations for doctors, staff and patients.</p><Button asChild size="lg" className="mt-8 h-12 rounded-full bg-white px-7 text-[#0b6b63] hover:bg-[#effaf8]"><a href="#contact">Book a Demo <ArrowRight/></a></Button></div>
      </div>
    </section>
  );
}
