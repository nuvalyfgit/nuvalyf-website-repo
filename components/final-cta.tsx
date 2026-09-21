import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-white px-4 pb-10 pt-4 sm:px-6">
      <div className="grain relative mx-auto max-w-[1600px] overflow-hidden rounded-[36px] bg-[#070d24] px-6 py-20 text-center sm:px-10 sm:py-28">
        {/* Colour fields instead of the previous flat fill */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(57,219,192,0.22),transparent_62%),radial-gradient(50%_50%_at_85%_100%,rgba(125,134,255,0.18),transparent_60%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.14) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* The thread arrives here and terminates in the call to action. */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(57,219,192,0.7),transparent)]" aria-hidden="true" />

        <div className="reveal relative mx-auto max-w-3xl">
          <p className="t-eyebrow text-[#9be8da]">Ready when you are</p>
          <h2 className="t-h2 mt-6 font-display text-white">See NUVA LYF in action.</h2>
          <p className="t-lead mx-auto mt-6 max-w-xl text-white/55">
            Discover how one connected platform can simplify daily operations for doctors, staff and patients.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-10 h-13 rounded-full bg-[#39dbc0] px-8 text-[15px] font-bold text-[#07231f] shadow-[0_16px_40px_rgba(57,219,192,0.3)] transition hover:bg-[#5ce7d0]"
          >
            <a href="#contact">Book a Demo <ArrowRight /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}
