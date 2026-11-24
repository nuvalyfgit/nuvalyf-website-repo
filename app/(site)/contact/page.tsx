import type { Metadata } from "next";
import { Building2, CalendarCheck2, Mail, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero, Section } from "@/components/page-parts";
import { PageShell } from "@/components/page-shell";
import { contact } from "@/data/site-content";
import { getSettings } from "@/lib/cms";
import { pageSeo } from "@/lib/seo";

const baseMetadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Us",
  description: "Contact NuvaLyf by email, phone or WhatsApp. Offices serving India and the UAE. business@nuvalyf.com",
};

const channels = [
  { Icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { Icon: Phone, label: "India", value: contact.phone.display, href: `tel:${contact.phone.tel}` },
  { Icon: Phone, label: "UAE", value: contact.phoneUae.display, href: `tel:${contact.phoneUae.tel}` },
  { Icon: MessageCircle, label: "WhatsApp", value: contact.whatsapp.display, href: contact.whatsapp.href, external: true },
];

export function generateMetadata() {
  return pageSeo("/contact", baseMetadata);
}

export default async function ContactPage() {
  const { social } = await getSettings();
  return (
    <PageShell crumbs={[["Contact", "/contact"]]}>
      <PageHero eyebrow="Contact us" title="Talk to us." lead="Questions about the CMS or DocConnect, support for your clinic, or partnerships. Our team replies within one working day." primary={null} />

      <Section tint>
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-4">
            {channels.map(({ Icon, label, value, href, external }) => (
              <a key={label} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="card-lift flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#ECFDF5] text-[#059669]"><Icon className="h-5 w-5" /></span>
                <span><span className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">{label}</span><span className="block break-all font-semibold text-[#0F172A]">{value}</span></span>
              </a>
            ))}
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <a href="/book-a-demo" className="flex items-center gap-2 rounded-2xl bg-[#0F172A] p-4 text-sm font-bold text-white"><CalendarCheck2 className="h-4 w-4 text-[#14B8A6]" />Book a demo</a>
              <a href="/for-hospitals#enquiry" className="flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white p-4 text-sm font-bold text-[#0F172A]"><Building2 className="h-4 w-4 text-[#059669]" />Hospital enquiry</a>
            </div>
            {social.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {social.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] hover:text-[#059669]">{s.label}</a>)}
              </div>
            )}
            <p className="pt-2 text-sm text-[#64748B]">Serving healthcare providers in India, the UAE and beyond.</p>
          </div>
          <EnquiryForm kind="contact" />
        </div>
      </Section>
    </PageShell>
  );
}
