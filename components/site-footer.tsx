import { MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { allNavLinks, contact } from "@/data/site-content";
import { getSettings } from "@/lib/cms";

const head = "text-xs font-bold uppercase tracking-[0.18em] text-[#14B8A6]";
const link = "block py-1.5 text-sm text-white/60 transition hover:text-white";

export async function SiteFooter() {
  const { social } = await getSettings();
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="site-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_.7fr]">
        <div>
          <BrandLogo inverse />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
            NuvaLyf CMS runs your clinic. DocConnect brings patients to it. For healthcare providers across India, the UAE and beyond.
          </p>
          {social.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/70 hover:border-[#14B8A6] hover:text-white">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className={head}>Explore</p>
          <nav className="mt-3 grid grid-cols-2 gap-x-4" aria-label="Footer navigation">
            {allNavLinks.map((l) => <a key={l.href} href={l.href} className={link}>{l.label}</a>)}
            <a href="/book-a-demo" className={link}>Book a Demo</a>
          </nav>
        </div>
        <div>
          <p className={head}>Contact</p>
          <div className="mt-3 flex flex-col">
            <a href={`mailto:${contact.email}`} className={`${link} break-all`}>{contact.email}</a>
            <a href={`tel:${contact.phoneUae.tel}`} className={`${link} flex gap-2`}><span className="w-12 shrink-0 text-xs font-semibold uppercase tracking-wider text-white/45">UAE</span>{contact.phoneUae.display}</a>
            <a href={`tel:${contact.phone.tel}`} className={`${link} flex gap-2`}><span className="w-12 shrink-0 text-xs font-semibold uppercase tracking-wider text-white/45">India</span>{contact.phone.display}</a>
            <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className={`${link} flex gap-2`}><span className="flex w-12 shrink-0 text-white/45"><MessageCircle className="h-4 w-4" aria-hidden="true" /><span className="sr-only">WhatsApp</span></span>{contact.whatsapp.display}</a>
          </div>
        </div>
        <div>
          <p className={head}>Legal</p>
          <div className="mt-3 flex flex-col">
            <a href="/privacy" className={link}>Privacy Policy</a>
            <a href="/terms" className={link}>Terms of Use</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} NuvaLyf. All rights reserved.</span>
          <span>Clinic Management System &amp; Online Booking</span>
        </div>
      </div>
    </footer>
  );
}
