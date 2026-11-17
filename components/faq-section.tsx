import { Plus } from "lucide-react";
import { FaqJsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { getFaqs } from "@/lib/cms";

export async function FaqSection({
  items: given,
  kind = "clinic",
  eyebrow = "FAQ",
  title = "Questions clinics ask us.",
}: {
  items?: [string, string][];
  kind?: "clinic" | "patient";
  eyebrow?: string;
  title?: string;
}) {
  const items = given ?? (await getFaqs(kind));
  if (!items.length) return null;
  return (
    <section id="faq" className="bg-[#F8FAFC] py-24 sm:py-32">
      <FaqJsonLd items={items} />
      <div className="site-container grid gap-12 lg:grid-cols-[.7fr_1fr]">
        <SectionHeading eyebrow={eyebrow} title={title} description="Can't find your answer? Message us on WhatsApp and we'll reply quickly." />
        <div className="divide-y divide-[#E2E8F0] rounded-[24px] border border-[#E2E8F0] bg-white">
          {items.map(([q, a]) => (
            <details key={q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#0F172A] [&::-webkit-details-marker]:hidden">
                {q}
                <Plus className="h-5 w-5 shrink-0 text-[#059669] transition group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-[15px] leading-7 text-[#475569]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
