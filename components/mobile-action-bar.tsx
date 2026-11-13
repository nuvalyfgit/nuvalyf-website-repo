import { CalendarCheck2, MessageCircle, Phone } from "lucide-react";
import { contact } from "@/data/site-content";

/** Sticky Call / WhatsApp / Demo bar on phones. Replaces the floating WhatsApp button below lg. */
export function MobileActionBar({ labels = ["Call", "WhatsApp", "Book demo"], demoHref = "/#contact" }: { labels?: [string, string, string]; demoHref?: string }) {
  return (
    <>
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-[#dce7e5] bg-white/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <a href={`tel:${contact.phone.tel}`} className="flex h-12 items-center justify-center gap-1.5 rounded-xl border border-[#d8e5e2] text-sm font-bold text-[#0b1535]">
          <Phone className="h-4 w-4 text-[#0b6b63]" />{labels[0]}
        </a>
        <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#25d366] text-sm font-bold text-white">
          <MessageCircle className="h-4 w-4" />{labels[1]}
        </a>
        <a href={demoHref} className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#0b6b63] text-sm font-bold text-white">
          <CalendarCheck2 className="h-4 w-4" />{labels[2]}
        </a>
      </nav>
    </>
  );
}
