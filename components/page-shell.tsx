import { BreadcrumbJsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";

/** Header, footer and contact shortcuts shared by every inner page. `crumbs` adds breadcrumb data for Google. */
export function PageShell({ children, crumbs }: { children: React.ReactNode; crumbs?: [string, string][] }) {
  return (
    <main>
      {crumbs && <BreadcrumbJsonLd crumbs={crumbs} />}
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsAppButton />
      <MobileActionBar />
    </main>
  );
}
