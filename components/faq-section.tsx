import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/data/more-content";

export function FaqSection({
  items = faqs,
  eyebrow = "FAQ",
  title = "Questions clinics ask us.",
}: {
  items?: [string, string][];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section id="faq" className="bg-[#f9fcfb] py-24 sm:py-32">
      <div className="site-container grid gap-12 lg:grid-cols-[.7fr_1fr]">
        <SectionHeading eyebrow={eyebrow} title={title} description="Can't find your answer? Message us on WhatsApp and we'll reply quickly." />
        <div className="divide-y divide-[#dce7e5] rounded-[24px] border border-[#dce7e5] bg-white">
          {items.map(([q, a]) => (
            <details key={q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#0b1535] [&::-webkit-details-marker]:hidden">
                {q}
                <Plus className="h-5 w-5 shrink-0 text-[#0b6b63] transition group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-[15px] leading-7 text-[#526173]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
