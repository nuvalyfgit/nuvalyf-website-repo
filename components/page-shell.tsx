import { MobileActionBar } from "@/components/mobile-action-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";

/** Header, footer and contact shortcuts shared by every inner page. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsAppButton />
      <MobileActionBar />
    </main>
  );
}
