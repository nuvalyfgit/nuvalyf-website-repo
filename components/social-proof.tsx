import Image from "next/image";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { getClients, getTestimonials } from "@/lib/cms";

/** Client logos and testimonials from the CMS. Renders nothing until real, approved entries exist. */
export async function SocialProof() {
  const [clients, testimonials] = await Promise.all([getClients(), getTestimonials()]);
  if (!clients.length && !testimonials.length) return null;
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="site-container">
        <SectionHeading eyebrow="Clinics on NuvaLyf" title="Trusted by healthcare teams." align="center" />
        {clients.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {clients.map((c) =>
              c.logo ? (
                <Image key={c.slug} src={c.logo} alt={c.name} width={140} height={48} className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
              ) : (
                <span key={c.slug} className="text-lg font-bold text-[#94A3B8]">{c.name}</span>
              ),
            )}
          </div>
        )}
        {testimonials.length > 0 && (
          <div className="reveal-stagger mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.slug} className="rounded-[22px] border border-[#E2E8F0] bg-[#F8FAFC] p-7">
                <Quote className="h-6 w-6 text-[#14B8A6]" />
                <blockquote className="mt-4 text-[15px] leading-7 text-[#334155]">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm"><span className="font-bold text-[#0F172A]">{t.name}</span><span className="block text-[#64748B]">{t.role}</span></figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
