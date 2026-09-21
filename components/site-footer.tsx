import { BrandLogo } from "@/components/brand-logo";
import { navigation } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="bg-[#08112c] text-white">
      <div className="site-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_.85fr_1fr_.65fr]">
        <div><BrandLogo inverse/><p className="mt-5 max-w-sm text-sm leading-7 text-white/50">Modern clinic technology for healthcare providers across India.</p></div>
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#39dbc0]">Explore</p><nav className="mt-3 grid grid-cols-2 gap-x-3" aria-label="Footer navigation">{navigation.map(item=><a key={item.href} href={item.href} className="py-1.5 text-sm text-white/60 transition hover:text-white">{item.label}</a>)}<a href="#contact" className="py-1.5 text-sm text-white/60 transition hover:text-white">Contact</a></nav></div>
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#39dbc0]">Contact</p><div className="mt-3 flex flex-col"><a href="mailto:business@nuvalyf.com" className="block py-1.5 text-sm break-all text-white/60 transition hover:text-white">business@nuvalyf.com</a><a href="tel:+971544311859" className="flex items-center gap-2 py-1.5 text-sm text-white/60 transition hover:text-white"><span className="w-12 shrink-0 text-xs font-semibold uppercase tracking-wider text-white/55">UAE</span>+971 54 431 1859</a><a href="tel:+919384530408" className="flex items-center gap-2 py-1.5 text-sm text-white/60 transition hover:text-white"><span className="w-12 shrink-0 text-xs font-semibold uppercase tracking-wider text-white/55">India</span>+91 93845 30408</a></div></div>
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#39dbc0]">Legal</p><div className="mt-3 flex flex-col"><a href="#" className="block py-1.5 text-sm text-white/60 hover:text-white">Privacy Policy</a><a href="#" className="block py-1.5 text-sm text-white/60 hover:text-white">Terms of Use</a></div></div>
      </div>
      <div className="border-t border-white/10"><div className="site-container flex flex-col gap-2 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} NUVA LYF. All rights reserved.</span><span>Clinic Management & EMR Software India</span></div></div>
    </footer>
  );
}
