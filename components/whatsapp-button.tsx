import { MessageCircle } from "lucide-react";
import { contact } from "@/data/site-content";

const text = encodeURIComponent("Hi NuvaLyf, I'd like to know more about the EMR / DocConnect.");

export function WhatsAppButton() {
  return (
    <a
      href={`${contact.whatsapp.href}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 hidden h-14 lg:flex items-center gap-2 rounded-full bg-[#25d366] px-4 font-bold text-white shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition hover:scale-105 sm:px-5"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
